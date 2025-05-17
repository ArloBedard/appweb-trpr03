<script setup lang="ts">
import { ref } from 'vue';
import type { Bug } from '../scripts/types'

const props = defineProps<{
    bug: Bug
}>();

const emit = defineEmits<{
    (e: 'solve-bug', id: string): void
}>()

const showConfirmation = ref(false)

function confirmSolve() {
    if (props.bug.id) {
        emit('solve-bug', props.bug.id)
        showConfirmation.value = false
    }
}

function toggleConfirmation() {
    showConfirmation.value = !showConfirmation.value
}

</script>

<template>
    <strong>{{ bug.title }}</strong> (Priorité {{ bug.priority }})<br />
    {{ bug.description }}<br />
    <button v-if="!showConfirmation" class="btn btn-sm btn-primary mt-2" @click="toggleConfirmation()">
        Résoudre
    </button>
    <div v-else class="d-flex gap-2 mt-2">
        <button class="btn btn-sm btn-secondary" @click="toggleConfirmation()">Annuler</button>
        <button class="btn btn-sm btn-success" @click="confirmSolve()">Confirmer</button>
    </div>
</template>

<style></style>