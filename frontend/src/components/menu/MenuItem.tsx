import { useIonRouter } from "@ionic/react";
import { useLocation } from "react-router-dom";

interface Props {
  icon: React.ReactNode;
  text: string;
  to: string;
  alert?: boolean;
}

const MenuItem: React.FC<Props> = ({ icon, text, to, alert }) => {
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
        ${active && "bg-gradient-to-tr from-indigo-200 to-indigo-100 active-button"}`}
      onClick={handleClick}
    >
      {icon}

      {alert && (
        <div className="absolute right-2 w-2 h-2 rounded bg-indigo-400 top-2" />
      )}

      <div
        className={`
          z-999 left-full rounded-md px-2 py-1 ml-2
           text-indigo-800 text-sm ${active ? "bg-none" : "bg-indigo-100"}`}
      >
        {text}
      </div>
    </li>
  );
};

export default MenuItem;
