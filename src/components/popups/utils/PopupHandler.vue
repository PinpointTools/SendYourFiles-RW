<script setup>
defineProps({ showPopup: Boolean })
const emit = defineEmits(['close'])

function close() {
    emit('close')
}
</script>

<template>
    <div class="popupOverlay" :class="{ visible: showPopup }" @click.self="close">
        <div class="popup">
            <button class="closeButton" @click="close">×</button>
            <div class="mainContentPopup"><slot name="popup" /></div>
        </div>
    </div>
</template>

<style scoped>
.popupOverlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
    opacity: 0;
    pointer-events: none;
    backdrop-filter: blur(6px);
    transition: opacity 0.25s ease;

    &.visible {
        opacity: 1;
        pointer-events: auto;

        .popup {
            transform: scale(1);
            opacity: 1;
        }
    }

    .popup {
        background: rgba(255, 255, 255, 0.25);
        border: 1px solid rgba(255, 255, 255, 0.2);
        color: white;
        padding: 2rem;
        border-radius: 1rem;
        min-width: 300px;
        max-width: 500px;
        position: relative;
        transform: scale(0.5);
        opacity: 0;
        transition: transform 0.25s ease, opacity 0.25s ease;

        @media screen and (max-width: 768px) {
            min-width: 100px;
            margin: 0 1rem;
        }
        
        .mainContentPopup {
            max-height: 500px;
            overflow: auto;
        }

        .closeButton {
            position: absolute;
            top: 0.5rem;
            right: 0.75rem;
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
        }
    }
}
</style>