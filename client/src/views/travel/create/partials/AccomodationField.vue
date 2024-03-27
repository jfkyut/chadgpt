<script setup>

import TextInput from '@/components/inputs/TextInput.vue';
import DropdownMenu from '@/components/dropdowns/dropdown/DropdownMenu.vue';
import DropdownButton from '@/components/dropdowns/dropdown/DropdownButton.vue';
import { ref, computed } from 'vue';
import { useTravelStore } from '@/stores/travel';
import { storeToRefs } from 'pinia';

const { form } = storeToRefs(useTravelStore())

const accomodationTypes = [
  'Hotel',
  'Lodging House',
  'Resort',
  'Hostel'
]

const showAccomodationTypesDropdown = ref(false);

const addToAccomodations = (chosenAccomodation) => {
  (form.value.accommodations.includes(chosenAccomodation))
    ? form.value.accommodations = form.value.accommodations.filter((activity) => activity !== chosenAccomodation)
    : form.value.accommodations.push(chosenAccomodation)
}

const displayAccomodations = computed(() => {
  return form.value.accommodations.map((activity) => {
    return ` ${activity}`;
  }).toString()
})

</script>

<template>
  <div class="w-full space-y-2 relative">
    <label for="place">Which type of accommodation do you prefer?</label>
    <TextInput 
      @mouseover="showAccomodationTypesDropdown = true"
      @mouseout="showAccomodationTypesDropdown = false"
      placeholder="Accomodation type"
      v-model="displayAccomodations"
      :read-only="true" />

    <DropdownMenu 
      @mouseover="showAccomodationTypesDropdown = true"
      @mouseout="showAccomodationTypesDropdown = false"
      :show="showAccomodationTypesDropdown"
      position="left-0">
      <DropdownButton 
        v-for="(accommodationType, index) in accomodationTypes" 
        :key="index"
        @click="addToAccomodations(accommodationType)"
        :class="form.accommodations.includes(accommodationType) && 'bg-blue-200 dark:bg-blue-800'">
        {{ accommodationType }}
      </DropdownButton>
    </DropdownMenu>
  </div>
</template>