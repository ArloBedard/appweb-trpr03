<script setup lang="ts">
import { computed } from 'vue';
import { useBugStore } from '../stores/bugStore'
import { useCategoryStore } from '../stores/categoryStore'

const bugsStore = useBugStore()
const categoryStore = useCategoryStore()

const categories = computed(() => categoryStore.categories)
const bugs = computed(() => bugsStore.bugs)

</script>

<template>
    <h1 class="display-4 mb-4">Gestion des bogues</h1>

    <div class="accordion" id="bugsAccordion">
        <div v-for="(category, index) in categories" :key="category.name">
            <div class="accordion-item" :id="`heading-${index}`">
                <h2 class="accordion-header">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse"
                        :data-bs-target="`#collapse-${index}`" aria-expanded="true"
                        :aria-controls="`collapse-${index}`">
                        {{ category.name }}
                    </button>
                </h2>
                <div :id="`collapse-${index}`" class="accordion-collapse collapse" data-bs-parent="#bugsAccordion">
                    <div class="accordion-body">
                        <ul class="list-group">
                            <div v-for="bug in bugs" :key="bug.priority">
                                <div v-if="bug.category == category.id">
                                    <li class="list-group-item">
                                        <strong>{{ bug.title }}</strong> (Priorité {{ bug.priority }})
                                        <br />
                                        {{ bug.description }}
                                    </li>
                                </div>
                            </div>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style></style>