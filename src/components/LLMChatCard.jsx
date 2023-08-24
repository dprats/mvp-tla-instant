import React from 'react';
import MonacoTextEditorTLA from './MonacoTextEditorTLA';

// import SMALL_TLA from '../utils/constants';

const LLMChatCard = ({ message, index }) => {
  const tlaRegex = /<tla>([\s\S]*?)<\/tla>/i;
  const match = message.content.match(tlaRegex);
  const tlaContent = match ? match[1] : '';
  const otherContent = message.content.replace(tlaRegex, '');

  // const tlaContent = ''; //parseForTLA(message.content);

  return (
      <div>
        <div key={index} className={`p-4 m-2 border rounded shadow ${message.type}`} style={{backgroundColor: message.role === 'user' ? '#cbf3f0' : message.role === 'assistant' ? '#ffbf69' : 'white'}}>
          <h2 className="text-xl font-bold">{message.role}</h2>
          {tlaContent !== '' && <MonacoTextEditorTLA readOnly={true} content={tlaContent}/>}
          <p>{otherContent}</p>
        </div>
      </div>
    ) 
};

export default LLMChatCard;
