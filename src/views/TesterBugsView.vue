<script setup lang="ts">import { computed, watch } from 'vue'
import { useProfileStore } from '../stores/profileStore'
import { useRouter } from 'vue-router'

const profileStore = useProfileStore()

const router = useRouter()

const role = computed(() => profileStore.role)

if (role.value !== 'tester') {
    router.push({ name: 'LeadBugs' })
}
</script>

<template></template>

<style></style>