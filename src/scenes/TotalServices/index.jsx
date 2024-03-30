import {Box} from "@mui/material";
import Header from "../../components/Header.jsx";
import TotalServicesChart from "../../components/TotalServiceChart.jsx";

const TotalServices = () => {
  return (
      <Box m="1.5rem 2.5rem">
        <Header title="TOTAL SERVICES" subtitle="total services modules info"/>
        <Box mt="40px" height="75vh">
          <TotalServicesChart/>
        </Box>
      </Box>
  );
};

export default TotalServices;
