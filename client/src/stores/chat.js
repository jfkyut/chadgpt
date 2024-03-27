import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useChatService } from "@/services/chatService";

const { getMessagesRequest } = useChatService();

export const useChatStore = defineStore('chat', () => {

  const message = ref(null);

  const messages = ref(null);

  const temporaryMessage = ref(null);

  const chats = ref([]);

  const activeChatId = ref(null);

  const chat = computed(() => {
    return chats.value?.find((trav) => trav.id === activeChatId.value)
  })

  const getChatMessages = (id) => {
    chats.value.forEach( async (chat) => {
      if (chat.id === id && !chat.messages) {
        const { data } = await getMessagesRequest(id);
        
        chat.messages = data.messages;
      }
    });
  }

  const addChat = (newChat) => {
    (newChat) && chats.value.unshift(newChat)
  }

  const addMessage = (id, messages) => {
    chats.value.find((chat) => {
      (chat.id === id) && chat.messages.push(messages);
    });
  } 

  const updateCurrentChat = async (id, form) => {
    chats.value.find((chat) => {
      if (chat.id === id) {
        chat.title = form.title;
      }
    })
  }

  const destroyCurrentChat = (id) => {
    chats.value = chats.value.filter((chat) => {
      return chat.id !== id;
    })
  }

  const destroyAllChat = () => chats.value = [];

  return { 
    message, 
    messages,
    temporaryMessage,
    chats, 
    chat,
    activeChatId,
    addChat,
    addMessage,
    getChatMessages,
    updateCurrentChat,
    destroyCurrentChat,
    destroyAllChat
  }
})