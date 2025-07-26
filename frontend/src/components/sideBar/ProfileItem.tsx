import { IonIcon } from "@ionic/react";
import { logOutOutline } from "ionicons/icons";
import { useSignOut } from "../../hooks/useSignOut";
import { forwardRef } from "react";
import { auth } from "../../firebase/firebase";

const ProfileItem = forwardRef<HTMLDivElement>((_, ref) => {
  const { handleSignOut } = useSignOut();

  return (
    <div
      ref={ref}
      className="
          z-999 min-w-[250px] max-w-[30vw] absolute flex justify-between items-end left-full bottom-1 rounded-md p-3 pr-2 ml-6 gap-2 text-indigo-800
          bg-indigo-100 text-sm -translate-x-3"
    >
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold !mt-0 [overflow-wrap:anywhere]">
          Olá, {auth.currentUser?.displayName?.split(" ")[0]}
        </h4>
        <span className="text-xs text-gray-400 block truncate">
          {auth.currentUser?.email}
        </span>
      </div>
      <div className="relative flex items-center transition-colors group">
        <button onClick={handleSignOut}>
          <IonIcon className="text-3xl" color="danger" icon={logOutOutline} />
        </button>
        <div
          className="
            z-999 absolute left-full rounded-md px-2 py-1 ml-6
            bg-indigo-100 text-indigo-800 text-sm
            invisible opacity-20 -translate-x-3 transition-all
            group-hover:visible group-hover:opacity-100 group-hover:translate-x-0"
        >
          Sair
        </div>
      </div>
    </div>
  );
});

export default ProfileItem;
