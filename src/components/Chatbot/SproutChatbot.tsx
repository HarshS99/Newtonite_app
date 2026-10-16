import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Send,
  Sparkles,
  Key,
  BookOpen,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Bot,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import {
  sendQueryToGroqRAG,
  getGroqApiKey,
  setGroqApiKey,
  getGroqModel,
  setGroqModel,
  SUPPORTED_MODELS,
  type ChatMessage,
} from '../../services/groqService';
import { SproutMascot } from '../Mascot/SproutMascot';

const PRESET_QUESTIONS = [
  'Why is PAN mandatory for mutual funds?',
  'Can I really start investing with ₹100?',
  'Is DigiLocker Aadhaar verification safe?',
  'How long does the KYC review take?',
];

let messageCounter = 0;
function createMessage(
  sender: 'user' | 'assistant',
  text: string,
  sources?: any[],
  isError?: boolean
): ChatMessage {
  messageCounter += 1;
  const now = new Date();
  return {
    id: `${sender}-${messageCounter}-${now.getTime()}`,
    sender,
    text,
    timeString: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    retrievedSources: sources,
    isError,
  };
}

const INITIAL_MESSAGE: ChatMessage = {
  id: 'welcome-initial',
  sender: 'assistant',
  text: "👋 Hi! I'm Sprout AI, your micro-investing guide powered by **RAG (Knowledge Retrieval) + Groq**.\n\nAsk me anything about starting with ₹100, PAN/Aadhaar DigiLocker verification, or statutory safety rules!",
  timeString: 'Just now',
};

export const SproutChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [inputKey, setInputKey] = useState<string>(() => getGroqApiKey());
  const [selectedModel, setSelectedModel] = useState<string>(() => getGroqModel());

  const hasApiKey = Boolean(inputKey.trim());

  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [expandedSources, setExpandedSources] = useState<{ [msgId: string]: boolean }>({});
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setGroqApiKey(inputKey);
    setGroqModel(selectedModel);
    setShowSettings(false);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputQuery).trim();
    if (!query || isLoading) return;

    const userMsg = createMessage('user', query);

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsLoading(true);

    // Format chat history for context
    const history = messages
      .filter((m) => m.sender === 'user' || m.sender === 'assistant')
      .map((m) => ({
        role: m.sender as 'user' | 'assistant',
        content: m.text,
      }));

    try {
      const response = await sendQueryToGroqRAG(query, history);
      if (response.modelUsed && response.modelUsed !== selectedModel) {
        setSelectedModel(response.modelUsed);
      }
      const assistantMsg = createMessage('assistant', response.text, response.sources);
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      const errorMsg = createMessage(
        'assistant',
        `Sorry, an unexpected error occurred: ${err.message}`,
        undefined,
        true
      );
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSourceExpand = (msgId: string) => {
    setExpandedSources((prev) => ({
      ...prev,
      [msgId]: !prev[msgId],
    }));
  };

  const handleResetChat = () => {
    setMessages([
      createMessage(
        'assistant',
        'Conversation cleared. How can I assist your investing journey today?'
      ),
    ]);
  };

  const currentModelLabel =
    SUPPORTED_MODELS.find((m) => m.id === selectedModel)?.label.split('(')[0].trim() ||
    selectedModel;

  return (
    <>
      {/* ─── Floating Trigger Button (Bottom Right) ─── */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-5 right-5 z-40 bg-[#176B45] hover:bg-[#115335] active:scale-95 text-white shadow-xl hover:shadow-2xl rounded-full px-4 py-3 flex items-center gap-2.5 transition-all cursor-pointer border border-[#2B825B]/40 group"
          aria-label="Open Sprout AI Chatbot"
        >
          <div className="relative">
            <SproutMascot state="explaining" size={28} showShadow={false} />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#44B77F] ring-2 ring-white animate-pulse" />
          </div>
          <div className="text-left hidden sm:block">
            <div className="text-xs font-bold leading-none text-white">Sprout AI</div>
            <div className="text-[10px] text-[#A8D3BC] leading-none mt-0.5">RAG + Groq</div>
          </div>
        </button>
      )}

      {/* ─── Chat Drawer / Modal ─── */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 z-50 w-[94vw] sm:w-[400px] h-[580px] max-h-[85vh] bg-white rounded-2xl shadow-2xl border border-[#DCE8E0] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          
          {/* Header */}
          <div className="bg-[#17251D] text-white px-4 py-3 flex items-center justify-between border-b border-[#283C30] shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#25392D] flex items-center justify-center border border-[#385343]">
                <SproutMascot state="welcome" size={24} showShadow={false} />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-sm tracking-tight">Sprout AI</span>
                  <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-[#176B45] text-white">
                    RAG
                  </span>
                  <span className="text-[9px] font-medium text-[#86E4B1]">{currentModelLabel}</span>
                </div>
                <p className="text-[10px] text-[#A0B5A8]">Grounded in SEBI & Sprout Knowledge Base</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setShowSettings(!showSettings)}
                title="Configure Groq API Key & Model"
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all cursor-pointer ${
                  hasApiKey
                    ? 'text-[#44B77F] hover:bg-[#25392D]'
                    : 'text-[#F5A623] hover:bg-[#25392D] animate-pulse'
                }`}
              >
                <Key className="w-4 h-4" />
              </button>

              <button
                onClick={handleResetChat}
                title="Restart Chat"
                className="w-8 h-8 rounded-lg flex items-center justify-center text-[#A0B5A8] hover:text-white hover:bg-[#25392D] transition-all cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setIsOpen(false)}
                title="Close Chat"
                className="w-8 h-8 rounded-lg flex items-center justify-center text-[#A0B5A8] hover:text-white hover:bg-[#25392D] transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Settings Panel (Toggleable) */}
          {showSettings && (
            <div className="p-3.5 bg-[#F2F8F4] border-b border-[#D7E6DC] text-xs space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#17251D] flex items-center gap-1.5">
                  <Key className="w-3.5 h-3.5 text-[#176B45]" />
                  Groq LLM Configuration
                </span>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                  hasApiKey ? 'bg-[#E8F2EA] text-[#176B45]' : 'bg-[#FFF3D6] text-[#8C6200]'
                }`}>
                  {hasApiKey ? 'Key Active' : 'Missing Key'}
                </span>
              </div>

              <form onSubmit={handleSaveSettings} className="space-y-2">
                <div>
                  <label className="text-[10px] font-bold text-[#4B5E53] uppercase tracking-wider block mb-1">
                    Groq API Key
                  </label>
                  <input
                    type="password"
                    placeholder="gsk_..."
                    value={inputKey}
                    onChange={(e) => setInputKey(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-[#CFE1D6] bg-white text-xs text-[#17251D] outline-none focus:border-[#176B45] font-mono"
                  />
                  <p className="text-[10px] text-[#526359] mt-0.5">
                    Free keys at{' '}
                    <a
                      href="https://console.groq.com/keys"
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#176B45] underline font-semibold inline-flex items-center gap-0.5"
                    >
                      console.groq.com <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </p>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-[#4B5E53] uppercase tracking-wider block mb-1">
                    Model Selection
                  </label>
                  <select
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-[#CFE1D6] bg-white text-xs text-[#17251D] outline-none focus:border-[#176B45]"
                  >
                    {SUPPORTED_MODELS.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.label}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-1.5 bg-[#176B45] text-white font-bold rounded-lg hover:bg-[#115335] text-xs transition-colors cursor-pointer"
                >
                  Save Configuration
                </button>
              </form>
            </div>
          )}

          {/* Message Stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-[#FBFDFB]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                {/* Message Bubble */}
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed shadow-2xs ${
                    msg.sender === 'user'
                      ? 'bg-[#176B45] text-white rounded-br-xs'
                      : msg.isError
                      ? 'bg-[#FDF2F2] text-[#9E1C1C] border border-[#F8D7D7] rounded-bl-xs'
                      : 'bg-white text-[#17251D] border border-[#E2ECE5] rounded-bl-xs'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                </div>

                {/* RAG Retrieved Sources Accordion (Assistant only) */}
                {msg.sender === 'assistant' && msg.retrievedSources && msg.retrievedSources.length > 0 && (
                  <div className="mt-1.5 max-w-[88%] text-[10px]">
                    <button
                      onClick={() => toggleSourceExpand(msg.id)}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#EDF5F0] hover:bg-[#E2EFE7] text-[#176B45] font-semibold border border-[#D5E5DB] transition-colors cursor-pointer"
                    >
                      <BookOpen className="w-2.5 h-2.5" />
                      <span>
                        Retrieved Context ({msg.retrievedSources.length} sources)
                      </span>
                      {expandedSources[msg.id] ? (
                        <ChevronUp className="w-2.5 h-2.5" />
                      ) : (
                        <ChevronDown className="w-2.5 h-2.5" />
                      )}
                    </button>

                    {expandedSources[msg.id] && (
                      <div className="mt-1.5 p-2 rounded-lg bg-white border border-[#DCE8E0] space-y-2 text-left shadow-xs">
                        <span className="font-bold text-[#17251D] block text-[10px]">
                          📚 Knowledge Documents Injected into RAG Prompt:
                        </span>
                        {msg.retrievedSources.map((source, idx) => (
                          <div
                            key={idx}
                            className="p-1.5 rounded bg-[#F8FAF7] border border-[#E8F0EA]"
                          >
                            <div className="font-bold text-[#176B45] flex items-center justify-between">
                              <span>
                                {idx + 1}. {source.document.title}
                              </span>
                              <span className="text-[9px] text-[#71877A]">
                                Score: {source.score.toFixed(1)}
                              </span>
                            </div>
                            <p className="text-[#526359] text-[9.5px] mt-0.5 line-clamp-2">
                              {source.document.content}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                <span className="text-[9px] text-[#8AA294] mt-0.5 px-1">
                  {msg.timeString}
                </span>
              </div>
            ))}

            {/* Loading Indicator */}
            {isLoading && (
              <div className="flex items-center gap-2 text-xs text-[#526359] bg-white p-2.5 rounded-xl border border-[#E2ECE5] max-w-[200px]">
                <Sparkles className="w-3.5 h-3.5 text-[#176B45] animate-spin" />
                <span>Retrieving & synthesizing...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Preset Suggested Questions */}
          {messages.length <= 2 && (
            <div className="px-3 py-2 bg-[#F2F8F4] border-t border-[#E0ECE3] flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
              <span className="text-[10px] text-[#176B45] font-bold shrink-0 flex items-center gap-1">
                <Bot className="w-3 h-3" /> Quick questions:
              </span>
              {PRESET_QUESTIONS.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(q)}
                  className="text-[10px] font-medium px-2 py-1 bg-white hover:bg-[#E8F2EA] text-[#2C4436] rounded-md border border-[#CFE1D6] whitespace-nowrap cursor-pointer transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input Footer */}
          <div className="p-2.5 border-t border-[#E8F0EA] bg-white shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Ask about ₹100, KYC, DigiLocker..."
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                disabled={isLoading}
                className="flex-1 px-3 py-2 text-xs rounded-xl border border-[#DCE8E0] bg-[#F8FAF7] focus:bg-white focus:border-[#176B45] focus:ring-1 focus:ring-[#176B45] outline-none transition-all placeholder:text-[#8AA294]"
              />
              <button
                type="submit"
                disabled={!inputQuery.trim() || isLoading}
                className="w-8 h-8 rounded-xl bg-[#176B45] hover:bg-[#115335] disabled:opacity-40 disabled:cursor-not-allowed text-white flex items-center justify-center transition-all cursor-pointer shadow-xs shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

            <div className="flex items-center justify-between mt-1 text-[9px] text-[#8AA294] px-1">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-2.5 h-2.5 text-[#176B45]" />
                SEBI compliance grounded
              </span>
              <span>Groq Powered</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
