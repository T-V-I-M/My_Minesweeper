<script setup>
    import { onMounted, ref } from 'vue';
    import Cell from './Cell.vue'

    const props = defineProps({
        width: Number,
        height: Number,
        minesNumber: Number
    })

    const field = ref([])
    const gameStatus = ref('start')

    function StartGame() {
        for (let x = 0; x < props.height * props.width; x++) {
            field.value.push({
                is_open: false,
                is_mine: false,
                is_flag: false,
                mines_number: null
            })
        }
    }

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

    function getFieldStyle() {
        return `grid-template-columns: repeat(${props.width}, 1fr);`
    }

    function onClickCell(id) {
        if (gameStatus.value === 'start') {
            MineGeneratePlacement(getIdCellsOfCell(id))
            FillCountMineNearCells()
            gameStatus.value = 'play'
        }
        else if (gameStatus.value === 'stop') {
            return
        }
        
        if (!field.value[id].is_open){
            if(field.value[id].is_mine){
                gameStatus.value = 'stop'
                alert('Вы проиграли!')
            }
            else {
                CellsOpen(id)
                field.value[id].is_open = true
            }
        }
    }

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

    function CellsOpen(id) {
        if (!field.value[id].is_open) {
            if (!field.value[id].mines_number) {
                getIdCellsOfCell(id).forEach((cellId) => {
                    field.value[id].is_open = true
                    CellsOpen(cellId)
                })
            }
            else {
                field.value[id].is_open = true
            }
        }
    }

    onMounted(() => {
        StartGame()
    })

</script>

<template>
    <div class="Main">
        <div class="GameInfo">
            
        </div>
        <div class="conteiner">
            <div class="Field" :style="getFieldStyle()">
            <Cell v-for="(cell, id) in field" :key="id" @mousedown.left="onClickCell(id)" @mousedown.middle="" :cell="cell"></Cell>
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