import React from 'react';
import { Tabs, Tab, AppBar} from "@material-ui/core";
import ComponentPrinted from './ComponentPrinted';
import ComponentCard from './ComponentCard';


const MenuComponent = () => {
    const [selectedTab, setSelectedTab] = React.useState(0);

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
    return(
      <>
      <AppBar position='static'>
      <Tabs value={selectedTab} onChange={handleChange}  variant="scrollable"
          scrollButtons="on">
        <Tab label="RU1" />
        <Tab label="RU2"  />
        <Tab label="RU3" />
        <Tab label="RU4" />
        <Tab label="RDA1" />
        <Tab label="RDA2" />
        <Tab label="RDA3" />
        <Tab label="RDA4" />
        <Tab label="Team" />
      </Tabs>
      </AppBar>
      {selectedTab === 0 && <ComponentPrinted id='0'/>}
      {selectedTab === 1 && <ComponentPrinted id='1'/>}
      {selectedTab === 2 && <ComponentPrinted id='2'/>}
      {selectedTab === 3 && <ComponentPrinted id='3'/>}
      {selectedTab === 4 && <ComponentPrinted id='4'/>}
      {selectedTab === 5 && <ComponentPrinted id='5'/>}
      {selectedTab === 6 && <ComponentPrinted id='6'/>}
      {selectedTab === 7 && <ComponentPrinted id='7'/>}
      {selectedTab === 8 && <ComponentCard />}
      </>
    );
};

export default MenuComponent;