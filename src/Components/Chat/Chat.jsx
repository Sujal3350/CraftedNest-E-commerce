import { useState, useEffect, useRef } from 'react';
import chatbot2 from '../../assets/chatbot2.png';
function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

  // Scroll to the latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Call Gemini backend API
      const response = await fetchGeminiResponse(input);
      const botMessage = { role: 'assistant', content: response };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = { role: 'assistant', content: 'Sorry, something went wrong.' };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to call your backend proxy for Gemini API
  const fetchGeminiResponse = async (prompt) => {
    const response = await fetch('http://localhost:3000/api/gemini', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      throw new Error('API request failed');
    }

    const data = await response.json();
    if (data.error) throw new Error(data.error);
    return data.response;
  };

  return (
  <div className="w-full max-w-6xl mx-auto p-4 sm:p-6">
    <div className="flex gap-3 h-[calc(100vh-200px)]">
      {/* Left Side - AI Image */}
      <div className="w-2/4  bg-cover bg-center relative" style={{
        backgroundImage: 'url('+chatbot2+')',
      }}>
      
      </div>
      {/* Right Side - Chat */}
      <div className="w-1/2 flex flex-col bg-white rounded-lg shadow-2xl p-6 sm:p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center font-poppins">Chat with AI</h2>
        <div className="flex-1 overflow-y-auto mb-0 bg-gradient-to-b from-[#F7F7F7] to-white p-4 sm:p-6 space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`max-w-[80%] p-2 rounded-lg ${
                message.role === 'user'
                  ? 'bg-orange-50 ml-auto text-right'
                  : 'bg-white border-l-4 border-orange-700 mr-auto text-left'
              }`}
            >
              <p className="text-sm sm:text-base text-gray-700 font-poppins">{message.content}</p>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
        <div className="flex space-x-4 mt-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder:text-gray-500 font-poppins"
            placeholder="Type your message..."
            disabled={isLoading}
          />
          <button
            onClick={sendMessage}
            className="bg-orange-500 text-white p-2 rounded hover:bg-orange-600 disabled:bg-orange-300 font-poppins"
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  </div>
);
}

export default Chat;
