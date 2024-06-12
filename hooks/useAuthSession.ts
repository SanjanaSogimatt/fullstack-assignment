import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, clearAuth } from "@/redux/auth/auth.slice";
import { RootState } from "@/redux/store";
import { checkSession } from "@/utils/auth";

const useAuthSession = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  //  implement the logic here to check user session
  useEffect(() => {
    const validateSession = async () => {
      const userData = await checkSession();
      if (userData) {
        dispatch(setUser(userData));
      } else {
        dispatch(clearAuth());
      }
    };

    validateSession();
  }, [dispatch]);
  
  return user;
};

export default useAuthSession;
