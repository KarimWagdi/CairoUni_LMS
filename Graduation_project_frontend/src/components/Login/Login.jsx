import { useState } from "react";
import TextInput from "../../components/base-components/textInput";
import BaseButton from "../../components/base-components/baseButton";
import log from "../../assets/log&re.png";
import logo from "../../assets/logo.png";
import EmailIcon from "../../SVGs/EmailIcon";
import Password from "../../SVGs/Password";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../API/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navegate = useNavigate();
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
    setPasswordError("");
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@gmail.com/;

    if (!emailRegex.test(email)) {
      setEmailError("Enter a valid email address.");
      return false;
    }

    return true;
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    if (validateEmail()) {
      await login(email, password)
        .then((res) => {
          if(res.status === 200 && res?.data?.token){
            localStorage.setItem("token", res.data.token);
            navegate("/home");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="l-container">
      <div className="l-left-container">
        <div className="l-logo-container">
          <img src={logo} alt="logo image" />
        </div>
        <div className="l-inputs-container">
          <div className="l-welcome-back">
            Sign in <br /> Welcome Back Prof.!
          </div>
          <form onSubmit={handelSubmit}>
            <TextInput
              name={"Email"}
              placeholder={"Enter You Academic Email"}
              onChange={onChangeEmail}
              type={"text"}
              error={emailError}
              icon={<EmailIcon />}
            />
            <TextInput
              name={"Password"}
              placeholder={"Enter Your Password"}
              onChange={onChangePassword}
              type={"password"}
              error={passwordError}
              icon={<Password />}
            />
            <div className="checkbox_Forgot_Password">
              <div>
                <input type="checkbox" />
                <label className="checkbox_label">Rememebr me</label>
              </div>
              <Link to="/forget-password" className="Forgot_Password">Forgot Password ?</Link>
            </div>
            <BaseButton name={"Login"} handelSubmit={handelSubmit} />
          </form>
          <div className="l-go-to-register">
            If you don’t have an account register
            <br />
            You can
            <Link to="/register">
              <span> Register here !</span>
            </Link>
          </div>
        </div>
      </div>
      <div className="l-right-container">
        <div className="l-robot-container">
          <img src={log} />
        </div>
      </div>
    </div>
  );
};

export default Login;
