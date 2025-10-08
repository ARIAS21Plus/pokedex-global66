<script setup lang="ts">
import { defineProps, type PropType } from 'vue'
const props = defineProps({
  variant: {
    type: String as PropType<'primary' | 'secondary' | 'accent' | 'default'>,
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
  as: {
    type: [String, Object],
    default: 'button',
  },
})
</script>

<template>
  <component
    :class="[
      'cursor-pointer disabled:cursor-not-allowed disabled:bg-muted-foreground disabled:text-secondary-foreground inline-flex items-center justify-center transition-all select-none',
      {
        'px-5 py-2 min-w-30 gap-2 font-bold': size !== 'icon',
        'w-11 h-11 rounded-full min-w-max p-0 [&>svg]:w-6 [&>svg]:h-6': size === 'icon',
        'h-11': size === 'default',
        'bg-muted-foreground active:bg-muted text-secondary-foreground': variant === 'default',
        'bg-primary active:bg-primary-foreground text-white': variant === 'primary',
        'bg-secondary-foreground active:bg-secondary text-white': variant === 'secondary',
        'rounded-full': rounded === 'full',
        rounded: rounded === 'default',
      },
      props.class,
    ]"
    :disabled="disabled"
    :is="as"
  >
    <slot />
  </component>
</template>
