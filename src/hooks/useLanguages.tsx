import { getLanguages, type Country } from "@/lib/api/getLanguages";
import { useEffect, useState } from "react";

export function useCountries() {
  const [data, setData] = useState<Country[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getLanguages()
      .then((res) => {
        const sorted = [...res].sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        );
        setData(sorted)
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}
