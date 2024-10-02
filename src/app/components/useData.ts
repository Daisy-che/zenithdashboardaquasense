import { useEffect, useState } from "react";
import { processDrainageData } from "../utils/drainage";

export const useDrainageData = () => {
  const [data, setData] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const processedData = await processDrainageData();
        setData(processedData);
      } catch (error: unknown) {  // Specify error type as 'unknown'
        // Typecasting the error as it's not guaranteed to be an Error object
        if (error instanceof Error) {
          setError(`Error fetching data: ${error.message}`);
          console.error("Error fetching data:", error.message);
        } else {
          setError("An unknown error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};
