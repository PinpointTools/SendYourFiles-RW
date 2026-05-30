<script setup>
import { inject } from 'vue'
import PopupHandler from '../utils/PopupHandler.vue'

const showUploadTo = inject('showUploadTo')
const toggleUploadTo = inject('toggleUploadTo')
const toggleLitterboxExpireTime = inject('toggleLitterboxExpireTime')
const openFileTooBig = inject('openFileTooBig')

function selectProvider(provider) {
  const size = globalThis.sizeMB?.value
  toggleUploadTo()
  if (provider == 'Catbox' && size > 200) {
    openFileTooBig('Catbox', size + ' MB')
    return
  } else if (provider == 'Litterbox' && size > 1000) {
    openFileTooBig('Litterbox', size + ' MB')
    return
  }
  toggleLitterboxExpireTime()
}
</script>

<template>
    <PopupHandler :show-popup="showUploadTo" @close="toggleUploadTo">
        <template #popup>
            <div class="main">
                <span class="bigtext">Upload to what service?</span>
                <div class="services">
                    <button class="button" @click="selectProvider('Catbox')">Catbox</button>
                    <button class="button" @click="selectProvider('Litterbox')">Litterbox</button>
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