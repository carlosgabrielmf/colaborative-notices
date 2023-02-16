import { createContext, useContext, useState } from 'react';

// Creamos el contexto.
const TokenContext = createContext(null);

// Componente que rodeara el resto de componentes de nuestra App.
export const TokenProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));

  // Función para guardar el token en el localstorage, lo guarda en una variable "token".
  const setTokenInLocalStorage = (newToken) => {
    if (!newToken) {
      localStorage.removeItem('token');
    } else {
      localStorage.setItem('token', newToken);
    }
    setToken(newToken);
  };

  return (
    <TokenContext.Provider value={[token, setTokenInLocalStorage]}>
      {children}
    </TokenContext.Provider>
  );
};

// Hook para poder reutilizar el token.
export const useToken = () => {
  return useContext(TokenContext);
};
