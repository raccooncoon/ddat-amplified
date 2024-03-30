import {useEffect, useState} from "react";
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import {
  ChevronLeft,
  ChevronRightOutlined,
  PieChartOutlined,
  TroubleshootOutlined,
} from "@mui/icons-material";
import {useLocation, useNavigate} from "react-router-dom";
import FlexBetween from "./FlexBetween";
import UseCurrentAuthenticatedUser
  from "../hooks/useCurrentAuthenticatedUser.jsx";

const navItems = [
  {
    text: "Analysis",
    icon: null,
  },
  {
    text: "TotalServices",
    icon: <PieChartOutlined/>,
  },
  {
    text: "XmlFiles",
    icon: <TroubleshootOutlined/>,
  },
];

const Sidebar = ({
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}) => {
  const {pathname} = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();
  const {userName, url} = UseCurrentAuthenticatedUser();

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  return (
      <Box component="nav">
        {isSidebarOpen && (
            <Drawer
                open={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                variant="persistent"
                anchor="left"
                sx={{
                  width: drawerWidth,
                  "& .MuiDrawer-paper": {
                    color: theme.palette.secondary[200],
                    backgroundColor: theme.palette.background.alt,
                    boxSixing: "border-box",
                    borderWidth: isNonMobile ? 0 : "2px",
                    width: drawerWidth,
                  },
                }}
            >
              <Box width="100%">
                <Box m="1.5rem 2rem 2rem 3rem">
                  <FlexBetween color={theme.palette.secondary.main}>
                    <Box display="flex" alignItems="center" gap="0.5rem">
                      <Avatar
                          alt="ddat"
                          src="ddat-logo.png"
                          variant="square"
                      />
                      <Typography variant="h3" fontWeight="bold"
                                  sx={{color: theme.palette.secondary[100] , paddingLeft: "1rem"}
                                  }>
                        DDAT
                      </Typography>
                    </Box>
                    {!isNonMobile && (
                        <IconButton
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                          <ChevronLeft/>
                        </IconButton>
                    )}
                  </FlexBetween>
                </Box>
                <List>
                  {navItems.map(({text, icon}) => {
                    if (!icon) {
                      return (
                          <Typography key={text}
                                      sx={{m: "2.25rem 0 1rem 3rem"}}>
                            {text}
                          </Typography>
                      );
                    }
                    const lcText = text.toLowerCase();

                    return (
                        <ListItem key={text} disablePadding>
                          <ListItemButton
                              onClick={() => {
                                navigate(`/${lcText}`);
                                setActive(lcText);
                              }}
                              sx={{
                                backgroundColor:
                                    active === lcText
                                        ? theme.palette.secondary[300]
                                        : "transparent",
                                color:
                                    active === lcText
                                        ? theme.palette.primary[600]
                                        : theme.palette.secondary[100],
                              }}
                          >
                            <ListItemIcon
                                sx={{
                                  ml: "2rem",
                                  color:
                                      active === lcText
                                          ? theme.palette.primary[600]
                                          : theme.palette.secondary[200],
                                }}
                            >
                              {icon}
                            </ListItemIcon>
                            <ListItemText primary={text}/>
                            {active === lcText && (
                                <ChevronRightOutlined sx={{ml: "auto"}}/>
                            )}
                          </ListItemButton>
                        </ListItem>
                    );
                  })}
                </List>
              </Box>

              <Box position="absolute" bottom="2rem">
                <Divider/>
                <FlexBetween textTransform="none" gap="1rem"
                             m="1.5rem 2rem 0 3rem">
                  <Box
                      component="img"
                      alt="profile"
                      src={url}
                      height="40px"
                      width="40px"
                      borderRadius="50%"
                      sx={{objectFit: "cover"}}
                  />
                  <Box textAlign="left">
                    <Typography
                        fontWeight="bold"
                        fontSize="0.85rem"
                        sx={{color: theme.palette.secondary[100]}}
                    >
                      {userName}
                    </Typography>
                  </Box>
                </FlexBetween>
              </Box>
            </Drawer>
        )}
      </Box>
  );
};

export default Sidebar;
