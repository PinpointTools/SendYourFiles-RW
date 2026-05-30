<script setup>
import { inject } from 'vue'
import PopupHandler from '../utils/PopupHandler.vue';

const toggleSettings = inject('toggleSettings')
const showSettings = inject('showSettings')
</script>

<template>
    <PopupHandler :show-popup="showSettings" @close="toggleSettings">
        <template #popup>
            <div class="main">
                <span class="bigtext">Settings</span>
                <span>SORRY BUT THIS IS A WORK IN PROGRESS!</span>
            </div>
        </template>
    </PopupHandler>
</template>

<style scoped>
    .main {
        display: flex;
        flex-direction: column;
        gap: 15px;
    }
</style>