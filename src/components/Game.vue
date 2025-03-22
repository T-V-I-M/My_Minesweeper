<script setup>
    import { computed, onMounted, ref } from 'vue';
    import Cell from './Cell.vue'
    import Timer from './Timer.vue';

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

    //Расставить мины по полю
    function MineGeneratePlacement(ids) {
        let remainingMines = props.minesNumber
        let x = 0
        while (remainingMines > 0) {
            if (!ids.includes(x)){
                field.value[x].is_mine = true
                remainingMines--
            }
            x++
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
            alert("Вы победили!")
        }
        else if (is_mine) {
            gameStatus.value = 'stop'
            field.value.forEach((cell) => {cell.is_open = true, cell.flag = cellFlags[0]})
            alert('Вы проиграли!')
        }
    }

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
            if (props.height > 32 || props.width > 32 || props.minesNumber > (props.height * props.width * 0.8)) {
                alert("Невозможно запустить игру!")
                return
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
            <div class="Counter">
                {{ globalCounter }}
            </div>
            <div class="GameStatus">
                {{ gameStatus }}
            </div>
            <Timer :gameStatus="gameStatus" />
        </div>
        <div class="conteiner">
            <div class="Field" :style="getFieldStyle">
                <Cell v-for="(cell, id) in field" :key="id" @mousedown.left="onLeftClickCell(id)" @contextmenu.prevent="onRightClickCell(id)" :cell="cell"></Cell>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .conteiner{
        display: flex;
        justify-content: center;
    }

    .Field {
        display: grid;
    }
</style>