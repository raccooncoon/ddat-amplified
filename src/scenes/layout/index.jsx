import {useState} from "react";
import {Box, useMediaQuery} from "@mui/material";
import {Outlet} from "react-router-dom";
import Navbar from "../../components/Navbar.jsx";
import Sidebar from "../../components/Sidebar.jsx";

const Layout = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  console.log("isNonMobile =>> ", isNonMobile);
  const [isSidebarOpen, setIsSidebarOpen] = useState(isNonMobile);

  const data = {
    name: "치타",
    occupation: "어드민",
  }

  return (
      <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
        <Sidebar
            user={data || {}}
            isNonMobile={isNonMobile}
            drawerWidth="250px"
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
        />
        <Box flexGrow={1}>
          <Navbar
              user={data || {}}
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
          />
          <Outlet/>
        </Box>
      </Box>
  );
};

export default Layout;
