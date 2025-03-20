import { createRouter, createWebHistory } from 'vue-router'

import GameSettings from '../components/GameSettings.vue'
import Game from '../components/game.vue'


const routes = [
    { path: '/', component:GameSettings },
    { path: '/game/:width/:height/:mines_number', component: Game, props: true }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router