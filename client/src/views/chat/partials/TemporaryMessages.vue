<script setup>

import UserBubble from '@/components/chatBubbles/UserBubble.vue';
import BotBubble from '@/components/chatBubbles/BotBubble.vue';
import { useChatStore } from '@/stores/chat';
import { storeToRefs } from 'pinia';

const { temporaryMessage } = storeToRefs(useChatStore());

</script>

<template>
  <div v-if="temporaryMessage" class="w-full max-w-4xl mx-auto space-y-6 mb-6">
    <UserBubble :message="temporaryMessage" />
    <BotBubble message="" />
  </div>
</template>