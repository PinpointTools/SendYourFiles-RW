<script setup>
import { inject } from 'vue'
import PopupHandler from '../utils/PopupHandler.vue';

const toggleCredits = inject('toggleCredits')
const showCredits = inject('showCredits')

const credits = [
  { group: "Main Developers", members: [
    { name: "Daveberry Cricket Blueson", link: "https://codedave.pages.dev", role: "Head Developer. Frontend and Backend.", img: "https://codedave.pages.dev/assets/images/Daveberry%20Wave.png", circle: false },
    { name: "Runa", link: "https://runyra.pages.dev", role: "Developer. Frontend.", img: "https://runyra.pages.dev/assets/misc/Runa.png", circle: true },
  ]},
  { group: "Providers", members: [
    { name: "Catbox LLC", link: "https://catbox.moe", role: "Provider of two services. Catbox and Litterbox.", img: "https://catbox.llc/resources/images/catboxLogoTiny.png", circle: false },
  ]},
]
</script>

<template>
    <PopupHandler :show-popup="showCredits" @close="toggleCredits">
        <template #popup>
            <div class="main">
                <span class="bigtext">Credits</span>
                <div
                    v-for="(group, index) in credits"
                    :key="index"
                    class="credits"
                >
                    <span class="group">{{ group.group }}</span>
                    <div class="members">
                        <a
                            v-for="(member, index) in group.members"
                            :key="index"
                            :href="member.link"
                            class="member"
                        >
                            <img :src="member.img" :alt="member.name" :style="{ 'border-radius': member.circle ? '50%' : '0', display: member.img ? 'block' : 'none' }">
                            <section>
                                <span class="name">{{ member.name }}</span>
                                <span class="role">{{ member.role }}</span>
                            </section>
                        </a>
                    </div>
                </div>
            </div>
        </template>
    </PopupHandler>
</template>

<style>
    .main {
        display: flex;
        flex-direction: column;
        gap: 15px;
        padding: 10px;

        .credits {
            display: flex;
            flex-direction: column;
            gap: 10px;

            .group {
                font-size: 1.25rem;
                font-weight: bold;
            }
            
            .members {
                display: flex;
                flex-direction: column;
                gap: 5px;
                text-decoration: none;
                
                .member {
                    display: flex;
                    align-items: center;
                    gap: 5px;
                    text-decoration: none;
                    color: white;
                    transition: scale 0.15s ease-in-out;

                    img {
                        width: 80px;
                        height: 80px;

                        /*&:hover {
                            animation: spin 5s linear infinite;
                        }*/
                    }

                    section {
                        display: flex;
                        flex-direction: column;
                        
                        .name {
                            font-size: 1.25rem;
                            font-weight: bold;
                        }
                    }

                    &:hover {
                        scale: 1.05;
                    }
                }
            }
        }
    }

    /*@keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }*/
</style>