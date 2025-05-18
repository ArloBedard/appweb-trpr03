<script setup lang="ts">
import { onMounted, computed, ref } from 'vue'
import { useProfileStore } from '../stores/profileStore'
import { Form, Field, ErrorMessage, defineRule, validate } from 'vee-validate'
import { required } from '@vee-validate/rules';

defineRule('isRequired', required);

const profileStore = useProfileStore()

const email = computed(() => profileStore.email)
const role = computed(() => profileStore.role)
const name = ref('')
const password = ref('')
const karma = computed(() => profileStore.karma)

const onError = computed(() => profileStore.onError)

onMounted(async () => {
  try {
    await profileStore.getProfile()
    if (onError.value) {
      confirm("Une erreur s'est produite lors de la récupération du profil de l'utilisateur.")
    }
    name.value = profileStore.name
    password.value = profileStore.password

  } catch (error) {
    confirm("Erreur critique lors de l'accès au store.")
  }
})

const confirmModifyProfile = async () => {
  // Validation manuelle avant la soumission
  const result = await validate({});
  if (!result.valid) {
    return; // Arrête la fonction si la validation échoue
  }

  try {
    await profileStore.modifyProfile(name.value, password.value)
    if (onError.value) {
      confirm("Une erreur s'est produite lors de la modification du profil de l'utilisateur.")
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
  <!-- L'affichage des infos de l'utilisateur (n'inclut pas le form de modification du profile) a été générée à l'aide de ChatGPT  -->
  <div class="container mt-5 d-flex justify-content-center">
    <div class="card shadow-sm" style="width: 400px;">
      <div class="card-header bg-primary text-white">
        <h4 class="mb-0">Profil de l'utilisateur</h4>
      </div>
      <Form @submit="confirmModifyProfile">
        <div class="card-body">
          <div class="mb-3">

            <div class="mb-3">
              <strong>Courriel :</strong>
              <div class="form-control bg-light">{{ email }}</div>
            </div>

            <div class="mb-3">
              <label class="form-label" for="name-input">Nom : </label>
              <Field class="form-control" id="name-input" name="name-input" type="text" :rules="isRequired"
                v-model="name" :disabled="disableFields" />
              <ErrorMessage class="text-danger" name="name-input" />
            </div>

            <div class="mb-3">
              <label class="form-label" for="password-input">Mot de passe :</label>
              <Field class="form-control" id="password-input" name="password-input" type="password" :rules="isRequired"
                v-model="password" :disabled="disableFields" />
              <ErrorMessage class="text-danger" name="password-input" />
            </div>

            <div class="mb-3">
              <strong>Rôle :</strong>
              <span class="badge bg-secondary text-capitalize m-1 fs-6">{{ role }}</span>
            </div>

            <div class="mb-3">
              <strong>Karma :</strong>
              <span class="badge bg-secondary text-capitalize m-1 fs-6">{{ karma }}</span>
            </div>

            <button v-if="!showConfirmation" class="btn btn-primary m-2" type="submit"
              @click="toggleConfirmation">Modifier le profile</button>

            <div v-else class="d-flex gap-2">
              <button class="btn btn-sm btn-secondary" @click="toggleConfirmation">
                Annuler
              </button>
              <button class="btn btn-sm btn-danger" type="submit">
                Confirmer
              </button>
            </div>
          </div>
        </div>
      </Form>
    </div>
  </div>
</template>

<style scoped>
.card {
  border-radius: 12px;
}
</style>
