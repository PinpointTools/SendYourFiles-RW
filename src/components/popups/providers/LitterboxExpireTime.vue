<script setup>
import { inject } from 'vue'
import PopupHandler from '../utils/PopupHandler.vue';

const toggleLitterboxExpireTime = inject('toggleLitterboxExpireTime')
const showLitterboxExpireTime = inject('showLitterboxExpireTime')

function litterBoxExpire(timeLabel) {
  window.litterBoxExpire(timeLabel)
}
</script>

<template>
    <PopupHandler :show-popup="showLitterboxExpireTime" @close="toggleLitterboxExpireTime">
        <template #popup>
            <div class="main">
                <span class="bigtext">Expire At?</span>
                <button class="button" @click="litterBoxExpire('1 Hour')">1 Hour</button>
                <button class="button" @click="litterBoxExpire('12 Hours')">12 Hours</button>
                <button class="button" @click="litterBoxExpire('24 Hours')">24 Hours (1 Day)</button>
                <button class="button" @click="litterBoxExpire('72 Hours')">72 Hours (3 Days)</button>
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