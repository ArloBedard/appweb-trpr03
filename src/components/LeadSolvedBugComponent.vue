<script setup lang="ts">
import type { Bug } from '../scripts/types'

const props = defineProps<{
    bug: Bug
}>();

function getPriorityLabel(priority: number) {
    switch (priority) {
        case 1: return 'Critique';
        case 2: return 'Prioritaire';
        case 3: return 'Important';
    }
}

</script>

<template>
    <strong>{{ bug.title }}</strong> (Priorité {{ getPriorityLabel(bug.priority) }})<br />
    {{ bug.description }}
</template>

<style></style>