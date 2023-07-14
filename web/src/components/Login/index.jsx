import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../../api";

import styles from "./styles.module.css";

const Login = ({ handleLogin }) => {
  const navigate = useNavigate();
  const [data, setData] = useState({ name: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await api
      .post("/admins/signIn", {
        name: data.name,
        password: data.password,
      })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("token", res.data.token);

        handleLogin();

        navigate("/");
      })
      .catch((err) => {
        console.log(err, err.message);

        if (
          err.response &&
          err.response.status >= 400 &&
          err.response.status <= 500
        ) {
          setError(err.response.data.msg);
        }
      });
  };

  return (
    <div className={styles.login_container}>
      <div className={styles.login_form_container}>
        <div className={styles.login_box}>
          <img
            src={process.env.PUBLIC_URL + "/assets/Groovy-Logo.png"}
            alt="login-Logo"
            className={styles.logo_login}
          />
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1>Groovy Admin</h1>
            <input
              type="text"
              placeholder="Name"
              name="name"
              onChange={handleChange}
              value={data.name}
              required
              className={styles.input}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className={styles.input}
            />
            {error && <div className={styles.error_msg}>{error}</div>}
            <button type="submit" className={styles.orange_btn}>
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;