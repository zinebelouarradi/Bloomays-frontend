import React from "react";
import { ArrivingLeaving } from "../../utils/utils";
import styles from './BloomersList.module.scss'
import circle from "../../icons/circle-icon.svg";

interface BloomersListProps {
  title: string;
  bloomers: ArrivingLeaving;
  count: number;
  classname?: string;
}

const BloomersList: React.FC<BloomersListProps> = ({ title, bloomers, count, classname  }) => (
  <div className={styles.container}>
    <div className={styles.title}>
      <span className={classname}>{count}</span> {title}
    </div>

    <div  className={styles.scrollable}>
      {Object.keys(bloomers).map((date, index, array) => (
          <div key={date}>
            <div className={styles.date}>
              <img src={circle} alt='circle icon'/>
              <span className={classname}>{date}</span>
            </div>

            <div className={`${styles.bloomers} ${index === array.length - 1 ? styles.last : ''}`}
            >
            {bloomers[date].map(record => (
              <div className={styles.name} key={record.id}>
                {record.firstname} {record.lastname}
              </div>
            ))}
            </div>
          </div>
      ))}
    </div>


  </div>
);

export default BloomersList;
