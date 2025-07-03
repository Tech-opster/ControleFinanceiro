import { IonIcon } from "@ionic/react";
import { ellipsisVerticalOutline } from "ionicons/icons";

const ProfileItem: React.FC = () => {
  return (
    <div
      className="
          z-999 absolute flex items-start left-full bottom-1 rounded-md p-3 ml-6
          bg-indigo-100 text-indigo-800 text-sm
          -translate-x-3 transition-all"
    >
      <div className="leading-4 flex flex-col items-start">
        <h4 className="font-semibold !mt-0">John Doe da Silva Moreira Teste Oliveira</h4>
        <span className="text-xs text-gray-400">johndoe@gmail.com</span>
      </div>
      <IonIcon icon={ellipsisVerticalOutline} />
    </div>
  );
};

export default ProfileItem;
