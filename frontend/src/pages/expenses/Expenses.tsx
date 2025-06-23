import {
  IonContent,
  IonFooter,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

const Expenses: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        <div className="container">
          <h1>Despesas</h1>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Expenses;
