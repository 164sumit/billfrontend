import React, { useState, useEffect } from 'react';

const RedLight = () => {
  const [isBlinking, setIsBlinking] = useState(true);

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(prevState => !prevState); // Toggle blinking state
    }, 200); // Blink interval in milliseconds

    // Clear interval on component unmount to prevent memory leaks
    return () => clearInterval(blinkInterval);
  }, []); // Run effect only once on mount

  return (
    <div>
      <div className={`w-6 h-6 rounded-full bg-red-500 ${isBlinking ? 'animate-blink' : 'opacity-20'}`}></div>
    </div>
  );
};

export default RedLight;
