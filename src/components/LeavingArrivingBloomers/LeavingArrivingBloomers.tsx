import React, { useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import { getMissions } from "../../services/api";
import { TransformedData, transformMissions } from "../../utils/utils";
import styles from './LeavingArravingBloomers.module.scss';
import BloomersList from "../BloomerList/BloomersList";
import moment from "moment";

interface BloomersModalProps {
  isOpen: boolean;
  onClose: VoidFunction;
}

const LeavingArrivingBloomers = ({ isOpen, onClose }: BloomersModalProps) => {
  const [missionsData, setMissionsData] = useState<TransformedData>({
    arriving: {},
    leaving: {},
    arrivingCount: 0,
    leavingCount: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const beginDate = moment().format('YYYY-MM-DD');
    const endDate = moment().add(1, 'months').endOf('month').format('YYYY-MM-DD');

    if (isOpen) {
      const fetchData = async () => {
        setIsLoading(true);
        setIsError(false);
        try {
          const response = await getMissions(beginDate, endDate);
          const transformedMissions = transformMissions(response.data, beginDate, endDate);
          setMissionsData(transformedMissions);
          setIsLoading(false)
        } catch (error) {
          console.error('Failed to fetch data', error);
          setIsError(true);
        }
      };

      fetchData()
    }
  }, [isOpen]);

  const handleModalClose = () => {
    onClose();
    setIsError(false);
    setIsLoading(true);
  };

  return (
    <Modal isOpen={isOpen} onClose={handleModalClose}>
      {isError ? (
        <div className={`${styles.centered} ${styles.error}`}>Something went wrong!</div>
      ) : isLoading ? (
        <div className={styles.centered}>Loading ...</div>
      ) : (
        <div className={styles.container}>
          <BloomersList
            title="Bloomers entrants"
            bloomers={missionsData.arriving}
            count={missionsData.arrivingCount}
            classname={styles.section_entrants}
          />
          <BloomersList
            title="Bloomers sortants"
            bloomers={missionsData.leaving}
            count={missionsData.leavingCount}
            classname={styles.section_sortants}
          />
        </div>
      )}
    </Modal>
  );
};

export default LeavingArrivingBloomers;
