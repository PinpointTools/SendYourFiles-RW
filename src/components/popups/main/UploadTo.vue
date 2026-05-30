<script setup>
import { inject } from 'vue'
import PopupHandler from '../utils/PopupHandler.vue'

const showUploadTo = inject('showUploadTo')
const toggleUploadTo = inject('toggleUploadTo')
const toggleLitterboxExpireTime = inject('toggleLitterboxExpireTime')

function temporary() {
  alert("Temporary message I guess...")
}

function pickLitterbox() {
  toggleUploadTo()
  toggleLitterboxExpireTime()
}
</script>

<template>
    <PopupHandler :show-popup="showUploadTo" @close="toggleUploadTo">
        <template #popup>
            <div class="main">
                <span class="bigtext">Upload to what service?</span>
                <div class="services">
                    <button class="button" @click="temporary()">Catbox</button>
                    <button class="button" @click="pickLitterbox">Litterbox</button>
                </div>
                <button class="button" @click="toggleUploadTo">Cancel</button>
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