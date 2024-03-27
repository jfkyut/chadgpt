<script setup>

import ExtraButton from '@/components/buttons/ExtraButton.vue';
import DropdownMenu from '@/components/dropdowns/dropdown/DropdownMenu.vue';
import EditTravel from './controls/EditTravel.vue';
import DownloadTravel from './controls/DownloadTravel.vue';
import DeleteTravel from './controls/DeleteTravel.vue';
import { ref } from 'vue';

const showTravelControls = ref(false);

</script>

<template>
  <div class="fixed z-10">
    
    <ExtraButton
      @mouseover="showTravelControls = true"
      @mouseout="showTravelControls = false">
      <i class="fa fa-gear"></i>
    </ExtraButton>
    <DropdownMenu
      @mouseover="showTravelControls = true"
      @mouseout="showTravelControls = false"
      :show="showTravelControls" 
      position="absolute left-0 top-10">

      <EditTravel />
      <DownloadTravel />
      <DeleteTravel />
      
    </DropdownMenu>
  </div>
</template>