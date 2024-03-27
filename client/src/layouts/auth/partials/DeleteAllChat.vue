<script setup>

import NavDropdownButton from '@/components/dropdowns/navDropdown/NavDropdownButton.vue';
import DangerButton2 from '@/components/buttons/DangerButton2.vue';
import SecondaryButton from '@/components/buttons/SecondaryButton.vue';
import { ref } from 'vue';
import { useChatService } from '@/services/chatService';
import { useChatStore } from '@/stores/chat';
import { useToast } from 'vue-toastification';
import { useRouter } from 'vue-router';

const { destroyAllChatRequest } = useChatService();
const { destroyAllChat } = useChatStore()
const isShowDelete = ref(false);
const router = useRouter()

const deleteAllChat = async () => {
  if (await destroyAllChatRequest()) {
    isShowDelete.value = false;
    router.push('/chat')
    useToast().success('Successfully deleted all chat.')
    destroyAllChat();
  }
}

</script>

<template>
  <NavDropdownButton class="flex justify-between" v-if="!isShowDelete" @click="isShowDelete = true">
    <span>Delete chats</span>
    <i class="fa fa-trash"></i>
  </NavDropdownButton>
  <NavDropdownButton class="flex justify-between" v-else>
    <DangerButton2 @click="deleteAllChat">Delete</DangerButton2>
    <SecondaryButton @click="isShowDelete = false">Cancel</SecondaryButton>
  </NavDropdownButton>
</template>