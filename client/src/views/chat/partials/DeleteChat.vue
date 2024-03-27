<script setup>

import DropdownButton from '@/components/dropdowns/dropdown/DropdownButton.vue';
import DangerModal from '@/components/modals/DangerModal.vue';
import { useChatService } from '@/services/chatService';
import { useChatStore } from '@/stores/chat';
import { useToast } from 'vue-toastification'
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const { destroyChatRequest } = useChatService();
const { destroyCurrentChat } = useChatStore();

defineProps({ chat: Object })

const router = useRouter();
const toast = useToast();
const isModalShow = ref(false);
const isLoading = ref(false);

const openModal = () => {
  isModalShow.value = true;
}

const closeModal = () => {
  isModalShow.value = false;
}

const destroyChat = async (id) => {
  (await destroyChatRequest(id)) && (
    destroyCurrentChat(id),
    closeModal(),
    toast.success("Successfully deleted chat."),
    router.push('/chat')
  )
}

</script>

<template>
  <DropdownButton @click="openModal" class="hover:text-red-600 dark:hover:text-red-500">
    <i class="fa fa-trash mr-2"></i>
    <span>Delete chat</span>
  </DropdownButton>

  <div>
    <DangerModal
      :title='`Are you sure you want to delete "${chat?.title}"`'
      :show="isModalShow"
      :is-loading="isLoading"
      @onConfirm="destroyChat(chat.id)"
      @onCancel="closeModal"/>
  </div>
</template>