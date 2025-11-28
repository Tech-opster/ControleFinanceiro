import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { ReactNode, useState } from "react";

type TabTableProps = {
  childrenMonth: ReactNode;
  childrenTotal: ReactNode;
};

const TabTable: React.FC<TabTableProps> = ({ childrenMonth, childrenTotal }) => {
  const [tabValues, setTabValues] = useState("1");

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValues(newValue);
  };

  return (
    <Box className=" h-full flex flex-col">
      <TabContext value={tabValues}>
        <Box className="custom-gray400-bg rounded" sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList aria-label="tabs" onChange={handleTabChange}>
            <Tab label="Mês atual" value="1" />
            <Tab label="Total" value="2" />
          </TabList>
        </Box>
        <TabPanel className="flex-1" value="1" sx={{ padding: 0, height: "1px" }}>{childrenMonth}</TabPanel>
        <TabPanel className="flex-1" value="2" sx={{ padding: 0, height: "1px" }}>{childrenTotal}</TabPanel>
      </TabContext>
    </Box>
  );
};

export default TabTable;
