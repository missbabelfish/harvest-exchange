import { PassageProfile } from "@passageidentity/passage-react";
import styles from '../styles/App.module.css'

function Profile() {
  return (
    <div className={styles.view}>
      <h1>My Profile</h1>
      <h3>profile form goes here</h3>
      <p> <PassageProfile /></p>
    </div>
  );
}

export default Profile;
