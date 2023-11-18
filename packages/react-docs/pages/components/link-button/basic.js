import { LinkButton, Text } from '@tonic-ui/react';
import React, { useEffect, useState } from 'react';

const App = () => {
  const [timeLeft, setTimeLeft] = useState(180);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
      }
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [timeLeft]);
  const handleClick = () => {
    setTimeLeft(180);
  };

  return (
    <Text>
      If the email does not arrive in your inbox or spam folder, <LinkButton onClick={handleClick}>click here to resend ({timeLeft}s)</LinkButton>.
    </Text>
  );
};

export default App;
