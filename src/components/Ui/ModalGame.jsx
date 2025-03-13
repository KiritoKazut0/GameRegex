import React from 'react';
import { X, ChevronRight, CheckCircle, AlertTriangle, RefreshCw } from 'lucide-react';
import { useGameLogic } from '../../hooks/UseGameLogic';

export default function GameModal({ level, onClose, onComplete }) {
  const {

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
  } = useGameLogic(level, onComplete);

  const halfwayMark = 50;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-lg relative shadow-xl transform transition-all duration-300 ease-in-out">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white transition duration-200"
        >
          <X size={24} />
        </button>

        <h2 className="text-xl font-bold mb-2">Nivel {level.nivel}</h2>
        <p className="text-gray-300 mb-6">{level.descripcion}</p>

        {/* Progress bars */}
        <div className="mb-6">
          <div className="text-sm text-gray-400 mb-1">Patrón: <code className="bg-gray-700 px-2 py-1 rounded">{level.patron}</code></div>

          {/* Success progress */}
          <div className="text-sm text-gray-400 mb-2">Encontrados: {correctWords.length}/{level.palabrasCorrectas.length}</div>
          <div className="w-full bg-gray-700 rounded-full h-2.5 mb-3">
            <div
              className={`h-2.5 rounded-full transition-all duration-500 ease-out ${progressPercentage >= halfwayMark ? 'bg-green-500' : 'bg-fuchsia-500'}`}
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>

          {/* Failure progress */}
          <div className="text-sm text-gray-400 mb-2">Intentos fallidos: {failedAttempts}/{maxFailedAttempts}</div>
          <div className="w-full bg-gray-700 rounded-full h-2.5">
            <div
              className={`h-2.5 rounded-full transition-all duration-500 ease-out ${failurePercentage >= 75 ? 'bg-red-600' : 'bg-yellow-500'}`}
              style={{ width: `${failurePercentage}%` }}
            ></div>
          </div>
        </div>

        <div className={`text-6xl mb-6 text-center transition-all duration-300 ${showAnimation ? 'scale-125' : 'scale-100'}`}>
          {emoji}
        </div>

        {hasLost ? (
          <div className="mb-6 bg-red-900/30 border border-red-800 rounded-lg p-4 animate-fadeIn">
            <div className="flex items-center gap-3 mb-3">
              <AlertTriangle className="text-red-500" size={24} />
              <h3 className="text-red-500 font-bold">¡Has perdido este nivel!</h3>
            </div>
            <p className="text-gray-300 mb-4">Has fallado demasiadas veces intentando encontrar palabras. Puedes reintentar o elegir otro nivel.</p>
            <button
              onClick={handleRetry}
              className="w-full bg-gradient-to-r from-blue-500 to-sky-600 hover:from-blue-600 hover:to-sky-700 
                text-white px-4 py-3 rounded-lg flex items-center justify-center gap-2 
                transition-all duration-300 transform hover:scale-102 active:scale-98 font-medium shadow-lg"
            >
              <RefreshCw size={18} />
              <span>Reintentar nivel</span>
            </button>
          </div>
        ) : (
          <div className="mb-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Escribe una palabra..."
                className="flex-1 bg-gray-700 rounded border border-gray-600 px-3 py-2 text-white focus:outline-none focus:border-fuchsia-500 transition-all duration-200"
              />
              <button
                onClick={handleCheckWord}
                className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white px-4 py-2 rounded transition duration-200 transform hover:scale-105 active:scale-95"
              >
                Verificar
              </button>
            </div>

            {feedback && (
              <p className="mt-2 text-sm text-gray-300 animate-fadeIn">{feedback}</p>
            )}
          </div>
        )}

        {canAdvance && correctWords.length < level.palabrasCorrectas.length && !hasLost && (
          <div className="mb-4">
            <button
              onClick={handleAdvanceLevel}
              disabled={isCompleting}
              className={`w-full bg-gradient-to-r from-green-500 to-emerald-600 
    ${isCompleting ? 'opacity-50 cursor-not-allowed' : 'hover:from-green-600 hover:to-emerald-700'}
    text-white px-4 py-3 rounded-lg flex items-center justify-center gap-2 
    transition-all duration-300 transform ${isCompleting ? '' : 'hover:scale-102 active:scale-98'} font-medium shadow-lg
    ${buttonPulse ? 'animate-pulse' : ''}`}
            >
              <span>{isCompleting ? 'Avanzando...' : 'Avanzar al siguiente nivel'}</span>
              <ChevronRight size={20} />
            </button>
            <p className="text-center text-xs text-gray-400 mt-2">Has encontrado más de la mitad de las palabras</p>
          </div>
        )}

        <div className="bg-gray-700 rounded-lg p-4">
          <h3 className="text-sm font-bold mb-2">Palabras encontradas:</h3>
          {correctWords.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {correctWords.map(word => (
                <span
                  key={word}
                  className={`bg-green-500/20 text-green-400 px-2 py-1 rounded-md text-sm transition-all duration-300
                    ${recentFoundWord === word && showAnimation ? 'bg-green-400 text-green-900 scale-110' : ''}`}
                >
                  {word}
                  {recentFoundWord === word && showAnimation && (
                    <CheckCircle className="inline-block ml-1" size={12} />
                  )}
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