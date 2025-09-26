<script setup lang="ts">
import { computed, ref } from 'vue'
import { Form, Field, ErrorMessage, defineRule, validate } from 'vee-validate'
import { required } from '@vee-validate/rules'
import { useBugStore } from '@/stores/bugStore'
import { useCategoryStore } from '@/stores/categoryStore'

const bugStore = useBugStore()
const categoryStore = useCategoryStore()

const categories = computed(() => categoryStore.categories)
console.log(categories.value)

const title = ref('')
const description = ref('')
const steps = ref('')
const category = ref('')
const platform = ref('')
const priority = ref(0)
const img = ref('')
const onError = computed(() => bugStore.onError)


defineRule('isRequired', required)
const isRequired = (value: string) => !value ? 'Ce champ est requis.' : true

const priorityRange = (value: string | number) => {
    const num = Number(value)
    if (!value) return 'Ce champ est requis.'
    if (isNaN(num)) return 'La priorité doit être un nombre.'
    if (num < 1 || num > 3) return 'La priorité doit être entre 1 et 3.'
    return true
}

const createBug = async () => {
    const result = await validate({});
    if (!result.valid) {
        return;
    }

    try {
        await bugStore.createBug(title.value, description.value, steps.value, category.value, platform.value, Number(priority.value), img.value)
        if (onError.value) {
            confirm("Une erreur s'est produite lors de la création du bogue.")
        }
    } catch (error) {
        confirm("Erreur critique lors de l'accès au store.")
    }
}
</script>

<template>
    <div class="m-4">
        <h3>Créer un bogue</h3>
        <div class="row">
            <div class="col">
                <Form @submit="createBug">
                    <div class="mb-3">
                        <label class="form-label" for="title-input">Titre</label>
                        <Field class="form-control" id="title-input" name="title-input" type="text" :rules="isRequired"
                            v-model="title" />
                        <ErrorMessage class="text-danger" name="title-input" />
                    </div>

                    <div class="mb-3">
                        <label class="form-label" for="description-input">Description</label>
                        <Field as="textarea" rows="3" class="form-control" id="description-input"
                            name="description-input" :rules="isRequired" v-model="description" />
                        <ErrorMessage class="text-danger" name="description-input" />
                    </div>

                    <div class="mb-3">
                        <label class="form-label" for="steps-input">Étapes pour reproduire</label>
                        <Field as="textarea" rows="3" class="form-control" id="steps-input" name="steps-input"
                            :rules="isRequired" v-model="steps" />
                        <ErrorMessage class="text-danger" name="steps-input" />
                    </div>

                    <div class="mb-3">
                        <label class="form-label" for="platform-input">Plateforme</label>
                        <Field class="form-control" id="platform-input" name="platform-input" type="text"
                            :rules="isRequired" v-model="platform" />
                        <ErrorMessage class="text-danger" name="platform-input" />
                    </div>

                    <div class="mb-3">
                        <label class="form-label" for="priority-input">Priorité</label>
                        <Field class="form-control" id="priority-input" name="priority-input" type="number" min="1"
                            max="3" :rules="priorityRange" v-model="priority" />
                        <ErrorMessage class="text-danger" name="priority-input" />
                        <small class="form-text text-muted">1 = Critique, 2 = Prioritaire, 3 = Important</small>
                    </div>

                    <div class="mb-3">
                        <label class="form-label" for="category-input">Catégorie</label>
                        <Field as="select" class="form-select" id="category-input" name="category-input"
                            :rules="isRequired" v-model="category">
                            <option disabled value="">-- Choisissez une catégorie --</option>
                            <option v-for="category in categories" :key="category.id" :value="category.id">
                                {{ category.name }}
                            </option>
                        </Field>
                        <ErrorMessage class="text-danger" name="category-input" />
                    </div>

                    <div class="mb-3">
                        <label class="form-label" for="img-input">Image :</label>
                        <Field class="form-control" id="img-input" name="img-input" type="text" :rules="isRequired"
                            v-model="img" />
                        <ErrorMessage class="text-danger" name="img-input" />
                        <small class="form-text text-muted">
                            <!-- Affichage des instructions à l'aide de ChatGPT. -->
                            Utiliser Imgur et assurez-vous d'entrer le lien direct de l'image, par exemple :
                            <code>https://i.imgur.com/xxxxx.png</code> (et non <code>imgur.com/xxxxx</code>).
                        </small>
                    </div>

                    <button class="btn btn-primary" type="submit">Créer</button>
                </Form>
            </div>
        </div>
    </div>
</template>

<style></style>