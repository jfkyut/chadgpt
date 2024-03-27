<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import { useChatStore } from '@/stores/chat';
import { storeToRefs } from 'pinia';
import { useToast } from 'vue-toastification';
import PresetMessages from './PresetMessages.vue';
import { useChatService } from '@/services/chatService';
import { useRoute, useRouter } from 'vue-router';
import ChatOptions from './ChatOptions.vue';
import { useSpeechRecognition } from '@/utilities/speechRecognition';

const emit = defineEmits(['submitted']);

const { sendChatRequest, sendMessageRequest } = useChatService();
const { transcript, listen, isListening, stop } = useSpeechRecognition();

const router = useRouter();
const route = useRoute();
const toast = useToast();
const { addChat, addMessage } = useChatStore();

const { message, temporaryMessage } = storeToRefs(useChatStore());
const routePath = computed(() => route.path);

const textAreaRef = ref(null);
const reactiveHeight = ref(0);

const resetTextAreaHeight = () => {
  reactiveHeight.value = '42px';
  textAreaRef.value.style.height = reactiveHeight.value;
};

watch(message, (message) => {
  reactiveHeight.value = textAreaRef.value.scrollHeight + 2;
  textAreaRef.value.style.height = reactiveHeight.value + 'px';

  (!message) && resetTextAreaHeight();
})

const submitMessage = async () => {
  stop();

  if (message.value === null || message.value === '') {
    toast.warning('Warning. Message field is empty.');
    return;
  }

  temporaryMessage.value = message.value;
  message.value = null;

  if (route.name === 'new-chat') {
    const { data } = await sendChatRequest(temporaryMessage.value);

    addChat(data);
    temporaryMessage.value = null;
    router.push(`/chat/${data.id}`);

  } else if (route.name === 'chat') {
    const { data } = await sendMessageRequest(temporaryMessage.value, route.params.id)

    addMessage(route.params.id, data.messages);
    temporaryMessage.value = null;
  }

  emit('submitted');
}

const handleKeyDown = (e) => {
  (window.innerWidth >= 1024 && !e.shiftKey && e.key === 'Enter') && (
    e.preventDefault(),
    submitMessage()
  )
};

onMounted(() => textAreaRef.value.focus())

watch(routePath, () => {
  textAreaRef.value.focus()
  message.value = null
})

watch(transcript, (transcript) => {
  message.value = transcript
})

</script>

<template>
  <form @submit.prevent="submitMessage" class="flex justify-center">
    <label for="chat" class="sr-only">Your message</label>
    <div class="bg-white flex items-end px-3 py-2 rounded-lg dark:bg-gray-700 border dark:border-gray-600 w-full max-w-3xl shadow">
      <div v-if="!message">
        <PresetMessages v-if="route.name === 'new-chat'" />
        <ChatOptions v-else-if="route.name === 'chat'" />
      </div>
      <div v-else>
        <button @click="message = null" type="button" class="p-2 text-gray-500 rounded-lg cursor-pointer hover:text-red-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-red-400 dark:hover:bg-gray-600">
          <i class="fa fa-trash"></i>
        </button>
      </div>
      <textarea 
        @keydown="handleKeyDown"
        v-model="message" 
        ref='textAreaRef' 
        id="chat" 
        rows="1" 
        class="block outline-none mx-4 p-2.5 w-full resize-none text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
        placeholder="Your message..." />

      <!-- submit message button -->
      <button v-if="message" type="submit" class="inline-flex mb-1 justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600">
        <svg class="w-5 h-5 rotate-90 rtl:-rotate-90" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
          <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z"/>
        </svg>
        <span class="sr-only">Send message</span>
      </button>
      <!-- submit message button end -->

      <!-- microphone -->
      <button 
        v-else
        @click="listen" 
        type="button" 
        :class="[isListening ? 'text-red-600 dark:textred-500' : 'text-blue-600 dark:text-blue-500']"
        class="inline-flex mb-1 justify-center p-2 rounded-full cursor-pointer hover:bg-blue-100 dark:hover:bg-gray-600">
        <i class="fa fa-microphone w-5 h-5"></i>
        <span class="sr-only">Microphone</span>
      </button>
      <!-- microphone end -->
    </div>
  </form>
</template>