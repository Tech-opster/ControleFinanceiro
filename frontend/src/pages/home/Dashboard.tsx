import {
  IonContent,
  IonPage,
} from "@ionic/react";

const Dashboard: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        <div className="h-full min-h-fit flex justify-center items-center">
          <h1>Dashboard</h1>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
