import { ref, computed } from "vue";

export const useSpeechRecognition = () => {
  
  const recognition = ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) 
                        ? new (window.SpeechRecognition || window.webkitSpeechRecognition)()
                        : false;

  const isSupported = computed(() => {
    return (!recognition) 
            ? false 
            : true
  })

  if (isSupported.value) {
    recognition.lang = "en-US";
    recognition.interimResults = true;
    recognition.continuous = true;

    recognition.onresult = (e) => {
      transcript.value = e.results[0][0].transcript;
    }
  
    recognition.onerror = (e) => {
      console.error("Speech recognition error:", e.error);
    }  
  
    recognition.onend = () => {
      if (isListening.value) {
        listen()
      }
    }
  }

  const unsupportedNotice = () => {
    alert("Speech Recognition is not supported by this browser.")
  }

  const isListening = ref(false);
  const transcript = ref(null);

  const listen = () => {
    (!isSupported.value)
      ? unsupportedNotice()
      : (
          recognition.start(),
          isListening.value = true
        )
  }

  const cancel = () => {
    (!isSupported.value)
      ? unsupportedNotice()
      : (
          recognition.cancel(),
          isListening.value = false
        )
  }

  const stop = () => {
    (!isSupported.value)
      ? unsupportedNotice()
      : (
          recognition.stop(),
          isListening.value = false
        )
  }

  return {
    isSupported,
    transcript,
    isListening,
    listen,
    cancel,
    stop
  }
}