import axios from "axios";
import { useToast } from "vue-toastification";

const toast = useToast();

export const useApiUtilities = () => {

  const sendApiRequest = async (requestCallback) => {
    try {
      return await requestCallback();
    } catch (error) {
      toast.error(
        !error.response 
          ? error.message 
          : error.response.data.message || error.message
      )

      return false;
    }
  }

  const getCsrfToken = async () => await axios.get('/sanctum/csrf-cookie');

  return {
    sendApiRequest,
    getCsrfToken,
  }
}
