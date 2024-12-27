import "./textInput.css";
import VisibilityIcon from "../../SVGs/VisibilityIcon";
import UnvisibleIcon from "../../SVGs/UnvisibleIcon";

import { useState } from "react";

const TextInput = (props) => {
  const { name, placeholder, onChange, error, type, icon } = props;
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };
  const handleVisibilityToggle = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div>
      <label className="t-label" htmlFor={name}>
        {name}:
      </label>
      <br />

      <div
        className={`input-container ${error ? "error" : ""}${
          isFocused ? "focused" : ""
        }`}
      >
        <div>
          {icon}
          <input
            className={`t-input`}
            type={
              type == "password"
                ? isPasswordVisible
                  ? "text"
                  : "password"
                : type
            }
            id={name}
            name={name}
            placeholder={placeholder}
            onChange={onChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </div>
        {type == "password" ? (
          <div className="visibility-icon" onClick={handleVisibilityToggle}>
            {isPasswordVisible ? <UnvisibleIcon /> : <VisibilityIcon />}
          </div>
        ) : (
          ""
        )}
      </div>

      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default TextInput;
