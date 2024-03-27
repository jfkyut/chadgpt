<script setup>

import DropdownButton from '@/components/dropdowns/dropdown/DropdownButton.vue';
import { useTravelStore } from '@/stores/travel';
import { storeToRefs } from 'pinia';
import GenericModal from '@/components/modals/GenericModal.vue';
import { getCurrentInstance, ref } from 'vue';
import TextInput from '@/components/inputs/TextInput.vue';
import { useTravelService } from '@/services/travelService';
import { useToast } from 'vue-toastification';

const toast = useToast()
const { travel } = storeToRefs(useTravelStore())
const { updateCurrentTravel } = useTravelStore();
const { updateTravelRequest } = useTravelService();

const instance = getCurrentInstance();
const titleInputRef = ref(null);

const form = ref({ title: null })

const isModalShow = ref(false);
const isLoading = ref(false);

const openModal = () => {
  isModalShow.value = true;

  form.value.title = travel.value.title

  setTimeout(() => {
    instance.refs.titleInputRef.$el.focus()
  }, 200)
}

const closeModal = () => {
  isModalShow.value = false
}

const updateTravel = async () => {
  const { data } = await updateTravelRequest(travel.value.id, form.value);

  if (data) {
    updateCurrentTravel(travel.value.id, data);
    closeModal();
    toast.success('Successfully updated travel.')
  }
}

</script>

<template>
  <DropdownButton @click="openModal">
    <i class="fa fa-edit mr-3"></i>
    <span>Edit</span>
  </DropdownButton>

  <div>
    <GenericModal
      :title='`Edit travel "${travel?.title}"`'
      :show="isModalShow"
      :is-loading="isLoading"
      @on-confirm="updateTravel"
      @on-cancel="closeModal">
      
      <TextInput ref="titleInputRef" v-model="form.title" />

    </GenericModal>
  </div>
</template>