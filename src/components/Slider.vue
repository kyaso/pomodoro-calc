<template>
  <div class="text-body-1 font-weight-medium">{{ name }}</div>
  <v-slider
    :disabled="false"
    :min="min"
    :max="max"
    :step="step"
    thumb-label="always"
    v-model="value"
    @update:model-value="emitValue"
    :color="color"
  >
    <template v-slot:append>
      <v-btn size="small" rounded="xl" @click="resetValue">Reset</v-btn>
    </template>
  </v-slider>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  data() {
    return {
      value: this.modelValue,
      defaultValue: 0 as (number | undefined)
    };
  },
  emits: ["update:modelValue"],
  props: {
    name: String,
    min: Number,
    max: Number,
    step: Number,
    modelValue: Number,
    color: String
  },
  mounted() {
    this.defaultValue = this.value
  },
  methods: {
    emitValue() {
      this.$emit("update:modelValue", this.value)
    },
    resetValue() {
      this.value = this.defaultValue
      this.emitValue()
    }
  },
})
</script>
