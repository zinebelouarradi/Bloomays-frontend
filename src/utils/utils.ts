import { Mission } from "../services/api";
import moment from "moment";

type ArrivingLeavingMission = {
  firstname: string;
  lastname: string;
  beginMission: string;
  endMission: string;
  id: number;
};

export interface TransformedData {
  arriving: ArrivingLeaving;
  leaving: ArrivingLeaving;
  arrivingCount: number;
  leavingCount: number;
}

export type ArrivingLeaving = {
  [date: string]: ArrivingLeavingMission[];
};

// Filtre et trie les missions par une clé de date spécifique
type DateKeys = keyof Pick<Mission, 'beginDate' | 'endDate'>;
function filterAndSortMissions(missions: Mission[], dateKey: DateKeys, beginDate: string, endDate: string): Mission[] {
  return missions.filter(mission => {
    const targetDate = moment(mission[dateKey]);
    return targetDate.isSameOrAfter(moment(beginDate)) && targetDate.isSameOrBefore(moment(endDate));
  }).sort((a, b) =>
    moment(a[dateKey]).valueOf() - moment(b[dateKey]).valueOf()
  );
}

// Transforme les missions en collections arrivant et partant
export function transformMissions(missions: Mission[], beginDate: string, endDate: string): TransformedData{
  const arriving: ArrivingLeaving = {};
  const leaving: ArrivingLeaving = {};

  const arrivingMissions = filterAndSortMissions(missions, "beginDate", beginDate, endDate);
  const leavingMissions = filterAndSortMissions(missions, "endDate", beginDate, endDate);

  // Ajoute une mission à la collection spécifiée
  const addMission = (
    mission: Mission,
    dateField: keyof Mission,
    collection: ArrivingLeaving
  ) => {
    const { id, beginDate, endDate, freelance: { firstname, lastname } } = mission;
    const missionEntry: ArrivingLeavingMission = {
      firstname,
      lastname,
      beginMission: beginDate,
      endMission: endDate,
      id: Number(id),
    };

    const date = mission[dateField] as string;
    if (!collection[date]) {
      collection[date] = [];
    }
    collection[date].push(missionEntry);
  };

  // Ajoute les missions arrivant à la collection des arrivées
  arrivingMissions.forEach(mission => addMission(mission, "beginDate", arriving));

  // Ajoute les missions partant à la collection des départs
  leavingMissions.forEach(mission => addMission(mission, "endDate", leaving));

  return {
    arriving,
    leaving,
    arrivingCount: arrivingMissions.length,
    leavingCount: leavingMissions.length
  };
}
