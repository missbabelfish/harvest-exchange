import { usePassage } from "@passageidentity/passage-react";
import { useState, useEffect } from "react";

export const usePassageUserInfo = () => {
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  const { getCurrentUser } = usePassage();

  useEffect(() => {
    const loadUserInfo = async () => {
      setLoading(true);

      try {
        getCurrentUser().userInfo().then((r) => setUserInfo(r));
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false);
      }
    };
    loadUserInfo();
  }, [getCurrentUser]);

  return {
    loading,
    userInfo,
  };

};

export default usePassageUserInfo;

// getCurrentUser - in dependency array