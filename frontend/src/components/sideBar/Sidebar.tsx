import { useState } from "react";
import ionic_light_logo_blue from "../../assets/images/ionic light logo blue.svg";
import ProfileItem from "./ProfileItem";

const Sidebar: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [showProfile, setShowProfile] = useState(false);

  const handleClick = () => {
    setShowProfile((prev) => !prev);
  };

  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col shadow-sm custom-gray">
        <div className="p-4 pb-5 flex justify-center items-center">
          <img
            src={ionic_light_logo_blue}
            className="w-10 overflow-hidden transition-all"
            alt=""
          />
        </div>

        <ul className="flex-1 px-3">{children}</ul>

        <button onClick={handleClick}>
          <div className={`relative border-t border-gray-500 flex justify-center items-center p-5 ${showProfile ? "bg-indigo-500" : "hover:bg-indigo-500"}`}>
            <img
              src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
              alt=""
              className="w-10 h-10 rounded-md"
            />
            {showProfile && <ProfileItem />}
          </div>
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
