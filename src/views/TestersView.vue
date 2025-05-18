<script setup lang="ts">
import { computed } from 'vue'
import AddTesterComponent from '../components/AddTesterComponent.vue'
import TesterComponent from '../components/TesterComponent.vue'
import TesterKarmaComponent from '../components/TesterKarmaComponent.vue'
import { useTesterStore } from '../stores/testerStore'

const testerStore = useTesterStore()

const testers = computed(() => testerStore.testers)

async function handleDeleteTester(id: string) {
    try {
        await testerStore.deleteTester(id)
        if (testerStore.onError) {
            confirm("Une erreur s'est produite lors de la suppression du tester : ${error}")
        }
    } catch (error) {
        confirm("Erreur critique lors de l'accès au store.")
    }
}
</script>

<template>
    <h1 class="display-4">Gestion des testeurs</h1>
    <div class="row justify-content-around">
        <div class="col-6 p-2 m-3">
            <h2>Testeurs</h2>
            <div class="row row-cols-3">
                <TesterComponent v-for="tester in testers" :key="tester.email" :tester="tester"
                    @delete-tester="handleDeleteTester" />
            </div>
        </div>
        <div class="col-4 p-2 m-3">
            <AddTesterComponent />
            <TesterKarmaComponent />
        </div>
    </div>
</template>

<style></style>