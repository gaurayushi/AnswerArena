import React from 'react';

const ChatBubble = ({ text, isUser, type }) => {
  let bubbleStyle = 'bg-gray-200 text-black';

  if (type === 'correct') bubbleStyle = 'bg-green-500 text-white';
  else if (type === 'incorrect') bubbleStyle = 'bg-red-500 text-white';
  else if (type === 'answer') bubbleStyle = 'bg-blue-500 text-white';
  else if (type === 'question') bubbleStyle = 'bg-yellow-300 text-black';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} my-2`}>
      <div
        className={`max-w-xs p-4 rounded-2xl shadow-lg transition-all duration-300 ${bubbleStyle}`}
      >
        {text}
      </div>
    </div>
  );
};

export default ChatBubble;
