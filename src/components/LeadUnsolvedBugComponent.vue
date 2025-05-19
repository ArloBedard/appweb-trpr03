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
        <!-- L'affichage d'un bogue (pas la partie de résolution d'un bogue) a été générée à l'aide de ChatGPT  -->
        <h5>{{ bug.title }}</h5>
        <div>
            <strong>Description :</strong>
            <div class="form-control d-inline-block w-auto bg-light m-2"> {{ bug.description }}</div>
        </div>

        <div>
            <strong>Étapes pour reproduire :</strong>
            <div class="form-control d-inline-block w-auto bg-light m-2">{{ bug.steps }}
            </div>
        </div>

        <div>
            <strong>Plateforme :</strong>
            <div class="form-control d-inline-block w-auto bg-light m-2">{{ bug.platform }}
            </div>
        </div>
        <div v-if="bug.img">
            <strong>Capture d'écran :</strong>
            <div class="m-2">
                <img :src="bug.img" alt="Capture du bogue" class="img-fluid rounded border" />
            </div>
        </div>
        <button v-if="!showConfirmation" class="btn btn-sm btn-primary mt-2" @click="toggleConfirmation()">
            Résoudre
        </button>
        <div v-else class="d-flex gap-2 mt-2">
            <button class="btn btn-sm btn-secondary" @click="toggleConfirmation()">Annuler</button>
            <button class="btn btn-sm btn-success" @click="confirmSolve()">Confirmer</button>
        </div>
    </div>
</template>

<style></style>