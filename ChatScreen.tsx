
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  time: string;
  isMe: boolean;
}

interface Chat {
  id: string;
  name: string;
  lastMsg: string;
  time: string;
  unread: number;
  avatar: string;
  isGroup: boolean;
  messages: Message[];
}

const ChatScreen: React.FC = () => {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [chats, setChats] = useState<Chat[]>([
    { 
      id: 'c1', 
      name: 'حلقة تصحيح التلاوة (مجموعة)', 
      lastMsg: 'يا شباب لا تنسوا مراجعة أحكام المد', 
      time: '١٠:٣٠ ص', 
      unread: 3, 
      avatar: '🕌',
      isGroup: true,
      messages: [
        { id: 'm1', senderId: 't1', senderName: 'الشيخ أحمد', text: 'السلام عليكم ورحمة الله وبركاته', time: '٠٩:٠٠ ص', isMe: false },
        { id: 'm2', senderId: 'u1', senderName: 'أنا', text: 'وعليكم السلام يا شيخ', time: '٠٩:٠٥ ص', isMe: true },
        { id: 'm3', senderId: 't1', senderName: 'الشيخ أحمد', text: 'يا شباب لا تنسوا مراجعة أحكام المد للجلسة القادمة', time: '١٠:٣٠ ص', isMe: false },
      ]
    },
    { 
      id: 'c2', 
      name: 'الشيخ أحمد محمود', 
      lastMsg: 'شكراً يا شيخ على التوضيح', 
      time: 'أمس', 
      unread: 0, 
      avatar: '👳‍♂️',
      isGroup: false,
      messages: [
        { id: 'm4', senderId: 'u1', senderName: 'أنا', text: 'هل يمكنني مراجعة سورة الملك اليوم؟', time: '٠٨:٠٠ م', isMe: true },
        { id: 'm5', senderId: 't1', senderName: 'الشيخ أحمد', text: 'بالتأكيد، يسعدني ذلك جداً', time: '٠٨:١٠ م', isMe: false },
      ]
    },
    { 
      id: 'c3', 
      name: 'عمر فاروق', 
      lastMsg: 'هل يمكنني التسميع غداً؟', 
      time: 'الاثنين', 
      unread: 1, 
      avatar: '👤',
      isGroup: false,
      messages: []
    }
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [selectedChatId, chats, isTyping]);

  const activeChat = chats.find(c => c.id === selectedChatId);

  const handleSendMessage = async () => {
    if (!inputText.trim() || !selectedChatId) return;

    const messageText = inputText;
    setInputText('');

    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: 'me',
      senderName: 'أنا',
      text: messageText,
      time: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
      isMe: true
    };

    // Update local state
    setChats(prev => prev.map(c => 
      c.id === selectedChatId 
        ? { ...c, messages: [...c.messages, newMessage], lastMsg: messageText, time: 'الآن' } 
        : c
    ));

    // If it's a direct chat with the teacher, trigger Gemini response
    if (activeChat && !activeChat.isGroup && activeChat.id === 'c2') {
      setIsTyping(true);
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: `You are an expert Quran teacher named Sheikh Ahmed. A student messaged you: "${messageText}". Reply in a very helpful, encouraging, professional, and brief manner in Arabic (Sudanese or standard Arabic appropriate for a teacher).`,
        });

        const teacherReply: Message = {
          id: (Date.now() + 1).toString(),
          senderId: 'teacher',
          senderName: 'الشيخ أحمد محمود',
          text: response.text || 'بارك الله فيك يا بني.',
          time: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
          isMe: false
        };

        setChats(prev => prev.map(c => 
          c.id === selectedChatId 
            ? { ...c, messages: [...c.messages, teacherReply], lastMsg: teacherReply.text, time: 'الآن' } 
            : c
        ));
      } catch (error) {
        console.error("Gemini Error:", error);
      } finally {
        setIsTyping(false);
      }
    }
  };

  if (selectedChatId && activeChat) {
    return (
      <div className="fixed inset-0 bg-slate-50 z-[100] flex flex-col max-w-md mx-auto border-x border-slate-200 animate-in slide-in-from-left duration-300">
        {/* Chat Header */}
        <div className="bg-emerald-800 text-white p-4 flex items-center gap-3 shadow-lg">
          <button onClick={() => setSelectedChatId(null)} className="text-xl p-1 hover:bg-emerald-700 rounded-lg">🔙</button>
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-xl border border-white/10">
            {activeChat.avatar}
          </div>
          <div>
            <h3 className="font-bold text-sm leading-tight">{activeChat.name}</h3>
            <p className="text-[10px] text-emerald-200">
              {isTyping ? 'جاري الكتابة...' : activeChat.isGroup ? `${activeChat.messages.length} مشارك` : 'متصل الآن'}
            </p>
          </div>
        </div>

        {/* Messages Thread */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-fixed">
          {activeChat.messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full opacity-40 text-center space-y-2">
              <span className="text-4xl">👋</span>
              <p className="text-xs font-bold">ابدأ المحادثة مع {activeChat.name}</p>
            </div>
          )}
          
          {activeChat.messages.map((m) => (
            <div key={m.id} className={`flex ${m.isMe ? 'justify-start' : 'justify-end'}`}>
              <div className={`max-w-[80%] p-3 rounded-2xl shadow-sm ${
                m.isMe 
                  ? 'bg-emerald-600 text-white rounded-tr-none' 
                  : 'bg-white border border-slate-100 text-slate-800 rounded-tl-none'
              }`}>
                {activeChat.isGroup && !m.isMe && (
                  <p className="text-[9px] font-bold text-emerald-600 mb-1">{m.senderName}</p>
                )}
                <p className="text-sm leading-relaxed">{m.text}</p>
                <p className={`text-[8px] mt-1 text-left ${m.isMe ? 'text-emerald-200' : 'text-slate-400'}`}>
                  {m.time}
                </p>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-end">
              <div className="bg-white border border-slate-100 p-3 rounded-2xl rounded-tl-none shadow-sm flex gap-1 items-center">
                <div className="w-1 h-1 bg-slate-300 rounded-full animate-bounce"></div>
                <div className="w-1 h-1 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-1 h-1 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="bg-white p-4 border-t border-slate-200 flex items-center gap-3">
          <button className="text-xl opacity-30 hover:opacity-100 transition-opacity">📎</button>
          <div className="flex-1 relative">
            <input 
              type="text" 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="اكتب رسالتك هنا..." 
              className="w-full bg-slate-100 border-none p-3.5 pr-4 rounded-2xl text-sm focus:ring-2 focus:ring-emerald-500/20"
            />
          </div>
          <button 
            onClick={handleSendMessage}
            disabled={!inputText.trim()}
            className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl transition-all shadow-lg ${
              inputText.trim() ? 'bg-emerald-600 text-white shadow-emerald-600/20 scale-100' : 'bg-slate-200 text-slate-400 scale-90'
            }`}
          >
            🚀
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-bold text-slate-800 font-amiri">المحادثات</h2>
        <button className="bg-emerald-100 text-emerald-700 p-2 px-4 rounded-xl text-xs font-bold shadow-sm active:scale-95 transition-transform">
          رسالة جديدة +
        </button>
      </div>

      <div className="relative mb-6 group">
        <input 
          type="text" 
          placeholder="بحث في المحادثات..." 
          className="w-full bg-white border border-slate-200 p-4 pr-12 rounded-2xl text-sm focus:outline-none focus:border-emerald-500 shadow-sm transition-all focus:shadow-md"
        />
        <span className="absolute right-4 top-4 text-slate-300 group-focus-within:text-emerald-500 transition-colors">🔍</span>
      </div>

      <div className="space-y-3">
        {chats.map(chat => (
          <div 
            key={chat.id} 
            onClick={() => setSelectedChatId(chat.id)}
            className="bg-white p-4 rounded-2xl border border-slate-100 flex items-center gap-4 hover:border-emerald-200 hover:bg-emerald-50/20 transition-all cursor-pointer active:scale-[0.98] shadow-sm"
          >
            <div className="relative">
              <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-2xl border border-slate-100 shadow-inner">
                {chat.avatar}
              </div>
              {!chat.isGroup && (
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></div>
              )}
            </div>
            
            <div className="flex-1 overflow-hidden">
              <div className="flex justify-between items-center mb-1">
                <h4 className="font-bold text-slate-800 text-sm truncate">{chat.name}</h4>
                <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap">{chat.time}</span>
              </div>
              <div className="flex justify-between items-center gap-2">
                <p className="text-xs text-slate-500 truncate flex-1 leading-tight">
                  {chat.lastMsg}
                </p>
                {chat.unread > 0 && (
                  <div className="bg-emerald-600 text-white px-2 py-0.5 min-w-[20px] rounded-full flex items-center justify-center text-[9px] font-bold shadow-lg shadow-emerald-600/20">
                    {chat.unread}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Contacts */}
      <section className="pt-4">
        <h3 className="font-bold text-slate-700 text-xs mb-3 mr-1 uppercase tracking-wider opacity-50">جهات اتصال سريعة</h3>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {['👤 زيد', '👤 يوسف', '👳‍♂️ الشيخ محمود', '👤 حمزة'].map((contact, i) => (
            <div key={i} className="flex-shrink-0 flex flex-col items-center gap-2">
              <div className="w-14 h-14 bg-white border border-slate-100 rounded-2xl flex items-center justify-center text-xl shadow-sm">
                {contact.split(' ')[0]}
              </div>
              <span className="text-[10px] font-bold text-slate-600">{contact.split(' ')[1]}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ChatScreen;
