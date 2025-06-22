import {
  IonContent,
  IonFooter,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

const Investments: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar></IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <h1>Investimentos</h1>
          </IonToolbar>
        </IonHeader>
        <IonContent></IonContent>
      </IonContent>
    </IonPage>
  );
};

export default Investments;
