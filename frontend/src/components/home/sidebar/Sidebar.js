import "./Sidebar.css";
import SidebarFooter from "./SidebarFooter";
import NewConversationButton from "./NewConversationButton.js";
import Conversations from "./Conversations.js";

const Sidebar = () => {

  return (
    <header>
      <div className="sidebar">
        <h1>The Solomon Project</h1>
        <NewConversationButton/>
        <Conversations/>
        <SidebarFooter/>
      </div>
    </header>
  );
};

export default Sidebar;
