import { IResponse } from "../helper/interface";

export interface FormValues {
  name: string;
  mobile: string;
  stateId: string;
  cityId: string;
}

export interface CityResponse {
  _id: string;
  name: string;
}

export interface LocationDataResponse {
  _id: string;
  state: string;
  cities: CityResponse[];
}

export interface UserResponse {
  _id: string;
  name: string;
  mobile: string;
  state: {
    _id: string;
    state: string;
    city: CityResponse;
  };
}

export interface UserTableProps {
  fetchApi: (updatedUrl?: string, loading?: boolean) => void;
  users: IResponse<UserResponse[]> | undefined;
  loading: boolean;
}
