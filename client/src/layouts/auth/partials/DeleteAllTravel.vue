<script setup>

import NavDropdownButton from '@/components/dropdowns/navDropdown/NavDropdownButton.vue';
import DangerButton2 from '@/components/buttons/DangerButton2.vue';
import SecondaryButton from '@/components/buttons/SecondaryButton.vue';
import { ref } from 'vue';
import { useToast } from 'vue-toastification';
import { useRouter } from 'vue-router';
import { useTravelService } from '@/services/travelService';
import { useTravelStore } from '@/stores/travel';

const { destroyAllTravelRequest } = useTravelService();
const { destroyAllTravel } = useTravelStore();
const isShowDelete = ref(false);
const router = useRouter()

const deleteAllTravel = async () => {
  if (await destroyAllTravelRequest()) {
    isShowDelete.value = false;
    router.push('/travel/create')
    useToast().success('Successfully deleted all travels.')
    destroyAllTravel();
  }
}

</script>

<template>
  <NavDropdownButton class="flex justify-between" v-if="!isShowDelete" @click="isShowDelete = true">
    <span>Delete travels</span>
    <i class="fa fa-trash"></i>
  </NavDropdownButton>
  <NavDropdownButton class="flex justify-between" v-else>
    <DangerButton2 @click="deleteAllTravel">Delete</DangerButton2>
    <SecondaryButton @click="isShowDelete = false">Cancel</SecondaryButton>
  </NavDropdownButton>
</template>