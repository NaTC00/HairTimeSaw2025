import { useCallback, useEffect, useState } from "react";
import { submitReview, getReviews } from "../httpManager/request";
import { useAxiosPrivate } from "./useAxiosPrivate";
import { useAlert } from "./useAlert";

export function useReviews() {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { alert, showAlert, hideAlert } = useAlert();
  const axiosPrivate = useAxiosPrivate();
  const submit = async (rating, comment) => {
    try {
      await submitReview(axiosPrivate, rating, comment);
      return { success: true };
    } catch (err) {
      return {
        success: false,
        error: error,
      };
    }
  };

  const fetchReviews = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await getReviews();
      setReviews(data);
    } catch (err) {
      setError(err);
    }finally{
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReviews();

    const interval = setInterval(() => {
      fetchReviews();
    }, 60 * 1000);

    return () => clearInterval(interval);
  }, [fetchReviews]);

  return {
    alert,
    showAlert,
    hideAlert,
    reviews,
    submit,
    error,
    refetchReviews: fetchReviews,
    isLoading
  };
}
