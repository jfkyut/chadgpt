import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useTravelStore = defineStore('travel', () => {

  const form = ref({
    arrival: null,
    departure: null,
    places: [],
    accommodations: [],
    activities: [],
    individual_count: 1
  })

  const emptyForm = () => {
    form.value = {
      arrival: null,
      departure: null,
      places: [],
      accommodations: [],
      activities: [],
      individual_count: 1
    };
  }

  const activeTravelId = ref(null);

  const travel = computed(() => {
    return travels.value?.find((trav) => trav.id === activeTravelId.value)
  })

  const travels = ref(null);

  const addTravel = (newTravel) => {
    travels.value.unshift(newTravel);
  }

  const updateCurrentTravel = (id, updatedTravel) => {
    travels.value.find((travel) => {
      if (travel.id === id) {
        travel.title = updatedTravel.title
      }
    })
  }

  const deleteCurrentTravel = (id) => {
    travels.value = travels.value.filter((travel) => travel.id !== id)
  } 

  const destroyAllTravel = () => travels.value = [];

  return {
    form,
    travel,
    travels,
    activeTravelId,
    addTravel,
    emptyForm,
    updateCurrentTravel,
    deleteCurrentTravel,
    destroyAllTravel
  }
})