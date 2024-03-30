import {useState} from "react";
import {Box, useMediaQuery} from "@mui/material";
import {Outlet} from "react-router-dom";
import Navbar from "../../components/Navbar.jsx";
import Sidebar from "../../components/Sidebar.jsx";

const Layout = () => {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(isNonMobile);
  return (
      <Box display="flex" width="100%" height="100%">
        <Sidebar
            isNonMobile={isNonMobile}
            drawerWidth="250px"
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
        />
        <Box flexGrow={1} sx={{
          backgroundColor: "background.default",
          minHeight: "100vh",
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}>
          <Navbar
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
          />
          <Outlet/>
        </Box>
      </Box>
  );
};

export default Layout;
