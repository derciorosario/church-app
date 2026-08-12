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
  },
  {
    id: "m2",
    senderId: "pastor",
    senderName: "Pastor João",
    text: "Bom dia a todos! Lembrem-se do culto de domingo às 10h.",
    timestamp: Date.now() - 36000000,
    type: "text",
  },
  {
    id: "m3",
    senderId: "maria",
    senderName: "Irmã Maria",
    text: "Vou levar os boletins para o ministério de crianças.",
    timestamp: Date.now() - 18000000,
    type: "text",
  },
];

export default function Chat() {
  const { user, isAuthed } = useAuth();
  const { socket, connected } = useSocket();
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isUploading, setIsUploading] = useState(false);

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

    socket.on("chat:new_message", handleNewMessage);

    return () => {
      socket.off("chat:new_message", handleNewMessage);
    };
  }, [socket, connected]);

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
    };

    setMessages((prev) => [...prev, msg]);
    setInput("");

    if (socket && connected) {
      socket.emit("chat:send_message", msg);
    }
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
            {connected ? "Online" : "Desconectado"}
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-1" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/subtle-white-feathers.png')", backgroundColor: "#e5ddd5" }}>
        {messages.map((msg, idx) => {
          const prev = idx > 0 ? messages[idx - 1] : null;
          const showDate = shouldShowDateSeparator(msg, prev);
          const own = isOwnMessage(msg);

          return (
            <div key={msg.id}>
              {showDate && (
                <div className="flex justify-center my-3">
                  <span className="text-xs bg-white/80 text-secondary-500 px-3 py-1 rounded-full shadow-sm">
                    {formatDate(msg.timestamp)}
                  </span>
                </div>
              )}
              <div className={`flex ${own ? "justify-end" : "justify-start"} mb-1`}>
                <div className={`max-w-[75%] md:max-w-[60%] rounded-2xl px-3 py-2 shadow-sm ${
                  own
                    ? "bg-[#D9FDD3] text-secondary-900 rounded-br-md"
                    : "bg-white text-secondary-900 rounded-bl-md"
                }`}>
                  {!own && (
                    <p className="text-xs font-semibold text-primary-600 mb-1">{msg.senderName}</p>
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
                        <svg className="w-5 h-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
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

                  <div className={`flex items-center justify-end gap-1 mt-1 ${own ? "text-secondary-400" : "text-secondary-400"}`}>
                    <span className="text-[10px]">{formatTime(msg.timestamp)}</span>
                    {own && (
                      <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 24 24"><path d="M18 7l-1.41-1.41-6.34 6.34 1.41 1.41L18 7zm4.24-1.41L11.66 16.17 7.48 12l-1.41 1.41L11.66 19l12-12-1.42-1.41zM.41 13.41L6 19l1.41-1.41L1.83 12 .41 13.41z" /></svg>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

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
          className="p-2 text-secondary-400 hover:text-primary-600 transition rounded-full hover:bg-gray-100 disabled:opacity-50"
          title="Anexar ficheiro"
        >
          {isUploading ? (
            <svg className="w-6 h-6 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 000 2.828 2 2 0 002.828 0L18 9m0 0h-6m6 0v6" /></svg>
          )}
        </button>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escreva uma mensagem..."
          className="flex-1 px-4 py-2.5 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition"
          disabled={!isAuthed}
        />
        <button
          type="submit"
          disabled={!input.trim() || !isAuthed}
          className="p-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition disabled:opacity-40 disabled:cursor-not-allowed shadow-md"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
        </button>
      </form>
    </div>
  );
}
