<script setup>

import DropdownButton from '@/components/dropdowns/dropdown/DropdownButton.vue';
import DangerModal from '@/components/modals/DangerModal.vue';
import { useTravelService } from '@/services/travelService';
import { useTravelStore } from '@/stores/travel';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';

const { destroyTravelRequest } = useTravelService();
const { deleteCurrentTravel } = useTravelStore();
const { travel } = storeToRefs(useTravelStore());
const router = useRouter();
const toast = useToast()

const isModalShow = ref(false);
const isLoading = ref(false);

const openModal = () => {
  isModalShow.value = true;
}

const closeModal = () => {
  isModalShow.value = false;
}

const deleteTravel = async () => {
  if (await destroyTravelRequest(travel.value.id)) {
    deleteCurrentTravel(travel.value.id)
    closeModal()
    router.push('/travel/create');
    toast.success('Successfully deleted travel.')
  }
}

</script>

<template>
  <DropdownButton @click="openModal">
    <i class="fa fa-trash mr-3"></i>
    <span>Delete</span>
  </DropdownButton>
  
  <div>
    <DangerModal 
      :show="isModalShow"
      :is-loading="isLoading"
      :title='`Delete travel "${travel?.title}"`'
      @on-confirm="deleteTravel"
      @on-cancel="closeModal" />

  </div>
</template>