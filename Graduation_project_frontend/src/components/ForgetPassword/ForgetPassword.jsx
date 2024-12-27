import { useState } from "react";
import TextInput from "../../components/base-components/textInput";
import BaseButton from "../../components/base-components/baseButton";
import log from "../../assets/log&re.png";
import logo from "../../assets/logo.png";
import EmailIcon from "../../SVGs/EmailIcon";
import PasswordIcon from "../../SVGs/Password";
import "../Login/Login.css";
import {  useNavigate } from "react-router-dom";
import * as resetPassword from "../../API/resetPassword";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [password, setPassword] = useState("");
  
  const [emailError, setEmailError] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [tokenValid, setTokenValid] = useState(false);
  

  const navigate = useNavigate();
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };

  const onChangeResetToken = (e) => {
    setResetToken(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };


  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@sci.cu.edu.eg/;

    // if (!emailRegex.test(email)) {
    //   setEmailError("Enter a valid email address.");
    //   return false;
    // }

    return true;
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    if (validateEmail()) {
      await resetPassword.sendResetToken(email).then((res) => {
        console.log(res)
        if (res) {
          console.log(res)
          setEmailSent(true);
        }
      });
    }
  };

  const validateToken = async (e) => {
    e.preventDefault();
    if (validateEmail()) {
      resetPassword.validateResetToken(email, resetToken).then((res) => {
        if (res.statusCode === 200) {
          setTokenValid(true);
        } else {
          setEmailError("Invalid reset token");
        }
      });
    }
  };

  const updatePassword = async (e) => {
    e.preventDefault();
    if (validateEmail()) {
      resetPassword.resetPassword(email, password).then((res) => {
        if (res) {
          navigate("/login");
        }
      });
    }
  };

  return (
    <>
      {!emailSent && !tokenValid ? (
        <div className="l-container">
          <div className="l-left-container">
            <div className="l-logo-container">
              <img src={logo} alt="logo image" />
            </div>
            <div className="l-inputs-container">
              <div className="l-welcome-back">
                Enter Your Email<br/> To Reset
              </div>
              <form onSubmit={sendEmail}>
                <TextInput
                  name={"Email"}
                  placeholder={"Enter You Academic Email"}
                  onChange={onChangeEmail}
                  type={"text"}
                  error={emailError}
                  icon={<EmailIcon />}
                  value={email}
                />
                <BaseButton name={"Reset Password"} handelSubmit={sendEmail} />
              </form>
            </div>
          </div>
          <div className="l-right-container">
            <div className="l-robot-container">
              <img src={log} />
            </div>
          </div>
        </div>) : !tokenValid? (
          <div className="l-container">
          <div className="l-left-container">
            <div className="l-logo-container">
              <img src={logo} alt="logo image" />
            </div>
            <div className="l-inputs-container">
              <div className="l-welcome-back">
                Enter Your Reset<br/> Token
              </div>
              <form onSubmit={validateToken}>
                <TextInput
                  name={"Reset Token"}
                  placeholder={"Enter You reset Token"}
                  onChange={onChangeResetToken}
                  value={resetToken}
                  type={"text"}
                  error={emailError}
                />
                <BaseButton name={"Reset Password"} handelSubmit={validateToken} />
              </form>
            </div>
          </div>
          <div className="l-right-container">
            <div className="l-robot-container">
              <img src={log} />
            </div>
          </div>
        </div>
        ) : (
          <div className="l-container">
          <div className="l-left-container">
            <div className="l-logo-container">
              <img src={logo} alt="logo image" />
            </div>
            <div className="l-inputs-container">
              <div className="l-welcome-back">
                Enter Your New Password<br/> Don't Forget It Again Please
              </div>
              <form onSubmit={updatePassword}>
                <TextInput
                  name={"password"}
                  placeholder={"Enter Your new password"}
                  onChange={onChangePassword}
                  type={"text"}
                  icon={<PasswordIcon />}
                  value={password}
                />
                <BaseButton name={"Reset Password"} handelSubmit={updatePassword} />
              </form>
            </div>
          </div>
          <div className="l-right-container">
            <div className="l-robot-container">
              <img src={log} />
            </div>
          </div>
        </div>
        )
      }
    </>
  );
};

export default ForgetPassword;
