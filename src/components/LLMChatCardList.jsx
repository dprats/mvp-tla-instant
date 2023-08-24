import React from 'react';
import LLMChatCard from './LLMChatCard';

const LLMChatCardList = ({ messages }) => (
  <div>
    {messages.map((message, index) => (
      <LLMChatCard message={message} key={index} />
    ))}
  </div>
);

export default LLMChatCardList;


