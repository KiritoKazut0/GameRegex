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

  // Función auxiliar para normalizar palabras (minúsculas y sin espacios extra)
  const normalizeWord = (word) => {
    return word.toLowerCase().trim();
  };

  // Función para verificar si una palabra está en la lista de palabras correctas
  const isWordInCorrectList = (word) => {
    const normalizedInput = normalizeWord(word);
    return level.palabrasCorrectas.some(correctWord => 
      normalizeWord(correctWord) === normalizedInput
    );
  };

  // Función para verificar si una palabra coincide con el patrón de expresión regular
  const doesWordMatchPattern = (word) => {
    try {
      // CORRECCIÓN: Aquí está el problema principal
      // Si el patrón viene como string con formato "/a/" necesitamos extraer "a"
      let patternStr = level.patron;
      
      // Si el patrón está en formato "/patrón/", extraemos la parte central
      if (patternStr.startsWith('/') && patternStr.endsWith('/')) {
        patternStr = patternStr.substring(1, patternStr.length - 1);
      }
      
      // Creamos el objeto RegExp correctamente
      const pattern = new RegExp(patternStr, 'i');
      return pattern.test(word);
    } catch (e) {
      console.error("Error al evaluar el patrón de expresión regular:", e, {
        originalPattern: level.patron,
        word
      });
      return false;
    }
  };

  const handleCheckWord = () => {
    if (hasLost) return;

    const word = inputValue.trim();
    if (!word) return;

    // Normalizar la palabra ingresada
    const normalizedWord = normalizeWord(word);
    
    // Comprobar si la palabra ya está en palabras correctas (usando versiones normalizadas)
    const isAlreadyFound = correctWords.some(w => normalizeWord(w) === normalizedWord);

    if (isAlreadyFound) {
      setFeedback(`Ya has encontrado "${word}".`);
      setEmoji("😅");
      setInputValue('');
      return;
    }

    try {
      // Verificar si la palabra cumple con el patrón O está en la lista de palabras correctas
      const matchesPattern = doesWordMatchPattern(normalizedWord);
      const isInList = isWordInCorrectList(normalizedWord);
      
      // Para debugging
      console.log({
        word,
        normalizedWord, 
        isInList,
        matchesPattern,
        originalPattern: level.patron
      });
      
      // La palabra es correcta si cumple con el patrón O está en la lista
      if (matchesPattern || isInList) {
        // Si está en la lista, usamos la versión con la capitalización correcta
        const originalWord = isInList 
          ? level.palabrasCorrectas.find(w => normalizeWord(w) === normalizedWord) || word
          : word;
        
        const newCorrectWords = [...correctWords, originalWord];
        setCorrectWords(newCorrectWords);
        
        if (matchesPattern && isInList) {
          setFeedback(`¡Correcto! "${originalWord}" coincide con el patrón y está en la lista.`);
        } else if (matchesPattern) {
          setFeedback(`¡Correcto! "${originalWord}" coincide con el patrón.`);
        } else {
          setFeedback(`¡Correcto! "${originalWord}" está en la lista de palabras válidas.`);
        }
        
        setEmoji("😀");
        setRecentFoundWord(originalWord);
        setShowAnimation(true);
        setTimeout(() => setShowAnimation(false), 1500);

        if (newCorrectWords.length === level.palabrasCorrectas.length) {
          setTimeout(() => {
            onComplete(level._id);
          }, 1500);
        }
      } else {
        setFeedback(`"${word}" no coincide con el patrón ni está en nuestra lista.`);
        const emojiIndex = Math.min(Math.floor(failedAttempts / 2), EMOJI_FACES.length - 1);
        setEmoji(EMOJI_FACES[emojiIndex]);
        setFailedAttempts(prev => prev + 1);
      }
    } catch (e) {
      console.error("Error en la expresión regular:", e, level.patron);
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