<template>
  <v-app>
    <v-main>
      <h1 class="text-center">Pomodoro Calculator</h1>
      <div class="pt-9 mx-16">
        <Slider
          :name="'Pomodoro Length (minutes)'"
          :min="5"
          :max="120"
          :step="1"
          v-model="pomodoroLength"  />

          <Slider
          :name="'Short Break Length (minutes)'"
          :min="0"
          :max="10"
          :step="1"
          v-model="shortBreakLength"  />

          <Slider
          :name="'Long Break Length (minutes)'"
          :min="0"
          :max="60"
          :step="1"
          v-model="longBreakLength"  />

          <Slider
          :name="'Long Break Interval (#pomodoros)'"
          :min="0"
          :max="10"
          :step="1"
          v-model="longBreakInterval"  />

          <input type="time" id="startTime" v-model="startTime" >
          <input type="time" id="endTime" v-model="endTime" >

          <p>{{ result.pomodoroCount}}, {{result.longBreaks}}, {{result.totalWorkTimeHours}}:{{result.totalWorkTimeMins }}</p>
      </div>
    </v-main>
  </v-app>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import Slider from './components/Slider.vue'
  import PomoConfig from './pomo-config'

  export default defineComponent({
    components: {
      Slider
    },
    data() {
      return {
        pomodoroLength: 25,
        shortBreakLength: 5,
        longBreakLength: 15,
        longBreakInterval: 4,
        startTime: "10:00",
        endTime: "12:00"
      }
    },
    computed: {
      result() {
        const config = new PomoConfig(
          this.pomodoroLength,
          this.shortBreakLength,
          this.longBreakLength,
          this.longBreakInterval,
          this.startTime,
          this.endTime
        )

        const res = config.calcPomos()
        return res
      }
    },
    methods: {
    }

  })

</script>

<style lang="less">
</style>
