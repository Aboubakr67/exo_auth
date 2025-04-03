import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { user, logout, loading } = useAuth();

  if (loading) return null;
  return (
    <header className="bg-blue-500 text-white p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Exo Auth</h1>
        <nav>
          <ul className="flex space-x-4">
            {user ? (
              <>
                <li className="bg-black rounded-md text-white py-2 px-4">
                  <Link to="/" className="hover:text-gray-300">
                    Accueil
                  </Link>
                </li>
                <li className="bg-black rounded-md text-white py-2 px-4">
                  <Link to="/user-info" className="hover:text-gray-300">
                    Informations
                  </Link>
                </li>
                {user.role === "admin" && (
                  <li className="bg-black rounded-md text-white py-2 px-4">
                    <Link to="/users-list" className="hover:text-gray-300">
                      Liste des utilisateurs
                    </Link>
                  </li>
                )}
                <li className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600">
                  <button onClick={logout}>Se déconnecter</button>
                </li>
              </>
            ) : (
              <>
                <li className="bg-black rounded-md text-white py-2 px-4">
                  <Link to="/login" className="hover:text-gray-300">
                    Connexion
                  </Link>
                </li>
                <li className="bg-black rounded-md text-white py-2 px-4">
                  <Link to="/register" className="hover:text-gray-300">
                    Inscription
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
