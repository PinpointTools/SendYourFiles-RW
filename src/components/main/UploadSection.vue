<script setup>
import { ref, inject } from 'vue'

const logs = ref("No logs yet...")
const fileInput = ref(null)
const toggleUploadTo = inject('toggleUploadTo')
globalThis.sizeMB = ref(0)

function openFileDialog() {
    fileInput.value?.click()
}

function onFileSelected() {
    const file = fileInput.value?.files?.[0]
    if (!file) return

    sizeMB.value = (file.size / (1024 * 1024)).toFixed(2)
    logs.value = `Selected: ${file.name} (${sizeMB.value} MB)`

    fileInput.value.value = ''
}

function openUploadDialog() {
    if (sizeMB.value) {
        toggleUploadTo?.()
    } else {
        logs.value = 'You can\'t upload a file if you don\'t select one. That would turn a n͇̹̩͔͉͉͙̘͊͆̀̔̀̊ų̻̼͇̫̤̼̓̀̚͡l̨̛̬͕̂͊̌͘ͅḷ̶̟̺͉̬̓̒́̂͞͠'
    }
}

function copyLogs() {
    navigator.clipboard.writeText(logs.value)
}
</script>

<template>
    <div>
        <div class="top">
            <pre class="logs" @click="copyLogs()">{{ logs }}</pre>
        </div>

        <div class="bottom">
            <input ref="fileInput" type="file" @change="onFileSelected" hidden>
            <button class="button" @click="openFileDialog()">Choose file</button>
            <button class="button" @click="openUploadDialog()">Upload to...</button>
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
                width: 500px; @media screen and (max-width: 768px) { width: 250px; }
                overflow: auto;
                scrollbar-color: rgba(255, 255, 255, 0.5) rgba(0, 0, 0, 0);
                cursor: pointer;
                user-select: all;
            }
        }

        .bottom {
            display: flex;
            flex-direction: row;
            gap: 8px;
        }
    }
</style>