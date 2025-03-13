import { Trophy, LogOut } from 'lucide-react';
import { useNavigate } from "react-router-dom"


export default function Header({ email, score }) {

    const navigate = useNavigate()
    
    const handleLogout = () => {
        localStorage.removeItem('userData');
        navigate('/')
    };

    return (
        <header className="relative bg-gray-800 p-6 shadow-lg">
            <div className="absolute inset-0 bg-fuchsia-500/5 animate-pulse rounded-lg"></div>
            <div className="relative z-10 flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-fuchsia-400">Regex Laboratory</h1>
                    <p className="text-gray-400">¡Bienvenido de nuevo, científico!</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 bg-gray-700 px-4 py-2 rounded-full">
                        <Trophy className="text-yellow-400" size={20} />
                        <span className="font-bold text-xl">{score}</span>
                        <span className="text-gray-400 text-sm">pts</span>
                    </div>
                    <div className="w-10 h-10 bg-fuchsia-600 rounded-full flex items-center justify-center text-white font-bold">
                        {email.charAt(0).toUpperCase() || 'A'}
                    </div>
                    <button
                        onClick={handleLogout}
                        className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-full"
                        title="Cerrar sesión"
                    >
                        <LogOut size={20} />
                    </button>
                </div>
            </div>
        </header>
    );
}
