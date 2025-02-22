import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion'; // Import Framer Motion
import quizData from '../data/quizData';
import ChatBubble from './ChatBubble';
import Question from './Question';
import Scoreboard from './Scoreboard';
import AttemptHistory from './AttemptHistory';

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [messages, setMessages] = useState([]);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [timer, setTimer] = useState(30);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [questionDisplayed, setQuestionDisplayed] = useState(false);
  const [refreshHistory, setRefreshHistory] = useState(false); // Trigger to refresh attempt history

  // Timer logic
  useEffect(() => {
    if (currentQuestion < quizData.length && !quizFinished) {
      setTimer(30);
      setHasAnswered(false);
      setQuestionDisplayed(false);

      const countdown = setInterval(() => {
        setTimer((prevTime) => {
          if (prevTime === 1) {
            clearInterval(countdown);
            if (!hasAnswered) {
              handleTimeout();
              setHasAnswered(true);
            }
            return 30;
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => clearInterval(countdown);
    }
  }, [currentQuestion, quizFinished]);

  // Display question only once
  useEffect(() => {
    if (currentQuestion < quizData.length && !quizFinished && !questionDisplayed) {
      const question = quizData[currentQuestion];
      setMessages((prev) => [...prev, { text: question.question, isUser: false, type: 'question' }]);
      setQuestionDisplayed(true);
    }
  }, [currentQuestion, quizFinished, questionDisplayed]);

  // Handle user answer
  const handleAnswer = (selectedAnswer) => {
    if (hasAnswered) return;
    setHasAnswered(true);

    const current = quizData[currentQuestion];
    const isCorrect = selectedAnswer.toLowerCase() === current.answer.toLowerCase();

    setMessages((prev) => [
      ...prev,
      { text: selectedAnswer, isUser: true, type: 'answer' },
      {
        text: isCorrect ? '✅ Correct Answer!' : `❌ Incorrect Answer! Correct: ${current.answer}`,
        isUser: false,
        type: isCorrect ? 'correct' : 'incorrect',
      },
    ]);

    if (isCorrect) setScore(score + 1);

    setTimeout(() => advanceQuestion(), 2000);
  };

  // Handle timeout
  const handleTimeout = () => {
    if (hasAnswered) return;

    const current = quizData[currentQuestion];
    setMessages((prev) => [
      ...prev,
      { text: `⏰ Time's Up! Correct Answer: ${current.answer}`, isUser: false, type: 'timeout' },
    ]);

    setTimeout(() => advanceQuestion(), 2000);
  };

  // Move to next question without repetition
  const advanceQuestion = () => {
    if (currentQuestion + 1 < quizData.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizFinished(true);
      setRefreshHistory((prev) => !prev); // Refresh history
    }
  };

  // Handle retry
  const handleRetry = (retry) => {
    if (retry) {
      setCurrentQuestion(0);
      setMessages([]);
      setScore(0);
      setQuizFinished(false);
      setTimer(30);
      setHasAnswered(false);
      setQuestionDisplayed(false);
    } else {
      setShowHistory(true);
    }
  };

  // Show scoreboard when quiz finishes
  if (quizFinished) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white p-8 rounded-2xl shadow-lg">
        <Scoreboard score={score} total={quizData.length} onRetry={handleRetry} />
        {showHistory && (
          <div className="mt-6 w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">📜 Attempt History</h2>
            <AttemptHistory refreshTrigger={refreshHistory} />
          </div>
        )}
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-100 py-10 px-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col lg:flex-row gap-6 justify-center items-start">
        {/* Quiz Section */}
        <motion.div
          className="flex-1 bg-white p-8 rounded-3xl shadow-2xl w-full max-w-2xl"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800">
            🎯 Interactive Quiz Platform
          </h2>

          {/* Timer with Pulse Animation */}
          <motion.div
            className="flex justify-center mb-6"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 1 }}
          >
            <div className="w-16 h-16 flex items-center justify-center rounded-full border-4 border-red-500 text-lg font-bold text-red-600 shadow-lg">
              {timer}s
            </div>
          </motion.div>

          {/* Questions & Answer Display */}
          <div className="overflow-auto h-full space-y-4">
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <ChatBubble text={msg.text} isUser={msg.isUser} type={msg.type} />
              </motion.div>
            ))}

            {/* Show answer buttons only after question appears */}
            {!quizFinished && !hasAnswered && questionDisplayed && (
              <Question question={quizData[currentQuestion]} handleAnswer={handleAnswer} />
            )}
          </div>
        </motion.div>

        {/* Attempt History Section */}
        <motion.div
          className="flex-1 bg-gradient-to-r from-pink-200 to-yellow-200 p-8 rounded-3xl shadow-2xl w-full max-w-lg mt-10 lg:mt-0"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            📜 Quiz Attempt History
          </h2>
          <AttemptHistory refreshTrigger={refreshHistory} />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Quiz;
