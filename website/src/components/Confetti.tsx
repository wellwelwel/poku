import { Copy } from 'lucide-react';
import React, { useState, useRef } from 'react';
import Confetti from 'react-confetti';
import { toast } from 'sonner';

type ConfettiButtonOptions = {
  toCopy: string;
};

export const ConfettiButton: React.FC<ConfettiButtonOptions> = ({ toCopy }) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Copied');
    } catch (error) {
      toast.error("Couldn't Copy", {
        description: error instanceof Error ? error.message : undefined,
      });
    }
  };

  const handleClick = () => {
    setShowConfetti(false);
    copyToClipboard(toCopy);

    setTimeout(() => {
      setShowConfetti(true);
    });
  };

  return (
    <>
      {toCopy}{' '}
      {showConfetti && (
        <Confetti
          numberOfPieces={100}
          initialVelocityY={{ min: -50, max: 75 }}
          friction={1}
          gravity={0.5}
          recycle={false}
          colors={['#0088ff', '#ffa4c7', '#8800ff']}
          style={{
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            position: 'fixed',
            pointerEvents: 'none',
          }}
        />
      )}
      <button ref={buttonRef} onClick={handleClick}>
        <Copy />
      </button>
    </>
  );
};
