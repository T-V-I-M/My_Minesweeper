<script setup>
    const props = defineProps({
        cell: Object
    })

    function getStyle() {
        return (
            `background-color:${props.cell.is_mine ? "rgba(255, 0, 0, 0.162)" : "rgba(0, 0, 0, 0.038)" };
            
            `
        )
    }
</script>

<template>
    <div class="Cell" :style="getStyle()">{{ cell.is_open ? cell.mines_number : '' }}</div>
</template>

<style scoped>
    .Cell {
        display: flex;
        align-items: center;
        justify-content: center;
        aspect-ratio: 1 / 1;
        background-color: rgba(0, 0, 0, 0.038);
        font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
        font-size: small;
        width: 40px;
        border-color: black;
        border-width: 1px;
        border-style: solid;
    }
    .Cell:hover {
        background-color: rgba(0, 0, 0, 0.162);
        cursor: pointer;
    }
</style>