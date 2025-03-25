<script setup>
    import { useLeaderboardStore } from '../stores/Leaderboard';
    import router from '../router/router';
import { ref } from 'vue';

    const Leaderboard = useLeaderboardStore()

    const headers = [
        { title: 'Место', value: 'place'},
        { title: 'Имя', value: 'name' },
        { title: 'Время', value: 'time' },
        { title: 'Информация об игре', value: 'gameInfo' },
    ]
</script>

<template>
    <div class="Leaderboard">
        <v-container>
            <div class="Container">
                <v-btn prepend-icon="mdi-arrow-left" @click="router.back" size="x-small" variant="plain">Назад</v-btn>
                <h2>Таблица лидеров</h2>
            </div>

            <v-responsive class="mt-4 elevation-2 bg-grey-lighten-3 rounded-lg">
                <v-data-table :headers="headers" :items="Leaderboard.scores" items-per-page-text="Элементов на странице:" no-data-text="Похоже, еще никто не победил! Стань первым!" fixed-header class="px-5">
                    <template v-slot:item.place="{ index }">
                        {{ index + 1 }}
                    </template>
                </v-data-table>
            </v-responsive>
        </v-container>
    </div>
</template>

<style scoped>
    .Leaderboard {
        display: flex;
        justify-self: anchor-center;
        margin-top: 50px;
        flex-direction: column;
    }
    .Container {
        display: flex;
        align-items: flex-start;
        gap: 40px;
        flex-direction: column;
    }
</style>