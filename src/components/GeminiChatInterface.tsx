
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage as ChatMessageType } from '../types';
import { geminiService } from '../services/geminiService';
import { localStorageDB, ChatHistory } from '../services/localStorageDB';
import ChatMessage from './ChatMessage';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, Bot, Sparkles, MessageCircle, Zap } from 'lucide-react';

const GeminiChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentChatId] = useState(`chat_${Date.now()}`);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Load welcome message with more personality
    addBotMessage("✨ Hello! I'm your AI assistant ready to help you with anything you need. Ask me questions, get creative ideas, or just have a conversation - I'm here for you! 🚀");
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const addBotMessage = (content: string, isTyping: boolean = false) => {
    const message: ChatMessageType = {
      id: `bot_${Date.now()}`,
      type: 'bot',
      content,
      timestamp: new Date(),
      isTyping,
    };
    setMessages(prev => [...prev, message]);
  };

  const addUserMessage = (content: string) => {
    const message: ChatMessageType = {
      id: `user_${Date.now()}`,
      type: 'user',
      content,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, message]);
  };

  const saveChatToHistory = async (userMsg: string, botMsg: string) => {
    const chatHistory: ChatHistory = {
      id: currentChatId,
      messages: [
        { role: 'user', content: userMsg, timestamp: new Date() },
        { role: 'assistant', content: botMsg, timestamp: new Date() }
      ],
      createdAt: new Date()
    };
    await localStorageDB.saveChatHistory(chatHistory);
  };

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    addUserMessage(userMessage);
    setIsLoading(true);

    try {
      const response = await geminiService.generateResponse(userMessage);
      addBotMessage(response.text);
      await saveChatToHistory(userMessage, response.text);
    } catch (error) {
      addBotMessage('🔧 I apologize, but I encountered a technical issue. Please ensure the backend service is running on port 8000 or try again in a moment.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      <div className="container mx-auto px-4 py-6">
        {/* Reduced max-width to max-w-lg to make it even smaller and more compact */}
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-4">
            <div className="flex items-center justify-center mb-2">
              <Sparkles className="w-5 h-5 text-purple-600 mr-2" />
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
                AI Chat Assistant
              </h1>
              <MessageCircle className="w-5 h-5 text-purple-600 ml-2" />
            </div>
            <p className="text-gray-600 text-sm">Your intelligent conversation partner</p>
          </div>

          {/* Reduced height to h-[320px] for a more compact chatbot */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-purple-200 h-[320px] flex flex-col overflow-hidden">
            <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 p-3">
              <h3 className="text-white font-semibold text-sm flex items-center">
                <Bot className="w-4 h-4 mr-2" />
                Chat Assistant
                <Zap className="w-3 h-3 ml-auto animate-pulse" />
              </h3>
            </div>

            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}
              {isLoading && (
                <div className="flex items-center space-x-2 text-purple-600 animate-pulse">
                  <Bot className="w-4 h-4" />
                  <span className="text-xs">Thinking...</span>
                  <div className="flex space-x-1">
                    <div className="w-1 h-1 bg-purple-600 rounded-full animate-bounce"></div>
                    <div className="w-1 h-1 bg-purple-600 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-1 h-1 bg-purple-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-3 border-t border-purple-100 bg-gradient-to-r from-purple-50 to-pink-50">
              <div className="flex space-x-2">
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Type your message here..."
                  className="flex-1 min-h-[35px] max-h-[70px] resize-none border-2 border-purple-200 focus:border-purple-500 rounded-lg text-sm bg-white/80"
                  disabled={isLoading}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!input.trim() || isLoading}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-3 py-2 rounded-lg font-medium shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center"
                >
                  <Send className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeminiChatInterface;
