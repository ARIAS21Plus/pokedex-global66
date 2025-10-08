<script setup lang="ts">
import { defineProps } from 'vue'
import Input from '@/components/atoms/Input.vue'
import IconSearch from '@/components/atoms/icons/IconSearch.vue'

const props = defineProps<{
  modelValue: string
  onChange: (value: string) => void
}>()
</script>

<template>
  <form @submit.prevent>
    <Input
      :modelValue="props.modelValue"
      @update:modelValue="props.onChange"
      placeholder="Search pokemon..."
    >
      <template #icon-left>
        <IconSearch />
      </template>
    </Input>
  </form>
</template>
