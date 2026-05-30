
<script setup>
    import { inject } from 'vue'
    import PopupHandler from '../PopupHandler.vue'

    const showPopup = inject('showPopup')
    const togglePopup = inject('togglePopup')
</script>

<template>
    <PopupHandler :show-popup="showPopup" @close="togglePopup">
        <template #popup>
            <div class="main">
                <span class="bigtext">Upload to what service?</span>
                <div class="services">
                    <button class="button" @click="togglePopup">Catbox</button>
                    <button class="button" @click="togglePopup">Litterbox</button>
                </div>
                <button class="button" @click="togglePopup">Cancel</button>
            </div>
        </template>
    </PopupHandler>
</template>

<style>
    .main {
        display: flex;
        flex-direction: column;
        gap: 15px;

        .services {
            display: flex;
            flex-direction: column;
            gap: 3px;
        }
    }
</style>