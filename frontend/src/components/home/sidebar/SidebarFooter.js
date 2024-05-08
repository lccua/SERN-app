import { useLogout } from "../../../hooks/authentication/useLogout";
import useAuthContext from "../../../hooks/context/useAuthContext";
import "./Sidebar.css";

const SidebarFooter = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  return (
    <div className="sidebar-footer">
      {user && (
        <>
          <span>{user.email}</span>
          <button onClick={logout}>Log out</button>
        </>
      )}
    </div>
  );
};

export default SidebarFooter;
