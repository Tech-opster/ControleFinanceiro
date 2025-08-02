import {
  IonMenu,
  IonHeader,
  IonIcon,
  IonContent,
  IonMenuButton,
} from "@ionic/react";
import { gridOutline } from "ionicons/icons";

interface Props {
  contentId: string;
  menuId: string;
  children: React.ReactNode;
}

const Menu: React.FC<Props> = ({ contentId, menuId, children }) => {
  return (
    <>
      <IonMenu contentId={contentId} menuId={menuId} side="start">
        <IonHeader className="p-1 !flex">
          <IonMenuButton className="justify-start py-3 px-2" menu={menuId}>
            <IonIcon
              className="custom-gray400"
              size="large"
              icon={gridOutline}
            />
          </IonMenuButton>
        </IonHeader>
        <IonContent className="ion-padding">{children}</IonContent>
      </IonMenu>
    </>
  );
};

export default Menu;
