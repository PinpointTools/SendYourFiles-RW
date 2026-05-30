<script setup>
import { inject, reactive } from 'vue'
import PopupHandler from '../utils/PopupHandler.vue';
import CustomSelect from '../utils/CustomSelect.vue';
import settingsPayload from '../../../settings.json';

const toggleSettings = inject('toggleSettings')
const showSettings = inject('showSettings')

const rawSettings = settingsPayload?.settings && typeof settingsPayload.settings === "object"
  ? settingsPayload.settings
  : settingsPayload

const entries = Object.entries(rawSettings || {})

function getSetting(key) {
  try { return localStorage.getItem(`syf.settings.${key}`) } catch { return null }
}

function saveSetting(key, value) {
  try { localStorage.setItem(`syf.settings.${key}`, String(value)) } catch (e) { console.error("Failed to save setting:", e) }
}

const settingValues = reactive({})

for (const [key, item] of entries) {
  const stored = getSetting(key)
  if (item.type === 'boolean') {
    const defaultBool = item.default === true || item.default === 'true'
    settingValues[key] = stored === null ? defaultBool : stored === 'true'
  } else {
    settingValues[key] = stored === null ? (item.default ?? '') : stored
  }
}

function updateSetting(key, value) {
  settingValues[key] = value
  saveSetting(key, value)
}
</script>

<template>
    <PopupHandler :show-popup="showSettings" @close="toggleSettings">
        <template #popup>
            <div class="main">
                <span class="bigtext">Settings</span>
                <p v-if="entries.length === 0">No settings found.</p>
                <div v-for="[key, item] in entries" :key="key" class="item">
                    <template v-if="item.type === 'boolean'">
                        <div class="info">
                            <span class="bigtext">{{ item.name ?? key }}</span>
                            <span>{{ item.description }}</span>
                        </div>
                        <CustomSelect
                            :model-value="settingValues[key]"
                            @update:model-value="updateSetting(key, $event)"
                            :options="[{ value: true, label: 'True' }, { value: false, label: 'False' }]"
                        />
                    </template>
                    <template v-else-if="item.type === 'string'">
                        <div class="info">
                            <span class="bigtext">{{ item.name ?? key }}</span>
                            <span>{{ item.description }}</span>
                        </div>
                        <input type="text" :value="settingValues[key]" @change="updateSetting(key, $event.target.value)">
                    </template>
                </div>
            </div>
        </template>
    </PopupHandler>
</template>

<style scoped>
    .main {
        display: flex;
        flex-direction: column;
        gap: 15px;

        .item {
            display: flex;
            flex-direction: column;
            gap: 5px;

            .info {
                display: flex;
                flex-direction: column;
                gap: 5px;
            }
        }
    }

    input {
        background: rgba(255, 255, 255, 0.15);
        border: 1px solid rgba(255, 255, 255, 0.2);
        color: white;
        padding: 0.5rem;
        border-radius: 0.5rem;
        outline: none;
        font-size: 0.9rem;
    }
</style>
