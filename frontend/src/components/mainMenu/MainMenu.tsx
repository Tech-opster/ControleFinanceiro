import {
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonMenuButton,
  IonButtons,
  IonMenuToggle,
  IonButton,
  IonIcon,
} from "@ionic/react";
import {
  addCircle,
  bagHandle,
  home,
  removeCircle,
  trendingUp,
} from "ionicons/icons";

interface Props {
  contentId: string;
  menuId: string;
}

const MainMenu: React.FC<Props> = ({ contentId, menuId }) => {
  return (
    <>
      <IonMenu contentId={contentId} menuId={menuId} side="start" type="push">
        <IonHeader>
          <IonToolbar>
            <IonMenuToggle slot="start">
              <IonMenuButton menu="mainMenu" />
            </IonMenuToggle>
            <IonTitle>Menu</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            <IonItem routerLink="/home">
              <IonIcon icon={home} />
              <IonLabel className="ion-padding-start">Home</IonLabel>
            </IonItem>
            <IonItem routerLink="/incomes">
              <IonIcon icon={addCircle} />
              <IonLabel className="ion-padding-start">Entradas</IonLabel>
            </IonItem>
            <IonItem routerLink="/outflow">
              <IonIcon icon={removeCircle} />
              <IonLabel className="ion-padding-start">Saídas</IonLabel>
            </IonItem>
            <IonItem routerLink="/expenses">
              <IonIcon icon={bagHandle} />
              <IonLabel className="ion-padding-start">Despesas</IonLabel>
            </IonItem>
            <IonItem routerLink="/investments">
              <IonIcon icon={trendingUp} />
              <IonLabel className="ion-padding-start">Investimentos</IonLabel>
            </IonItem>
          </IonList>
        </IonContent>
      </IonMenu>
    </>
  );
};

export default MainMenu;
