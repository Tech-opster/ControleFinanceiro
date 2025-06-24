import { Redirect, Route } from "react-router-dom";
import {
  IonButtons,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonToolbar,
} from "@ionic/react";
import {
  addCircle,
  bagHandle,
  home,
  personCircleOutline,
  removeCircle,
  trendingUp,
} from "ionicons/icons";
import { IonReactRouter } from "@ionic/react-router";
import HomePage from "../../pages/home/HomePage";
import Incomes from "../../pages/incomes/Incomes";
import OutFlow from "../../pages/outflow/Outflow";
import Expenses from "../../pages/expenses/Expenses";
import Investments from "../../pages/investments/Investments";
import ProfileMenu from "../profileMenu/ProfileMenu";
import MainMenu from "../mainMenu/MainMenu";

const AppTabs: React.FC = () => {
  return (
    <IonReactRouter>
      <MainMenu contentId="main-content" menuId="mainMenu" />
      <ProfileMenu contentId="main-content" menuId="profileMenu" />
      <IonTabs>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton menu="mainMenu" />
            </IonButtons>
            <IonButtons slot="end">
              <IonMenuButton menu="profileMenu">
                <IonIcon icon={personCircleOutline} />
              </IonMenuButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <IonRouterOutlet id="main-content">
          <Redirect exact path="/" to="/home" />

          <Route exact path="/incomes" component={Incomes} />
          <Route exact path="/outflow" component={OutFlow} />
          <Route exact path="/home" component={HomePage} />
          <Route exact path="/expenses" component={Expenses} />
          <Route exact path="/investments" component={Investments} />
        </IonRouterOutlet>

        <IonTabBar slot="bottom"> {/* FIXME corrigir selected icon quando carregar página*/}
          <IonTabButton tab="incomes" href="/incomes">
            <IonIcon icon={addCircle} />
          </IonTabButton>
          <IonTabButton tab="outflow" href="/outflow">
            <IonIcon icon={removeCircle} />
          </IonTabButton>
          <IonTabButton tab="home" href="/home">
            <IonIcon icon={home} />
          </IonTabButton>
          <IonTabButton tab="expenses" href="/expenses">
            <IonIcon icon={bagHandle} />
          </IonTabButton>
          <IonTabButton tab="investments" href="/investments">
            <IonIcon icon={trendingUp} />
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  );
};

export default AppTabs;
