import React, { useState } from 'react';
import LevelSeccion from '../components/Ui/LevelSeccion';
import Header from '../components/Layout/Header';
import Progress from '../components/Ui/Progress';
import GameModal from '../components/Ui/GameModal';
import Data from "../mocks/mocks.json";

const HomePage = () => {
  const [userData, setUserData] = useState(Data.data);
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
  
  const handleLevelComplete = (levelId, isPartial = false) => {
    
  };

  const handleAdvanceLevel = () => {
   
  };
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header
        email={userData.email}
        score={userData.score}
      />
      
      <main className="max-w-4xl mx-auto p-6">
        <Progress
          score={userData.score}
          levelProgress={userData.levelProgress}
        />
        
        <LevelSeccion
          difficultyOrder={difficultyOrder}
          groupedLevels={groupedLevels}
          getDifficultyColor={getDifficultyColor}
          levelProgress={userData.levelProgress}
          onLevelSelect={handleLevelSelect}
        />
      </main>
      
      {selectedLevel && (
        <GameModal
          level={selectedLevel}
          onClose={handleCloseModal}
          onComplete={handleLevelComplete}
          onAdvanceLevel={handleAdvanceLevel}
        />
      )}
    </div>
  );
};

export default HomePage;