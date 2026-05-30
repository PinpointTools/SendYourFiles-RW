<script setup>
    import { ref, provide } from 'vue'
    import WavyBackground from './components/main/WavyBackground.vue';
    import UploadSection from './components/main/UploadSection.vue';
    import UploadTo from './components/popups/main/UploadTo.vue';
    import ExtraButtons from './components/main/ExtraButtons.vue';
    
    const showPopup = ref(false)
    const title = "Send Your Files".split("")
    
    function togglePopup() {
        showPopup.value = !showPopup.value
    }
    
    provide('togglePopup', togglePopup)
    provide('showPopup', showPopup)
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
        <UploadTo />
    
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
                gap: 5px;
                font-size: 2rem;
                font-weight: bold;

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
