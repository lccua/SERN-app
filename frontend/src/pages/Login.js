import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

// https://www.youtube.com/watch?v=to-V-LcsXUU&list=PL4cUxeGkcC9g8OhpOZxNdhXggFz2lOuCT&index=16
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
  };

  

  return (
    <form className="signup" onSubmit={handleSubmit}>

      <h3>Login</h3>
      <label>Email</label>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        />
      <label>Password</label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        />

      <button disabled={isLoading}>Login</button>
      <p> Don't have an account? <a href="/registration">Register</a></p>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Login;
