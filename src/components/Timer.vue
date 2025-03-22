<script setup>
    import { ref, computed, watch, onUnmounted } from 'vue';

    const props = defineProps({
      gameStatus: String
    });
    
    let interval = null
    const tick = ref(0)
    const timer = computed(() => {
        const m = Math.floor(tick.value / 60)
        const s = tick.value % 60
        return `${m}:${s.toString().padStart(2, '0')}`
    })

    function startTimer() {
        interval = setInterval(() => {tick.value++}, 1000)
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

    }
</style>