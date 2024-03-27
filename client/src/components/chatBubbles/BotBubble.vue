<script setup>

import ExtraButton from '../buttons/ExtraButton.vue';
import { useGeneralUtilities } from '@/utilities/general';
import { useSpeechSynthesis } from '@/utilities/speechSynthesis';

defineProps({ message: String })

const { speak, stop, isSpeaking, isSupported } = useSpeechSynthesis();
const { copyTextToClipboard } = useGeneralUtilities();


</script>

<template>
  <div class="flex items-start gap-2.5">
    <div class="flex flex-col gap-1 w-fit max-w-full">
      <div class="flex items-center space-x-2 rtl:space-x-reverse ">
        <span class="text-sm font-semibold text-gray-900 dark:text-white">ChadGPT</span>
      </div>
      <div class="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
        <p class="text-sm font-normal text-gray-900 dark:text-white whitespace-pre-wrap overflow-auto" v-if="message !== '' || message">
          {{ message }}
        </p>
        <div class="flex gap-2" v-else>
          <div class="h-3 w-3 bg-gray-400 rounded-full animate-bounce "></div>
          <div class="h-3 w-3 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 200ms;"></div>
          <div class="h-3 w-3 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 300ms;"></div>
        </div>
        <div v-if="message !== '' || message" class="mt-3 flex gap-1 justify-end">
          <div v-if="isSupported">
            <ExtraButton @click="speak(message)" v-if="!isSpeaking">
              <i class="fa fa-play"></i>
            </ExtraButton>
            <ExtraButton @click="stop" v-else>
              <i class="fa fa-stop"></i>
            </ExtraButton>
          </div>
          <ExtraButton @click="copyTextToClipboard(message)">
            <i class="fa fa-clipboard"></i>
          </ExtraButton>
        </div>
      </div>
    </div>
  </div>
</template>