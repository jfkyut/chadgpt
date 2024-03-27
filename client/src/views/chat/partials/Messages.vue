<script setup>
import UserBubble from '@/components/chatBubbles/UserBubble.vue';
import BotBubble from '@/components/chatBubbles/BotBubble.vue';

defineProps({ messages: Array })

</script>

<template>
  <div class="w-full max-w-4xl mx-auto space-y-6" v-for="(message, index) in messages" :key="index">
    <UserBubble :message="message.user_message" />
    <BotBubble :message="message.chatbot_message" />
  </div>
</template>