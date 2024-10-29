import { AxiosError, AxiosResponse } from "axios";
import { useCallback, useEffect, useState } from "react";
import { dataService } from "../config/dataService";
import { handleErrorForFetch } from "../helper/helper";
import { IResponse } from "../helper/interface";

const useFetch = <DataInterface>(url?: string) => {
  const [loading, setLoading] = useState(true);
  const [res, setRes] = useState<IResponse<DataInterface>>();
  const [error, setError] = useState<string | null>(null);

  const fetchApi = useCallback(
    (updatedUrl?: string, loading = true) => {
      setLoading(loading);
      const finalURL = updatedUrl || url || "";
      dataService
        .get(finalURL)
        .then((response: AxiosResponse) => {
          return response.data;
        })
        .then((json) => {
          setLoading(false);
          setRes(json);
        })
        .catch((error: AxiosError) => {
          handleErrorForFetch(error, setError);
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [url]
  );

  useEffect(() => {
    url && fetchApi();
  }, []);

  return { loading, res, fetchApi, error };
};

export default useFetch;
