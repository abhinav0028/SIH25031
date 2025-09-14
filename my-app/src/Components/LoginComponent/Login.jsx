import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../firebaseConfig";
import { Link } from "react-router-dom";
import "./Login.css";

function Login() {
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("✅ User Info:", result.user);
      alert(`Welcome ${result.user.displayName}`);
    } catch (error) {
      console.error("❌ Google login error:", error);
      alert(error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form>
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <button type="submit" className="btn btn-red">Sign In</button>
        </form>

        <button onClick={handleGoogleLogin} className="btn btn-dark" style={{ marginTop: "10px" }}>
          Sign in with Google
        </button>

        <p className="signup-text">
          Don’t have an account? <Link to="/register">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
