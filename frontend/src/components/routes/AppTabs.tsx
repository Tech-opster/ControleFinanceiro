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
  infiniteOutline,
  logoBitcoin,
  removeCircle,
  trendingUp,
} from "ionicons/icons";
import { IonReactRouter } from "@ionic/react-router";
import { useIsMobile } from "../../hooks/useIsMobile";
import { auth } from "../../firebase/firebase";

import HomePage from "../../pages/home/HomePage";
import Incomes from "../../pages/incomes/Incomes";
import OutFlow from "../../pages/outflows/Outflows";
import Categories from "../../pages/categories/Categories";
import Investments from "../../pages/investments/Investments";
import Sidebar from "../sideBar/Sidebar";
import SidebarItem from "../sideBar/SidebarItem";
import ProfileMenu from "../profileMenu/ProfileMenu";
import Cryptos from "../../pages/cryptos/Cryptos";
import Rewards from "../../pages/rewards/Rewards";

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
              to="/categories"
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
            <SidebarItem
              icon={
                <IonIcon
                  className="custom-gray400"
                  size="large"
                  icon={logoBitcoin}
                />
              }
              text="Criptomoedas"
              to="/cryptos"
            />
            <SidebarItem
              icon={
                <IonIcon
                  className="custom-gray400"
                  size="large"
                  icon={infiniteOutline}
                />
              }
              text="Pontuações"
              to="/rewards"
            />
          </Sidebar>
        )}

        <div className={`flex-1 ${!isMobile && "relative"}`}>
          {isMobile && (
            <ProfileMenu contentId="main-content" menuId="profileMenu" />
          )}

          <IonTabs>
            <IonRouterOutlet id="main-content">
              <Redirect exact path="/" to="/home" />
              <Route exact path="/incomes" component={Incomes} />
              <Route exact path="/outflow" component={OutFlow} />
              <Route exact path="/home" component={HomePage} />
              <Route exact path="/categories" component={Categories} />
              <Route exact path="/investments" component={Investments} />
              <Route exact path="/cryptos" component={Cryptos} />
              <Route exact path="/rewards" component={Rewards} />
            </IonRouterOutlet>

            {/* FIXME corrigir selected icon quando carregar página*/}
            {isMobile && (
              <>
                <IonHeader>
                  <IonToolbar className="!py-2">
                    <IonButtons slot="end">
                      <IonMenuButton menu="profileMenu">
                        <img
                          src={`https://ui-avatars.com/api/?background=a0a0a0&color=000&name=${
                            auth.currentUser?.email?.split("@")[0]
                          }&length=2`}
                          alt=""
                          className="w-10 rounded-md"
                        />
                      </IonMenuButton>
                    </IonButtons>
                  </IonToolbar>
                </IonHeader>

                <IonTabBar slot="bottom">
                  <IonTabButton tab="incomes" href="/incomes">
                    <IonIcon icon={addCircle} />
                    Entradas
                  </IonTabButton>
                  <IonTabButton tab="outflow" href="/outflow">
                    <IonIcon icon={removeCircle} />
                    Saídas
                  </IonTabButton>
                  <IonTabButton tab="home" href="/home">
                    <IonIcon icon={home} />
                    Home
                  </IonTabButton>
                  <IonTabButton tab="investments" href="/investments">
                    <IonIcon icon={trendingUp} />
                    Investimentos
                  </IonTabButton>
                  <IonTabButton tab="cryptos" href="/cryptos">
                    <IonIcon icon={logoBitcoin} />
                    Criptos
                  </IonTabButton>
                </IonTabBar>
              </>
            )}
          </IonTabs>
        </div>
      </div>
    </IonReactRouter>
  );
};

export default AppTabs;
