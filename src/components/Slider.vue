<template>
    <div>{{ name }}</div>
    <v-slider
        :disabled="false"
        :min="min"
        :max="max"
        :step="step"
        thumb-label="always"
        v-model="value"
        @update:model-value="emitValue"
    >
    </v-slider>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    data() {
        return {
            value: this.modelValue
        }
    },
    emits: ['change', 'update:modelValue'],
    props: {
        name: String,
        min: Number,
        max: Number,
        step: Number,
        modelValue: Number
    },
    methods: {
        emitValue() {
            // this.$emit('change', this.value)
            this.$emit('update:modelValue', this.value)
            // console.log(value)
        }
    }
})
</script>
