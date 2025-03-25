import { createRouter, createWebHistory } from 'vue-router'

import GameSettings from '../components/GameSettings.vue'
import Game from '../components/Game.vue'
import Leaderboard from '../components/Leaderboard.vue'


const routes = [
    { path: '/', component:GameSettings },
    { path: '/game/:width/:height/:minesNumber', component: Game, props: true },
    { path: '/leaderboard', component: Leaderboard }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router