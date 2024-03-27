<script setup>

import DropdownButton from '@/components/dropdowns/dropdown/DropdownButton.vue';
import { useTravelService } from '@/services/travelService';
import { useTravelStore } from '@/stores/travel';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

const { travel } = storeToRefs(useTravelStore())

const { travelToPdfRequest } = useTravelService();

const form = ref({
  title: null,
  plan: null
})

const download = async () => {
  form.value.title = travel.value.title;
  form.value.plan = document.querySelector('#pdf-this').outerHTML;

  const { data } = await travelToPdfRequest(form.value);

  if (data) {
    const pdfUrl = window.URL.createObjectURL(new Blob([data], { type: 'application/pdf' }));

    const link = document.createElement('a');
    link.href = pdfUrl;
    link.target = '_blank';
    link.download = `${travel.value.title}.pdf`;
    document.body.appendChild(link);
    link.click();

    window.URL.revokeObjectURL(pdfUrl);
  }
}

</script>

<template>
  <DropdownButton @click="download">
    <i class="fa fa-download mr-3"></i>
    <span>Download PDF</span>
  </DropdownButton>
</template>