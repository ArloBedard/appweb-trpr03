<script setup lang="ts">
import AddTesterComponent from '../components/AddTesterComponent.vue'
import TesterComponent from '../components/TesterComponent.vue'
import { useTesterStore } from '../stores/testerStore'

const testerStore = useTesterStore()


console.log(testerStore.testers)
</script>

<template>
    <h1 class="display-4">Gestion des testeurs</h1>
    <div class="row justify-content-around">
        <div class="col-6 p-2 m-3">
            <h2>Testeurs</h2>
            <div class="row row-cols-3">
                <TesterComponent v-for="tester in testerStore.testers" :key="tester.email" :tester="tester" />
            </div>
        </div>
        <div class="col-5 p-2 m-3">
            <AddTesterComponent />
        </div>
    </div>
</template>

<style></style>