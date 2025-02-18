import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:9999/users")
      .then((response) => response.json())
      .then((result) => setUsers(result))
      .catch(() => setMessage("Failed to load users."));
  }, []);

  function handleLogin(e) {
    e.preventDefault();
    const existUser = users.find(
      (u) => u.username === username && u.password === password
    );

    if (existUser) {
      localStorage.setItem(
        "account",
        JSON.stringify({ id: existUser.id, user: existUser.username })
      );
      navigate("/main");
    } else {
      setMessage("Wrong username or password.");
    }
  }

  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center vh-100"
      style={{ backgroundColor: "#f8f9fa" }}
    >
      <div
        className="p-4 shadow rounded bg-white"
        style={{ width: "320px", textAlign: "center" }}
      >
        <h2 className="mb-3">Login to Recipes</h2>

        {message && <div className="text-danger mb-3">{message}</div>}

        <form onSubmit={handleLogin}>
          <div className="mb-3 text-start">
            <label htmlFor="user" className="form-label fw-bold">
              Username:
            </label>
            <input
              onChange={(e) => setUsername(e.target.value)}
              className="form-control"
              type="text"
              id="user"
              required
            />
          </div>

          <div className="mb-3 text-start">
            <label htmlFor="pass" className="form-label fw-bold">
              Password:
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              type="password"
              id="pass"
              required
            />
          </div>

          <button className="btn btn-primary w-100" type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
