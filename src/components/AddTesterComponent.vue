<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore';
import { computed, ref } from 'vue';
import { Field, Form, ErrorMessage, defineRule, validate } from 'vee-validate'
import { required } from '@vee-validate/rules'
import { useTesterStore } from '../stores/testerStore'

const testerStore = useTesterStore()

defineRule('isRequired', required);

const email = ref<string>("");
const password = ref<string>("");
const name = ref<string>("");
const onError = computed(() => testerStore.onError)

const isRequired = (value: any) => !value ? 'Ce champ est requis.' : true;

const createTester = async () => {

    const result = await validate({});
    if (!result.valid) {
        return;
    }

    try {
        await testerStore.createTester(email.value, password.value, name.value)
        if (onError.value) {
            confirm("Une erreur s'est produite lors de la création du testeur.")
        }
    } catch (error) {
        confirm("Erreur critique lors de l'accès au store.")
    }

};
</script>

<template>
    <div class="m-4">
        <h3>Ajouter un testeur</h3>
        <div class="row">
            <div class="col">
                <Form @submit="createTester">
                    <div class="mb-3">
                        <label class="form-label" for="email-input">Courriel</label>
                        <Field class="form-control" id="email-input" name="email-input" type="email" :rules="isRequired"
                            v-model="email" />
                        <ErrorMessage class="text-danger" name="email-input" />
                    </div>

                    <div class="mb-3">
                        <label class="form-label" for="name-input">Nom</label>
                        <Field class="form-control" id="name-input" name="name-input" type="text" v-model="name" />
                    </div>

                    <div class="mb-3">
                        <label class="form-label" for="password-input">Mot de passe</label>
                        <Field class="form-control" id="password-input" name="password-input" type="password"
                            :rules="isRequired" v-model="password" />
                        <ErrorMessage class="text-danger" name="password-input" />
                    </div>
                    <button class="btn btn-primary" type="submit">Créer</button>
                </Form>
            </div>
        </div>
    </div>
</template>

<style></style>