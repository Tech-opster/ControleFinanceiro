import {
  IonMenu,
  IonHeader,
  IonToolbar,
  IonMenuToggle,
  IonButton,
  IonIcon,
  IonTitle,
  IonContent,
  IonButtons,
  IonMenuButton,
} from "@ionic/react";
import { personCircleOutline, exitOutline } from "ionicons/icons";
import { useSignOut } from "../../hooks/useSignOut";

interface Props {
  contentId: string;
  menuId: string;
}

const ProfileMenu: React.FC<Props> = ({ contentId, menuId }) => {
  const { handleSignOut } = useSignOut();

  return (
    <>
      <IonMenu contentId={contentId} menuId={menuId} side="end">
        <IonHeader>
          <IonToolbar>
            <IonMenuToggle slot="end">
              <IonMenuButton menu="profileMenu">
                <IonIcon icon={personCircleOutline} />
              </IonMenuButton>
            </IonMenuToggle>
            <IonTitle>Usuário</IonTitle>
          </IonToolbar>
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
