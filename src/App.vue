<template>
  <v-app>
    <v-main>
      <div class="text-h2 text-center mt-4">Pomodoro Calculator</div>
      <div class="pt-9 mx-16">
        <Slider
          :name="'Pomodoro Length (minutes)'"
          :min="5"
          :max="120"
          :step="1"
          :color="'red'"
          v-model="pomodoroLength"  />

          <Slider
          :name="'Short Break Length (minutes)'"
          :min="0"
          :max="10"
          :step="1"
          :color="'light-green'"
          v-model="shortBreakLength"  />

          <Slider
          :name="'Long Break Length (minutes)'"
          :min="0"
          :max="60"
          :step="1"
          :color="'blue-accent-1'"
          v-model="longBreakLength"  />

          <Slider
          :name="'Long Break Interval (#pomodoros)'"
          :min="0"
          :max="10"
          :step="1"
          :color="'blue-accent-1'"
          v-model="longBreakInterval"  />

          <!-- Time pickers -->
          <v-container class="text-body-1">
            <v-row class="font-weight-medium">
              <v-col>
                Start Time:
              </v-col>
              <v-col>
                End Time:
              </v-col>
              <v-col>
                Break:
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  type="time"
                  variant="underlined"
                  v-model="startTime"
                  density="compact">
                </v-text-field>
                <v-btn @click="setCurrentTime" variant="tonal">Now</v-btn>
              </v-col>
              <v-col>
                <v-text-field
                  type="time"
                  variant="underlined"
                  v-model="endTime"
                  density="compact">
                </v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  type="number"
                  variant="underlined"
                  v-model="breakTime"
                  clearable
                  density="compact"
                  suffix="minutes">
                </v-text-field>
              </v-col>
            </v-row>
          </v-container>

          <v-container fluid class="mt-10">
            <v-row justify="center">
              <ResultCard :result="result" />
            </v-row>
          </v-container>
      </div>
    </v-main>
  </v-app>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import Slider from './components/Slider.vue'
  import ResultCard from './components/ResultCard.vue'
  import PomoConfig from './pomo-config'
  import constants from './constants'

  export default defineComponent({
    components: {
      Slider,
      ResultCard
    },
    data() {
      return {
        pomodoroLength: constants.POMODORO_LENGTH,
        shortBreakLength: constants.SHORT_BREAK_LENGTH,
        longBreakLength: constants.LONG_BREAK_LENGTH,
        longBreakInterval: constants.LONG_BREAK_INTERVAL,
        startTime: "10:00",
        endTime: "12:00",
        breakTime: 30,
        constants
      }
    },
    mounted() {
      this.initTimes()
    },
    computed: {
      result() {
        const config = new PomoConfig(
          this.pomodoroLength,
          this.shortBreakLength,
          this.longBreakLength,
          this.longBreakInterval,
          this.startTime,
          this.endTime,
          this.breakTime
        )

        const res = config.calcPomos()
        return res
      }
    },
    methods: {
      initTimes() {
        const currentTime = new Date()
        const endTime = new Date()
        endTime.setHours(endTime.getHours() + 2)
        this.startTime = this.date2string(currentTime)
        this.endTime = this.date2string(endTime)
      },
      setCurrentTime() {
        const currentTime = new Date()
        this.startTime = this.date2string(currentTime)
      },
      date2string(date: Date) {
        const hours = date.getHours().toString().padStart(2, '0')
        const minutes = date.getMinutes().toString().padStart(2, '0')
        return `${hours}:${minutes}`
      }
    }

  })

</script>

<style lang="less">
</style>
