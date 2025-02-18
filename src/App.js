import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import Recipe from "./components/recipe";
import Login from "./components/login";
import Main from "./components/main";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    const existAccount = JSON.parse(localStorage.getItem("account"));
    if (existAccount) {
      setLoggedIn(true);
    }
  }, []);
  function handleLogout() {
    localStorage.removeItem("account");
    window.location.reload();
    window.location.href = "/login";
  }
  return (
    <div>
      <header>
        {loggedIn == true ? (
          <span>
            <a href="#" onClick={() => handleLogout()}>
              Logout
            </a>
          </span>
        ) : (
          <span>Header</span>
        )}
      </header>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Login />} />
          <Route path="/recipes" element={<Recipe />} />
          <Route path="/main" element={<Main />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
