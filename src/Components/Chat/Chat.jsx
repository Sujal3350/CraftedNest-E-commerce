
import { useState, useEffect, useRef } from 'react';
import chatbot2 from '../../assets/chatbot2.png';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

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
      const errorMessage = { role: 'assistant', content: 'Sorry, something went wrong.' };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchGeminiResponse = async (prompt) => {
    const response = await fetch('https://craftednest.onrender.com/api/gemini', {
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
    <div className="w-full  mx-auto p-4 sm:p-6 bg-white dark:bg-gray-700">
      <div className="flex flex-col md:flex-row gap-3 min-h-[80vh]">
        {/* Left Side - AI Image */}
        <div
          className="hidden md:block md:w-1/2 bg-cover bg-center rounded-lg"
          style={{ backgroundImage: `url(${chatbot2})` }}
        ></div>

        {/* Right Side - Chat */}
        <div className="w-full md:w-1/2 flex flex-col bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-4 sm:p-6 h-130">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center font-poppins">Chat with AI</h2>
          <div className="flex-1 overflow-y-auto bg-gradient-to-b from-[#F7F7F7] dark:from-gray-800 to-white dark:to-gray-900 p-4 sm:p-6 space-y-4 rounded">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`max-w-[80%] p-2 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-orange-50 dark:bg-orange-900 ml-auto text-right'
                    : 'bg-white dark:bg-gray-700 border-l-4 border-orange-700 dark:border-orange-500 mr-auto text-left'
                }`}
              >
                <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 font-poppins">{message.content}</p>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
          <div className="flex w-full object-contain mt-4 space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-orange-400 placeholder:text-gray-500 dark:placeholder:text-gray-400 font-poppins bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
              placeholder="Type your message..."
              disabled={isLoading}
            />
            <button
              onClick={sendMessage}
              className="bg-orange-500 dark:bg-orange-600 w-fit text-white px-2 py-2 rounded hover:bg-orange-600 dark:hover:bg-orange-700 disabled:bg-orange-300 dark:disabled:bg-orange-500 font-poppins"
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
