<script setup>

import TextInput from '@/components/inputs/TextInput.vue'
import { useTravelStore } from '@/stores/travel';
import { storeToRefs } from 'pinia';

const { form } = storeToRefs(useTravelStore());

</script>

<template>
  <div class="w-full space-y-2">
    <label for="place">How many of you will visit?</label>
    <TextInput 
      type="number"
      placeholder="Visitor count"
      v-model="form.individual_count" />
  </div>
</template>