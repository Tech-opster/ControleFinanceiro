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

const ProfileMenu: React.FC = () => {
  const { handleSignOut } = useSignOut();

  return (
    <>
      <IonMenu contentId="main-content" menuId="profileMenu" side="end">
        <IonHeader>
          <IonToolbar>
            <IonMenuToggle slot="end">
              <IonButton>
                <IonIcon icon={personCircleOutline} />
              </IonButton>
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

      <IonHeader>
        <IonToolbar>
          <IonButtons slot="end">
            <IonMenuButton menu="profileMenu">
              <IonIcon icon={personCircleOutline} />
            </IonMenuButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
    </>
  );
};

export default ProfileMenu;
