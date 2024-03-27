<script setup>

import DropdownButton from '@/components/dropdowns/dropdown/DropdownButton.vue';
import TextInput from '@/components/inputs/TextInput.vue';
import GenericModal from '@/components/modals/GenericModal.vue';
import { ref } from 'vue';
import { useChatService } from '@/services/chatService';
import { useChatStore } from '@/stores/chat';
import { useToast } from 'vue-toastification';

const toast = useToast();
const { updateCurrentChat } = useChatStore();
const { updateChatRequest } = useChatService();

defineProps({ chat: Object })

const form = ref({
  title: null
})

const isLoading = ref(false);
const isModalShow = ref(false);

const openModal = (title) => {
  console.log(title);
  form.value.title = title
  isModalShow.value = true
}

const closeModal = () => isModalShow.value = false;

const updateChatTitle = async (id) => {
  await updateChatRequest(id, form.value) 
    ? (
        updateCurrentChat(id, form.value),
        toast.success("Successfully updated current chat."),
        closeModal()
      )
    : openModal()
}

</script>

<template>
  <DropdownButton @click="openModal(chat.title)" class="hover:text-blue-600 dark:hover:text-blue-500">
    <i class="fa fa-edit mr-2"></i>
    <span>Edit chat title</span>
  </DropdownButton>

  <div>
    <GenericModal
      :show="isModalShow"
      :title='`Edit chat "${chat?.title}"`'
      :isLoading="isLoading"
      confirmButtonText="Update chat"
      @onConfirm="updateChatTitle(chat.id)"
      @onCancel="closeModal">
      
      <div>
        <label for="title">Title</label>
        <TextInput v-model="form.title" />
      </div>

    </GenericModal>
  </div>
</template>