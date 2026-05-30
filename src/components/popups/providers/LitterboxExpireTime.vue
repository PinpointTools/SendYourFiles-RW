<script setup>
import { inject } from 'vue'
import PopupHandler from '../utils/PopupHandler.vue';

const toggleLitterboxExpireTime = inject('toggleLitterboxExpireTime')
const showLitterboxExpireTime = inject('showLitterboxExpireTime')

function temporary(hours) {
  alert(`Just temporary for now... Hey, you picked ${hours} hour(s) though! So it works I guess :3`)
}
</script>

<template>
    <PopupHandler :show-popup="showLitterboxExpireTime" @close="toggleLitterboxExpireTime">
        <template #popup>
            <div class="main">
                <span class="bigtext">Expire At?</span>
                <button class="button" @click="temporary(1)">1 Hour</button>
                <button class="button" @click="temporary(12)">12 Hours</button>
                <button class="button" @click="temporary(24)">24 Hours (1 Day)</button>
                <button class="button" @click="temporary(72)">72 Hours (3 Days)</button>
            </div>
        </template>
    </PopupHandler>
</template>

<style scoped>
    .main {
        display: flex;
        flex-direction: column;
        gap: 5px;
    }
</style>