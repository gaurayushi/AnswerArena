import React, { useEffect } from 'react';

const Timer = ({ time, setTime, onTimeOut }) => {
  useEffect(() => {
    if (time === 0) {
      onTimeOut();
      return;
    }
    const timer = setTimeout(() => setTime(time - 1), 1000);
    return () => clearTimeout(timer);
  }, [time]);

  return (
    <div className="text-center text-red-500 font-bold mb-4">
      Time Remaining: {time}s
    </div>
  );
};

export default Timer;
