import { defineStore } from "pinia";
import { ref } from "vue";

export const useLeaderboardStore = defineStore('leaderboard', () => {
    const scores = ref(JSON.parse(localStorage.getItem('leaderboard')) || [])

    function addScore(name, time, gameInfo) {
        scores.value.push({name, time, gameInfo})
        scores.value.sort((a, b) => a.time.localeCompare(b.time))
        localStorage.setItem('leaderboard', JSON.stringify(scores.value))
    }

    return {scores, addScore}
})