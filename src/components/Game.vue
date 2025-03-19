<script setup>
    import Cell from './Cell.vue'

    defineProps({
        width: Number,
        height: Number,
        mines_number: Number
    })
</script>

<template>
    <div>
        <p>Игра</p>
        <p>{{ width }}</p>
        <Cell />
    </div>
    
</template>