<script setup>
import { inject } from 'vue'
import PopupHandler from '../utils/PopupHandler.vue'

defineProps({
    provider: { type: String, required: true },
    size: { type: String, required: true },
    providerSize: { type: String, required: true }
})

const toggleFileTooBig = inject('toggleFileTooBig')
const showFileTooBig = inject('showFileTooBig')
</script>

<template>
    <PopupHandler :show-popup="showFileTooBig" @close="toggleFileTooBig">
        <template #popup>
            <div class="main">
                <span class="bigtext">File Too Big</span>
                <p>Your file is <strong>{{ size }}</strong>, but <strong>{{ provider }}</strong> does not support files that large. <strong>{{ provider }}</strong> max size is <strong>{{ providerSize }}</strong>.</p>
            </div>
        </template>
    </PopupHandler>
</template>

<style scoped>
    .main {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
</style>