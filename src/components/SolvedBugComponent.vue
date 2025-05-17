<script setup lang="ts">
import type { Bug } from '../scripts/types'

const props = defineProps<{
    bug: Bug
}>();

</script>

<template>
    <strong>{{ bug.title }}</strong> (Priorité {{ bug.priority }})<br />
    {{ bug.description }}
</template>

<style></style>