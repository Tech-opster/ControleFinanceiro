import { IonContent, IonPage } from "@ionic/react";
import LoginForm from "../../components/login/LoginForm";

const Login: React.FC = () => {
  return (
    <IonPage>
      <IonContent className="ion-padding">
        <LoginForm></LoginForm>
      </IonContent>
    </IonPage>
  );
};

export default Login;
