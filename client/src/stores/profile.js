import { defineStore } from "pinia";
import { computed, ref } from "vue";
import axios from "axios";

export const useProfileStore = defineStore('profile', () => {

  const user = ref(null);
  const isAuthenticated = computed(() => !user.value ? false : true)
  const isVerified = computed(() => !user.value?.email_verified_at ? false : true);

  const getProfile = async () => {
    if (!user.value) {
      try {
        const { data } = await axios.get('/api/profile');

        user.value = data;
      } catch (error) {
        user.value = null;
      }
    }
  }

  const updateProfile = async (form) => {
    user.value.name = form.name;
    user.value.email = form.email;
  }

  const destroyProfile = async () => user.value = null

  return {
    user,
    isAuthenticated,
    isVerified,
    updateProfile,
    destroyProfile,
    getProfile
  }
});