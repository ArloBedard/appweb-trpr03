<script setup lang="ts">
import type { Bug } from '@/scripts/types'

defineProps<{
    bug: Bug
}>()

function getPriorityLabel(priority: number) {
    switch (priority) {
        case 1: return 'Critique';
        case 2: return 'Prioritaire';
        case 3: return 'Important';
    }
}
</script>

<template>
    <div class="p-3 border rounded bg-light mb-3">
        <h5>{{ bug.title }}</h5>
        <p class="m-2"><strong>Description :</strong> {{ bug.description }}</p>
        <p class="m-2"><strong>Étapes pour reproduire :</strong> {{ bug.steps }}</p>
        <p class="m-2"><strong>Plateforme :</strong> {{ bug.platform }}</p>
        <p class="m-2"><strong>Priorité :</strong> {{ getPriorityLabel(bug.priority) }}</p>
    </div>
</template>

<style scoped></style>
