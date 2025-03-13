import { useState, useEffect } from 'react';

const EMOJI_FACES = [
  "😀", "😅", "🤔", "🧐", "😕", "😟", "😢", "😭", "😤", "😠", "🤬", "😵"
];

export const useGameLogic = (level, onComplete) => {
  const [inputValue, setInputValue] = useState('');
  const [feedback, setFeedback] = useState('');
  const [correctWords, setCorrectWords] = useState([]);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [emoji, setEmoji] = useState("🧐");
  const [canAdvance, setCanAdvance] = useState(false);
  const [hasLost, setHasLost] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [recentFoundWord, setRecentFoundWord] = useState('');
  const [buttonPulse, setButtonPulse] = useState(false);
  const [isCompleting, setIsCompleting] = useState(false);

  const maxFailedAttempts = Math.floor(level.palabrasCorrectas.length * 1.5);
  const progressPercentage = (correctWords.length / level.palabrasCorrectas.length) * 100;
  const failurePercentage = (failedAttempts / maxFailedAttempts) * 100;

  useEffect(() => {
    const halfWords = Math.ceil(level.palabrasCorrectas.length / 2);
    if (correctWords.length >= halfWords && !canAdvance) {
      setCanAdvance(true);
      setButtonPulse(true);
      setTimeout(() => setButtonPulse(false), 3000);
    }
  }, [correctWords, level.palabrasCorrectas, canAdvance]);


  useEffect(() => {
    if (failedAttempts >= maxFailedAttempts && !hasLost) {
      setHasLost(true);
      setEmoji("😵");
      setFeedback("¡Has fallado demasiadas veces! Intenta de nuevo.");
    }
  }, [failedAttempts, maxFailedAttempts, hasLost]);

  const handleCheckWord = () => {
    if (hasLost) return;

    const word = inputValue.trim();
    if (!word) return;

    try {
      const regex = new RegExp(level.patron);
      const isMatch = regex.test(word);

      if (isMatch && !correctWords.includes(word) && level.palabrasCorrectas.includes(word)) {
        const newCorrectWords = [...correctWords, word];
        setCorrectWords(newCorrectWords);
        setFeedback(`¡Correcto! "${word}" coincide con el patrón.`);
        setEmoji("😀");

        setRecentFoundWord(word);
        setShowAnimation(true);
        setTimeout(() => setShowAnimation(false), 1500);

        if (newCorrectWords.length === level.palabrasCorrectas.length) {
          setTimeout(() => {
            onComplete(level._id);
          }, 1500);
        }
      } else if (isMatch && !level.palabrasCorrectas.includes(word)) {
        setFeedback(`"${word}" coincide con el patrón, pero no está en nuestra lista.`);
        setEmoji("🤔");
        setFailedAttempts(prev => prev + 1);
      } else if (correctWords.includes(word)) {
        setFeedback(`Ya has encontrado "${word}".`);
        setEmoji("😅");
      } else {
        setFeedback(`"${word}" no coincide con el patrón ${level.patron}.`);
        const emojiIndex = Math.min(Math.floor(failedAttempts / 2), EMOJI_FACES.length - 1);
        setEmoji(EMOJI_FACES[emojiIndex]);
        setFailedAttempts(prev => prev + 1);
      }
    } catch (e) {
      setFeedback("Error en la expresión regular.");
      setEmoji("😵");
    }

    setInputValue('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCheckWord();
    }
  };

  const handleAdvanceLevel = () => {
    if (isCompleting) return;

    setIsCompleting(true);
    setEmoji("🎉");
    setTimeout(() => {
      onComplete(level._id);
    }, 800);
  };

  const handleRetry = () => {
    setFailedAttempts(0);
    setHasLost(false);
    setEmoji("🧐");
    setFeedback("");
  };

  return {

    inputValue,
    feedback,
    correctWords,
    failedAttempts,
    emoji,
    canAdvance,
    hasLost,
    showAnimation,
    recentFoundWord,
    buttonPulse,
    isCompleting,
    

    maxFailedAttempts,
    progressPercentage,
    failurePercentage,
    
 
    setInputValue,
    handleCheckWord,
    handleKeyDown,
    handleAdvanceLevel,
    handleRetry
  };
};