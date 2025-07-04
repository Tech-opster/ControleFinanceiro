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
            <div>
              <h4 className="font-semibold !mt-0 [overflow-wrap:anywhere]">
                {auth.currentUser?.email?.split("@")[0]}
              </h4>{" "}
            </div>
            <IonMenuButton className="h-fit">
              <img
                src={`https://ui-avatars.com/api/?background=a0a0a0&color=000&name=${auth.currentUser?.email?.split("@")[0]}&length=2`}
                alt=""
                className="w-10 rounded-md"
              />
            </IonMenuButton>
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
