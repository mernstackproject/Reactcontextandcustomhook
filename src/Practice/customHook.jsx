import { useEffect, useState } from "react";
import axios from "axios";
export function useFetchData (url) {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(url, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        setData(response.data);
      } catch (e) {
        throw new Error();
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [url]);
  return ({ data, loading });
};
