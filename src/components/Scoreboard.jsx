import React from 'react';

const Scoreboard = ({ score, total, onRetry }) => {
  const percentage = ((score / total) * 100).toFixed(0);
  const message = score === total ? '🎉 You Won!' : '😞 You Lost!';

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-8 rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold mb-4">Quiz Finished</h2>
      <p className="text-lg">Your score is: {percentage}%</p>
      <p className="text-lg mt-2">{message}</p>
      <p className="text-lg mt-4">Would you like to retry this quiz?</p>
      <div className="flex mt-4 gap-4">
        <button onClick={() => onRetry(true)} className="bg-blue-600 text-white px-6 py-2 rounded-lg">Yes</button>
        <button onClick={() => onRetry(false)} className="bg-gray-600 text-white px-6 py-2 rounded-lg">No</button>
      </div>
    </div>
  );
};

export default Scoreboard;
