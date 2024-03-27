<script setup>
import { useTravelStore } from '@/stores/travel';
import { storeToRefs } from 'pinia';
import { computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import TravelControl from './partials/TravelControls.vue';

const { travel, activeTravelId } = storeToRefs(useTravelStore());
const route = useRoute();
const travelId = computed(() => route.params.id);

onMounted(() => {
  activeTravelId.value = travelId.value;

  setTimeout(() => {
    document.title = `${travel.value?.title} | VTASVP`;
  }, 500)
})

watch(travelId, (travelId) => {
  activeTravelId.value = travelId

  document.title = `${travel.value?.title} | VTASVP`;
})
</script>

<template>

  <TravelControl />

  <header class="text-center uppercase font-black mt-4">
    <h1>{{ travel?.title }}</h1>
  </header>

  <div class="max-w-6xl mx-auto my-8 lg:my-6" id="pdf-this">

    <!-- overview -->
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg my-6">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-blue-100 dark:bg-gray-700 dark:text-gray-400">
          <tr class="border-b dark:border-gray-600">
            <th scope="col" colspan="2" class="px-6 py-3 truncate lg:text-center">
              <span class="text-lg dark:text-gray-300">
                Travel Overview
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white w-[50%] text-left">
              Destination
            </th>
            <td class="px-6 py-4">
              {{ travel?.plan.destination.join(', ') }}
            </td>
          </tr>
          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white w-[50%] text-left">
              Arrival Date
            </th>
            <td class="px-6 py-4 w-[50%]">
              {{ travel?.plan.arrival }}
            </td>
          </tr>
          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white w-[50%] text-left">
              Departure Date
            </th>
            <td class="px-6 py-4 w-[50%]">
              {{ travel?.plan.departure }}
            </td>
          </tr>
          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white w-[50%] text-left">
              Duration
            </th>
            <td class="px-6 py-4 w-[50%]">
              {{ travel?.plan.duration }}
            </td>
          </tr>
          
          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white w-[50%] text-left">
              Activities
            </th>
            <td class="px-6 py-4 w-[50%]">
              {{ travel?.plan.activities?.length > 0 && travel.plan.activities.join(', ') }}
            </td>
          </tr>

          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white w-[50%] text-left">
              Individual count
            </th>
            <td class="px-6 py-4 w-[50%]">
              {{ travel?.plan.individual_count }}
            </td>
          </tr>

          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white w-[50%] text-left">
              Inclusion
            </th>
            <td class="px-6 py-4 w-[50%]">
              {{ travel?.plan.inclusion?.length > 0 && travel.plan.inclusion.join(', ') }}
            </td>
          </tr>

          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white w-[50%] text-left">
              Exclusion
            </th>
            <td class="px-6 py-4 w-[50%]">
              {{ travel?.plan.exclusion?.length > 0 && travel.plan.exclusion.join(', ') }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- overview end -->

    <!-- accommodation suggestion -->
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg my-6">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-blue-100 dark:bg-gray-700 dark:text-gray-400">
          <tr class="border-b dark:border-gray-600">
            <th scope="col" colspan="5" class="px-6 py-3 truncate lg:text-center">
              <span class="text-lg dark:text-gray-300">
                Accommodation Suggestion
              </span>
            </th>
          </tr>
          <tr class="border-b dark:border-gray-600">
            <th scope="col" class="px-6 py-3 truncate">
              Name
            </th>
            <th scope="col" class="px-6 py-3 truncate">
              Type
            </th>
            <th scope="col" class="px-6 py-3 truncate">
              Location
            </th>
            <th scope="col" class="px-6 py-3 truncate">
              Estimated cost
            </th>
            <th scope="col" class="px-6 py-3 truncate">
              Contact
            </th>
          </tr>
        </thead>
        <tbody>
          <tr 
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" 
            v-for="(accommodation, index) in travel?.plan.accommodation_suggestion" 
            :key="index">
            <th class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-left">
              {{ accommodation.name }}
            </th>
            <td class="px-6 py-4">
              {{ accommodation.type }}
            </td>
            <td class="px-6 py-4">
              {{ accommodation.location }}
            </td>
            <td class="px-6 py-4">
              {{ accommodation.estimated_cost }}
            </td>
            <td class="px-6 py-4">
              {{ accommodation.contact }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- accommodation suggestion end -->

    <div class="relative overflow-x-auto shadow-md sm:rounded-lg my-6" v-for="(day, index) in travel?.plan.daily" :key="index">
      <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-blue-100 dark:bg-gray-700 dark:text-gray-400">
          <tr class="border-b dark:border-gray-600">
            <th scope="col" colspan="7" class="px-6 py-3 truncate lg:text-center">
              <span class="text-lg dark:text-gray-300">
                Day {{ day.day }}: {{ day.date }}
              </span>
            </th>
          </tr>
          <tr>
            <th scope="col" class="px-6 py-3 truncate">
              Activity
            </th>
            <th scope="col" class="px-6 py-3 truncate">
              Start time
            </th>
            <th scope="col" class="px-6 py-3 truncate">
              End time
            </th>
            <th scope="col" class="px-6 py-3 truncate">
              Duration
            </th>
            <th scope="col" class="px-6 py-3 truncate">
              Location
            </th>
            <th scope="col" class="px-6 py-3 truncate">
              Transportation
            </th>
            <th scope="col" class="px-6 py-3 truncate">
              Estimated Cost
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" v-for="(activity, index) in day.activities" :key="index">
            <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white w-[40%] truncate text-left">
              {{ activity.name }}
            </th>
            <td scope="row" class="px-6 py-4 w-[15%] truncate">
              {{ activity.start_time }}
            </td>
            <td scope="row" class="px-6 py-4 w-[15%] truncate">
              {{ activity.end_time }}
            </td>
            <td scope="row" class="px-6 py-4 w-[15%] truncate">
              {{ activity.duration }}
            </td>
            <td scope="row" class="px-6 py-4 w-[15%] truncate">
              {{ activity.location }}
            </td>
            <td scope="row" class="px-6 py-4 w-[15%] truncate">
              {{ activity.transportation }}
            </td>
            <td scope="row" class="px-6 py-4 w-[15%] truncate">
              {{ activity.estimated_cost }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>
