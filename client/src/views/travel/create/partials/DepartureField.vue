<script setup>

import TextInput from '@/components/inputs/TextInput.vue';
import { useTravelStore } from '@/stores/travel';
import { storeToRefs } from 'pinia';

const { form } = storeToRefs(useTravelStore());

</script>

<template>
  <div class="w-full space-y-2">
    <label for="arrival">Departure</label>
    <TextInput type="date" v-model="form.departure" />
  </div>
</template>