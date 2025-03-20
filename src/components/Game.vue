<script setup>
    import { onMounted, ref } from 'vue';
    import Cell from './Cell.vue'

    const props = defineProps({
        width: Number,
        height: Number,
        mines_number: Number
    })

    const field = ref([])

    function StartGame() {
        for (let x = 0; x < props.height * props.width; x++) {
            field.value.push({
                is_open: false,
                is_mine: props.mines_number - x > 0 ? true : false,
                is_flag: false,
                mines_number: 0
            })
        }

        MineGeneratePlacement()
    }

    function MineGeneratePlacement() {
        for (let i = 0; i < field.value.length; i++) {
            let cellMine = Math.floor(Math.random() * field.value.length)
            let temp = field.value[i].is_mine
            field.value[i].is_mine = field.value[cellMine].is_mine
            field.value[cellMine].is_mine = temp
        }
    }

    function setFieldStyle() {
        return `grid-template-columns: repeat(${props.width}, 1fr);`
    }

    onMounted(() => {
        StartGame()
        console.log(field)
    })

</script>

<template>
    <div class="Main">
        <div class="GameInfo">
            
        </div>
        <div class="conteiner">
            <div class="Field" :style="setFieldStyle()">
            <Cell v-for="(cell, id) in field" :key="id">
                {{ cell.is_mine ? 1 : 0 }}
            </Cell>
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