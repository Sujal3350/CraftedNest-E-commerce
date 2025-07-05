import { useState, useEffect, useRef } from 'react';
import chatbot2 from '../../assets/chatbot2.png';
import { API_BASE_URL } from '../../Services/api'; // Adjust the import path as necessary

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  // Sample welcome message
  useEffect(() => {
    const welcomeMessage = {
      role: 'assistant',
      content: "Hello! I'm your AI assistant. How can I help you today?"
    };
    setMessages([welcomeMessage]);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetchGeminiResponse(input);
      const botMessage = { role: 'assistant', content: response };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error. Please try again later.' 
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const fetchGeminiResponse = async (prompt) => {
    const response = await fetch(`${API_BASE_URL}/api/gemini`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) throw new Error('API request failed');

    const data = await response.json();
    if (data.error) throw new Error(data.error);
    return data.response;
  };

  return (
    
    <div className="w-full mx-auto p-4 sm:p-6 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 min-h-screen">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6 min-h-[80vh]">
        {/* Left Side - AI Image with Info */}
        <div className="hidden md:flex md:w-2/5 flex-col">
          <div 
            className="flex-1 backdrop-blur-sm bg-cover bg-center rounded-2xl shadow-xl overflow-hidden"
            style={{ backgroundImage: `url(${chatbot2})` }}
          >
            <div className="  h-full w-full p-6 flex flex-col justify-end">
              
              <div className="bg-white dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-90 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 dark:text-white mb-2">Capabilities</h3>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                    Answer complex questions
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                    Provide creative ideas
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                    Help with coding problems
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Chat */}
        <div className="w-full md:w-3/5 flex flex-col bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 dark:from-orange-600 dark:to-orange-700 p-4 text-white">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-white dark:bg-gray-200 flex items-center justify-center mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold font-poppins">AI Assistant</h2>
                <p className="text-xs text-orange-100">{isLoading ? 'Typing...' : 'Online'}</p>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-lg transition-all duration-200 ${
                    message.role === 'user'
                      ? 'bg-orange-500 text-white rounded-tr-none'
                      : 'bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-tl-none shadow-sm'
                  }`}
                >
                  <p className={`text-sm sm:text-base ${message.role === 'user' ? 'text-white' : 'text-gray-700 dark:text-gray-300'} font-poppins`}>
                    {message.content}
                  </p>
                  <div className={`text-xs mt-1 ${message.role === 'user' ? 'text-orange-200' : 'text-gray-500 dark:text-gray-400'} text-right`}>
                    {message.role === 'user' ? 'You' : 'AI'} • {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-gray-700 p-3 rounded-lg rounded-tl-none shadow-sm">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <div className="flex items-center space-x-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                className="flex-1 p-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400 placeholder:text-gray-500 dark:placeholder:text-gray-400 font-poppins bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                placeholder="Type your message..."
                disabled={isLoading}
                autoFocus
              />
              <button
                onClick={sendMessage}
                disabled={isLoading || !input.trim()}
                className={`p-3 rounded-full transition-all duration-200 ${
                  isLoading || !input.trim()
                    ? 'bg-gray-300 dark:bg-gray-600 text-gray-500'
                    : 'bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700 text-white'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
              AI may produce inaccurate information. Consider verifying important facts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;