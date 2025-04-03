import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Header from "./partials/Header";
import Footer from "./partials/Footer";
import UserInfo from "./pages/UserInfo";
import UsersList from "./pages/UsersList";

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <Router>
      <Header />
      <div className="min-h-screen bg-gray-100 p-4">
        <Routes>
          <Route path="/login" element={!user ? <Login /> : <Home />} />
          <Route path="/register" element={!user ? <Register /> : <Home />} />
          <Route path="/" element={user ? <Home /> : <Login />} />
          <Route path="/user-info" element={user ? <UserInfo /> : <Login />} />
          <Route
            path="/users-list"
            element={user && user.role === "admin" ? <UsersList /> : <Login />}
          />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
