import React, { useState, useEffect } from 'react';
import LoginImage from "../assets/Login.jpg";
import Senku from "../assets/Senku.jpg"
import Purple from "../assets/purple.jpg"

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt:', { email, password });
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full bg-gray-900 overflow-hidden">
      <div className={`w-full md:w-1/2 min-h-screen flex items-center justify-center transition-transform duration-1000 ${isLoaded ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className={`w-full max-w-md p-6 md:p-8 m-4 bg-gray-800/90 rounded-lg shadow-lg transition-all duration-700 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <div className="text-center mb-6 md:mb-8">
            <h2 className={`text-2xl md:text-3xl font-bold text-fuchsia-500 transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>GAME LOGIN</h2>
            <p className={`text-gray-400 mt-2 transition-all duration-700 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>¿Qué esperas para unirte a la aventura?</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            <div className={`transition-all duration-700 delay-700 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                Correo electronico
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500 transition-all duration-300"
                placeholder="tu@email.com"
                required
              />
            </div>
            
            <div className={`transition-all duration-700 delay-900 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500 transition-all duration-300"
                placeholder="••••••••"
                required
              />
            </div>
            
            <div className={`flex items-center justify-between transition-all duration-700 delay-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 bg-gray-700 border-gray-600 rounded text-fuchsia-500 focus:ring-fuchsia-500"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                  Recordarme
                </label>
              </div>
              
              <div className="text-sm">
                <a href="#" className="text-fuchsia-400 hover:text-fuchsia-300 transition-colors duration-300">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
            </div>
            
            <div className={`transition-all duration-700 delay-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <button
                type="submit"
                className="w-full py-3 px-4 bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-medium rounded-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-fuchsia-500"
              >
                INICIAR SESIÓN
              </button>
            </div>
          </form>
          
          <div className={`mt-6 text-center transition-all duration-700 delay-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <p className="text-gray-400">
              ¿No tienes una cuenta?{' '}
              <a href="#" className="text-fuchsia-400 hover:text-fuchsia-300 font-medium transition-colors duration-300">
                Regístrate
              </a>
            </p>
          </div>
        </div>
      </div>
      
      <div className={`w-full md:w-1/2 min-h-screen relative order-first md:order-last transition-transform duration-1000 ${isLoaded ? 'translate-x-0' : 'translate-x-full'}`}>
        <img 
          src={Purple}
          alt="Anime character with glowing elements"
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* Overlay glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/70 to-transparent pointer-events-none"></div>
      </div>
      
      {/* Background particles for immersive effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 20 }).map((_, index) => (
          <div 
            key={index}
            className="absolute rounded-full bg-fuchsia-500 opacity-20 animate-pulse"
            style={{
              width: `${Math.random() * 8 + 2}px`,
              height: `${Math.random() * 8 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 3 + 2}s`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>
      
      <div className="absolute bottom-16 right-16 w-20 h-20 rounded-full bg-fuchsia-500/10 animate-pulse pointer-events-none hidden md:block"></div>
      <div className="absolute top-24 right-40 w-12 h-12 rounded-full bg-fuchsia-500/10 animate-pulse pointer-events-none hidden md:block"></div>
    </div>
  );
};

export default LoginForm;