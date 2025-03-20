<script setup>
    import { onMounted, ref } from 'vue';
    import Cell from './Cell.vue'

    const props = defineProps({
        width: Number,
        height: Number,
        mines_number: Number
    })

    const field = ref([])
    const gameStatus = ref('start')

    function StartGame() {
        for (let x = 0; x < props.height * props.width; x++) {
            field.value.push({
                is_open: false,
                is_mine: props.mines_number - x > 0 ? true : false,
                is_flag: false,
                mines_number: null
            })
        }
    }

    function MineGeneratePlacement(id) {
        for (let i = 0; i < field.value.length; i++) {
            let cellMine = Math.floor(Math.random() * field.value.length)
            if (cellMine !== id && i !== id) {
                let temp = field.value[i].is_mine
                field.value[i].is_mine = field.value[cellMine].is_mine
                field.value[cellMine].is_mine = temp
            }
            else if(field.value[id].is_mine) {
                for (let i = 0; i < field.value.length; i++) {
                    if (!field.value[i].is_mine) {
                        let temp = field.value[i].is_mine
                        field.value[i].is_mine = field.value[id].is_mine
                        field.value[id].is_mine = temp
                    }
                }
            }
        }
    }

    function getFieldStyle() {
        return `grid-template-columns: repeat(${props.width}, 1fr);`
    }

    function onClickCell(id) {
        if (gameStatus.value === 'start') {
            MineGeneratePlacement(id)
            FillCountMineNearCells()
            gameStatus.value = 'play'
        }
        else if (gameStatus.value === 'stop') {
            return
        }
        
        if(field.value[id].is_mine){
            gameStatus.value = 'stop'
            alert('Вы проиграли!')
            return
        }
        
        field.value[id].is_open = true
    }

    function FillCountMineNearCells() {
        for (let id = 0; id < field.value.length; id++) {
            if (!field.value[id].is_mine) {
                for (let i = -1; i <= 1; i++) {
                    for (let j = -1; j <= 1; j++) {
                        let [x, y] = [id % props.width + j, Math.floor(id / props.width) + i]
                        if (x >= 0 && x < props.width && y >= 0 && y < props.height) {
                            if(field.value[x + y * props.width].is_mine) {
                                field.value[id].mines_number++
                            }
                        }
                    }
                }
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
            <Cell v-for="(cell, id) in field" :key="id" @click="onClickCell(id)" :cell="cell"></Cell>
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