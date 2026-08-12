import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useSocket } from "../../contexts/SocketContext";
import { uploadClient } from "../../api/client";

const GROUP_NAME = "Comunidade Igreja Conectada";

const INITIAL_MESSAGES = [
  {
    id: "m1",
    senderId: "system",
    senderName: "Sistema",
    text: "Bem-vindo ao grupo da igreja! 🎉",
    timestamp: Date.now() - 86400000,
    type: "text",
    status: "read",
  },
  {
    id: "m2",
    senderId: "pastor",
    senderName: "Pastor João",
    text: "Bom dia a todos! Lembrem-se do culto de domingo às 10h.",
    timestamp: Date.now() - 36000000,
    type: "text",
    status: "read",
  },
  {
    id: "m3",
    senderId: "maria",
    senderName: "Irmã Maria",
    text: "Vou levar os boletins para o ministério de crianças.",
    timestamp: Date.now() - 18000000,
    type: "text",
    status: "read",
  },
  {
    id: "m4",
    senderId: "pedro",
    senderName: "Irmão Pedro",
    text: "Alguém pode ajudar com o som para o ensaio de sábado?",
    timestamp: Date.now() - 7200000,
    type: "text",
    status: "read",
  },
  {
    id: "m5",
    senderId: "ana",
    senderName: "Irmã Ana",
    text: "Eu posso ajudar Pedro! Estarei lá às 17h.",
    timestamp: Date.now() - 3600000,
    type: "text",
    status: "read",
  },
  {
    id: "m6",
    senderId: "system",
    senderName: "Sistema",
    text: "📢 Aviso: Reunião de líderes quinta-feira às 19h na Sala de Conferências.",
    timestamp: Date.now() - 1800000,
    type: "text",
    status: "read",
  },
];

const MEMBERS = [
  { id: "system", name: "Sistema", role: "Bot", status: "online", avatar: "🤖" },
  { id: "pastor", name: "Pastor João", role: "Pastor", status: "online", avatar: "👨‍💼" },
  { id: "maria", name: "Irmã Maria", role: "Louvor", status: "online", avatar: "👩" },
  { id: "pedro", name: "Irmão Pedro", role: "Jovens", status: "online", avatar: "👨" },
  { id: "ana", name: "Irmã Ana", role: "Mulheres", status: "away", avatar: "👩" },
  { id: "carlos", name: "Irmão Carlos", role: "Homens", status: "online", avatar: "👨" },
  { id: "joana", name: "Irmã Joana", role: "Crianças", status: "offline", avatar: "👩" },
  { id: "paulo", name: "Irmão Paulo", role: "Evangelismo", status: "online", avatar: "👨" },
];

const EMOJIS = ["👍", "❤️", "🙏", "😊", "👏", "🔥", "💪", "✨", "🙌", "😇"];

export default function Chat() {
  const { user, isAuthed } = useAuth();
  const { socket, connected } = useSocket();
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const chatContainerRef = useRef(null);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [showEmojis, setShowEmojis] = useState(false);
  const [showMembers, setShowMembers] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [typingUsers, setTypingUsers] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (!socket || !connected) return;

    const handleNewMessage = (msg) => {
      setMessages((prev) => {
        if (prev.some((m) => m.id === msg.id)) return prev;
        return [...prev, msg];
      });
    };

    const handleTyping = (data) => {
      if (data.userId !== (user?.id || user?._id)) {
        setTypingUsers((prev) => {
          if (prev.includes(data.userName)) return prev;
          return [...prev, data.userName];
        });
        setTimeout(() => {
          setTypingUsers((prev) => prev.filter((name) => name !== data.userName));
        }, 3000);
      }
    };

    socket.on("chat:new_message", handleNewMessage);
    socket.on("chat:typing", handleTyping);

    return () => {
      socket.off("chat:new_message", handleNewMessage);
      socket.off("chat:typing", handleTyping);
    };
  }, [socket, connected, user]);

  useEffect(() => {
    let typingTimeout;
    if (isTyping) {
      typingTimeout = setTimeout(() => setIsTyping(false), 2000);
    }
    return () => clearTimeout(typingTimeout);
  }, [isTyping]);

  const formatTime = (ts) => {
    const d = new Date(ts);
    return d.toLocaleTimeString("pt-PT", { hour: "2-digit", minute: "2-digit" });
  };

  const formatDate = (ts) => {
    const d = new Date(ts);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (d.toDateString() === today.toDateString()) return "Hoje";
    if (d.toDateString() === yesterday.toDateString()) return "Ontem";
    return d.toLocaleDateString("pt-PT", { day: "2-digit", month: "short" });
  };

  const isOwnMessage = (msg) => msg.senderId === (user?.id || user?._id || "me");

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim() || !isAuthed) return;

    const text = input.trim();
    const msg = {
      id: `local-${Date.now()}`,
      senderId: user?.id || user?._id || "me",
      senderName: user?.name || "Você",
      text,
      timestamp: Date.now(),
      type: "text",
      status: "sent",
      replyTo: replyingTo || undefined,
    };

    setMessages((prev) => [...prev, msg]);
    setInput("");
    setReplyingTo(null);
    setIsTyping(false);

    if (socket && connected) {
      socket.emit("chat:send_message", msg);
    }
  };

  const handleTyping = (e) => {
    setInput(e.target.value);
    if (!isTyping) {
      setIsTyping(true);
      if (socket && connected) {
        socket.emit("chat:typing", { userName: user?.name || "Você" });
      }
    }
  };

  const handleReply = (msg) => {
    setReplyingTo(msg);
    setShowEmojis(false);
  };

  const handleReaction = (msgId, emoji) => {
    setMessages((prev) =>
      prev.map((msg) => {
        if (msg.id !== msgId) return msg;
        const reactions = msg.reactions || {};
        const current = reactions[emoji] || [];
        if (current.includes("me")) {
          return {
            ...msg,
            reactions: {
              ...reactions,
              [emoji]: current.filter((id) => id !== "me"),
            },
          };
        }
        return {
          ...msg,
          reactions: {
            ...reactions,
            [emoji]: [...current, "me"],
          },
        };
      })
    );
  };

  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !isAuthed) return;

    setIsUploading(true);

    const isImage = file.type.startsWith("image/");
    const fileSize = file.size;

    let fileUrl = null;

    if (fileSize <= 5 * 1024 * 1024) {
      try {
        const formData = new FormData();
        formData.append("file", file);
        const { data } = await uploadClient.post("/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        fileUrl = data?.url || data?.fileUrl || data?.path;
      } catch (err) {
        console.error("Upload failed", err);
      }
    }

    if (!fileUrl) {
      fileUrl = URL.createObjectURL(file);
    }

    const msg = {
      id: `local-${Date.now()}`,
      senderId: user?.id || user?._id || "me",
      senderName: user?.name || "Você",
      text: isImage ? undefined : file.name,
      fileName: file.name,
      fileSize,
      fileUrl,
      fileType: file.type,
      timestamp: Date.now(),
      type: isImage ? "image" : "file",
      status: "sent",
    };

    setMessages((prev) => [...prev, msg]);

    if (socket && connected) {
      socket.emit("chat:send_message", msg);
    }

    setIsUploading(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const shouldShowDateSeparator = (msg, prevMsg) => {
    if (!prevMsg) return true;
    const d1 = new Date(msg.timestamp).toDateString();
    const d2 = new Date(prevMsg.timestamp).toDateString();
    return d1 !== d2;
  };

  const filteredMessages = messages.filter((msg) => {
    if (!searchQuery.trim()) return true;
    return (
      msg.text?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.senderName?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const onlineMembers = MEMBERS.filter((m) => m.status === "online");
  const awayMembers = MEMBERS.filter((m) => m.status === "away");
  const offlineMembers = MEMBERS.filter((m) => m.status === "offline");

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3 shadow-sm z-10">
        <button onClick={() => navigate(-1)} className="text-secondary-500 hover:text-secondary-800 transition md:hidden">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>
        <div className="relative">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-accent-600 rounded-full flex items-center justify-center text-white font-bold">
            IC
          </div>
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="font-semibold text-secondary-900 truncate">{GROUP_NAME}</h1>
          <p className="text-xs text-green-600 font-medium">
            {connected ? `Online • ${onlineMembers.length} membros` : "Desconectado"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Pesquisar..."
              className="pl-9 pr-3 py-1.5 bg-gray-100 rounded-full text-xs focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition w-0 md:w-48"
            />
            <svg className="w-4 h-4 text-secondary-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <button
            onClick={() => setShowMembers(!showMembers)}
            className={`p-2 rounded-full transition ${showMembers ? "bg-primary-100 text-primary-700" : "text-secondary-400 hover:text-primary-600 hover:bg-gray-100"}`}
            title="Membros"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 014 4V6.5a2.5 2.5 0 00-5 0v.5" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 14.5A3.5 3.5 0 017.5 11h9a3.5 3.5 0 013.5 3.5v1a2.5 2.5 0 01-5 0v-1" />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Messages */}
        <div className="flex-1 flex flex-col">
          <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto p-4 space-y-1"
            style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/subtle-white-feathers.png')", backgroundColor: "#e5ddd5" }}
          >
            {filteredMessages.length === 0 && (
              <div className="text-center py-12">
                <p className="text-secondary-400 text-sm">Nenhuma mensagem encontrada.</p>
              </div>
            )}
            {filteredMessages.map((msg, idx) => {
              const prev = idx > 0 ? filteredMessages[idx - 1] : null;
              const showDate = shouldShowDateSeparator(msg, prev);
              const own = isOwnMessage(msg);

              return (
                <div key={msg.id} className="group">
                  {showDate && (
                    <div className="flex justify-center my-3">
                      <span className="text-xs bg-white/80 text-secondary-500 px-3 py-1 rounded-full shadow-sm">
                        {formatDate(msg.timestamp)}
                      </span>
                    </div>
                  )}
                  <div className={`flex ${own ? "justify-end" : "justify-start"} mb-1`}>
                    <div
                      className={`max-w-[75%] md:max-w-[60%] rounded-2xl px-3 py-2 shadow-sm ${
                        own ? "bg-[#D9FDD3] text-secondary-900 rounded-br-md" : "bg-white text-secondary-900 rounded-bl-md"
                      }`}
                    >
                      {!own && <p className="text-xs font-semibold text-primary-600 mb-1">{msg.senderName}</p>}

                      {msg.replyTo && (
                        <div className="mb-1.5 pl-2 border-l-2 border-gray-300 text-xs text-secondary-500">
                          <p className="font-medium">{msg.replyTo.senderName}</p>
                          <p className="truncate">{msg.replyTo.text}</p>
                        </div>
                      )}

                      {msg.type === "image" && msg.fileUrl && (
                        <div className="mb-1">
                          <img
                            src={msg.fileUrl}
                            alt={msg.fileName || "Imagem"}
                            className="rounded-xl max-h-64 object-cover w-full"
                            loading="lazy"
                          />
                        </div>
                      )}

                      {msg.type === "file" && msg.fileUrl && (
                        <a
                          href={msg.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 bg-white/60 rounded-xl p-3 mb-1 hover:bg-white/80 transition border border-gray-100"
                        >
                          <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-secondary-900 truncate">{msg.fileName || "Ficheiro"}</p>
                            <p className="text-xs text-secondary-400">
                              {msg.fileSize ? `${(msg.fileSize / 1024).toFixed(1)} KB` : "Ficheiro"}
                            </p>
                          </div>
                        </a>
                      )}

                      {msg.text && <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">{msg.text}</p>}

                      {msg.reactions && Object.keys(msg.reactions).length > 0 && (
                        <div className="flex gap-1 mt-1 flex-wrap">
                          {Object.entries(msg.reactions).map(([emoji, users]) =>
                            users.length > 0 ? (
                              <span key={emoji} className="text-xs bg-white/80 border border-gray-200 rounded-full px-1.5 py-0.5">
                                {emoji} {users.length}
                              </span>
                            ) : null
                          )}
                        </div>
                      )}

                      <div className={`flex items-center justify-end gap-1 mt-1 ${own ? "text-secondary-400" : "text-secondary-400"}`}>
                        <span className="text-[10px]">{formatTime(msg.timestamp)}</span>
                        {own && (
                          <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M18 7l-1.41-1.41-6.34 6.34 1.41 1.41L18 7zm4.24-1.41L11.66 16.17 7.48 12l-1.41 1.41L11.66 19l12-12-1.42-1.41zM.41 13.41L6 19l1.41-1.41L1.83 12 .41 13.41z" />
                          </svg>
                        )}
                      </div>

                      <div
                        className={`absolute -bottom-8 right-0 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity ${
                          own ? "left-0 right-auto" : "right-0"
                        }`}
                      >
                        <button onClick={() => handleReaction(msg.id, "👍")} className="p-1 bg-white rounded-full shadow-sm border border-gray-200 text-xs hover:bg-gray-50">
                          👍
                        </button>
                        <button onClick={() => handleReply(msg)} className="p-1 bg-white rounded-full shadow-sm border border-gray-200 hover:bg-gray-50">
                          <svg className="w-3 h-3 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Typing indicator */}
          {typingUsers.length > 0 && (
            <div className="px-4 py-1 text-xs text-secondary-500 bg-gray-50 border-t border-gray-200">
              {typingUsers.join(", ")} {typingUsers.length === 1 ? "está" : "estão"} a escrever...
            </div>
          )}

          {/* Reply preview */}
          {replyingTo && (
            <div className="px-4 py-2 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-xs text-secondary-500">A responder a <span className="font-medium text-primary-600">{replyingTo.senderName}</span></p>
                <p className="text-sm text-secondary-700 truncate">{replyingTo.text}</p>
              </div>
              <button onClick={() => setReplyingTo(null)} className="text-secondary-400 hover:text-secondary-600 transition ml-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}

          {/* Input */}
          <form onSubmit={handleSend} className="bg-white border-t border-gray-200 px-3 py-2 flex items-end gap-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              className="hidden"
              accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="p-2 text-secondary-400 hover:text-primary-600 transition rounded-full hover:bg-gray-100 disabled:opacity-50 flex-shrink-0"
              title="Anexar ficheiro"
            >
              {isUploading ? (
                <svg className="w-6 h-6 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 000 2.828 2 2 0 002.828 0L18 9m0 0h-6m6 0v6" />
                </svg>
              )}
            </button>
            <div className="flex-1 relative">
              <input
                type="text"
                value={input}
                onChange={handleTyping}
                placeholder={isAuthed ? "Escreva uma mensagem..." : "Faça login para participar"}
                className="w-full px-4 py-2.5 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition"
                disabled={!isAuthed}
              />
              {showEmojis && (
                <div className="absolute bottom-12 left-0 bg-white border border-gray-200 rounded-xl shadow-lg p-3 grid grid-cols-5 gap-2 z-20">
                  {EMOJIS.map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => {
                        setInput((prev) => prev + emoji);
                        setShowEmojis(false);
                      }}
                      className="text-xl hover:bg-gray-100 rounded-lg p-1 transition"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button
              type="button"
              onClick={() => setShowEmojis(!showEmojis)}
              className="p-2 text-secondary-400 hover:text-primary-600 transition rounded-full hover:bg-gray-100 flex-shrink-0"
              title="Emojis"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
            <button
              type="submit"
              disabled={!input.trim() || !isAuthed}
              className="p-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition disabled:opacity-40 disabled:cursor-not-allowed shadow-md flex-shrink-0"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </form>
        </div>

        {/* Members Sidebar */}
        {showMembers && (
          <div className="hidden md:flex w-72 bg-white border-l border-gray-200 flex-col">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-semibold text-secondary-900">Membros do Grupo</h3>
              <p className="text-xs text-secondary-400 mt-0.5">{MEMBERS.length} membros</p>
            </div>
            <div className="flex-1 overflow-y-auto p-3 space-y-4">
              <div>
                <p className="text-xs font-medium text-secondary-400 uppercase tracking-wider mb-2 px-2">
                  Online — {onlineMembers.length}
                </p>
                <div className="space-y-1">
                  {onlineMembers.map((member) => (
                    <div key={member.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition cursor-pointer">
                      <div className="relative">
                        <div className="w-8 h-8 bg-gradient-to-br from-primary-100 to-accent-100 rounded-full flex items-center justify-center text-lg">
                          {member.avatar}
                        </div>
                        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-secondary-900 truncate">{member.name}</p>
                        <p className="text-xs text-secondary-400">{member.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-medium text-secondary-400 uppercase tracking-wider mb-2 px-2">
                  Ausente — {awayMembers.length}
                </p>
                <div className="space-y-1">
                  {awayMembers.map((member) => (
                    <div key={member.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition cursor-pointer">
                      <div className="relative">
                        <div className="w-8 h-8 bg-gradient-to-br from-primary-100 to-accent-100 rounded-full flex items-center justify-center text-lg">
                          {member.avatar}
                        </div>
                        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-yellow-500 border-2 border-white rounded-full"></span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-secondary-900 truncate">{member.name}</p>
                        <p className="text-xs text-secondary-400">{member.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-medium text-secondary-400 uppercase tracking-wider mb-2 px-2">
                  Offline — {offlineMembers.length}
                </p>
                <div className="space-y-1">
                  {offlineMembers.map((member) => (
                    <div key={member.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition cursor-pointer opacity-60">
                      <div className="relative">
                        <div className="w-8 h-8 bg-gradient-to-br from-primary-100 to-accent-100 rounded-full flex items-center justify-center text-lg">
                          {member.avatar}
                        </div>
                        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-gray-400 border-2 border-white rounded-full"></span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-secondary-900 truncate">{member.name}</p>
                        <p className="text-xs text-secondary-400">{member.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
