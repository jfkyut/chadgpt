<script setup>

import NavDropdownTrigger from '@/components/dropdowns/navDropdown/NavDropdownTrigger.vue';
import NavDropdownLink from '@/components/dropdowns/navDropdown/NavDropdownLink.vue';
import { ref, watch } from 'vue';

const isTravelDropdownLinkShow = ref(JSON.parse(sessionStorage.getItem('travel-dropdown')) || false);

defineProps({ travels: Object })

const emit = defineEmits(['onAccessLink'])

const toggleChatDropdown = () => {
  (!isTravelDropdownLinkShow.value)
    ? isTravelDropdownLinkShow.value = true
    : isTravelDropdownLinkShow.value = false
}

watch(isTravelDropdownLinkShow, (chatDropdownState) => {
  sessionStorage.setItem('travel-dropdown', JSON.stringify(chatDropdownState));
})

</script>

<template>
  <NavDropdownTrigger 
    button-text="Travels" 
    icon-class="fa fa-globe" 
    @toggle-dropdown="toggleChatDropdown" 
    :is-links-show="isTravelDropdownLinkShow"
    route-contains="travel">
    <NavDropdownLink 
      to="/travel/create" 
      @click="emit('onAccessLink')" 
      title="New Chat"
      class="bg-gray-800">
      <div class=" flex items-center justify-between">
        <span>New travel</span>
        <i class="fa fa-plus"></i>
      </div>
    </NavDropdownLink>
    <NavDropdownLink 
      v-for="(travel, index) in travels" 
      :key="index"
      :to="`/travel/${travel.id}`" 
      @click="emit('onAccessLink')"
      :title="travel.title">
      <div class="truncate">
        {{ travel.title }}
      </div>
    </NavDropdownLink>
  </NavDropdownTrigger>
</template>