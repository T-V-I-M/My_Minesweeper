<script setup>
    import { computed, onMounted, ref } from 'vue';
    import Cell from './Cell.vue'
    import Timer from './Timer.vue';
    import { useLeaderboardStore } from '../stores/Leaderboard.js';
    import router from '../router/router';

    const Leaderboard = useLeaderboardStore()

    const props = defineProps({
        width: Number,
        height: Number,
        minesNumber: Number
    })

    const field = ref([])
    const gameStatus = ref('start')
    const cellsIsOpenCounter = ref(0)
    const globalCounter = ref(props.minesNumber)
    const correctFlagCount = ref(0)
    const cellFlags = ['', 'flag', 'question']
    const timer = ref('00:00')

    //Инициализация игры
    function StartGame() {
        for (let x = 0; x < props.height * props.width; x++) {
            field.value.push({
                is_open: false,
                is_mine: false,
                flag: cellFlags[0],
                mines_number: null
            })
        }
    }

    //Рестарт
    function RestartGame() {
        field.value = []
        gameStatus.value = 'start'
        cellsIsOpenCounter.value = 0
        globalCounter.value = props.minesNumber
        correctFlagCount.value = 0
        timer.value = '00:00'
        StartGame()
    }

    //Расставить мины по полю
    function MineGeneratePlacement(ids) {
        let remainingMines = props.minesNumber
        let i = 0
        while (remainingMines > 0) {
            if (!ids.includes(i)){
                field.value[i].is_mine = true
                remainingMines--
            }
            i++
        }
        
        for (let i = 0; i < field.value.length; i++) {
            let cellMine = Math.floor(Math.random() * field.value.length)
            if (!ids.includes(cellMine) && !ids.includes(i)) {
                let temp = field.value[i].is_mine
                field.value[i].is_mine = field.value[cellMine].is_mine
                field.value[cellMine].is_mine = temp
            }
        }
    }

    const getFieldStyle = computed(() => {
        return `grid-template-columns: repeat(${props.width}, 1fr);`
    })

    //Обработать нажатие ЛКМ по клетке
    function onLeftClickCell(id) {
        if (!field.value[id].is_open && !field.value[id].flag && gameStatus.value !== 'stop') {
            if (gameStatus.value == 'start') {
                MineGeneratePlacement(getIdCellsOfCell(id))
                FillCountMineNearCells()
                gameStatus.value = 'play'
            }
            
            CellsOpen(id)
            
            isWin(field.value[id].is_mine)
        }
    }


    function isWin(is_mine) {
        if (field.value.length - cellsIsOpenCounter.value == props.minesNumber || correctFlagCount.value == props.minesNumber) {
            gameStatus.value = 'stop'
            field.value.forEach((cell) => {cell.is_open = true, cell.flag = cellFlags[0]})
            const name = prompt('Вы победили! Введите ваше имя:');
            Leaderboard.addScore(name, timer.value, `Поле ${props.width} x ${props.width} Мин: ${props.minesNumber}`);
        }
        else if (is_mine) {
            gameStatus.value = 'stop'
            field.value.forEach((cell) => {cell.is_open = true, cell.flag = cellFlags[0]})
            alert('Вы проиграли!')
        }
    }

    const updateTime = (Time) => {
        timer.value = Time;
    };

    //Обработать нажатие ПКМ по клетке
    function onRightClickCell(id) {
        if (!field.value[id].is_open && gameStatus.value !== 'stop') {
            const currentFlagIndex = cellFlags.indexOf(field.value[id].flag);
            field.value[id].flag = cellFlags[(currentFlagIndex + 1) % cellFlags.length]
            if(currentFlagIndex == 0) {
                if (globalCounter.value <= 0) {
                    field.value[id].flag = cellFlags[(currentFlagIndex + 2) % cellFlags.length]
                }
                else {
                    globalCounter.value--
                    if (field.value[id].is_mine) {
                        correctFlagCount.value++
                        isWin(false)
                    }
                }
            }
            else if (currentFlagIndex == 1) {
                if (field.value[id].is_mine) {
                        correctFlagCount.value--
                    }
                globalCounter.value++
            }
        }
    }

    //Получить id клеток вокруг нажатой клетки
    function getIdCellsOfCell(id) {
        let IdCells = []
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                let [x, y] = [id % props.width + j, Math.floor(id / props.width) + i]
                if (x >= 0 && x < props.width && y >= 0 && y < props.height) {
                    IdCells.push(x + y * props.width)
                }
            }
        }
        return IdCells
    }

    //Заполнить клетки числом мин вокруг i клетки
    function FillCountMineNearCells() {
        for (let id = 0; id < field.value.length; id++) {
            if (!field.value[id].is_mine) {
                getIdCellsOfCell(id).forEach((cellId) => {
                    if (field.value[cellId].is_mine) {
                        field.value[id].mines_number++
                    }
                })    
            }
        }
    }

    //Открыть клетку
    function CellsOpen(id) {
        if (!field.value[id].is_open && !field.value[id].flag) {
            field.value[id].is_open = true
            cellsIsOpenCounter.value++
            if (!field.value[id].mines_number && !field.value[id].is_mine) {
                getIdCellsOfCell(id).forEach((cellId) => { CellsOpen(cellId) })
            }
        }
    }

    onMounted(() => {
        try {
            if (props.height > 32 || props.width > 32 || props.minesNumber > (props.height * props.width * 0.5) 
                || props.width < 8 || props.height < 8 || props.minesNumber < 2)
            {
                alert("Невозможно запустить игру!")
                router.push('/')
            }
            StartGame()
        } catch (error) {
            console.log(error)
        }
    })

</script>

<template>
    <div class="Main">
        <div class="GameInfo">
            <v-container class="rounded-lg px-10 elevation-2">
                <v-row justify="center">
                    <v-col cols="auto" align="center">
                        <div class="Counter">{{ globalCounter.toString().padStart(3, '0') }}</div>
                    </v-col>
                    <v-col cols="auto" align="center">
                        <Timer :gameStatus="gameStatus" @update:time="updateTime"/>
                    </v-col>
                </v-row>
                <v-row justify="center" align="center">
                    <div class="Field" :style="getFieldStyle">
                        <Cell v-for="(cell, id) in field" :key="id" @mousedown.left="onLeftClickCell(id)" @contextmenu.prevent="onRightClickCell(id)" :cell="cell"></Cell>
                    </div>
                </v-row>
                <v-row justify="center" align="center">
                    <v-col cols="auto" justify="center" align="center">
                        <v-btn variant="plain" size="small" icon="mdi-home" @click="router.push({path:'/'})"></v-btn>
                    </v-col>
                    <v-col cols="auto" justify="center" align="center">
                        <v-btn variant="plain" size="small" icon="mdi-podium-gold" @click="router.push({path:'/leaderboard'})"></v-btn>
                    </v-col>
                    <v-col cols="auto" justify="center" align="center">
                        <v-btn variant="plain" size="small" icon="mdi-restart" @click="RestartGame()"></v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </div>
    </div>
</template>

<style scoped>
    .v-container {
        width: fit-content;
        max-width: 100%;
    }

    .conteiner{
        display: flex;
        justify-content: center;
    }

    .Field {
        display: grid;
        overflow-x: overlay;    
    }
    .Main {
        display: flex;
        justify-content: center;
        margin-top: 50px;
        flex-direction: column;
    }
    
    .GameInfo {
        display: flex;
        justify-content: center;
        gap: 10px;
        align-items: center;
        margin-bottom: 20px;
    }

    .Counter {
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