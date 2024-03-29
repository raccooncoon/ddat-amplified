import {useState} from "react";
import {
  ArrowDropDownOutlined,
  DarkModeOutlined,
  LightModeOutlined,
  Menu as MenuIcon,
  SettingsOutlined,
} from "@mui/icons-material";
import FlexBetween from "../components/FlexBetween";
import {useDispatch} from "react-redux";
import {setMode} from "../state";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import {signOut} from 'aws-amplify/auth';
import UseCurrentAuthenticatedUser
  from "../hooks/useCurrentAuthenticatedUser.jsx";
import {post} from 'aws-amplify/api';

const Navbar = ({isSidebarOpen, setIsSidebarOpen}) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const {email, userName, url} = UseCurrentAuthenticatedUser();
  const ec2Management = async () => {

    try {
      const restOperation = await post({
        apiName: 'apiff18fc31',
        path: '/lambda',
        options: {
          body: {
            action: 'status'
          }
        }
      });
      const {body} = await restOperation.response;
      const response = await body.json();

      console.log('POST call succeeded');
      console.log(response);
      alert(`EC2 is ${response.status}`);

      if (email !== "kid1401@gmail.com") {
        return;
      }

      if (response.status === 'running') {
        if (confirm('서버를 종료 하시겠습니까?')) {
          post({
            apiName: 'apiff18fc31',
            path: '/lambda',
            options: {
              body: {
                action: 'stop'
              }
            }
          });
        }
      } else {
        if (confirm('서버를 시작 하시겠습니까?')) {
          post({
            apiName: 'apiff18fc31',
            path: '/lambda',
            options: {
              body: {
                action: 'start'
              }
            }
          })
        }
      }
    } catch (e) {
      console.log('POST call failed: ', JSON.parse(e.response));
    }
  }

  return (
      <AppBar
          sx={{
            position: "static",
            background: "none",
            boxShadow: "none",
          }}
      >
        <Toolbar sx={{justifyContent: "space-between"}}>
          {/* LEFT SIDE */}
          <FlexBetween>
            <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              <MenuIcon/>
            </IconButton>
            {/*<FlexBetween*/}
            {/*  backgroundColor={theme.palette.background.alt}*/}
            {/*  borderRadius="9px"*/}
            {/*  gap="3rem"*/}
            {/*  p="0.1rem 1.5rem"*/}
            {/*>*/}
            {/*  <InputBase placeholder="Search..." />*/}
            {/*  <IconButton>*/}
            {/*    <Search />*/}
            {/*  </IconButton>*/}
            {/*</FlexBetween>*/}
          </FlexBetween>

          {/* RIGHT SIDE */}
          <FlexBetween gap="1.5rem">
            <IconButton onClick={() => dispatch(setMode())}>
              {theme.palette.mode === "dark" ? (
                  <DarkModeOutlined sx={{fontSize: "25px"}}/>
              ) : (
                  <LightModeOutlined sx={{fontSize: "25px"}}/>
              )}
            </IconButton>
            <IconButton onClick={ec2Management}>
              <SettingsOutlined sx={{fontSize: "25px"}}/>
            </IconButton>
            <FlexBetween>
              <Button
                  onClick={handleClick}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    textTransform: "none",
                    gap: "1rem",
                  }}
              >
                <Box
                    component="img"
                    alt="profile"
                    src={url}
                    height="32px"
                    width="32px"
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
                  <Typography
                      fontSize="0.75rem"
                      sx={{color: theme.palette.secondary[200]}}
                  >
                    {email}
                  </Typography>
                </Box>
                <ArrowDropDownOutlined
                    sx={{
                      color: theme.palette.secondary[300],
                      fontSize: "25px"
                    }}
                />
              </Button>
              <Menu
                  anchorEl={anchorEl}
                  open={isOpen}
                  onClose={handleClose}
                  anchorOrigin={{vertical: "bottom", horizontal: "center"}}
              >
                <MenuItem onClick={signOut}>Log Out</MenuItem>
              </Menu>
            </FlexBetween>
          </FlexBetween>
        </Toolbar>
      </AppBar>
  );
};

export default Navbar;
