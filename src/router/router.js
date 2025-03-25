import { createRouter, createWebHistory } from 'vue-router'

import GameSettings from '../components/GameSettings.vue'
import Game from '../components/Game.vue'
import Leaderboard from '../components/Leaderboard.vue'


const routes = [
    { path: '/My_Minesweeper/', component:GameSettings },
    { path: '/My_Minesweeper/game/:width/:height/:minesNumber', component: Game, props: true },
    { path: '/My_Minesweeper/leaderboard', component: Leaderboard }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router