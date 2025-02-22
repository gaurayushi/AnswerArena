import React, { useEffect, useState } from 'react';
import { getAttempts, deleteAttempt } from '../utils/indexedDB';

const AttemptHistory = ({ refreshTrigger }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    async function fetchHistory() {
      const attempts = await getAttempts();
      setHistory(attempts);
    }
    fetchHistory();
  }, [refreshTrigger]); // Refresh when new attempt is saved

  const handleDelete = async (attemptId) => {
    if (window.confirm('Are you sure you want to delete this attempt?')) {
      await deleteAttempt(attemptId);
      setHistory((prev) => prev.filter((attempt) => attempt.id !== attemptId));
    }
  };

  return (
    <div>
      {history.length === 0 ? (
        <p className="text-gray-500 text-center">No attempts recorded yet.</p>
      ) : (
        <ul className="space-y-2">
          {history.map((attempt, index) => {
            const percentage = (attempt.score / attempt.total) * 100;
            const bgColor =
              percentage >= 75
                ? 'bg-green-200'
                : percentage >= 50
                ? 'bg-yellow-200'
                : 'bg-red-200';

            return (
              <li
                key={attempt.id}
                className={`p-3 rounded-lg shadow-md hover:shadow-xl transition-transform transform hover:scale-105 ${bgColor}`}
              >
                <div className="flex justify-between items-center mb-1">
                  <div className="text-md font-semibold text-gray-700">
                    Attempt {index + 1}
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-800">
                      Score: {attempt.score} / {attempt.total}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(attempt.date).toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-300 rounded-full h-2 mt-1">
                  <div
                    className={`h-2 rounded-full ${
                      percentage >= 75
                        ? 'bg-green-500'
                        : percentage >= 50
                        ? 'bg-yellow-500'
                        : 'bg-red-500'
                    }`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>

                {/* Percentage and Delete Button */}
                <div className="flex justify-between items-center mt-2">
                  <p className="text-xs font-medium text-gray-600">
                    {percentage.toFixed(1)}% Completed
                  </p>
                  <button
                    onClick={() => handleDelete(attempt.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 text-xs"
                  >
                    Delete
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default AttemptHistory;
