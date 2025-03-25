<script setup>
    import { ref, computed, watch, onUnmounted } from 'vue';

    const props = defineProps({
      gameStatus: String
    });
    
    let interval = null
    const emit = defineEmits(['update:time'])
    const tick = ref(0)
    const timer = computed(() => {
        const m = Math.floor(tick.value / 60)
        const s = tick.value % 60
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
    })

    function startTimer() {
        interval = setInterval(() => {tick.value++, emitTime()}, 1000)
    }

    function stopTimer() {
        clearInterval(interval)
        interval = null
    }

    function resetTimer() {
        stopTimer()
        tick.value = 0
    }

    watch(() => props.gameStatus, (Status) => {
        if (Status === 'play') {
            startTimer()
        } 
        else if (Status === 'stop') {
            stopTimer()
        } 
        else if (Status === 'start') {
            resetTimer()
        }
    })

    const emitTime = () => {
        emit('update:time', timer.value)
    }

    onUnmounted(() => {
      stopTimer();
    });

</script>

<template>
    <div class="timer">
        {{ timer }}
    </div>
</template>

<style scoped>
    .timer {
        border-radius: 8px;
        padding: 5px 15px 5px 15px;
        background-color: rgb(255, 255, 255);
        font-family: 'Roboto';
        color: rgb(60, 60, 60);
        font-weight: 500;
        font-size: large;
        box-shadow: 0px 3px 1px -2px var(--v-shadow-key-umbra-opacity, rgba(0, 0, 0, 0.2)), 0px 2px 2px 0px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.14)), 0px 1px 5px 0px var(--v-shadow-key-ambient-opacity, rgba(0, 0, 0, 0.12)) !important;
    }
</style>