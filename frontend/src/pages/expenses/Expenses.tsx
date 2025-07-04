import {
  IonContent,
  IonPage,
} from "@ionic/react";

const Expenses: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        <div className="h-full min-h-fit flex justify-center items-center">
          <h1>Despesas</h1>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Expenses;
