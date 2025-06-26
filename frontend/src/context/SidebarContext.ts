import { createContext } from "react";

interface SidebarContextType {
    expanded: boolean
}

export const SidebarContext = createContext<SidebarContextType>({ expanded: true });
