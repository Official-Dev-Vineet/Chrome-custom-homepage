import { useContext, useRef, useState } from "react";
import { userContext } from "../Context/Context";
import PropTypes from "prop-types";
export const UserChange = ({ isShow }) => {
  const { user, setUser } = useContext(userContext);
  const [validate, setValidate] = useState(false);
  const inputRef = useRef();
  const [error, setError] = useState(false);
  const validUser = (value) => {
    if (value.match(/^[a-zA-Z\s]*$/) && value.length > 3 && value.length < 20) {
      setError(false);
      return true;
    } else {
      setError(true);
      return false;
    }
  };
  const inputHandler = (e) => {
    e.key === "Enter" ? setValidate(validUser(inputRef.current.value.trim())) : null;
  };
  return (
    <aside
      className={`user-control shadow-3d tac padding-md flex gap-sm  flex-col transition radius-1 ${isShow && "show"
        }`}
    >
      <div className="wrapper flex align-center flex-col gap-sm">
        <h3 className="mb t-info">Enter Username</h3>
        <input
          type="text"
          autoFocus={!isShow}
          className="padding-sm pl shadow-3d t-light ff-2 transition radius-2 w-full"
          ref={inputRef}
          pattern="[a-zA-Z\s]*"
          maxLength={20}
          onKeyUp={(e) => inputHandler(e)}
        />
        {error && <div className="error">
          <p className="t-dander">Only Alphabets Allowed !</p>
          <p className="t-dander">Username must be between 3-20 characters !</p>
        </div>}
        {
          validate && <button className="pointer mt btn" onClick={() => {
            setUser({ ...user, username: inputRef.current.value.trim() })
            localStorage.setItem("username", inputRef.current.value.trim())
            setValidate(false)
            isShow && inputRef.current.blur()
          }}
          >Save</button>
        }
      </div>
    </aside>
  );
};
UserChange.propTypes = {
  isShow: PropTypes.bool,
};
