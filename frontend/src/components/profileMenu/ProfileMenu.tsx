import {
  IonMenu,
  IonHeader,
  IonButton,
  IonIcon,
  IonContent,
  IonMenuButton,
  IonCard,
} from "@ionic/react";
import { exitOutline } from "ionicons/icons";
import { useSignOut } from "../../hooks/useSignOut";
import { auth } from "../../firebase/firebase";

interface Props {
  contentId: string;
  menuId: string;
}

const ProfileMenu: React.FC<Props> = ({ contentId, menuId }) => {
  const { handleSignOut } = useSignOut();

  return (
    <>
      <IonMenu contentId={contentId} menuId={menuId} side="end">
        <IonHeader className="p-1">
          <IonCard
            className="!flex justify-between gap-1 p-3 pr-2 text-indigo-800
          bg-indigo-100 "
          >
            <div className="w-full flex justify-between items-start gap-1">
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold !mt-0 [overflow-wrap:anywhere]">
                  Olá, {auth.currentUser?.displayName?.split(" ")[0]}
                </h4>
                <span className="text-xs text-gray-400 block truncate">
                  {auth.currentUser?.email}
                </span>
              </div>
              <IonMenuButton className="h-fit">
                <img
                  src={`https://ui-avatars.com/api/?background=a0a0a0&color=000&name=${auth.currentUser?.displayName}&length=2`}
                  alt=""
                  className="w-10 rounded-md"
                />
              </IonMenuButton>
            </div>
          </IonCard>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonButton fill="clear" color="danger" onClick={handleSignOut}>
            <IonIcon icon={exitOutline} />
            <span className="ion-padding-start">Sair</span>
          </IonButton>
        </IonContent>
      </IonMenu>
    </>
  );
};

export default ProfileMenu;
