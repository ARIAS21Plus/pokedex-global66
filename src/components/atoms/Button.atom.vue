<script setup lang="ts">
import { defineProps, type PropType } from 'vue'
const props = defineProps({
  variant: {
    type: String as PropType<'primary' | 'secondary' | 'accent' | 'destructive' | 'default'>,
    default: 'default',
  },
  class: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String as PropType<'button' | 'submit' | 'reset'>,
    default: 'button',
  },
  size: {
    type: String as PropType<'icon' | 'default'>,
    default: 'default',
  },
  rounded: {
    type: String as PropType<'default' | 'full'>,
    default: 'default',
  },
})
</script>

<template>
  <button
    :class="[
      'cursor-pointer disabled:cursor-not-allowed disabled:bg-secondary-foreground inline-flex items-center justify-center transition-all',
      {
        'px-5 py-2 min-w-30 gap-2 font-bold': size !== 'icon',
      },
      {
        'bg-muted-foreground active:bg-muted text-foreground': variant === 'default',
        'bg-primary active:bg-primary-foreground text-white': variant === 'primary',
        'bg-muted-foreground active:bg-muted text-accent': variant === 'accent',
        'rounded-full': rounded === 'full',
        rounded: rounded === 'default',
        'w-11 h-11 rounded-full min-w-max p-0': size === 'icon',
        'h-11': size === 'default',
      },
      props.class,
    ]"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>
