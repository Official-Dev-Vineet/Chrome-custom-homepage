import PropTypes from "prop-types";
import "./account.css";
import { FaUserCircle } from "react-icons/fa";
import { UserChange } from "./UserChange";
import { useEffect, useState } from "react";
import { MdSettingsSuggest } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { BsFillBookmarkStarFill } from "react-icons/bs";
import { FaHistory } from "react-icons/fa";
import { BiSolidHelpCircle } from "react-icons/bi";
import Settings from "./Settings";
import History from "./History";
export const AccountControl = ({ activeState }) => {
  const [isShow, setIsShow] = useState(false);
  const [isSettingShow, setIsSettingShow] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const sideBarHandler = (value) => {
    value === "isShow" ? setIsShow(pre => !pre) : value === "isSettingShow" ? setIsSettingShow(pre => !pre) : value === "history" ? setShowHistory(pre => !pre) : null
  };
  useEffect(() => {
    activeState ? setIsShow(false) : null;
    activeState ? setIsSettingShow(false) : null
    activeState ? setShowHistory(false) : null
  }, [activeState]);
  const logoutHandler = () => {
    localStorage.clear();
    window.location.reload();
  }
  return (
    <aside
      className={`shadow-3d padding-md transition radius-1 ${activeState && "active"
        }`}
    >
      <h2 className="ff-2 mb tac">Account Control</h2>
      <ul className="service relative flex flex-col gap-sm">
        <li
          className="pointer flex align-center gap-sm"
          onClick={() => sideBarHandler("isShow")}
        >
          <FaUserCircle />
          <span className="text">Profile</span>
        </li>
        {isShow && <UserChange />}
        <li className="pointer transition  flex align-center gap-sm"
          onClick={() => sideBarHandler("isSettingShow")}>
          <MdSettingsSuggest />
          <span className="text">Settings</span>
        </li>
        {
          isSettingShow && <Settings />
        }
        <li className="pointer transition  flex align-center gap-sm">
          <BsFillBookmarkStarFill />
          <span className="text">Bookmarks</span>
        </li>
        <li className="pointer transition  flex align-center gap-sm" onClick={() => sideBarHandler("history")}>
          <FaHistory />
          <span className="text">History</span>
        </li>{
          showHistory && <History />
        }
        <li className="pointer transition  flex align-center gap-sm">
          <FiLogOut />
          <span className="text" onClick={logoutHandler}>Logout</span>
        </li>
        <li className="pointer transition  flex align-center gap-sm">
          <BiSolidHelpCircle />
          <span className="text">Help</span>
        </li>
        <li className="pointer transition  flex align-center gap-sm">
          <span className="t-info tac w-full block mt">Version {import.meta.env.VITE_BROWSER_VERSION}</span>
        </li>
      </ul>
    </aside>
  );
};
AccountControl.propTypes = {
  activeState: PropTypes.bool.isRequired,
};
