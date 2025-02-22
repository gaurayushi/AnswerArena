import React, { useState } from 'react';

const Question = ({ question, handleAnswer }) => {
  const [userInput, setUserInput] = useState('');

  const handleSubmit = () => {
    handleAnswer(userInput);
    setUserInput('');
  };

  return (
    <div className="flex flex-col items-start mt-4">
      {/* Removed the black text question display */}
      {question.type === 'mcq' ? (
        question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(option)}
            className="m-1 px-4 py-2 bg-blue-400 text-white rounded-full hover:bg-blue-600"
          >
            {index + 1}. {option}
          </button>
        ))
      ) : (
        <div className="flex flex-col mt-2 w-full">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Enter your answer"
            className="p-2 rounded-lg border w-full mb-2"
          />
          <button
            onClick={handleSubmit}
            className="bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
          >
            Submit Answer
          </button>
        </div>
      )}
    </div>
  );
};

export default Question;
