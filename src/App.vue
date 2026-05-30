<script setup>
import { ref, provide } from 'vue'
import WavyBackground from './components/main/WavyBackground.vue';
import UploadSection from './components/main/UploadSection.vue';
import ExtraButtons from './components/main/ExtraButtons.vue';

// all the popups
import UploadTo from './components/popups/main/UploadTo.vue';
import Settings from './components/popups/extras/Settings.vue';
import Credits from './components/popups/extras/Credits.vue';
import About from './components/popups/extras/About.vue';
import LitterboxExpireTime from './components/popups/providers/LitterboxExpireTime.vue';

const title = "Send Your Files".split("")

const showUploadTo = ref(false)
const showSettings = ref(false)
const showAbout = ref(false)
const showCredits = ref(false)
const showLitterboxExpireTime = ref(false)

function toggleUploadTo() { showUploadTo.value = !showUploadTo.value }
function toggleSettings() { showSettings.value = !showSettings.value }
function toggleAbout() { showAbout.value = !showAbout.value }
function toggleCredits() { showCredits.value = !showCredits.value }
function toggleLitterboxExpireTime() { showLitterboxExpireTime.value = !showLitterboxExpireTime.value }

provide('toggleUploadTo', toggleUploadTo)
provide('showUploadTo', showUploadTo)
provide('toggleSettings', toggleSettings)
provide('showSettings', showSettings)
provide('toggleAbout', toggleAbout)
provide('showAbout', showAbout)
provide('toggleCredits', toggleCredits)
provide('showCredits', showCredits)
provide('toggleLitterboxExpireTime', toggleLitterboxExpireTime)
provide('showLitterboxExpireTime', showLitterboxExpireTime)
</script>

<template>
    <WavyBackground>
        <div class="content">
            <div class="hero">
                <section class="heading">
                    <span
                        v-for="(letter, i) in title"
                        :key="i"
                        :style="{ '--delay': `${i * 0.1}s` }"
                    >
                        {{ letter === ' ' ? '\u00A0' : letter }}
                    </span>
                </section>
                <span class="desc">Ever wanted to share your silly files to another platform? Then, this is the place for you!</span>
            </div>
            <UploadSection />
        </div>

        <!-- POPUPS STARTS HERE -->
        <UploadTo />
        <Settings />
        <Credits />
        <About />
        <LitterboxExpireTime />
        <!-- POPUPS ENDS HERE -->
        
        <div class="bottomPage">
            <ExtraButtons />
        </div>
    </WavyBackground>
</template>

<style>
    .content {
        color: white;

        .hero {
            display: flex;
            flex-direction: column;
            gap: 5px;
            align-items: center;
            font-size: 1.25rem;
            text-align: center;
            text-shadow: 0 2px 4px rgba(255, 255, 255, 0.5);
            
            .heading {
                display: flex;
                font-size: 2rem;
                font-weight: bold;
                letter-spacing: 0.5px;

                span {
                    display: inline-block;
                    animation: float 2s ease-in-out infinite;
                    animation-delay: var(--delay);
                }
            }

            .desc {
                min-width: 20rem;
                max-width: 20rem;
            }
        }
    }

    .bottomPage {
        position: fixed;
        bottom: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 20px;
    }

    @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
    }
</style>
