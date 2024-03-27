<script setup>

import TextInput from '@/components/inputs/TextInput.vue';
import DropdownMenu from '@/components/dropdowns/dropdown/DropdownMenu.vue';
import DropdownButton from '@/components/dropdowns/dropdown/DropdownButton.vue';
import { ref, computed } from 'vue';
import { useTravelStore } from '@/stores/travel';
import { storeToRefs } from 'pinia';

const { form } = storeToRefs(useTravelStore());

const activities = [
  'Swimming',
  'Hiking',
  'Island hopping',
  'Bicycling',
  'Sky diving'
]

const showActivitiesDropdown = ref(false);

const addtoActivities = (chosenActivity) => {
  (form.value.activities.includes(chosenActivity))
    ? form.value.activities = form.value.activities.filter((activity) => activity !== chosenActivity)
    : form.value.activities.push(chosenActivity)
}

const displayActivities = computed(() => {
  return form.value.activities.map((activity) => {
    return ` ${activity}`;
  }).toString()
})

</script>

<template>
  <div class="w-full space-y-2 relative">
    <label for="place">Which activity would you like to do?</label>
    <TextInput 
      @mouseover="showActivitiesDropdown = true"
      @mouseout="showActivitiesDropdown = false"
      placeholder="Activities"
      :read-only="true"
      v-model="displayActivities" />

    <DropdownMenu 
      @mouseover="showActivitiesDropdown = true"
      @mouseout="showActivitiesDropdown = false"
      :show="showActivitiesDropdown"
      position="left-0">
      <DropdownButton 
        v-for="(activity, index) in activities" 
        :key="index"
        @click="addtoActivities(activity)"
        :class="form.activities.includes(activity) && 'bg-blue-200 dark:bg-blue-800'">
        {{ activity }}
      </DropdownButton>
    </DropdownMenu>
  </div>
</template>