<script setup>
    const props = defineProps({
        cell: Object
    })

    function getStyle() {
        if (props.cell.is_open) {
            return 'Cell Open'
        }
        else {
            return 'Cell'
        }
    }
</script>

<template>
    <div :class="getStyle()">{{ cell.is_open ? cell.mines_number : '' }}</div>
</template>

<style scoped>
    .Cell {
        display: flex;
        align-items: center;
        justify-content: center;
        aspect-ratio: 1 / 1;
        background-color: rgba(0, 0, 0, 0.69);
        font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
        font-size: small;
        width: 40px;
        border-color: black;
        border-width: 1px;
        border-style: solid;
        
        &.Open {
            background-color: rgba(0, 0, 0, 0.114);
        }
    }
    .Cell:hover {
        background-color: rgba(0, 0, 0, 0.162);
        cursor: pointer;
    }
</style>