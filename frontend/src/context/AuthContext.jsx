import React, { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ Ajoute loading

  const checkAuth = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/user/me", {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      console.log(data);

      if (data.success) {
        setUser(data.user);
      }
    } catch (error) {
      console.error("Erreur d'authentification :", error);
    } finally {
      setLoading(false); // ✅ Marque la fin du chargement
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = (user) => {
    setUser({
      username: user.username,
      email: user.email,
      id: user.id,
      role: user.role,
    });
  };

  const logout = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/user/logout", {
        method: "POST",
        credentials: "include",
      });
      const data = await response.json();

      if (data.success) {
        setUser(null);
      } else {
        console.error("Erreur lors de la déconnexion");
      }
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
