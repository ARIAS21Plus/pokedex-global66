<script setup lang="ts">
import { defineProps, defineEmits, type PropType } from 'vue'

const props = defineProps({
  placeholder: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  modelValue: {
    type: [String, Number],
    default: '',
  },
  error: {
    type: String,
    default: '',
  },
  class: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <div class="flex items-center shadow-md rounded w-sm h-14 bg-white">
    <div v-if="$slots['icon-left']" class="text-secondary-foreground grid place-items-center px-3">
      <slot name="icon-left" />
    </div>

    <input
      :class="['placeholder:text-secondary-foreground outline-none h-full block', props.class]"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      :value="modelValue"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
    <div v-if="$slots['icon-right']" class="text-secondary-foreground grid place-items-center px-3">
      <slot name="icon-right" />
    </div>
  </div>
</template>
