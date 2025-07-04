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
          z-999 w-[250px] min-w-fit absolute flex justify-between items-end left-full bottom-1 rounded-md p-3 ml-6 gap-1 text-indigo-800
          bg-indigo-100 text-sm -translate-x-3"
    >
      <div className="leading-4 text-start">
        <h4 className="font-semibold !mt-0 [overflow-wrap:anywhere]">
          {auth.currentUser?.email?.split("@")[0]}
        </h4>
        <span className="text-xs text-gray-400">
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
