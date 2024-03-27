import { useApiUtilities } from "@/utilities/api"
import axios from "axios";

const { sendApiRequest, getCsrfToken } = useApiUtilities();

export const useTravelService = () => {

  const getAllTravelRequest = () => {
    return sendApiRequest( async () => {
      await getCsrfToken();
      return await axios.get('/api/travel');
    })
  }

  const getTravelRequest = (id) => {
    return sendApiRequest( async () => {
      await getCsrfToken();
      return await axios.get(`/api/travel/${id}`);
    })
  }

  const generateTravelRequest = (form) => {
    return sendApiRequest( async () => {
      await getCsrfToken();
      return await axios.post('/api/travel', form);
    })
  }

  const updateTravelRequest = (id, form) => {
    return sendApiRequest( async () => {
      return axios.put(`/api/travel/${id}`, form);
    })
  }

  const destroyTravelRequest = (id) => {
    return sendApiRequest( async () => {
      await axios.delete(`/api/travel/${id}`);

      return true;
    })
  }

  const destroyAllTravelRequest = () => {
    return sendApiRequest( async () => {
      await axios.delete(`/api/travel`);

      return true;
    })
  }

  const travelToPdfRequest = (form) => {
    return sendApiRequest( async () => {
      return await axios.post('/api/travel/pdf', form, { responseType: 'blob' });
    })
  }

  return { 
    getAllTravelRequest,
    getTravelRequest,
    generateTravelRequest,
    updateTravelRequest,
    destroyTravelRequest,
    destroyAllTravelRequest,
    travelToPdfRequest
  }
}