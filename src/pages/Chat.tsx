import React, { useState, useEffect, useRef } from 'react';
import { Send, MessageCircle, Trash2, Bot, User } from 'lucide-react';
import { useFarmer } from '../context/FarmerContext';
import { chatAPI } from '../services/api';
import { Message } from '../types';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import ErrorMessage from '../components/Common/ErrorMessage';

const Chat: React.FC = () => {
  const { currentFarmer } = useFarmer();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currentFarmer) {
      loadChatHistory();
    }
  }, [currentFarmer]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const loadChatHistory = async () => {
    if (!currentFarmer) return;

    try {
      setIsLoadingHistory(true);
      const response = await chatAPI.getHistory(currentFarmer.farmerId, 50);
      if (response.data.success) {
        setMessages(response.data.data);
      }
    } catch (err: any) {
      console.error('Failed to load chat history:', err);
    } finally {
      setIsLoadingHistory(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentFarmer || !newMessage.trim()) return;

    const userMessage = newMessage.trim();
    setNewMessage('');
    setError('');

    // Add user message to UI immediately
    const tempUserMessage: Message = {
      role: 'user',
      content: userMessage,
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, tempUserMessage]);

    try {
      setIsLoading(true);
      const response = await chatAPI.sendMessage(currentFarmer.farmerId, userMessage);
      
      if (response.data.success) {
        // Add assistant response
        const assistantMessage: Message = {
          role: 'assistant',
          content: response.data.data.reply,
          timestamp: response.data.data.timestamp
        };
        setMessages(prev => [...prev, assistantMessage]);
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to send message');
      // Remove the user message if sending failed
      setMessages(prev => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = async () => {
    if (!currentFarmer || !confirm('Are you sure you want to clear all chat history?')) return;

    try {
      await chatAPI.clearHistory(currentFarmer.farmerId);
      setMessages([]);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to clear chat history');
    }
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!currentFarmer) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Please complete onboarding to use the AI assistant.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-[600px] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="bg-primary-100 p-2 rounded-lg">
              <Bot className="h-6 w-6 text-primary-600" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Krishi Sakhi AI Assistant</h1>
              <p className="text-sm text-gray-600">Your farming companion - കൃഷി സഖി</p>
            </div>
          </div>
          {messages.length > 0 && (
            <button
              onClick={handleClearHistory}
              className="p-2 text-gray-400 hover:text-red-600 transition-colors"
              title="Clear chat history"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {isLoadingHistory ? (
            <div className="flex justify-center py-8">
              <LoadingSpinner />
            </div>
          ) : messages.length === 0 ? (
            <div className="text-center py-12">
              <MessageCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Welcome to Krishi Sakhi AI Assistant!
              </h3>
              <p className="text-gray-600 mb-6">
                Ask me anything about farming, crops, weather, or agricultural practices. 
                I can help you in both Malayalam and English.
              </p>
              <div className="bg-primary-50 p-4 rounded-lg text-left max-w-md mx-auto">
                <p className="text-sm text-primary-800 font-medium mb-2">Try asking:</p>
                <ul className="text-sm text-primary-700 space-y-1">
                  <li>• "How do I control pests in my rice field?"</li>
                  <li>• "When should I plant coconut saplings?"</li>
                  <li>• "What fertilizer is best for banana plants?"</li>
                  <li>• "എന്റെ കുരുമുളക് ചെടിയിൽ രോഗം വന്നിട്ടുണ്ട്"</li>
                </ul>
              </div>
            </div>
          ) : (
            messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {message.role === 'assistant' && (
                      <Bot className="h-4 w-4 mt-0.5 text-primary-600" />
                    )}
                    {message.role === 'user' && (
                      <User className="h-4 w-4 mt-0.5 text-white" />
                    )}
                    <div className="flex-1">
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      {message.timestamp && (
                        <p className={`text-xs mt-1 ${
                          message.role === 'user' ? 'text-primary-200' : 'text-gray-500'
                        }`}>
                          {formatTimestamp(message.timestamp)}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 px-4 py-3 rounded-lg max-w-xs">
                <div className="flex items-center space-x-2">
                  <Bot className="h-4 w-4 text-primary-600" />
                  <LoadingSpinner size="sm" />
                  <span className="text-sm text-gray-600">Thinking...</span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Error Message */}
        {error && (
          <div className="px-6 pb-2">
            <ErrorMessage message={error} />
          </div>
        )}

        {/* Input */}
        <div className="p-6 border-t border-gray-200">
          <form onSubmit={handleSendMessage} className="flex space-x-4">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Ask me anything about farming... (Malayalam or English)"
              className="flex-1 input-field"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !newMessage.trim()}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              <Send className="h-5 w-5" />
              <span className="hidden sm:inline">Send</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;