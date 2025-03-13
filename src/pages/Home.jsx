import React,{useState, useEffect} from 'react';
import LevelSeccion from '../components/Ui/LevelSeccion';
import Header from '../components/Layout/Header';
import Progress from '../components/Ui/Progress';
import GameModal from '../components/Ui/ModalGame';
import { useGameData } from '../hooks/useGameData';

const HomePage = () => {

  const storedProgress = JSON.parse(localStorage.getItem('levelProgress'));
  const storedUser = JSON.parse(localStorage.getItem('dataUser'));
  const data = {
      id: storedUser.id,
      email: storedUser.email,
      score: storedUser.score,
      levelProgress: storedProgress
  }

  const {
    
    userData,
    selectedLevel,
    
    groupedLevels,
    difficultyOrder,
    
    getDifficultyColor,
    handleLevelSelect,
    handleCloseModal,
    handleLevelComplete
  } = useGameData(data);

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
        />
      )}
    </div>
  );
};

export default HomePage;