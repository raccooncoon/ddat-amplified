import {useEffect, useState} from "react";
import {getCurrentUser, signOut} from "aws-amplify/auth";
import md5 from "md5";

const UseCurrentAuthenticatedUser = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getCurrentUser();
        setUser({
          userId: userData.userId,
          userName: userData?.signInDetails?.loginId.split("@")[0],
          email: userData?.signInDetails?.loginId,
          url: `https://www.gravatar.com/avatar/${md5(
              userData?.signInDetails?.loginId?.trim()?.toLowerCase())}?d=retro`
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
        signOut().then(() => {
          console.log('User signed out');
        });
      }
    };
    fetchUserData()
  }, []);
  return user;
};
export default UseCurrentAuthenticatedUser;
