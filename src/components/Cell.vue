<script setup>
    import { computed } from 'vue'

    const props = defineProps({
        cell: Object
    })

    const colorText = ['Blue', 'Green', 'Red', 'DarkBlue', 'Olive', '#30d5c8', 'Black', 'White']


    const getClass = computed(() => {
        return props.cell.is_open ? 'MyCell Open' : 'MyCell Close'
    });

</script>

<template>
    <img :class="getClass" v-if="cell.flag == 'flag'" src="/src/assets/flag.png" alt="Флаг" />
    <img :class="getClass" v-else-if="cell.flag == 'question'" src="/src/assets/question.png" alt="Вопрос"  />
    <img :class="getClass" v-else-if="cell.is_mine && cell.is_open" src="/src/assets/bomb.png" alt="Мина"  />
    <div :style="`color: ${colorText[cell.mines_number - 1]}`" :class="getClass" v-else><div class="Text">{{ cell.is_open ? cell.mines_number : '' }}</div></div>
</template>

<style>
    .MyCell {
        display: flex;
        justify-content: center;
        aspect-ratio: 1 / 1;
        font-family: fantasy;
        align-items: center;
        font-size: larger;
        width: 33px;
        
        &.Open {
            background-color: #f3f3f3;
            border: 5px solid #f3f3f3;
        }

        &.Close {
            background-color: #9e9e9ec2;
            border-top: 5px solid #dfdfdf;
            border-left: 5px solid #dfdfdf;
            border-right: 5px solid #636363;
            border-bottom: 5px solid #636363;
        }
        &.Close:hover {
            filter: brightness(90%);
            cursor: pointer;
        }
    }

    .Text {
        position: absolute;

    }

</style>