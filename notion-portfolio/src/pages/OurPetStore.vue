<template>
    <PageLayout>
      <template v-slot:pageSlot>
        <div class="our-pet-store page-slot">
          <Project :languages="data" v-if="data"></Project>
        </div>
      </template>
    </PageLayout>
</template>

<script setup>
import PageLayout from '@/components/PageLayout.vue'
import Project from '@/components/Project.vue'
import { ref, onMounted } from 'vue'
import axios from 'axios'

const data = ref(null)

onMounted(async () => {
  try {
    const response = await axios.get('https://github.com/humer123')
    data.value = response.data
  } catch (error) {
    console.error(error)
  }
})
</script>

