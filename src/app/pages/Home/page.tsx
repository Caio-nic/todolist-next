import React, { useState } from "react";
import styles from "../../styles/home.module.css";
import TaskManager from "../../components/TaskManager";

const Home: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.mainContent}>
        <div className={styles.taskCards}>
          <TaskManager />
        </div>
      </div>
    </div>
  );
};

export default Home;

