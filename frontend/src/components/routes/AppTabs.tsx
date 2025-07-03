import { Redirect, Route } from "react-router-dom";
import {
  IonIcon,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import {
  addCircle,
  bagHandle,
  home,
  removeCircle,
  trendingUp,
} from "ionicons/icons";
import { IonReactRouter } from "@ionic/react-router";
import { useIsMobile } from "../../hooks/useIsMobile";

import HomePage from "../../pages/home/HomePage";
import Incomes from "../../pages/incomes/Incomes";
import OutFlow from "../../pages/outflow/Outflow";
import Expenses from "../../pages/expenses/Expenses";
import Investments from "../../pages/investments/Investments";
import Sidebar from "../sideBar/Sidebar";
import SidebarItem from "../sideBar/SidebarItem";

const AppTabs: React.FC = () => {
  const isMobile = useIsMobile();

  return (
    <IonReactRouter>
      <div className="flex">
        {!isMobile && (
          <Sidebar>
            <SidebarItem
              icon={
                <IonIcon className="custom-gray400" size="large" icon={home} />
              }
              text="Home"
              to="/home"
            />
            <SidebarItem
              icon={
                <IonIcon
                  className="custom-gray400"
                  size="large"
                  icon={addCircle}
                />
              }
              text="Entradas"
              to="/incomes"
            />
            <SidebarItem
              icon={
                <IonIcon
                  className="custom-gray400"
                  size="large"
                  icon={removeCircle}
                />
              }
              text="Saídas"
              to="/outflow"
            />
            <SidebarItem
              icon={
                <IonIcon
                  className="custom-gray400"
                  size="large"
                  icon={bagHandle}
                />
              }
              text="Despesas"
              to="/expenses"
            />
            <SidebarItem
              icon={
                <IonIcon
                  className="custom-gray400"
                  size="large"
                  icon={trendingUp}
                />
              }
              text="Investimentos"
              to="/investments"
            />
          </Sidebar>
        )}

        <div className={`flex-1 ${!isMobile && "relative"}`}>
          <IonTabs>
            <IonRouterOutlet>
              <Redirect exact path="/" to="/home" />
              <Route exact path="/incomes" component={Incomes} />
              <Route exact path="/outflow" component={OutFlow} />
              <Route exact path="/home" component={HomePage} />
              <Route exact path="/expenses" component={Expenses} />
              <Route exact path="/investments" component={Investments} />
            </IonRouterOutlet>

            {/* FIXME corrigir selected icon quando carregar página*/}
            {isMobile && (
              <IonTabBar slot="bottom">
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
            )}
          </IonTabs>
        </div>
      </div>
    </IonReactRouter>
  );
};

export default AppTabs;
