<script setup>
import { inject } from 'vue'
import PopupHandler from '../utils/PopupHandler.vue'

const showUploadTo = inject('showUploadTo')
const toggleUploadTo = inject('toggleUploadTo')

function triggerUpload(platform) {
  window.triggerUpload(platform)
}
</script>

<template>
    <PopupHandler :show-popup="showUploadTo" @close="toggleUploadTo">
        <template #popup>
            <div class="main">
                <span class="bigtext">Upload to what service?</span>
                <div class="services">
                    <button class="button" @click="triggerUpload('catbox')">Catbox</button>
                    <button class="button" @click="triggerUpload('litterbox')">Litterbox</button>
                </div>
            </div>
        </template>
    </PopupHandler>
</template>

<style>
    .main {
        display: flex;
        flex-direction: column;
        gap: 15px;
        padding: 10px;

        .services {
            display: flex;
            flex-direction: column;
            gap: 3px;
        }
    }
</style>