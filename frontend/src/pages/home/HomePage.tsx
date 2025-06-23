import {
  IonContent,
  IonFooter,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

const HomePage: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        <div className="container">
          <h1>Home</h1>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
