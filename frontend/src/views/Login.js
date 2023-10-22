import {
  PassageAuth,
  PassageUnAuthGuard,
} from "@passageidentity/passage-react";
import { Navigate } from "react-router-dom";
import styles from "../styles/App.module.css";

function Login() {
  return (
    <div className={styles.mainContainer}>
    <PassageUnAuthGuard authComp={<Navigate to="/login" />}>
      <PassageAuth />
    </PassageUnAuthGuard>
    </div>
  );
}

export default Login;
