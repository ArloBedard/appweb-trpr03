<script setup lang="ts">
import { ref } from 'vue';
import type { User } from '../scripts/types'

const props = defineProps<{
    tester: User
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
        <!-- L'affichage des infos d'un testeur (n'inclut pas la logique de suppression) a été générée à l'aide de ChatGPT  -->
        <div class="card border-primary mb-3">
            <div class="card-body">
                <h5 class="card-title">{{ tester.name }}</h5>
                <p class="card-text"><strong>Email:</strong> {{ tester.email }}</p>
                <p class="card-text"><strong>Karma:</strong> {{ tester.karma }}</p>
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