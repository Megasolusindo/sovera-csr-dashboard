'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Sparkles,
  Send,
  Plus,
  MessageSquare,
  Trash2,
  Database,
  Search,
  Building2,
  Radio,
  BookOpen,
  Bot,
  User,
  Copy,
  Check,
  RefreshCw,
  AlertCircle,
  ChevronRight,
  ShieldCheck,
  ExternalLink,
} from 'lucide-react';
import { apiClient } from '@/lib/api-client';
import CompanyDetailModal from '@/components/companies/company-detail-modal';
import { Company } from '@/types/api';

interface Conversation {
  id: string;
  org_id: string;
  user_id: string;
  title: string;
  status: string;
  created_at: string;
  updated_at: string;
}

interface ChatMessage {
  id?: string;
  sender: 'user' | 'assistant';
  text: string;
  tools_called?: string[];
  latency_ms?: number;
  timestamp: string;
}

const promptSuggestions = [
  {
    icon: BookOpen,
    title: 'Konsep & Edukasi ESG',
    prompt: 'Apa itu ESG Materiality dan mengapa penting bagi strategi CSR perusahaan?',
    color: 'from-emerald-500/10 to-teal-500/10 border-emerald-200 text-emerald-700',
  },
  {
    icon: Building2,
    title: 'Cari Database Perusahaan',
    prompt: 'Apakah ada PT Indosat Tbk atau Pertamina di database master?',
    color: 'from-blue-500/10 to-cyan-500/10 border-blue-200 text-blue-700',
  },
  {
    icon: Radio,
    title: 'Sinyal Pendanaan CSR',
    prompt: 'Tampilkan alokasi sinyal budget CSR terbaru di sektor Energi & EBT',
    color: 'from-amber-500/10 to-orange-500/10 border-amber-200 text-amber-700',
  },
  {
    icon: Database,
    title: 'Watchlist Pemantauan',
    prompt: 'Tampilkan daftar watchlist perusahaan yang sedang dipantau organisasi',
    color: 'from-purple-500/10 to-indigo-500/10 border-purple-200 text-purple-700',
  },
];

export default function AIChatPage() {
  const router = useRouter();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConvId, setActiveConvId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingHistory, setIsFetchingHistory] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Detail Modal State
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSearchingCompany, setIsSearchingCompany] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Helper function to handle fallback auth header if localstorage token missing
  const getAuthHeaders = () => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('sovera_auth_token');
      if (token) return { Authorization: `Bearer ${token}` };
    }
    return { Authorization: 'Bearer dev-token' };
  };

  // Fetch conversations list on mount
  useEffect(() => {
    loadConversations();
  }, []);

  const loadConversations = async () => {
    try {
      const res: any = await apiClient.get('/tenant-ai/conversations', {
        headers: getAuthHeaders(),
      });
      if (res && res.success && Array.isArray(res.data)) {
        setConversations(res.data);
      }
    } catch (err) {
      console.warn('Fallback to org-ai alias for conversations:', err);
      try {
        const res: any = await apiClient.get('/org-ai/conversations', {
          headers: getAuthHeaders(),
        });
        if (res && res.success && Array.isArray(res.data)) {
          setConversations(res.data);
        }
      } catch (e) {
        console.error('Failed to load conversations:', e);
      }
    }
  };

  // Load messages when active conversation changes
  useEffect(() => {
    if (activeConvId) {
      loadMessages(activeConvId);
    } else {
      setMessages([]);
    }
  }, [activeConvId]);

  const loadMessages = async (convId: string) => {
    setIsFetchingHistory(true);
    try {
      const res: any = await apiClient.get(`/tenant-ai/conversations/${convId}/messages`, {
        headers: getAuthHeaders(),
      });
      if (res && res.success && Array.isArray(res.data)) {
        const formatted: ChatMessage[] = [];
        res.data.forEach((item: any) => {
          formatted.push({
            id: item.id + '_user',
            sender: 'user',
            text: item.message,
            timestamp: item.created_at,
          });
          formatted.push({
            id: item.id + '_assistant',
            sender: 'assistant',
            text: item.reply,
            tools_called: item.tools_called ? item.tools_called.map((t: any) => typeof t === 'string' ? t : t.tool_name) : [],
            latency_ms: item.latency_ms,
            timestamp: item.created_at,
          });
        });
        setMessages(formatted);
      }
    } catch (err) {
      console.error('Failed to load thread messages:', err);
    } finally {
      setIsFetchingHistory(false);
    }
  };

  // Auto-scroll to bottom of message list
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Handle textarea auto-resize
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 160)}px`;
    }
  }, [inputMessage]);

  const handleStartNewChat = () => {
    setActiveConvId(null);
    setMessages([]);
    setInputMessage('');
  };

  const handleSendMessage = async (textToSend?: string) => {
    const messageText = textToSend || inputMessage;
    if (!messageText.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      sender: 'user',
      text: messageText,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
    setIsLoading(true);

    try {
      const payload: any = { message: messageText };
      if (activeConvId) {
        payload.conversation_id = activeConvId;
      }

      const res: any = await apiClient.post('/tenant-ai/chat', payload, {
        headers: getAuthHeaders(),
      });

      if (res && res.success && res.data) {
        const replyText = res.data.reply;
        const newConvId = res.data.conversation_id;
        const toolsCalled = res.data.tools_called || [];

        if (!activeConvId && newConvId) {
          setActiveConvId(newConvId);
          loadConversations();
        }

        const assistantMsg: ChatMessage = {
          sender: 'assistant',
          text: replyText,
          tools_called: toolsCalled,
          timestamp: new Date().toISOString(),
        };

        setMessages((prev) => [...prev, assistantMsg]);
      }
    } catch (err: any) {
      console.error('Chat API Error:', err);
      const errorMsg: ChatMessage = {
        sender: 'assistant',
        text: 'Mohon maaf, terjadi gangguan koneksi dengan server AI Assistant. Silakan coba kembali.',
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleArchiveConversation = async (convId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm('Apakah Anda yakin ingin mengarsipkan percakapan ini?')) return;

    try {
      await apiClient.delete(`/tenant-ai/conversations/${convId}`, {
        headers: getAuthHeaders(),
      });
      setConversations((prev) => prev.filter((c) => c.id !== convId));
      if (activeConvId === convId) {
        handleStartNewChat();
      }
    } catch (err) {
      console.error('Failed to archive conversation:', err);
    }
  };

  const handleCopyText = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // Open Company Detail Popup directly when clicking "Lihat Detail" button
  const openCompanyDetailModal = async (companySearchTerm: string) => {
    setIsSearchingCompany(true);
    try {
      const cleanTerm = companySearchTerm.replace(/^🔍\s*Lihat\s*Detail\s*/i, '').trim();
      const res: any = await apiClient.get('/companies', {
        params: { search: cleanTerm, limit: 10 },
        headers: getAuthHeaders(),
      });

      if (res && res.data && Array.isArray(res.data) && res.data.length > 0) {
        setSelectedCompany(res.data[0]);
        setIsModalOpen(true);
      } else {
        // Fallback: navigate directly to /corporates page with search query
        router.push(`/corporates?search=${encodeURIComponent(cleanTerm)}`);
      }
    } catch (err) {
      console.error('Failed to search company detail modal:', err);
      router.push(`/corporates?search=${encodeURIComponent(companySearchTerm)}`);
    } finally {
      setIsSearchingCompany(false);
    }
  };

  // Markdown renderer for AI responses with interactive buttons & hierarchy
  const renderFormattedMarkdown = (content: string) => {
    const lines = content.split('\n');
    return lines.map((line, idx) => {
      const leadingSpaces = line.search(/\S/);
      const isIndented = leadingSpaces >= 2;
      const isDeeplyIndented = leadingSpaces >= 4;
      const trimmedLine = line.trim();

      if (trimmedLine === '') {
        return <div key={idx} className="h-2" />;
      }

      // Headers
      if (trimmedLine.startsWith('### ')) {
        return (
          <h4 key={idx} className="font-bold text-slate-900 text-base mt-4 mb-2">
            {parseFormattedContent(trimmedLine.replace('### ', ''))}
          </h4>
        );
      }
      if (trimmedLine.startsWith('## ')) {
        return (
          <h3 key={idx} className="font-bold text-slate-900 text-lg mt-5 mb-2 border-b pb-1">
            {parseFormattedContent(trimmedLine.replace('## ', ''))}
          </h3>
        );
      }
      if (trimmedLine.startsWith('# ')) {
        return (
          <h2 key={idx} className="font-extrabold text-slate-900 text-xl mt-6 mb-3 border-b pb-2">
            {parseFormattedContent(trimmedLine.replace('# ', ''))}
          </h2>
        );
      }

      // Bullet or numbered list match
      const listMatch = trimmedLine.match(/^(\d+\.|\*|-|•)\s+(.*)/);
      if (listMatch) {
        const itemContent = listMatch[2];

        // Primary / Main Bullet
        if (!isIndented) {
          return (
            <div key={idx} className="flex items-start gap-2.5 my-1.5 pl-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0 mt-2" />
              <div className="text-slate-800 text-sm leading-relaxed flex-1">
                {parseFormattedContent(itemContent)}
              </div>
            </div>
          );
        }

        // Sub-bullet / Indented List Item (2+ or 4+ spaces)
        return (
          <div key={idx} className={`flex items-start gap-2 my-1 ${isDeeplyIndented ? 'pl-9' : 'pl-6'}`}>
            <span className="text-slate-400 font-bold text-xs mt-0.5">•</span>
            <div className="text-slate-700 text-xs leading-relaxed flex-1">
              {parseFormattedContent(itemContent)}
            </div>
          </div>
        );
      }

      // Indented text / paragraph under bullet
      if (isIndented) {
        return (
          <div key={idx} className={`my-1 ${isDeeplyIndented ? 'pl-9' : 'pl-6'} text-slate-700 text-xs leading-relaxed`}>
            {parseFormattedContent(trimmedLine)}
          </div>
        );
      }

      // Standard Paragraph
      return (
        <p key={idx} className="text-slate-800 text-sm leading-relaxed my-1">
          {parseFormattedContent(trimmedLine)}
        </p>
      );
    });
  };

  const parseFormattedContent = (text: string) => {
    const linkRegex = /\[(.*?)\]\((.*?)\)/g;
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = linkRegex.exec(text)) !== null) {
      const precedingText = text.substring(lastIndex, match.index);
      if (precedingText) {
        parts.push(...parseInlineMarkdown(precedingText));
      }

      const label = match[1];
      const url = match[2];

      // Extract search term from url like /corporates?search=PT%20Indosat%20Tbk
      const searchMatch = url.match(/search=([^&]+)/);
      const searchTerm = searchMatch ? decodeURIComponent(searchMatch[1]) : label;

      parts.push(
        <span key={match.index} className="inline-flex items-center gap-1.5 my-1">
          <button
            onClick={() => openCompanyDetailModal(searchTerm)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold shadow-sm shadow-emerald-700/20 transition-all hover:scale-[1.02] cursor-pointer active:scale-95"
            title="Buka Popup Detail Perusahaan"
          >
            <Building2 className="w-3.5 h-3.5 text-emerald-200" />
            <span>{label}</span>
            <ChevronRight className="w-3.5 h-3.5 text-emerald-200" />
          </button>
          <Link
            href={url}
            className="p-1.5 text-slate-400 hover:text-emerald-700 rounded hover:bg-emerald-50 transition-colors"
            title="Buka Halaman Katalog Perusahaan"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </span>
      );

      lastIndex = linkRegex.lastIndex;
    }

    if (lastIndex < text.length) {
      parts.push(...parseInlineMarkdown(text.substring(lastIndex)));
    }

    return parts;
  };

  const parseInlineMarkdown = (text: string): React.ReactNode[] => {
    const tokenRegex = /(\*\*.*?\*\*|\*.*?\*|_.*?_|`.*?`)/g;
    const parts = text.split(tokenRegex);

    return parts.map((part, i) => {
      if (!part) return null;

      // **bold**
      if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
        return (
          <strong key={i} className="font-semibold text-slate-900">
            {part.slice(2, -2)}
          </strong>
        );
      }

      // `inline code`
      if (part.startsWith('`') && part.endsWith('`') && part.length >= 2) {
        return (
          <code key={i} className="px-1.5 py-0.5 bg-slate-100 text-emerald-800 border border-slate-200/80 rounded text-xs font-mono">
            {part.slice(1, -1)}
          </code>
        );
      }

      // *italic* or _italic_
      if (
        ((part.startsWith('*') && part.endsWith('*')) || (part.startsWith('_') && part.endsWith('_'))) &&
        part.length >= 2
      ) {
        return (
          <em key={i} className="italic text-slate-600 font-normal">
            {part.slice(1, -1)}
          </em>
        );
      }

      return part;
    });
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-slate-50 overflow-hidden font-sans">
      {/* ─── LEFT SIDEBAR (Gemini-style thread history) ────────────────── */}
      <aside className="w-72 bg-white border-r border-slate-200 flex flex-col shrink-0">
        {/* New Chat Button */}
        <div className="p-4 border-b border-slate-100">
          <button
            onClick={handleStartNewChat}
            className="w-full flex items-center justify-center gap-2.5 px-4 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl font-medium shadow-sm transition-all duration-150 active:scale-[0.98]"
          >
            <Plus className="w-5 h-5 text-white" />
            <span>+ Percakapan Baru</span>
          </button>
        </div>

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          <div className="px-3 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Riwayat Chat Organisasi
          </div>

          {conversations.length === 0 ? (
            <div className="px-3 py-6 text-center text-xs text-slate-400">
              Belum ada riwayat percakapan
            </div>
          ) : (
            conversations.map((conv) => {
              const isActive = activeConvId === conv.id;
              return (
                <div
                  key={conv.id}
                  onClick={() => setActiveConvId(conv.id)}
                  className={`group flex items-center justify-between px-3 py-2.5 rounded-lg text-sm cursor-pointer transition-all duration-150 ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-800 font-medium border border-emerald-200/60 shadow-xs'
                      : 'text-slate-700 hover:bg-slate-100/80 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate flex-1 min-w-0 pr-2">
                    <MessageSquare className={`w-4 h-4 shrink-0 ${isActive ? 'text-emerald-700' : 'text-slate-400'}`} />
                    <span className="truncate text-xs">{conv.title || 'Percakapan Tanpa Judul'}</span>
                  </div>

                  <button
                    onClick={(e) => handleArchiveConversation(conv.id, e)}
                    className="opacity-0 group-hover:opacity-100 p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-all"
                    title="Arsipkan"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* Sidebar Footer Badge */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2.5 px-3 py-2 bg-emerald-100/60 border border-emerald-200/80 rounded-lg">
            <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-semibold text-emerald-900 truncate">Multi-Tenant Secured</p>
              <p className="text-[10px] text-emerald-700 truncate">Data terisolasi per-organisasi</p>
            </div>
          </div>
        </div>
      </aside>

      {/* ─── MAIN CHAT AREA ────────────────────────────────────────────── */}
      <main className="flex-1 flex flex-col min-w-0 bg-white relative">
        {/* Top Header */}
        <header className="h-14 px-6 border-b border-slate-100 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center shadow-xs">
              <Sparkles className="w-4.5 h-4.5" />
            </div>
            <div>
              <h1 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <span>CSR Intelligence Assistant</span>
                <span className="px-2 py-0.5 text-[10px] font-medium bg-emerald-100 text-emerald-800 rounded-full">
                  Gemini Flash 2.0
                </span>
              </h1>
              <p className="text-[11px] text-slate-500">Asisten kecerdasan riset CSR & ESG terstruktur</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleStartNewChat}
              className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5 text-slate-500" />
              <span>Baru</span>
            </button>
          </div>
        </header>

        {/* Scrollable Message List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Welcome Screen / Empty State */}
          {messages.length === 0 && !isFetchingHistory && (
            <div className="max-w-3xl mx-auto py-10 space-y-8 animate-fade-in">
              <div className="text-center space-y-3">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-white shadow-lg shadow-emerald-500/20 mb-2">
                  <Sparkles className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  Halo! Apa yang ingin Anda riset hari ini?
                </h2>
                <p className="text-sm text-slate-500 max-w-md mx-auto">
                  Tanyakan seputar konsep ESG, riset perusahaan pendana CSR, atau sinyal alokasi budget terbaru di database organisasi Anda.
                </p>
              </div>

              {/* Prompt Suggestions Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {promptSuggestions.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(item.prompt)}
                      className={`p-4 rounded-xl border bg-gradient-to-br ${item.color} hover:shadow-md transition-all duration-200 text-left group flex flex-col justify-between space-y-3 cursor-pointer`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="text-xs font-bold uppercase tracking-wider opacity-80">{item.title}</span>
                        <Icon className="w-4 h-4 opacity-70 group-hover:scale-110 transition-transform" />
                      </div>
                      <p className="text-xs font-medium text-slate-800 leading-relaxed group-hover:text-slate-950">
                        "{item.prompt}"
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Fetching Spinner */}
          {isFetchingHistory && (
            <div className="flex items-center justify-center py-20 text-slate-400 gap-2">
              <RefreshCw className="w-5 h-5 animate-spin text-emerald-600" />
              <span className="text-xs font-medium">Memuat percakapan...</span>
            </div>
          )}

          {/* Message Bubbles */}
          {messages.map((msg, index) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={index}
                className={`flex gap-4 max-w-4xl mx-auto ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center shrink-0 shadow-xs mt-1">
                    <Sparkles className="w-4 h-4" />
                  </div>
                )}

                <div className={`space-y-2 max-w-2xl ${isUser ? 'items-end' : 'items-start'}`}>
                  {/* User Bubble */}
                  {isUser ? (
                    <div className="bg-emerald-700 text-white px-4 py-3 rounded-2xl rounded-tr-xs text-sm leading-relaxed shadow-sm">
                      {msg.text}
                    </div>
                  ) : (
                    /* AI Assistant Response Card */
                    <div className="bg-white border border-slate-200/90 rounded-2xl rounded-tl-xs p-5 shadow-xs text-slate-800 space-y-3">
                      {/* Tool Execution Badges */}
                      {msg.tools_called && msg.tools_called.length > 0 && (
                        <div className="flex flex-wrap items-center gap-1.5 pb-2 border-b border-slate-100">
                          <span className="text-[11px] font-semibold text-slate-400 uppercase">Data Source:</span>
                          {msg.tools_called.map((toolName, tIdx) => (
                            <span
                              key={tIdx}
                              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200"
                            >
                              <Database className="w-3 h-3 text-emerald-600" />
                              <span>{toolName}</span>
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Rendered Text Response */}
                      <div className="prose prose-slate max-w-none">
                        {renderFormattedMarkdown(msg.text)}
                      </div>

                      {/* Card Action Footer */}
                      <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-400">
                        <span className="text-[11px]">
                          {msg.timestamp ? new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                        </span>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleCopyText(msg.text, index)}
                            className="p-1 hover:text-slate-600 rounded transition-colors flex items-center gap-1 text-[11px]"
                            title="Salin Teks"
                          >
                            {copiedIndex === index ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                                <span className="text-emerald-600 font-medium">Tersalin</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span>Salin</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {isUser && (
                  <div className="w-8 h-8 rounded-lg bg-slate-800 text-white flex items-center justify-center shrink-0 shadow-xs mt-1 font-semibold text-xs">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {/* Loading Indicator */}
          {isLoading && (
            <div className="flex gap-4 max-w-4xl mx-auto justify-start">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                <Sparkles className="w-4 h-4 animate-spin" />
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-xs px-5 py-4 shadow-xs flex items-center gap-2 text-slate-500 text-xs font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
                <span>Asisten sedang menganalisis database & memproses jawaban...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* ─── BOTTOM FLOATING INPUT BAR ────────────────────────────────── */}
        <div className="p-4 border-t border-slate-100 bg-white/90 backdrop-blur-md">
          <div className="max-w-3xl mx-auto space-y-2">
            <div className="relative flex items-end gap-2 bg-slate-50 border border-slate-200 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20 rounded-2xl p-2.5 transition-all shadow-xs">
              <textarea
                ref={textareaRef}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder="Ketik pertanyaan CSR, ESG, atau nama perusahaan..."
                rows={1}
                className="flex-1 bg-transparent border-0 focus:outline-none focus:ring-0 text-sm text-slate-900 placeholder-slate-400 resize-none px-2 py-1 max-h-40"
              />

              <button
                onClick={() => handleSendMessage()}
                disabled={!inputMessage.trim() || isLoading}
                className={`p-2.5 rounded-xl transition-all duration-150 ${
                  inputMessage.trim() && !isLoading
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-sm hover:from-emerald-700 hover:to-teal-700 cursor-pointer active:scale-95'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>

            <p className="text-[11px] text-center text-slate-400">
              CSR Intelligence Assistant dapat memanggil database organisasi Anda untuk riset faktual.
            </p>
          </div>
        </div>
      </main>

      {/* ─── COMPANY DETAIL POPUP MODAL ────────────────────────────────── */}
      <CompanyDetailModal
        company={selectedCompany}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onStartProspecting={(comp) => {
          setIsModalOpen(false);
          router.push(`/pipeline?create=true&company=${encodeURIComponent(comp.name)}`);
        }}
      />
    </div>
  );
}
