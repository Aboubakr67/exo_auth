import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    fetch("http://localhost:3000/api/user/allusers", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUsers(data.users);
        } else {
          setError(data.message);
        }
      })
      .catch(() => setError("Erreur lors du chargement des utilisateurs."));
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
        Liste des utilisateurs
      </h2>

      {error ? (
        <p className="text-red-500 text-center bg-red-100 p-3 rounded-lg">
          {error}
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 shadow-md rounded-lg">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="p-3 text-left">Nom</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Rôle</th>
                <th className="p-3 text-left">Créé le</th>
                <th className="p-3 text-left">Mis à jour le</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-100">
                  <td className="p-3 text-gray-700">{user.username}</td>
                  <td className="p-3 text-gray-700">{user.email}</td>
                  <td
                    className={`p-3 font-semibold ${
                      user.role === "admin" ? "text-green-600" : "text-gray-500"
                    }`}
                  >
                    {user.role}
                  </td>
                  <td className="p-3 text-gray-700">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-3 text-gray-700">
                    {new Date(user.updatedAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UsersList;
