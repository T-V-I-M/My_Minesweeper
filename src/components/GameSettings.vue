<script setup>
    import { ref } from 'vue';
    import router from '../router/router';

    const width = ref(8)
    const height = ref(8)
    const minesNumber = ref(10)

    function ChangeSetting(_width, _height, _minesNumber) {   
        width.value = _width
        height.value = _height
        minesNumber.value = _minesNumber

        StartGame()
    }

    function StartGame() {
        router.push({path: `/game/${width.value}/${height.value}/${minesNumber.value}`})
    }

</script>

<template>
    <p>Настройки</p>
    <div class="difficulty_levels">
        <div class="chosse_level">
            <div class="level 1" @click="ChangeSetting(8,8,10)">
                <p class="level_name">Простой</p>
                <p>Игровое поле: 8x8</p>
                <p>Колличество мин: 10</p>
            </div>
            <div class="level 2" @click="ChangeSetting(16,16,40)">
                <p class="level_name">Средний</p>
                <p>Игровое поле: 16x16</p>
                <p>Колличество мин: 40</p>
            </div>
            <div class="level 3" @click="ChangeSetting(32,16,100)">
                <p class="level_name" >Сложный</p>
                <p>Игровое поле: 32x16</p>
                <p>Колличество мин: 100</p>
            </div>
        </div>
        <div class="level_custom">
            <p class="level_name">Своя игра</p>
            <form @submit.prevent="StartGame">
                <label for="width">Ширина поля</label><br>
                <input type="text" id="width" name="width" v-model="width"><br>
                <label for="height">Высота поля</label><br>
                <input type="text" id="height" name="height" v-model="height"><br>
                <label for="minesNumber">Колличество мин</label><br>
                <input type="text" id="minesNumber" name="minesNumber" v-model="minesNumber">
                <button>Старт</button>
            </form>
        </div>
    </div>
</template>

<style scoped>
    .chosse_level {
        display: flex;
    }
    .level {
        padding: 10px;
        cursor: pointer;
    }
    .level:hover {
        background-color:rgba(128, 128, 128, 0.141);
    }
</style>