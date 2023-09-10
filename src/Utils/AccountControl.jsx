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
export const AccountControl = ({ activeState }) => {
  const [isShow, setIsShow] = useState(false);
  const sideBarHandler = () => {
    setIsShow(!isShow);
  };
  useEffect(() => {
    activeState ? setIsShow(false) : null;
  }, [activeState]);
  return (
    <aside
      className={`shadow-3d padding-md transition radius-1 ${
        activeState && "active"
      }`}
    >
      <h2 className="ff-1 mb tac">Account Control</h2>
      <ul className="service relative flex flex-col gap-sm">
        <li
          className="pointer flex align-center gap-sm"
          onClick={() => sideBarHandler()}
        >
          <FaUserCircle />
          <span className="text">Profile</span>
        </li>
        {isShow && <UserChange />}
        <li className="pointer transition  flex align-center gap-sm">
          <MdSettingsSuggest />
          <span className="text">Settings</span>
        </li>
        <li className="pointer transition  flex align-center gap-sm">
          <BsFillBookmarkStarFill />
          <span className="text">Bookmarks</span>
        </li>
        <li className="pointer transition  flex align-center gap-sm">
          <FaHistory />
          <span className="text">History</span>
        </li>
        <li className="pointer transition  flex align-center gap-sm">
          <FiLogOut />
          <span className="text">Logout</span>
        </li>
        <li className="pointer transition  flex align-center gap-sm">
          <BiSolidHelpCircle />
          <span className="text">Help</span>
        </li>
        <li className="pointer transition  flex align-center gap-sm">
          <span className="t-info tac w-full block mt">Version 1.0</span>
        </li>
      </ul>
    </aside>
  );
};
AccountControl.propTypes = {
  activeState: PropTypes.bool.isRequired,
};
