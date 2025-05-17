<script setup lang="ts">
import type { Tester } from '../scripts/types'

const props = defineProps<{
    tester: Tester
}>();

const emit = defineEmits<{
    (e: 'delete-tester', id: string): void
}>()
</script>

<template>
    <div class="col">
        <div class="card border-primary mb-3">
            <div class="card-body">
                <h5 class="card-title">{{ tester.name }}</h5>
                <p class="card-text"><strong>Email:</strong> {{ tester.email }}</p>
                <button class="btn btn-danger" onclick="(tester) => emit('delete-tester', tester.id)">Supprimer</button>
            </div>
        </div>
    </div>
</template>

<style></style>