import { useState } from 'react';

export const useGameData = (initialData) => {
 
  const [userData, setUserData] = useState(initialData);
  const [selectedLevel, setSelectedLevel] = useState(null);
  
  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'principiante':
        return 'text-green-500';
      case 'aficionado':
        return 'text-blue-500';
      case 'desafiante':
        return 'text-orange-500';
      case 'experto':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };
  
  const groupedLevels = userData.levelProgress.reduce((acc, item) => {
    const difficulty = item.level.dificultad;
    if (!acc[difficulty]) {
      acc[difficulty] = [];
    }
    acc[difficulty].push(item);
    return acc;
  }, {});
  
  const difficultyOrder = ['principiante', 'aficionado', 'desafiante', 'experto'];
  
  const handleLevelSelect = (level) => {
    setSelectedLevel(level);
  };
  
  const handleCloseModal = () => {
    setSelectedLevel(null);
  };
  
  const handleLevelComplete = (levelId) => {
    const levelProgressItem = userData.levelProgress.find(item => item.level._id === levelId);
    
    if (levelProgressItem && levelProgressItem.status === "Completado") {
      setTimeout(() => {
        setSelectedLevel(null);
      }, 1000);
      return;
    }
    
    const levelData = userData.levelProgress.find(item => item.level._id === levelId);
    
    if (!levelData) {
      console.error("Level not found:", levelId);
      return;
    }
    
    const pointsToAdd = levelData.level.palabrasCorrectas.length * 10;

    const updatedLevelProgress = userData.levelProgress.map(item => {
      if (item.level._id === levelId) {
        return {
          ...item,
          status: "Completado"
        };
      }
      return item;
    });
    
    setUserData(prevData => ({
      ...prevData,
      levelProgress: updatedLevelProgress,
      score: prevData.score + pointsToAdd
    }));
    
    setTimeout(() => {
      setSelectedLevel(null);
    }, 2000);
  };

  return {

    userData,
    selectedLevel,
    

    groupedLevels,
    difficultyOrder,
    

    getDifficultyColor,
    handleLevelSelect,
    handleCloseModal,
    handleLevelComplete
  };
};