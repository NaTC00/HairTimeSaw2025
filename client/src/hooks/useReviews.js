import { useCallback, useEffect, useState } from "react";
import { submitReview, getReviews } from "../httpManager/request";
import { useAxiosPrivate } from "./useAxiosPrivate";

export function useReviews() {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const axiosPrivate = useAxiosPrivate();
  const submit = useCallback(async (rating, comment) => {
    try {
      await submitReview(axiosPrivate, rating, comment);
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

    const interval = setInterval(() => {
      fetchReviews();
    }, 60 * 1000); // ogni 60 secondi

    return () => clearInterval(interval);
  }, [fetchReviews]);

  return {
    reviews,
    submit,
    error,
    refetchReviews: fetchReviews,
  };
}
