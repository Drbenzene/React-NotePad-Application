import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Calender from "../Calender/Calender";
import styles from './AllScreens.module.css'

function CalenderScreen() {
  return (
    <div>
      <Header />
      <div className={styles.container}>
        <Calender className={styles.calender} />
      </div>

      <Footer />
    </div>
  );
}

export default CalenderScreen;
