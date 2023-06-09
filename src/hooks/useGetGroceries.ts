import { useState, useEffect } from "react";
import { GroceryCategory } from "../types";
import { api } from "../helpers";
import { MOCK_API } from "../helpers/constants";

type Return = {
  data: GroceryCategory[] | null,
  loading: boolean,
  error: Error | null,
};

export const useGetGroceries = (): Return => {
  const [data, setData] = useState<GroceryCategory[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const API = api.init();
  const getGroceries = async () => {

    if (MOCK_API == "true") {
      const { allGroceries: testData } = await import("./testData");
      setData(testData);
      setError(null);
      setLoading(false);
      return;
    }

    try {
      const response = await API.get<GroceryCategory[]>("groceries").catch((res) => {
        throw new Error(`An error occurred: ${res.message}`);
      });
      setData(response?.data);
      setLoading(false);
    } catch (err: any) {
      setError(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getGroceries();
  }, []);

  return { data, loading, error };
};
