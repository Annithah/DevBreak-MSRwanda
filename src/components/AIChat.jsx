import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const AIChat = () => {
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: "Hello! I'm your AI health assistant. I can help answer general health questions and provide preliminary advice. How can I help you today?",
            sender: 'ai',
            timestamp: new Date()
        }
    ]);
    const [inputMessage, setInputMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!inputMessage.trim()) return;

        const userMessage = {
            id: Date.now(),
            text: inputMessage,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputMessage('');
        setLoading(true);

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('/api/patients/chat', {
                message: inputMessage
            }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            const aiMessage = {
                id: Date.now() + 1,
                text: response.data.response,
                sender: 'ai',
                timestamp: new Date()
            };

            setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
            const errorMessage = {
                id: Date.now() + 1,
                text: "I'm sorry, I'm having trouble responding right now. Please try again later or contact a doctor directly.",
                sender: 'ai',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setLoading(false);
        }
    };

    const quickQuestions = [
        "I have a headache, what should I do?",
        "What are the symptoms of malaria?",
        "How can I prevent common cold?",
        "When should I see a doctor?",
        "What's a healthy diet for diabetes?"
    ];

    const handleQuickQuestion = (question) => {
        setInputMessage(question);
    };

    return (
        <div className="ai-chat">
            <div className="chat-header">
                <h3>
                    <i className="fas fa-robot"></i>
                    AI Health Assistant
                </h3>
                <p>Get instant health advice and information</p>
            </div>

            <div className="chat-container">
                <div className="messages-container">
                    {messages.map(message => (
                        <div key={message.id} className={`message ${message.sender}`}>
                            <div className="message-avatar">
                                {message.sender === 'ai' ? 
                                    <i className="fas fa-robot"></i> : 
                                    <i className="fas fa-user"></i>
                                }
                            </div>
                            <div className="message-content">
                                <div className="message-text">
                                    {message.text}
                                </div>
                                <div className="message-time">
                                    {message.timestamp.toLocaleTimeString()}
                                </div>
                            </div>
                        </div>
                    ))}
                    
                    {loading && (
                        <div className="message ai">
                            <div className="message-avatar">
                                <i className="fas fa-robot"></i>
                            </div>
                            <div className="message-content">
                                <div className="typing-indicator">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <div className="quick-questions">
                    <h4>Quick Questions:</h4>
                    <div className="questions-grid">
                        {quickQuestions.map((question, index) => (
                            <button 
                                key={index}
                                className="quick-question-btn"
                                onClick={() => handleQuickQuestion(question)}
                            >
                                {question}
                            </button>
                        ))}
                    </div>
                </div>

                <form onSubmit={sendMessage} className="chat-input-form">
                    <div className="input-container">
                        <input
                            type="text"
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            placeholder="Ask me about your health concerns..."
                            disabled={loading}
                        />
                        <button type="submit" disabled={loading || !inputMessage.trim()}>
                            <i className="fas fa-paper-plane"></i>
                        </button>
                    </div>
                </form>
            </div>

            <div className="chat-disclaimer">
                <p>
                    <i className="fas fa-exclamation-triangle"></i>
                    This AI assistant provides general health information only. 
                    Always consult with a qualified healthcare provider for medical advice.
                </p>
            </div>
        </div>
    );
};

export default AIChat;