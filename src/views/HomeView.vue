<script setup lang="ts">
import Input from '@/components/atoms/Input.atom.vue'
import IconSearch from '@/components/atoms/icons/IconSearch.atom.vue'
import Button from '@/components/atoms/Button.atom.vue'
import PokeBallSvg from '@/components/atoms/PokeBallSvg.atom.vue'
import PikachuSvg from '@/components/atoms/PikachuSvg.atom.vue'
</script>

<template>
  <main>
    <Input class="w-full" type="text" placeholder="Search">
      <template #icon-left>
        <IconSearch />
      </template>
    </Input>
    <Button variant="primary" rounded="full">
      <IconSearch />
      Get started
    </Button>
    <PokeBallSvg />
    <PikachuSvg />
  </main>
</template>
