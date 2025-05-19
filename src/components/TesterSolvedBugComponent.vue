<script setup lang="ts">
import type { Bug } from '@/scripts/types'
import { ref } from 'vue';

const props = defineProps<{
    bug: Bug
}>()

const emit = defineEmits<{
    (e: 'close-bug', id: string): void
}>()

const showConfirmation = ref(false)

function confirmSolve() {
    if (props.bug.id) {
        emit('close-bug', props.bug.id)
        showConfirmation.value = false
    }
}

function toggleConfirmation() {
    showConfirmation.value = !showConfirmation.value
}

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
        <div v-if="bug.img">
            <strong>Capture d'écran :</strong>
            <div class="m-2">
                <img :src="bug.img" alt="Capture du bogue" class="img-fluid rounded border" />
            </div>
        </div>
        <p class="m-2"><strong>Priorité :</strong> {{ getPriorityLabel(bug.priority) }}</p>
        <p class="m-2"><strong>Résolu par :</strong> {{ bug.solvedBy }}</p>

        <button v-if="!showConfirmation" class="btn btn-sm btn-danger mt-2" @click="toggleConfirmation()">
            Fermer le bogue
        </button>
        <div v-else class="d-flex gap-2 mt-2">
            <button class="btn btn-sm btn-secondary" @click="toggleConfirmation()">Annuler</button>
            <button class="btn btn-sm btn-danger" @click="confirmSolve()">Confirmer</button>
        </div>
    </div>
</template>

<style scoped></style>
