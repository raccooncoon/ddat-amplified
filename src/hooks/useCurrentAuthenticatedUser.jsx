import {useEffect, useState} from "react";
import {getCurrentUser} from "aws-amplify/auth";
import {md5} from "@mui/x-license-pro/encoding/md5.js";

const UseCurrentAuthenticatedUser = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getCurrentUser();


        setUser({
          userName: userData?.signInDetails?.loginId.split("@")[0],
          email: userData?.signInDetails?.loginId,
          url: `https://www.gravatar.com/avatar/${ md5(
              userData?.signInDetails?.loginId?.trim()?.toLowerCase())}?size=512`
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData()
  }, []);
  return user;
};
export default UseCurrentAuthenticatedUser;
