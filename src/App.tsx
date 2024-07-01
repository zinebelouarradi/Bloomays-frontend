import React, { useState } from 'react';
import styles from './App.module.scss';
import LeavingArrivingBloomers from "./components/LeavingArrivingBloomers/LeavingArrivingBloomers";


function App() {
  const  [isOpen, setIsOpen] = useState(false)

  return (
    <div className="App">
      <button className={styles.button} onClick={() => setIsOpen(true)}>Show Modal</button>
      <LeavingArrivingBloomers isOpen={isOpen} onClose={()=>setIsOpen(false)}/>
    </div>
  );
}

export default App;
