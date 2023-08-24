import { useState } from 'react';
import LLMChatCardList from './LLMChatCardList';
import LLMChatInput from "@/components/LLMChatInput";

export default function LLMChatContainer({defaultText, currentCode}) {
  
  const defaultContent = defaultText ? defaultText : 'How can I help? (e.g. "Give me the TLA+ code for spec to model a traffic light")';

  //local state of messages displayed in the chat
  const [chatMessages, setChatMessages] = useState([
    { role: 'assistant', content: defaultContent },
  ]);

  //helper function passed to LLMChatInput component so it can update local state of messages
  const handleNewMessage = (newChatMessage) => {
    setChatMessages((prevChatMessages) => [...prevChatMessages, newChatMessage]);
  };

  return (
    <ul role="list" className="divide-y divide-gray-200">
      <LLMChatCardList messages={chatMessages} />
      <LLMChatInput onNewMessage={handleNewMessage} currentCode={currentCode}/>
    </ul>
  );
}
