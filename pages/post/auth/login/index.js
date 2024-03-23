import { useState } from "react";
import styles from "../../../../components/login.module.css"; // Import CSS module
import { useRouter } from "next/router";
import axios from "axios";
import { HOST } from "../../../../Hosts.ts";
const LoginForm = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const router = useRouter();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${HOST}/auth/signin`, formData);
      const { token } = res.data;
      window.localStorage.setItem("token", token);

      router.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>
      {" "}
      {/* Apply container class */}
      <div className={styles.content}>
        <h3 className={styles.title}>Welcome Back</h3>
        <div>
          <h1 className={styles.subtitle}>Login</h1>
        </div>
        <form className={styles.form}>
          <div className={styles.inputGroup}>
            <div className={styles.inputWrapper}>
              <span className={styles.label}>Email</span>
              <input
                type="email"
                onChange={(e) => handleInputChange(e)}
                name="email"
                className={styles.input}
              />
            </div>
            <div className={styles.inputWrapper}>
              <span className={styles.label}>Password</span>
              <input
                onChange={(e) => handleInputChange(e)}
                name="password"
                type={passwordVisible ? "text" : "password"}
                className={styles.input}
              />
              <button
                type="button"
                className={styles.toggleButton}
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <button
            type="button"
            onClick={(e) => handleLogin(e)}
            className={styles.loginButton}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
