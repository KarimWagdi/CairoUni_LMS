import { useState, useEffect } from "react";
import styles from "./registerStyles.module.css";
import TextInput from "../../components/base-components/textInput";
import BaseButton from "../../components/base-components/baseButton";
import log from "../../assets/log&re.png";
import logo from "../../assets/logo.png";
import DropdownBase from "../base-components/dropdownBase";
import UserIcon from "../../SVGs/UserIcon";
import Password from "../../SVGs/Password";
import EmailIcon from "../../SVGs/EmailIcon";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../../API/auth";
import { getDepartments } from "../../api/department";

const Register = () => {
  const navegate = useNavigate();
  const [departments, setdepartments] = useState([]);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [departmentId, setDepartmentId] = useState(1);

  const [fullNameError, setFullNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const onChangeFullName = (e) => {
    setFullName(e.target.value);
    setFullNameError("");
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
    setPasswordError("");
  };

  const onChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
    setConfirmPasswordError("");
  };

  const validateForm = () => {
    if (
      !fullName.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      setFullNameError("Yor Name cannot be empty.");
      setEmailError("Email cannot be empty.");
      setPasswordError("Password cannot be empty.");
      setConfirmPasswordError("Confirm Password cannot be empty.");
      return false;
    }
    const nameRegex = /^[A-Z a-z]+$/;

    if (!nameRegex.test(fullName)) {
      setFullNameError("Enter a valid  Name.");
      return false;
    }

    const emailRegex = /^[^\s@]+@gmail.com/;

    if (!emailRegex.test(email)) {
      setEmailError("Enter a valid email address.");
      return false;
    }

    const passwordRegex =
      /^(?=.*[!@#$%^&*()_+{}\\[\]:;<>,.?~\\/\\-])(?=.*[A-Z])(?=.*[0-9]).{8,}$/;

    if (!passwordRegex.test(password)) {
      setPasswordError(
        "Password must contain at least one special character, one uppercase letter, one digit, and be at least 8 characters long."
      );
      return false;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
      return false;
    }

    return true;
  };
  const handleSelect = (e) => {
    setDepartmentId(departments[e.target.selectedIndex].id);
  };
  useEffect(() => {
    getDepartments().then((res) => {
      setdepartments(res.data.data);
    });
  }, []);

  const handelSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
    register(
        fullName,
        email,
        password,
        departmentId
      )
      .then((res) => {
        setFullName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setFullNameError("");
        setEmailError("");
        setPasswordError("");
        setConfirmPasswordError("");
        if(res.status === 200 && res?.data?.data[0]?.token)
          localStorage.setItem("token", res.data.data[0].token);
        if(res.status === 200 && res?.data?.data[0]?.token)
          navegate("/home");
        else 
          setEmailError("Email already exists.");
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  };
  return (
    <div className={styles.container}>
      <div className={styles.left_container}>
        <div className={styles.log_container}>
          <img src={log} alt="register image" />
        </div>
      </div>
      <div className={styles.right_container}>
        <div className={styles.logo_container}>
          <img src={logo} alt="logo image" />
        </div>
        <div className={styles.inputs_container}>
          <div className={styles.welcome}>
            Register
            <br />
            Welcome Prof.!
          </div>
          <TextInput
            name={"Full Name"}
            placeholder={"Enter Your First Name"}
            onChange={onChangeFullName}
            type={"text"}
            error={fullNameError}
            icon={<UserIcon />}
          />

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
          <TextInput
            name={"Confirm Password"}
            placeholder={"Re-enter Your Password"}
            onChange={onChangeConfirmPassword}
            type={"password"}
            error={confirmPasswordError}
            icon={<Password />}
          />
          <DropdownBase departments={departments} handleSelect={handleSelect} />
          <BaseButton name={"Register"} handelSubmit={handelSubmit} />
          <div className={styles.go_to_login}>
            If you have an account
            <br />
            You can
            <Link to="/login">
              <span> Login here !</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
