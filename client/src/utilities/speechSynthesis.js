import { computed, ref } from 'vue';

export const useSpeechSynthesis = () => {

  const synthesis = window.speechSynthesis;

  const isSpeaking = ref(false);

  const isSupported = computed(() => {
    return (!synthesis) 
            ? false 
            : true
  })

  const speak = (text) => {
    if (!isSpeaking.value) {
      const utterance = new SpeechSynthesisUtterance(text);

      utterance.onstart = () => isSpeaking.value = true;
      utterance.onend = () => isSpeaking.value = false;

      synthesis.speak(utterance);
    }
  }

  const stop = () => {
    synthesis.cancel()
    isSpeaking.value = false; 
  }

  return {
    isSupported,
    isSpeaking,
    speak,
    stop
  }
}