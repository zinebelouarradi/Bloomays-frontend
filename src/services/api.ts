import axios, { AxiosResponse } from 'axios';

const API_URL = process.env.REACT_APP_API_URL
export interface Mission {
      id: string,
      label: string,
      beginDate: string,
      endDate: string,
      missionType: string,
      freelance: {
        id: string,
        firstname: string,
        lastname: string,
        email: string,
      }
}

export const getMissions = (beginDate: string, endDate: string) : Promise<AxiosResponse<Mission[]>> => {
  return axios.get(`${API_URL}/missions`, {
    params: {
      beginDate,
      endDate
    }
  });
};
