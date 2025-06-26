import { IonContent, IonPage } from "@ionic/react";
import LoginForm from "../../components/authentication/LoginForm";

const Login: React.FC = () => {
  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div className="h-full min-h-fit flex justify-center items-center">
          <LoginForm></LoginForm>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
