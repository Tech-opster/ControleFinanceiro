import {
  chevronBackOutline,
  chevronForwardOutline,
  ellipsisVerticalOutline,
} from "ionicons/icons";

import { useState } from "react";
import { IonContent, IonHeader, IonIcon, IonPage } from "@ionic/react";
import { SidebarContext } from "../../context/SidebarContext";
import ionic_light_logo_blue from "../../assets/images/ionic light logo blue.svg";

const Sidebar: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [expanded, setExpanded] = useState(true);

  return (
    <div>
      <aside className="h-screen">
        <nav className="h-full flex flex-col border-r shadow-sm custom-gray" >
          <div className="p-4 pb-2 flex justify-between items-center">
            <img
              src={ionic_light_logo_blue}
              className={`overflow-hidden transition-all ${
                expanded ? "w-8" : "w-0"
              }`}
              alt=""
            />
            <button
              onClick={() => setExpanded((curr) => !curr)}
              className="p-1.5 rounded-lg hover:bg-indigo-500"
            >
              {expanded ? (
                <IonIcon icon={chevronBackOutline} />
              ) : (
                <IonIcon icon={chevronForwardOutline} />
              )}
            </button>
          </div>

          <SidebarContext.Provider value={{ expanded }}>
            <ul className="flex-1 px-3">{children}</ul>
          </SidebarContext.Provider>

          <div className="border-t flex p-3">
            <img
              src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
              alt=""
              className="w-10 h-10 rounded-md"
            />
            <div
              className={`
              flex justify-between items-center
              overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}
          `}
            >
              <div className="leading-4">
                <h4 className="font-semibold">John Doe</h4>
                <span className="text-xs text-gray-400">johndoe@gmail.com</span>
              </div>
              <IonIcon icon={ellipsisVerticalOutline} />
            </div>
          </div>
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;
