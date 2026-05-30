<script setup>
import { ref, inject } from 'vue'

const logs = ref("No logs yet...")
const fileInput = ref(null)
const togglePopup = inject('togglePopup')

function openFileDialog() {
    fileInput.value?.click()
}

function onFileSelected() {
    const file = fileInput.value?.files?.[0]
    if (!file) return

    const sizeMB = (file.size / (1024 * 1024)).toFixed(2)
    logs.value = `Selected: ${file.name} (${sizeMB} MB)`

    fileInput.value.value = ''
}
</script>

<template>
    <div>
        <div class="top">
            <pre class="logs">{{ logs }}</pre>
        </div>

        <div class="bottom">
            <input ref="fileInput" type="file" @change="onFileSelected" hidden>
            <button class="button" @click="openFileDialog()">Choose file</button>
            <button class="button" @click="togglePopup()">Upload to...</button>
        </div>
    </div>
</template>

<style scoped>
    div {
        display: flex;
        flex-direction: column;
        gap: 2px;
        align-items: center;
        justify-content: center;

        .top {
            .logs {
                background-color: rgba(255, 255, 255, 0.3);
                border: 1px solid rgba(255, 255, 255, 0.2);
                padding: 1rem;
                border-radius: 0.75rem;
            }
        }

        .bottom {
            display: flex;
            flex-direction: row;
            gap: 8px;
        }
    }
</style>