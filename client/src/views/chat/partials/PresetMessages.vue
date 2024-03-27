<script setup>

import GenericModal from '@/components/modals/GenericModal.vue';
import { ref } from 'vue';
import { useChatStore } from '@/stores/chat';
import { storeToRefs } from 'pinia';
import DropdownButton from '@/components/dropdowns/dropdown/DropdownButton.vue';
import { useRoute } from 'vue-router';

const { message } = storeToRefs(useChatStore());

const route = useRoute();
const isModalShow = ref(false);

const openModal = () => isModalShow.value = true;

const closeModal = () => isModalShow.value = false;

const presetMessages = [
  'Summarize the importance of artificial intelligence in healthcare.',
  'Provide an overview of the latest advancements in renewable energy.',
  'Explain the concept of blockchain technology and its applications.',
  'Compare and contrast the pros and cons of electric cars.',
  'Discuss the impact of social media on modern society.',
  'Explore the potential risks and benefits of gene editing technology.',
  'Analyze the economic implications of climate change.',
  'Examine the role of machine learning in cybersecurity.',
  'Elaborate on the principles of quantum computing.',
  'Summarize the key points from the latest scientific research on black holes.',
  'Explain the process of neural machine translation.',
  'Discuss the ethical considerations in the development of artificial intelligence.',
  'Provide insights into the future of space exploration.',
];

const setMessage = (currentMessage) => {
  message.value = currentMessage;
  closeModal();
}

</script>

<template>
  <button v-if="route.name === 'new-chat'" @click="openModal" type="button" class="p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
    <i class="fa fa-message"></i>
    <span class="sr-only">Messages</span>
  </button>

  <DropdownButton @click="openModal" v-else-if="route.name === 'chat'">
    <i class="fa fa-message mr-2"></i>
    <span>Preset messages</span>
  </DropdownButton>

  <div>
    <GenericModal
      title="Preset messages"
      :show="isModalShow"
      cancel-button-text="Close"
      @onCancel="closeModal"
      :is-form="false">
    
      <div class="max-h-[50vh] p-2 overflow-y-auto">
        <ul class="space-y-4 mb-4">
          <li 
            v-for="(message, index) in presetMessages" 
            :key="index"
            @click="setMessage(message)">
            <label for="job-1" class="inline-flex items-center justify-between w-full p-5 text-gray-900 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-500 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-900 hover:bg-gray-100 dark:text-white dark:bg-gray-600 dark:hover:bg-gray-500">                           
              <div class="block">
                <div class="w-full text-gray-500 dark:text-gray-400">{{ message }}</div>
              </div>
              <div>
                <svg class="w-4 h-4 ms-3 rtl:rotate-180 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/></svg>
              </div>
            </label>
          </li>
        </ul>
      </div>

    </GenericModal>
  </div>
</template>