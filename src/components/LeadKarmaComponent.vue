<script setup lang="ts">
import { computed, ref } from 'vue';
import { Field, Form, ErrorMessage, defineRule, validate } from 'vee-validate'
import { required } from '@vee-validate/rules'
import { useLeadStore } from '@/stores/leadStore';

const leadStore = useLeadStore()

defineRule('isRequired', required);

const leads = computed(() => leadStore.leads)
const email = ref("");
const karma = ref(0)
const onError = computed(() => leadStore.onError)

const isRequired = (value: any) => !value ? 'Ce champ est requis.' : true;

const handleGiveKarma = async () => {

    const result = await validate({});
    if (!result.valid) {
        return;
    }

    try {
        karma.value += 10
        await leadStore.modifyKarma(email.value, karma.value)
        if (onError.value) {
            confirm("Une erreur s'est produite lors de la modification du karma.")
        }
    } catch (error) {
        confirm("Erreur critique lors de l'accès au store.")
    }

};

const handleTakeKarma = async () => {

    const result = await validate({});
    if (!result.valid) {
        return;
    }

    try {
        karma.value -= 10
        await leadStore.modifyKarma(email.value, karma.value)
        if (onError.value) {
            confirm("Une erreur s'est produite lors de la modification du karma.")
        }
    } catch (error) {
        confirm("Erreur critique lors de l'accès au store.")
    }

};
</script>

<template>
    <div class="m-4">
        <h3>Ajouter ou retirer du karma</h3>
        <Form>
            <div class="mb-3">
                <label class="form-label" for="email-input">Courriel</label>
                <Field as="select" class="form-select" id="email-input" name="email-input" type="email"
                    :rules="isRequired" v-model="email">
                    <option disabled value="">-- Choisissez un courriel --</option>
                    <option v-for="lead in leads" :key="lead.id" :value="lead.email">
                        {{ lead.email }}
                    </option>
                </Field>
                <ErrorMessage class="text-danger" name="email-input" />
            </div>
            <button class="btn btn-success  m-2" @click="handleGiveKarma">+ 10 karma</button>
            <button class="btn btn-danger m-2" @click="handleTakeKarma">- 10 karma</button>
        </Form>
    </div>
</template>

<style></style>