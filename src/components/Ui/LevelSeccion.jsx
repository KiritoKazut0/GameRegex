import { Lock, CheckCircle, ChevronRight } from 'lucide-react';

export default function LevelSeccion({difficultyOrder, groupedLevels, getDifficultyColor, levelProgress, onLevelSelect}) {
    return (
        <>
            <div>
                {difficultyOrder.map(difficulty => (
                    <div key={difficulty} className="mb-8">
                        <h3 className={`text-lg font-bold mb-4 ${getDifficultyColor(difficulty)} flex items-center gap-2`}>
                            <span className="w-3 h-3 rounded-full bg-current inline-block"></span>
                            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {groupedLevels[difficulty]?.map((item) => {
                                const isCompleted = item.status === "Completado";
                                const isLocked = item.status === "Pendiente" &&
                                levelProgress.find(l => l.level.nivel === item.level.nivel - 1)?.status !== "Completado" &&
                                item.level.nivel > 1; 

                                return (
                                    <div
                                        key={item.level._id}
                                        className={`p-4 rounded-lg border transition-all duration-300 hover:shadow-lg ${isCompleted
                                                ? 'bg-gray-800/30 border-green-500/30 cursor-pointer'
                                                : isLocked
                                                    ? 'bg-gray-800/10 border-gray-700 opacity-60 cursor-not-allowed'
                                                    : 'bg-gray-800/50 border-fuchsia-500/30 cursor-pointer hover:border-fuchsia-500/60'
                                            }`}
                                        onClick={() => !isLocked && onLevelSelect(item.level)}
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="flex items-center gap-2">
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isCompleted ? 'bg-green-500/20' : isLocked ? 'bg-gray-700/50' : 'bg-fuchsia-500/20'
                                                    }`}>
                                                    {isCompleted ? (
                                                        <CheckCircle size={16} className="text-green-500" />
                                                    ) : isLocked ? (
                                                        <Lock size={16} className="text-gray-500" />
                                                    ) : (
                                                        <span className="text-fuchsia-400 text-sm font-bold">{item.level.nivel}</span>
                                                    )}
                                                </div>
                                                <h4 className="font-bold">Nivel {item.level.nivel}</h4>
                                            </div>
                                            {!isLocked && (
                                                <ChevronRight size={20} className={isCompleted ? 'text-green-500' : 'text-fuchsia-400'} />
                                            )}
                                        </div>

                                        <p className="text-sm text-gray-400 line-clamp-2 mb-2">
                                            {item.level.descripcion}
                                        </p>

                                        <div className="text-xs text-gray-500">
                                            {item.level.palabrasCorrectas.length} palabras • Patrón: <code className="bg-gray-700 px-1 rounded">{item.level.patron}</code>
                                        </div>

                                        {isCompleted && (
                                            <div className="mt-2 text-green-400 text-xs flex items-center gap-1">
                                                <CheckCircle size={12} />
                                                <span>Completado</span>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}