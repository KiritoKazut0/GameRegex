import React, { useState, useEffect } from 'react';
import useField from '../hooks/UseField';
import Purple from "../assets/purple.jpg"
import { useNavigate } from 'react-router-dom';
import RegisterService from '../service/auth/Register';

const RegisterForm = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  const emailField = useField({ type: 'email' });
  const passwordField = useField({ type: 'password' });

  const [RegisterError, setRegisterError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);


  useEffect(() => {
    if (RegisterError) {
      setRegisterError('');
    }
  }, [emailField.value, passwordField.value]);

  useEffect(() => {
    const isValid =
      emailField.value &&
      passwordField.value &&
      !emailField.messageError &&
      !passwordField.messageError;

    setFormValid(isValid);
  }, [emailField.value, passwordField.value, emailField.messageError, passwordField.messageError]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    if (formValid) {
      try {
        setIsSubmitting(true);
        setRegisterError('');

        const user = await RegisterService({
          email: emailField.value,
          password: passwordField.value
        });

        if (user && user.id) {
          navigate('/');
        } 


      } catch (error) {
        console.error('Login error:', error);
        setRegisterError('Hubo un problema al registarse, intentalo más tarde');
      } finally {
        setIsSubmitting(false);
      }
    } else {
      console.log('Form has validation errors');
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full bg-gray-900 overflow-hidden">
      <div className={`w-full md:w-1/2 min-h-screen flex items-center justify-center transition-transform duration-1000 ${isLoaded ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className={`w-full max-w-md p-6 md:p-8 m-4 bg-gray-800/90 rounded-lg shadow-lg transition-all duration-700 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <div className="text-center mb-6 md:mb-8">
            <h2 className={`text-2xl md:text-3xl font-bold text-fuchsia-500 transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>GAME REGISTER</h2>
            <p className={`text-gray-400 mt-2 transition-all duration-700 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>¿Qué esperas para unirte a la aventura?</p>
          </div>


          {RegisterError && (
            <div className={`mb-4 p-3 bg-red-500/20 border border-red-500 rounded-md text-red-200 text-sm transition-all duration-300 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
              <p className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {RegisterError}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            <div className={`transition-all duration-700 delay-700 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                Correo electrónico
              </label>
              <input
                type="email"
                id="email"
                value={emailField.value}
                onChange={emailField.onChange}
                onBlur={emailField.onBlur}
                className={`w-full px-4 py-2 bg-gray-700 border rounded-md text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500 transition-all duration-300 ${emailField.messageError && formSubmitted ? 'border-red-500' : 'border-gray-600'
                  }`}
                placeholder="tu@email.com"
                required
                disabled={isSubmitting}
              />
              {emailField.messageError && (formSubmitted || emailField.value) && (
                <p className="mt-1 text-sm text-red-500">{emailField.messageError}</p>
              )}
            </div>

            <div className={`transition-all duration-700 delay-900 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                value={passwordField.value}
                onChange={passwordField.onChange}
                onBlur={passwordField.onBlur}
                className={`w-full px-4 py-2 bg-gray-700 border rounded-md text-white focus:outline-none focus:ring-2 focus:ring-fuchsia-500 transition-all duration-300 ${passwordField.messageError && formSubmitted ? 'border-red-500' : 'border-gray-600'
                  }`}
                placeholder="••••••••"
                required
                disabled={isSubmitting}
              />
              {passwordField.messageError && (formSubmitted || passwordField.value) && (
                <p className="mt-1 text-sm text-red-500">{passwordField.messageError}</p>
              )}
            </div>

            <div className={`flex items-center justify-between transition-all duration-700 delay-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 bg-gray-700 border-gray-600 rounded text-fuchsia-500 focus:ring-fuchsia-500"
                  disabled={isSubmitting}
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-300">
                  Recordarme
                </label>
              </div>

            
            </div>

            <div className={`transition-all duration-700 delay-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-4 font-medium rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-fuchsia-500 ${isSubmitting
                    ? 'bg-fuchsia-700/70 text-white/80 cursor-wait'
                    : formValid
                      ? 'bg-fuchsia-600 hover:bg-fuchsia-700 text-white hover:-translate-y-1 hover:shadow-lg'
                      : 'bg-fuchsia-600/50 text-white/80 cursor-not-allowed'
                  }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    INICIANDO...
                  </span>
                ) : (
                  'REGISTRAR'
                )}
              </button>
            </div>
          </form>

          <div className={`mt-6 text-center transition-all duration-700 delay-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <p className="text-gray-400">
              ¿Tienes una cuenta?{' '}
              <button onClick={() => navigate('/')} className="text-fuchsia-400 hover:text-fuchsia-300 font-medium transition-colors duration-300">
                Inicia sesión aquí.
              </button>
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

        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/70 to-transparent pointer-events-none"></div>
      </div>

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

export default RegisterForm;