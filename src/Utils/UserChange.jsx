import { useContext, useMemo, useRef, useState } from "react";
import { userContext } from "../Context/Context";
import PropTypes from "prop-types";
export const UserChange = ({ isShow }) => {
  const { user, setUser } = useContext(userContext);
  const [validate, setValidate] = useState(false);
  const inputRef = useRef();
  const [error, setError] = useState(false);
  const validUser = (value) => {
    if (value.match(/^[a-zA-Z\s]*$/)) {
      localStorage.setItem("username", value);
      setUser({ ...user, username: value });
      setError(false);
      return true;
    } else {
      setError(true);
      return false;
    }
  };
  const validator = useMemo(() => {
    const timer = setTimeout(() => {
      validate && (
        <p className="t-success shadow-3d padding-sm w-full radius-2 mt">
          Username Changed !
        </p>
      );
    }, 2000);
    return clearTimeout(timer);
  }, [validate]);

  const inputHandler = (e) => {
    e.key === "Enter" ? setValidate(validUser(inputRef.current.value)) : null;
  };

  return (
    <aside
      className={`user-control shadow-3d tac padding-md flex gap-sm  flex-col transition radius-1 ${
        isShow && "show"
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
          onKeyUp={(e) => inputHandler(e)}
        />
        {error && <p className="t-dander">Only Alphabets Allowed !</p>}
        {validator}
      </div>
    </aside>
  );
};
UserChange.propTypes = {
  isShow: PropTypes.bool,
};
