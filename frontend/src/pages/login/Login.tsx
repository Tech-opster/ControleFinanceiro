import { IonContent, IonPage } from "@ionic/react";
import LoginForm from "../../components/login/loginForm";

const Login: React.FC = () => {
  return (
    <IonPage>
      <IonContent>
        <LoginForm></LoginForm>
      </IonContent>
    </IonPage>
  );
};

export default Login;
