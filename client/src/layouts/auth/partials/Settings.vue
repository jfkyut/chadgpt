<script setup>

import { ref, watch } from 'vue';
import NavDropdownTrigger from '@/components/dropdowns/navDropdown/NavDropdownTrigger.vue';
import NavDropdownButton from '@/components/dropdowns/navDropdown/NavDropdownButton.vue'
import ToggleInput from '@/components/inputs/ToggleInput.vue';
import { useThemeStore } from '@/stores/theme';
import { storeToRefs } from 'pinia';
import DeleteAllChat from './DeleteAllChat.vue';

defineProps({ chats: Object })
const emit = defineEmits(['onAccessLink'])

const { setToDark, setToLight } = useThemeStore();
const { theme } = storeToRefs(useThemeStore());

const isSettingsDropdownShow = ref(JSON.parse(sessionStorage.getItem('settings-dropdown')) || false);

const toggleTheme = (e) => {
  (e.target.checked)
    ? setToDark()
    : setToLight()
}

const toggleChatDropdown = () => {
  (!isSettingsDropdownShow.value)
    ? isSettingsDropdownShow.value = true
    : isSettingsDropdownShow.value = false
}

watch(isSettingsDropdownShow, (settingsState) => {
  sessionStorage.setItem('settings-dropdown', JSON.stringify(settingsState));
})

</script>

<template>
  <NavDropdownTrigger 
    button-text="Settings" 
    icon-class="fa fa-sliders" 
    @toggle-dropdown="toggleChatDropdown" 
    :is-links-show="isSettingsDropdownShow">

    <DeleteAllChat />
    
    <NavDropdownButton class="flex justify-between">
      <span>Dark mode</span>
      <ToggleInput 
        :is-checked="theme === 'dark' ? true : false"
        @on-change="toggleTheme" />
    </NavDropdownButton>

  </NavDropdownTrigger>
</template>