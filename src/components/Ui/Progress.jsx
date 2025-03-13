import { Star } from "lucide-react";

export default function Progress({levelProgress, score}) {
    return (
        <>
            <div className="bg-gray-800/70 rounded-lg p-6 mb-8 backdrop-blur">
                <div className="flex items-center gap-3 mb-4">
                    <Star className="text-yellow-400" size={24} />
                    <h2 className="text-xl font-bold">Tu Progreso</h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-gray-700/70 p-4 rounded-lg">
                        <p className="text-gray-400 text-sm">Niveles Completados</p>
                        <p className="text-2xl font-bold text-fuchsia-400">
                            {levelProgress.filter(l => l.status === "Completado").length}
                        </p>
                    </div>
                    <div className="bg-gray-700/70 p-4 rounded-lg">
                        <p className="text-gray-400 text-sm">Niveles Totales</p>
                        <p className="text-2xl font-bold text-blue-400">
                            {levelProgress.length}
                        </p>
                    </div>
                    <div className="bg-gray-700/70 p-4 rounded-lg">
                        <p className="text-gray-400 text-sm">Puntuación</p>
                        <p className="text-2xl font-bold text-yellow-400">
                            {score}
                        </p>
                    </div>
                    <div className="bg-gray-700/70 p-4 rounded-lg">
                        <p className="text-gray-400 text-sm">Nivel Actual</p>
                        <p className="text-2xl font-bold text-green-400">
                            {levelProgress.find(l => l.status === "Pendiente")?.level.nivel || "¡Completado!"}
                        </p>
                    </div>
                </div>

                <div className="w-full bg-gray-700 rounded-full h-4">
                    <div
                        className="bg-gradient-to-r from-fuchsia-600 to-purple-500 h-4 rounded-full"
                        style={{ width: `${(levelProgress.filter(l => l.status === "Completado").length / levelProgress.length) * 100}%` }}
                    ></div>
                </div>
                <p className="text-gray-400 text-sm mt-2 text-center">
                    {Math.round((levelProgress.filter(l => l.status === "Completado").length / levelProgress.length) * 100)}% completado
                </p>
            </div>
        </>
    );
}