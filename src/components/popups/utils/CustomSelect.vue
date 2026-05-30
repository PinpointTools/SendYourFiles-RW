<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
    modelValue: { type: [String, Boolean], required: true },
    options: { type: Array, required: true }
})

const emit = defineEmits(['update:modelValue'])

const open = ref(false)
const trigger = ref(null)
const menu = ref(null)

function select(value) {
    emit('update:modelValue', value)
    open.value = false
}

const label = computed(() =>
    props.options.find(o => o.value == props.modelValue)?.label ?? props.modelValue
)

const rect = ref({ top: 0, left: 0, width: 0, height: 0 })

function openMenu() {
    if (!trigger.value) return
    rect.value = trigger.value.getBoundingClientRect()
    open.value = true
}

function onClick(e) {
    if (trigger.value && trigger.value.contains(e.target)) {
        if (open.value) open.value = false
        else openMenu()
        return
    }
    if (menu.value && menu.value.contains(e.target)) return
    open.value = false
}

onMounted(() => document.addEventListener('click', onClick))
onUnmounted(() => document.removeEventListener('click', onClick))
</script>

<template>
    <div ref="trigger" class="customSelect">
        <span>{{ label }}</span>
        <span class="arrow">{{ open ? '▲' : '▼' }}</span>
    </div>

    <Teleport to="body">
        <div
            v-if="open"
            ref="menu"
            class="dropdown"
            :style="{
                top: rect.top + rect.height + 4 + 'px',
                left: rect.left + 'px',
                width: rect.width + 'px'
            }"
        >
            <div
                v-for="opt in options"
                :key="opt.value"
                class="option"
                :class="{ selected: opt.value == modelValue }"
                @mousedown.prevent="select(opt.value)"
            >
                {{ opt.label }}
            </div>
        </div>
    </Teleport>
</template>

<style scoped>
.customSelect {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: rgba(255, 255, 255, 0.15);
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: white;
    padding: 0.5rem;
    border-radius: 0.5rem;
    font-size: 0.9rem;
    cursor: pointer;
    user-select: none;

    .arrow {
        font-size: 0.7rem;
        margin-left: 0.5rem;
    }
}

.dropdown {
    position: fixed;
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 0.5rem;
    overflow: hidden;
    z-index: 1000;

    .option {
        padding: 0.5rem;
        cursor: pointer;
        color: white;
        transition: background 0.15s;

        &:hover {
            background: rgba(255, 255, 255, 0.15);
        }

        &.selected {
            background: rgba(255, 255, 255, 0.25);
        }
    }
}
</style>
