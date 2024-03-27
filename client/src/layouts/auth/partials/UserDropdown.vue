<script setup>

import DropdownButton from '@/components/dropdowns/dropdown/DropdownButton.vue';
import DropdownMenu from '@/components/dropdowns/dropdown/DropdownMenu.vue';
import DropdownLink from '@/components/dropdowns/dropdown/DropdownLink.vue'
import { getCurrentInstance, ref, watch } from 'vue';
import ExtraButton from '@/components/buttons/ExtraButton.vue';
import { useRouter } from 'vue-router';
import { useAuthService } from '@/services/authService';
import { useProfileStore } from '@/stores/profile';
import { storeToRefs } from 'pinia';

const { user } = storeToRefs(useProfileStore());
const { logoutRequest } = useAuthService();

const router = useRouter();
const dropdownRef = ref(null);
const dropdownTriggerRef = ref(null);
const instance = getCurrentInstance();

const logout = async () => {
  (await logoutRequest()) && (
    user.value = null,
    router.push('/login')
  )
}

const isDropdownShow = ref(false);

const showDropdown = (e) => {
  isDropdownShow.value = true;
  e.stopPropagation();
}

const hideDropdown = () => isDropdownShow.value = false;

watch(isDropdownShow, (dropdownState) => {
  (dropdownState) 
    ? document.addEventListener('click', handleClickOutside)
    : document.removeEventListener('click', handleClickOutside)
})

const handleClickOutside = (e) => {
  (
    !instance.refs.dropdownRef.$el.contains(e.target) || 
    !instance.refs.dropdownTriggerRef.$el.contains(e.target)
  ) && hideDropdown()
}

</script>

<template>
  <div class="relative">
    <ExtraButton @click="showDropdown" ref="dropdownTriggerRef">
      <span>{{ user?.name }}</span>
      <i class="fa fa-angle-down ml-2"></i>
    </ExtraButton>

    <DropdownMenu 
      ref="dropdownRef"
      :show="isDropdownShow">
      <DropdownLink to="/account">
        <i class="fa fa-user mr-2"></i>
        <span>Account</span>
      </DropdownLink>
      <DropdownButton @click="logout">
        <i class="fa fa-sign-out mr-2"></i>
        <span>Sign out</span>
      </DropdownButton>
    </DropdownMenu>
  </div>
</template>