<script setup lang="ts">
import { ref } from 'vue';
import type { Tester } from '../scripts/types'

const props = defineProps<{
    tester: Tester
}>();

const emit = defineEmits<{
    (e: 'delete-tester', id: string): void
}>()

const showConfirmation = ref(false)

function confirmDelete() {
    if (props.tester.id) {
        emit('delete-tester', props.tester.id)
        showConfirmation.value = false
    }
}

function toggleConfirmation() {
    showConfirmation.value = !showConfirmation.value
}

</script>

<template>
    <div class="col">
        <div class="card border-primary mb-3">
            <div class="card-body">
                <h5 class="card-title">{{ tester.name }}</h5>
                <p class="card-text"><strong>Email:</strong> {{ tester.email }}</p>
                <button v-if="!showConfirmation" class="btn btn-danger" @click="toggleConfirmation">
                    Supprimer
                </button>

                <div v-else class="d-flex gap-2">
                    <button class="btn btn-sm btn-secondary" @click="toggleConfirmation">
                        Annuler
                    </button>
                    <button class="btn btn-sm btn-danger" @click="confirmDelete">
                        Confirmer
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style></style>