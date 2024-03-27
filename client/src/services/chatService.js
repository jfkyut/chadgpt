import { useApiUtilities } from "@/utilities/api"
import axios from "axios";

const { sendApiRequest, getCsrfToken } = useApiUtilities();

export const useChatService = () => {

  const sendChatRequest = (message) => {
    return sendApiRequest( async () => {
      await getCsrfToken();
      return await axios.post('/api/chat', { message: message });
    });
  }

  const sendMessageRequest = (message, id) => {
    return sendApiRequest( async () => {
      await getCsrfToken();
      return await axios.post(`/api/message/${id}`, { message: message });
    })
  }

  const getChatsRequest = () => {
    return sendApiRequest( async () => {
      return await axios.get('/api/chat');
    })
  }

  const getMessagesRequest = (id) => {
    return sendApiRequest( async () => {
      return await axios.get(`/api/chat/${id}`);
    });
  }

  const updateChatRequest = (id, form) => {
    return sendApiRequest( async () => {
      await getCsrfToken();
      await axios.put(`/api/chat/${id}`, form);

      return true;
    })
  }

  const destroyChatRequest = (id) => {
    return sendApiRequest( async () => {
      await axios.delete(`/api/chat/${id}`);

      return true;
    })
  }

  const destroyAllChatRequest = () => {
    return sendApiRequest( async () => {
      await axios.delete(`/api/chat`);

      return true;
    })
  }

  return { 
    sendChatRequest, 
    sendMessageRequest, 
    getChatsRequest, 
    getMessagesRequest,
    updateChatRequest,
    destroyChatRequest,
    destroyAllChatRequest
  }
}