<script setup lang="ts">
import type { Bug } from '@/scripts/types'
import { useBugStore } from '@/stores/bugStore';
import { required } from '@vee-validate/rules';
import { Form, Field, ErrorMessage, defineRule, validate } from 'vee-validate'
import { computed, ref } from 'vue';

defineRule('isRequired', required);

const props = defineProps<{
    bug: Bug
}>()

const bugStore = useBugStore()
const onError = computed(() => bugStore.onError)
const priority = ref(props.bug.priority)

const confirmModifyPriority = async () => {
    // Validation manuelle avant la soumission
    const result = await validate({});
    if (!result.valid) {
        return; // Arrête la fonction si la validation échoue
    }

    try {
        await bugStore.modifyPriority(props.bug.id, Number(priority.value))
        if (onError.value) {
            confirm("Une erreur s'est produite lors de la modification de la priorité.")
        }
    } catch (error) {
        confirm("Erreur critique lors de l'accès au store.")
    }

    toggleConfirmation()
};

const showConfirmation = ref(false)
const disableFields = ref(true)

function toggleConfirmation() {
    showConfirmation.value = !showConfirmation.value
    disableFields.value = !disableFields.value
}

// Fonction pour vérifier si un champ est vide, utilisée dans les règles de vee-validate
const isRequired = (value: any) => !value ? 'Ce champ est requis.' : true;
</script>

<template>
    <div class="p-3 border rounded bg-light mb-3">
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
        <Form v-on:submit="confirmModifyPriority">
            <div>
                <label class="form-label fw-bold" for="priority-input">Priorité :</label>
                <Field class="form-control d-inline-block w-auto bg-light m-2" style="max-width: 35px;"
                    id="priority-input" name="priority-input" type="text" :rules="isRequired" v-model="priority"
                    :disabled="disableFields" />
                <ErrorMessage class="text-danger" name="priority-input" />
                <div v-if="!showConfirmation">
                    <button class="btn btn-primary m-2" type="submit" @click="toggleConfirmation">Modifier la
                        priorité</button>
                </div>

                <div v-else class="d-flex gap-2">
                    <button class="btn btn-sm btn-secondary" @click="toggleConfirmation">
                        Annuler
                    </button>
                    <button class="btn btn-sm btn-primary" type="submit">
                        Confirmer
                    </button>
                </div>

            </div>
        </Form>
    </div>
</template>

<style scoped></style>
