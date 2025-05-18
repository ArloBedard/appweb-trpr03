<script setup lang="ts">
import { computed } from 'vue';
import { useBugStore } from '../stores/bugStore'
import { useCategoryStore } from '../stores/categoryStore'
import LeadUnsolvedBugComponent from '../components/LeadUnsolvedBugComponent.vue'
import LeadSolvedBugComponent from '../components/LeadSolvedBugComponent.vue'
import AddCategoryComponent from '../components/AddCategoryComponent.vue'

const bugsStore = useBugStore()
const categoryStore = useCategoryStore()

const categories = computed(() => categoryStore.categories)
const bugs = computed(() => bugsStore.bugs)
const onError = computed(() => bugsStore.onError)

async function handleSolveBug(bugId: string) {
    try {
        await bugsStore.solveBug(bugId)
        if (onError.value) {
            confirm("Une erreur s'est produite lors de la modification du bogue.")
        }
    } catch (error) {
        confirm("Erreur critique lors de l'accès au store.")
    }
}

function filteredBugs(categoryId: string, solved: boolean) {
    return bugs.value.filter(bug => bug.category === categoryId && bug.solved === solved)
}


</script>

<template>
    <h1 class="display-4 mb-4">Gestion des bogues</h1>

    <div class="row">
        <div class="col-7 m-3">
            <div class="accordion" id="bugsAccordion">
                <div v-for="(category, index) in categories">
                    <div class="accordion-item" :id="`heading-${index}`">
                        <h2 class="accordion-header">
                            <button class="accordion-button" type="button" data-bs-toggle="collapse"
                                :data-bs-target="`#collapse-${index}`" aria-expanded="true"
                                :aria-controls="`collapse-${index}`">
                                {{ category.name }}
                            </button>
                        </h2>
                        <div :id="`collapse-${index}`" class="accordion-collapse collapse"
                            data-bs-parent="#bugsAccordion">
                            <div class="accordion-body">
                                <!-- L'affichage des bogues (pas la partie de logique du filtrage) a été générée en partie à l'aide de ChatGPT  -->
                                <ul class="list-group">
                                    <!-- Non résolus -->
                                    <li class="list-group-item list-group-item-light"
                                        v-if="filteredBugs(category.id, false).length">
                                        <h5>🛠️ Bogues à résoudre</h5>
                                    </li>
                                    <li v-for="bug in filteredBugs(category.id, false)" :key="bug.id"
                                        class="list-group-item">
                                        <LeadUnsolvedBugComponent :bug="bug" v-on:solve-bug="handleSolveBug(bug.id)" />
                                    </li>

                                    <!-- Résolus -->
                                    <li class="list-group-item list-group-item-light mt-3"
                                        v-if="filteredBugs(category.id, true).length">
                                        <h5>✅ Bogues résolus</h5>
                                    </li>
                                    <li v-for="bug in filteredBugs(category.id, true)" :key="bug.id"
                                        class="list-group-item text-muted" style="opacity: 0.6;">
                                        <LeadSolvedBugComponent :bug="bug" />
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-4">
            <AddCategoryComponent />
        </div>
    </div>
</template>

<style></style>