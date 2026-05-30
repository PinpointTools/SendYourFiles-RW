<script setup>
import { inject } from 'vue'
import PopupHandler from '../utils/PopupHandler.vue';

const toggleAbout = inject('toggleAbout')
const showAbout = inject('showAbout')
</script>

<template>
    <PopupHandler :show-popup="showAbout" @close="toggleAbout">
        <template #popup>
            <div class="main">
                <span class="bigtext">The SYF Project</span>
                <span>The SYF (Send Your Files) free and open source project is a hate comment towards Discord for their 10mb upload limit.</span>
                <span>We originally wanted to make a app where it would Send Your Files through 3 different hosting services that we support. Originally used to be made with Python, requests and PyWebView. But after some testing with Linux and rethinking that we should probably add support for mobile, we decided to drop it for (p)npm, Vue, and Vite.</span>
                <span>We're open source. Which means, if you wanted to help us with our project by contributing or just finding a way to help us out or learn our code, you're always welcome to! We're never making our code closed-sourced.</span>
                <span>We heavily rely on the file hosting that we use. Without it, this project would not be possible. Thank you to Catbox and Litterbox! We love you.</span>
                
                <span class="bigtext">Where we're located</span>
                <span>The only URL that we're currently using are <a href="https://sendyourfiles.pages.dev">sendyourfiles.pages.dev</a>. We'll eventually buy a domain if we have money.</span>
                <span>You can chat us via Discord, or, through <a href="https://pinpointtools.github.io/">Pinpoint Tools</a> official Discord server!</span>
            </div>
        </template>
    </PopupHandler>
</template>

<style scoped>
    .main {
        display: flex;
        flex-direction: column;
        gap: 15px;
    }
</style>