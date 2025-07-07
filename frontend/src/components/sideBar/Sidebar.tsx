import { useEffect, useRef, useState } from "react";
import ionic_light_logo_blue from "../../assets/images/ionic light logo blue.svg";
import ProfileItem from "./ProfileItem";
import { auth } from "../../firebase/firebase";

const Sidebar: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [showProfile, setShowProfile] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      const isClickInsideButton = buttonRef.current?.contains(
        event.target as Node
      );
      const isClickInsideProfile = profileRef.current?.contains(
        event.target as Node
      );

      if (!isClickInsideButton && !isClickInsideProfile) {
        setShowProfile(false);
      }
    };

    if (showProfile) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showProfile]);

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

        <div className="relative border-t border-gray-500 flex justify-center">
          <button ref={buttonRef} onClick={handleClick}>
            <div
              className={`p-3 my-2 relative flex justify-center items-center rounded-md transition-colors group ${
                showProfile
                  ? "bg-gradient-to-tr from-indigo-200 to-indigo-100"
                  : "hover:bg-indigo-500"
              }`}
            >
              <img
                src={`https://ui-avatars.com/api/?background=a0a0a0&color=000&name=${auth.currentUser?.displayName}&length=2`}
                alt=""
                className="w-10 h-10 rounded-md"
              />
              <div
                className={`${showProfile && "hidden"}
                  z-999 absolute left-full rounded-md px-2 py-1 ml-6
                  bg-indigo-100 text-indigo-800 text-sm
                  invisible opacity-20 -translate-x-3 transition-all
                  group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
              >
                Perfil
              </div>
            </div>
          </button>
          {showProfile && <ProfileItem ref={profileRef} />}
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
