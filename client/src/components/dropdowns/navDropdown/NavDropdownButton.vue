<script setup>

defineProps({ class: String })

const emit = defineEmits(['click', 'mouseover', 'mouseout'])

</script>

<template>
  <li class="relative flex">
    <button 
      @click="emit('click')"
      @mouseover="emit('mouseover')"
      @mouseout="emit('mouseout')"
      :class="class"
      class="p-2 w-full items-center transition duration-75 rounded-lg group text-white hover:bg-gray-700">
      <slot />
    </button>
  </li>
</template>