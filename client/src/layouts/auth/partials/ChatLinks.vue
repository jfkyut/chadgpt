<script setup>

import { ref, watch } from 'vue';
import NavDropdownTrigger from '@/components/dropdowns/navDropdown/NavDropdownTrigger.vue';
import NavDropdownLink from '@/components/dropdowns/navDropdown/NavDropdownLink.vue';

defineProps({ chats: Object })

const emit = defineEmits(['onAccessLink'])

const isChatDrodownLinkShow = ref(JSON.parse(sessionStorage.getItem('chat-dropdown')) || false);

const toggleChatDropdown = () => {
  (!isChatDrodownLinkShow.value)
    ? isChatDrodownLinkShow.value = true
    : isChatDrodownLinkShow.value = false
}

watch(isChatDrodownLinkShow, (chatDropdownState) => {
  sessionStorage.setItem('chat-dropdown', JSON.stringify(chatDropdownState));
})

</script>

<template>
  <NavDropdownTrigger 
    button-text="ChadGPT" 
    icon-class="fa fa-robot" 
    @toggle-dropdown="toggleChatDropdown" 
    :is-links-show="isChatDrodownLinkShow"
    route-contains="chat">
    <NavDropdownLink 
      to="/chat" 
      @click="emit('onAccessLink')" 
      title="New Chat"
      class="bg-gray-800">
      <div class=" flex items-center justify-between">
        <span>New chat</span>
        <i class="fa fa-pen"></i>
      </div>
    </NavDropdownLink>
    <NavDropdownLink 
      v-for="(chat, index) in chats" 
      :key="index"
      :to="`/chat/${chat.id}`" 
      @click="emit('onAccessLink')"
      :chat="chat"
      :title="chat.title">
      <div class="truncate">
        {{ chat.title }}
      </div>
    </NavDropdownLink>
  </NavDropdownTrigger>
</template>