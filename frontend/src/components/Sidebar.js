import React from "react";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import "./Sidebar.css";
import { v4 as uuidv4 } from 'uuid';


const Sidebar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const handleLogout = () => {
    logout();
  };

  const handleClick = () => {
    const newUuid = uuidv4();

    window.history.pushState({}, '', `/your-url/${newUuid}`);

  }

  return (
    <header>
      <div className="sidebar">
        <h1>The Solomon Project</h1>

        <button onClick={handleClick}>New Conversation</button>


        {user && (
          <div className="sidebar-footer">
            <span>{user.email}</span>
            <button onClick={handleLogout}>Log out</button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Sidebar;
