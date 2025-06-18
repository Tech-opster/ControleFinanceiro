import { IonContent, IonPage } from "@ionic/react";
import LoginForm from "../../components/login/LoginForm";

const Login: React.FC = () => {
  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div className="container">
          <LoginForm></LoginForm>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
