import { useCallback, useEffect, useState } from "react";
import { submitReview, getReviews } from "../httpManager/request";
export function useReviews({ useAxiosPrivate }) {
  const [reviews, setReviews] = useState([]);
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

  const fetchReviews = useCallback(async () => {
    try {
      const data = await getReviews();
      setReviews(data);
    } catch (err) {
      setError(err);
    }
  }, []);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  return {
    reviews,
    submit,
    error,
    refetchReviews: fetchReviews,
  };
}
