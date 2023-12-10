<template>
  <v-card
    elevation="6"
    max-width="500">
    <v-card-text
      class="text-h6">
      <p>Total Pomodoros: {{result.pomodoroCount}}</p>
      <p class="mt-2">Long breaks: {{result.longBreaks}}</p>
      <p class="mt-2">Total work time: {{result.totalWorkTimeHours}}h{{result.totalWorkTimeMins}}m</p>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Result } from '@/pomo-config'

export default defineComponent({
  props: {
    result: {
      type: Result,
      required: true
    }
  }
})
</script>