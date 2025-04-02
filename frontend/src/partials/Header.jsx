import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { user, logout } = useAuth();
  return (
    <header className="bg-blue-500 text-white p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Exo Auth</h1>
        <nav>
          <ul className="flex space-x-4">
            {user ? (
              <>
                <li>
                  <Link to="/" className="hover:text-gray-300">
                    Accueil
                  </Link>
                </li>
                <li>
                  <button onClick={logout} className="hover:text-gray-300">
                    Se déconnecter
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login" className="hover:text-gray-300">
                    Connexion
                  </Link>
                </li>
                <li>
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
