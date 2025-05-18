<script setup lang="ts">
import { computed, ref } from 'vue'
import { Form, Field, ErrorMessage, defineRule, validate } from 'vee-validate'
import { required } from '@vee-validate/rules'
import { useCategoryStore } from '@/stores/categoryStore'

const categoryStore = useCategoryStore()

const name = ref('')

defineRule('isRequired', required)
const isRequired = (value: string) => !value ? 'Ce champ est requis.' : true

const onError = computed(() => categoryStore.onError)

const createCategory = async () => {
    try {
        await categoryStore.createCategory(name.value)
        if (onError.value) {
            confirm("Une erreur s'est produite lors de la création de la catégorie.")
        }
    } catch (error) {
        confirm("Erreur critique lors de l'accès au store.")
    }
}
</script>

<template>
    <div class="text-center mt-4">
        <div class="row justify-content-center">
            <div class="col-6">
                <Form @submit="createCategory">
                    <div class="mb-3">
                        <label class="form-label" for="name-input">Nom de la catégorie</label>
                        <Field id="name-input" name="name" class="form-control" type="text" v-model="name"
                            :rules="isRequired" />
                        <ErrorMessage class="text-danger" name="name" />
                    </div>

                    <button class="btn btn-success" type="submit">
                        Créer la catégorie
                    </button>
                </Form>
            </div>
        </div>
    </div>
</template>
