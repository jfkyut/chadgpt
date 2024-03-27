<script setup>

import TextInput from '@/components/inputs/TextInput.vue';
import DropdownMenu from '@/components/dropdowns/dropdown/DropdownMenu.vue';
import DropdownButton from '@/components/dropdowns/dropdown/DropdownButton.vue';
import { computed, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useTravelStore } from '@/stores/travel';

const { form } = storeToRefs(useTravelStore());

const barangays = [
  'Poblacion',
  'Port Barton',
  'Alimanguan',
  'Sto. Nino'
]

const showPlacesDropdown = ref(false);

const addToPlaces = (chosenPlace) => {
  (form.value.places.includes(chosenPlace))
    ? form.value.places = form.value.places.filter((place) => place !== chosenPlace)
    : form.value.places.push(chosenPlace)
}

const displayPlaces = computed(() => {
  return form.value.places.map((place) => {
    return ` ${place}`;
  }).toString()
})

</script>

<template>
  <div class="w-full space-y-2 relative">
    <label for="place">Which Barangay would you want to go to?</label>
    <TextInput 
      @mouseover="showPlacesDropdown = true"
      @mouseout="showPlacesDropdown = false"
      :read-only="true"
      placeholder="Barangays"
      v-model="displayPlaces" />

    <DropdownMenu 
      @mouseover="showPlacesDropdown = true"
      @mouseout="showPlacesDropdown = false"
      :show="showPlacesDropdown"
      position="left-0">
      <DropdownButton
        v-for="(barangay, index) in barangays" 
        :key="index"
        @click="addToPlaces(barangay)"
        :class="form.places.includes(barangay) && 'bg-blue-200 dark:bg-blue-800'">

        {{ barangay }}

      </DropdownButton>
    </DropdownMenu>
  </div>
</template>