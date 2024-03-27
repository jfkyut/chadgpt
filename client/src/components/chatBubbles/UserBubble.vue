<script setup>

import { useProfileStore } from '@/stores/profile';
import { storeToRefs } from 'pinia';

const { user } = storeToRefs(useProfileStore());

defineProps({ message: String })

</script>

<template>
  
  <div class="flex justify-end items-start gap-2.5">
    <div class="flex flex-col gap-1 w-fit max-w-full">
      <div class="flex items-center justify-end space-x-2 rtl:space-x-reverse">
        <span class="text-sm font-semibold text-gray-900 dark:text-white">{{ user.name }}</span>
      </div>
      <div class="flex flex-col leading-1.5 p-4 border-gray-200 bg-blue-200 rounded-s-xl rounded-ee-xl rounded-es-xl dark:bg-blue-700 whitespace-pre-wrap overflow-auto">
        <p class="text-sm font-normal text-gray-900 dark:text-white">{{ message }}</p>
      </div>
    </div>
  </div>

</template>