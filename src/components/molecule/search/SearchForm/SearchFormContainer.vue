<script setup lang="ts">
import { defineProps } from 'vue'
import { useSearchStore } from '@/stores/search.store'
import SearchFormView from '@/components/molecule/search/SearchForm/SearchFormView.vue'

const searchStore = useSearchStore()

interface SearchFormProps {
  modelValue: string
}

const props = withDefaults(defineProps<SearchFormProps>(), {})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  clear: []
}>()

const handleInput = (value: string) => {
  emit('update:modelValue', value)
  searchStore.setFilter('all')
}
</script>

<template>
  <SearchFormView :modelValue="props.modelValue" :onChange="handleInput" />
</template>
