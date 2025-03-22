<script setup>
    import { computed } from 'vue'

    const props = defineProps({
        cell: Object
    })

    const getStyle = computed(() => {
        if (props.cell.is_open) {
            return props.cell.is_mine ? 'Cell Mine' : 'Cell Open'
        }
        return props.cell.flag ? 'Cell Flag' : 'Cell'
    });
</script>

<template>
    <div v-if="cell.flag" :class="getStyle">{{ cell.flag }}</div>
    <div v-else :class="getStyle">{{ cell.is_open ? cell.mines_number : '' }}</div>
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

        &.Mine {
            background-color: rgba(255, 0, 0, 0.252);
        }
    }
    .Cell:hover {
        background-color: rgba(0, 0, 0, 0.162);
        cursor: pointer;
    }
</style>