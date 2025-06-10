import { useCallback, useState } from "react";
import { submitReview } from "../httpManager/request";
export function useReviews({ useAxiosPrivate }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const submit = useCallback(async (rating, comment) => {
    try {
      await submitReview(useAxiosPrivate, rating, comment);
      return true;
    } catch (err) {
      setError(err);
      return false;
    }
  }, []);

  return {
    submit,
    error,
  };
}
