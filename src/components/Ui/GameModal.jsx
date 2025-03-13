import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const EMOJI_FACES = [
  "😀", "😅", "🤔", "🧐", "😕", "😟", "😢", "😭", "😤", "😠", "🤬", "😵"
];

export default function GameModal({ level, onClose, onComplete, onAdvanceLevel }) {
  const [inputValue, setInputValue] = useState('');
  const [feedback, setFeedback] = useState('');
  const [correctWords, setCorrectWords] = useState([]);
  const [emoji, setEmoji] = useState("🧐");
  const [attempts, setAttempts] = useState(0);
  const [showAdvanceMessage, setShowAdvanceMessage] = useState(false);
  
  const handleCheckWord = () => {
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
        

        const halfCount = Math.ceil(level.palabrasCorrectas.length / 2);
        if (newCorrectWords.length >= halfCount && newCorrectWords.length < level.palabrasCorrectas.length) {
          setShowAdvanceMessage(true);
          setFeedback(`¡Correcto! Has encontrado más de la mitad de las palabras. ¡Puedes avanzar!`);
        }
        
 
        if (newCorrectWords.length === level.palabrasCorrectas.length) {
          setFeedback(`¡Felicidades! Has encontrado todas las palabras.`);
          setTimeout(() => {
            onComplete(level._id);
          }, 1500);
        }
      } else if (isMatch && !level.palabrasCorrectas.includes(word)) {
       
        setFeedback(`"${word}" coincide con el patrón, pero no está en nuestra lista.`);
        setEmoji("🤔");
        setAttempts(attempts + 1);
      } else if (correctWords.includes(word)) {
    
        setFeedback(`Ya has encontrado "${word}".`);
        setEmoji("😅");
      } else {
     
        setFeedback(`"${word}" no coincide con el patrón ${level.patron}.`);
        
      
        const emojiIndex = Math.min(Math.floor(attempts / 2), EMOJI_FACES.length - 1);
        setEmoji(EMOJI_FACES[emojiIndex]);
        setAttempts(attempts + 1);
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
  
    onComplete(level._id, true);
  
    onAdvanceLevel();
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-lg relative">
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white"
        >
          <X size={24} />
        </button>
        
        <h2 className="text-xl font-bold mb-2">Nivel {level.nivel}</h2>
        <p className="text-gray-300 mb-6">{level.descripcion}</p>
        
        <div className="mb-6">
          <div className="text-sm text-gray-400 mb-1">Patrón: <code className="bg-gray-700 px-2 py-1 rounded">{level.patron}</code></div>
          <div className="text-sm text-gray-400">Encontrados: {correctWords.length}/{level.palabrasCorrectas.length}</div>
        </div>
        
        <div className="text-6xl mb-6 text-center">{emoji}</div>
        
        <div className="mb-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Escribe una palabra..."
              className="flex-1 bg-gray-700 rounded border border-gray-600 px-3 py-2 text-white focus:outline-none focus:border-fuchsia-500"
            />
            <button
              onClick={handleCheckWord}
              className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white px-4 py-2 rounded"
            >
              Verificar
            </button>
          </div>
          
          {feedback && (
            <p className="mt-2 text-sm text-gray-300">{feedback}</p>
          )}
        </div>
        
        {showAdvanceMessage && (
          <div className="mb-4 p-3 bg-blue-500/20 border border-blue-500/30 rounded-lg">
            <p className="text-blue-300 mb-2">¡Has encontrado más de la mitad de las palabras! Puedes avanzar al siguiente nivel.</p>
            <button 
              onClick={handleAdvanceLevel}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
            >
              Avanzar al siguiente nivel
            </button>
          </div>
        )}
        
        <div className="bg-gray-700 rounded-lg p-4">
          <h3 className="text-sm font-bold mb-2">Palabras encontradas:</h3>
          {correctWords.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {correctWords.map(word => (
                <span key={word} className="bg-green-500/20 text-green-400 px-2 py-1 rounded-md text-sm">
                  {word}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400">Ninguna palabra encontrada aún.</p>
          )}
        </div>
      </div>
    </div>
  );
}