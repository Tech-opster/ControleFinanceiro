import { useIonRouter } from "@ionic/react";
import { useLocation } from "react-router-dom";

interface Props {
  icon: React.ReactNode;
  text: string;
  to: string;
  alert?: boolean;
}

const SidebarItem: React.FC<Props> = ({ icon, text, to, alert }) => {
  const router = useIonRouter();
  const location = useLocation();
  const active = location.pathname === to;

  const handleClick = () => {
    router.push(to, "root", "replace");
  };

  return (
    <li
      className={`
        h-12 relative flex items-center py-2 px-3 my-2
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${
          active
            ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 active-button"
            : "hover:bg-indigo-500"
        }
    `}
      onClick={handleClick}
    >
      {icon}

      {alert && (
        <div
          className="absolute right-2 w-2 h-2 rounded bg-indigo-400 top-2"
        />
      )}

      <div
        className="
          z-999 absolute left-full rounded-md px-2 py-1 ml-6
          bg-indigo-100 text-indigo-800 text-sm pointer-events-none
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0"
      >
        {text}
      </div>
    </li>
  );
};

export default SidebarItem;
