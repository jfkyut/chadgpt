<script setup>

import DropdownMenu from '@/components/dropdowns/dropdown/DropdownMenu.vue';
import PresetMessages from './PresetMessages.vue';
import { ref } from 'vue';
import EditChat from './EditChat.vue';
import { useChatStore } from '@/stores/chat';
import { storeToRefs } from 'pinia';
import DeleteChat from './DeleteChat.vue';

const { chat } = storeToRefs(useChatStore());

const isDropdownShow = ref(false);


</script>

<template>
  <div class="relative">
    <button 
      @mouseover="isDropdownShow = true"
      @mouseout="isDropdownShow = false"
      type="button" 
      class="p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
      <i class="fa fa-ellipsis"></i>
      <span class="sr-only">Options</span>
    </button>

    <DropdownMenu 
      @mouseover="isDropdownShow = true"
      @mouseout="isDropdownShow = false"
      :show="isDropdownShow" 
      position="bottom-14">
      <PresetMessages />
      <EditChat :chat="chat" />
      <DeleteChat :chat="chat" />
    </DropdownMenu>
  </div>
</template>