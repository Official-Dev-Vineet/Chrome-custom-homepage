import { useContext, useState } from "react";
import "./navbar.css";
import { AccountControl } from "../Utils/AccountControl";
import { userContext } from "../Context/Context";
import { SearchField } from "../Utils/SearchField";
export const Navbar = () => {
  const [isActive, setIsActive] = useState(false);
  const { user } = useContext(userContext);
  return (
    <nav className="flex align-center gap-xl justify-between pad-content-y pad-content-x">
      <div className="logo ff-2">
        <span className={`t-primary transition ${isActive && "t-i-shadow"}`}>
         {user.username}
        </span>
      </div>
      <SearchField /> 

      <div className="sideBar">
        <div
          className={`bar flex flex-col pointer radius-1 ${
            isActive && "active"
          }`}
          onClick={() => setIsActive(!isActive)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
        <AccountControl activeState={!isActive} />
      </div>
    </nav>
  );
};
