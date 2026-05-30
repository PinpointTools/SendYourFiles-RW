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
import FileTooBig from './components/popups/providers/FileTooBig.vue';
import './javascript/upload.js'

const title = "Send Your Files".split("")

const showUploadTo = ref(false)
const showSettings = ref(false)
const showAbout = ref(false)
const showCredits = ref(false)
const showLitterboxExpireTime = ref(false)
const showFileTooBig = ref(false)
const fileTooBigProvider = ref('')
const fileTooBigSize = ref('')
const fileTooBigProviderSize = ref('')

function toggleUploadTo() { showUploadTo.value = !showUploadTo.value }
function toggleSettings() { showSettings.value = !showSettings.value }
function toggleAbout() { showAbout.value = !showAbout.value }
function toggleCredits() { showCredits.value = !showCredits.value }
function toggleLitterboxExpireTime() { showLitterboxExpireTime.value = !showLitterboxExpireTime.value }
function toggleFileTooBig() { showFileTooBig.value = !showFileTooBig.value }
function openFileTooBig(provider, size) {
  fileTooBigProvider.value = provider
  fileTooBigSize.value = size
  fileTooBigProviderSize.value = provider == 'Catbox' ? '200 MB' : 'Litterbox' ? '1000 MB' : 'Unknown'
  showFileTooBig.value = true
}

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
provide('openFileTooBig', openFileTooBig)
provide('toggleFileTooBig', toggleFileTooBig)
provide('showFileTooBig', showFileTooBig)

window.showPopup = (name) => {
  switch (name) {
    case 'platformPopup': showUploadTo.value = true; break
    case 'litterboxTimePopup': showLitterboxExpireTime.value = true; break
    case 'catboxLimiterPopup':
      fileTooBigProvider.value = 'Catbox'
      fileTooBigSize.value = (globalThis.sizeMB?.value || '?') + ' MB'
      fileTooBigProviderSize.value = '200 MB'
      showFileTooBig.value = true
      break
    case 'litterboxLimiterPopup':
      fileTooBigProvider.value = 'Litterbox'
      fileTooBigSize.value = (globalThis.sizeMB?.value || '?') + ' MB'
      fileTooBigProviderSize.value = '1 GB'
      showFileTooBig.value = true
      break
  }
}

window.closePopup = (name) => {
  switch (name) {
    case 'platformPopup': showUploadTo.value = false; break
    case 'litterboxTimePopup': showLitterboxExpireTime.value = false; break
    case 'catboxLimiterPopup':
    case 'litterboxLimiterPopup': showFileTooBig.value = false; break
  }
}
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
        <FileTooBig :provider="fileTooBigProvider" :size="fileTooBigSize" :providerSize="fileTooBigProviderSize"/>
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
