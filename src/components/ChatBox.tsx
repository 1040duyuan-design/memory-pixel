import React, { useState, useEffect, useRef } from 'react';
import type { PixelCharacter, ChatMessage } from '../types';
import './ChatBox.css';

interface Props {
  character: PixelCharacter;
}

const ChatBox: React.FC<Props> = ({ character }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 欢迎消息
    if (messages.length === 0) {
      const welcomeMsg: ChatMessage = {
        id: 'welcome',
        sender: 'character',
        content: `你好啊，今天过得怎么样？`,
        timestamp: Date.now(),
      };
      setMessages([welcomeMsg]);
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = () => {
    if (!inputText.trim()) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      content: inputText.trim(),
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, newMessage]);
    setInputText('');

    // 简单模拟回复，基于语录随机回复
    setTimeout(() => {
      generateResponse([...messages, newMessage]);
    }, 800);
  };

  const generateResponse = (currentMessages: ChatMessage[]) => {
    let response = '';

    if (character.favoriteQuotes.length > 0 && Math.random() > 0.3) {
      // 随机说出一句语录
      const randomQuote = character.favoriteQuotes[Math.floor(Math.random() * character.favoriteQuotes.length)];
      response = randomQuote;
    } else {
      // 简单回复基于关键词
      const lastMessage = currentMessages[currentMessages.length - 1].content.toLowerCase();
      
      if (lastMessage.includes('想你') || lastMessage.includes('怀念')) {
        response = '我也一直想你啊，孩子';
      } else if (lastMessage.includes('天气') || lastMessage.includes('下雨')) {
        response = '今天天气凉快，正好在家歇着';
      } else if (lastMessage.includes('吃饭') || lastMessage.includes('吃了吗')) {
        response = '刚吃完，今天吃得挺香';
      } else if (lastMessage.includes('晚安') || lastMessage.includes('睡觉')) {
        response = '晚安，早点休息';
      } else {
        const defaultReplies = [
          '是啊，说的对',
          '慢慢来，不急',
          '挺好的，好好过日子',
          '开心点，一切都会好的',
          '我一直都在这儿呢',
        ];
        response = defaultReplies[Math.floor(Math.random() * defaultReplies.length)];
      }
    }

    const responseMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'character',
      content: response,
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, responseMsg]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chat-box">
      <div className="chat-messages">
        {messages.map(msg => (
          <div key={msg.id} className={`message message-${msg.sender}`}>
            <div className="message-bubble">{msg.content}</div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="chat-input">
        <textarea
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="和他说说话吧..."
          rows={1}
        />
        <button onClick={handleSend} disabled={!inputText.trim()}>发送</button>
      </div>
    </div>
  );
};

export default ChatBox;
