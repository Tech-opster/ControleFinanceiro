import {
  IonContent,
  IonFooter,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

const Incomes: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        <div className="h-full min-h-fit flex justify-center items-center">
          <h1>Entradas</h1>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Incomes;
