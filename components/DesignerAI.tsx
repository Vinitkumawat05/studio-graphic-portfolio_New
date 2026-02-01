
import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { MessageRole, ChatMessage } from '../types';
import { getDesignCritique } from '../services/geminiService';
import { Send, Bot, X, Command, Image as ImageIcon, Copy, Check, User } from 'lucide-react';
import { gsap } from 'gsap';
import { motion, AnimatePresence } from 'motion/react';
import ShinyText from './ShinyText';

const TypewriterText: React.FC<{ text: string; onComplete?: () => void }> = ({ text, onComplete }) => {
  const words = text.split(' ');
  
  return (
    <motion.div className="flex flex-wrap gap-x-1">
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, filter: 'blur(4px)', y: 5 }}
          animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          transition={{
            duration: 0.3,
            delay: i * 0.03,
            ease: [0.16, 1, 0.3, 1]
          }}
          onAnimationComplete={() => {
            if (i === words.length - 1 && onComplete) onComplete();
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

const DesignerAI: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [selectedImage, setSelectedImage] = useState<{data: string, mimeType: string} | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: MessageRole.MODEL, text: "Curator online. State your design query." }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [typingMessageId, setTypingMessageId] = useState<number | null>(null);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatWindowRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const inputAreaRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading, typingMessageId]);

  // Handle textarea auto-height
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [input]);

  useLayoutEffect(() => {
    if (isOpen && chatWindowRef.current) {
      const tl = gsap.timeline();
      
      gsap.set(chatWindowRef.current, { 
        transformOrigin: 'bottom right',
        scale: 0.8,
        opacity: 0,
        y: 40
      });
      gsap.set([headerRef.current, contentRef.current, inputAreaRef.current], {
        opacity: 0,
        y: 15
      });

      tl.to(chatWindowRef.current, {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power4.out'
      })
      .to([headerRef.current, contentRef.current, inputAreaRef.current], {
        opacity: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.1,
        ease: 'power2.out'
      }, '-=0.3');
    }
  }, [isOpen]);

  const handleToggle = () => {
    if (isOpen) {
      gsap.to(chatWindowRef.current, {
        scale: 0.9,
        opacity: 0,
        y: 20,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => setIsOpen(false)
      });
    } else {
      setIsOpen(true);
    }
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Data = (reader.result as string).split(',')[1];
      setSelectedImage({
        data: base64Data,
        mimeType: file.type
      });
      setPreviewUrl(URL.createObjectURL(file));
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setSelectedImage(null);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleCopy = (text: string, id: number) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSend = async () => {
    if ((!input.trim() && !selectedImage) || isLoading) return;

    const userMsg: ChatMessage = { 
      role: MessageRole.USER, 
      text: input || (selectedImage ? "Analyze this design." : ""),
      image: selectedImage || undefined
    };

    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    removeImage();
    setIsLoading(true);

    const response = await getDesignCritique(newMessages);
    const modelMsg: ChatMessage = { role: MessageRole.MODEL, text: response };
    const finalMessages = [...newMessages, modelMsg];
    
    setMessages(finalMessages);
    setIsLoading(false);
    setTypingMessageId(finalMessages.length - 1);
  };

  return (
    <>
      <div className="fixed bottom-8 right-8 z-[70] flex items-center gap-4">
        <button 
          onClick={handleToggle}
          className={`w-12 h-12 bg-white text-black rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 group ${isOpen ? 'rotate-[135deg] bg-white/10 text-white backdrop-blur-md' : 'animate-in slide-in-from-bottom-4 duration-700 delay-100'}`}
          aria-label="Toggle AI Curator"
        >
          <Command className="w-5 h-5" />
        </button>
      </div>

      {isOpen && (
        <div 
          ref={chatWindowRef}
          className="fixed bottom-24 right-8 z-[65] w-[calc(100%-4rem)] max-w-[340px] h-[520px] bg-[#050505] border border-white/10 rounded-[32px] shadow-[0_30px_100px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div ref={headerRef} className="p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                <Bot className="w-4 h-4 text-white/60" />
              </div>
              <div>
                <h4 className="text-[10px] font-black tracking-widest uppercase text-white/80">Design Curator</h4>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <div className="w-1 h-1 rounded-full bg-lime-400 animate-pulse"></div>
                  <p className="text-[8px] text-white/30 font-bold uppercase tracking-widest">Active_Node</p>
                </div>
              </div>
            </div>
            <button onClick={handleToggle} className="p-2 hover:bg-white/5 rounded-full transition-colors group">
              <X className="w-4 h-4 text-white/20 group-hover:text-white" />
            </button>
          </div>

          {/* Messages Area */}
          <div 
            ref={contentRef} 
            className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar"
            style={{ scrollBehavior: 'smooth' }}
          >
            <AnimatePresence initial={false}>
              {messages.map((msg, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className={`flex flex-col gap-2 ${msg.role === MessageRole.USER ? 'items-end' : 'items-start'}`}
                >
                  <div className={`flex items-center gap-2 px-1 ${msg.role === MessageRole.USER ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${msg.role === MessageRole.USER ? 'border-white/20 bg-white/5' : 'border-lime-400/30 bg-lime-400/5'}`}>
                      {msg.role === MessageRole.USER ? <User className="w-3 h-3 text-white/40" /> : <Bot className="w-3 h-3 text-lime-400" />}
                    </div>
                    <span className="text-[8px] font-black tracking-widest uppercase text-white/20">
                      {msg.role === MessageRole.USER ? 'User' : 'Curator'}
                    </span>
                    <button 
                      onClick={() => handleCopy(msg.text, i)}
                      className="p-1 hover:text-white text-white/10 transition-colors"
                    >
                      {copiedId === i ? <Check className="w-3 h-3 text-lime-400" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </div>

                  <motion.div 
                    className={`group relative max-w-[95%] space-y-2 p-4 rounded-[20px] text-[12px] leading-relaxed tracking-tight break-words overflow-hidden whitespace-pre-wrap ${
                    msg.role === MessageRole.USER 
                      ? 'bg-white text-black font-bold rounded-tr-none' 
                      : 'bg-white/5 border border-white/10 text-white/70 shadow-inner rounded-tl-none'
                  }`}>
                    {msg.image && (
                      <img 
                        src={`data:${msg.image.mimeType};base64,${msg.image.data}`} 
                        alt="Design context"
                        className="rounded-lg w-full h-auto max-h-32 object-cover border border-black/10 mb-2"
                      />
                    )}
                    {msg.role === MessageRole.MODEL && typingMessageId === i ? (
                      <TypewriterText 
                        text={msg.text} 
                        onComplete={() => setTypingMessageId(null)} 
                      />
                    ) : (
                      <p className="break-words">{msg.text}</p>
                    )}
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isLoading && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col gap-2 items-start"
              >
                <div className="flex items-center gap-2 px-1">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center border border-lime-400/30 bg-lime-400/5 relative">
                    <Bot className="w-3 h-3 text-lime-400" />
                    <motion.div 
                      animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                      className="absolute inset-0 rounded-full bg-lime-400"
                    />
                  </div>
                  <span className="text-[8px] font-black tracking-widest uppercase text-white/20">Curator</span>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-[20px] rounded-tl-none">
                  <ShinyText 
                    text="CONTEMPLATING..." 
                    speed={2} 
                    className="text-[9px] font-black uppercase tracking-[0.2em]" 
                  />
                </div>
              </motion.div>
            )}
            <div ref={scrollRef} />
          </div>

          {/* Input Area */}
          <div ref={inputAreaRef} className="p-6 pt-2 bg-gradient-to-t from-black to-transparent">
            {previewUrl && (
              <motion.div 
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="relative inline-block mb-3"
              >
                <img src={previewUrl} className="w-12 h-12 object-cover rounded-lg border border-white/20" alt="Preview" />
                <button 
                  onClick={removeImage}
                  className="absolute -top-1.5 -right-1.5 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                >
                  <X className="w-2 h-2" />
                </button>
              </motion.div>
            )}
            
            <div className="relative flex items-end bg-white/5 border border-white/10 rounded-xl px-4 py-2 transition-all focus-within:border-white/30">
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="p-2 hover:text-white text-white/20 transition-colors mb-0.5"
              >
                <ImageIcon className="w-4 h-4" />
              </button>
              
              <textarea 
                ref={textareaRef}
                rows={1}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder={selectedImage ? "Describe..." : "Inquiry..."}
                className="flex-1 bg-transparent border-none outline-none text-[12px] py-2 px-2 resize-none max-h-32 text-white placeholder:text-white/20 font-medium custom-scrollbar"
              />

              <input type="file" ref={fileInputRef} onChange={handleImageSelect} className="hidden" accept="image/*" />
              
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className={`p-2 transition-all mb-0.5 ${input || selectedImage ? 'text-lime-400 scale-110' : 'text-white/20'}`}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DesignerAI;
