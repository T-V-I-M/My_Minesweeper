<script setup>
    import { ref } from 'vue';

    function click () {

    }
</script>

<template>
    <div class="Cell"><slot></slot></div>
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
    }
    .Cell:hover {
        background-color: rgba(0, 0, 0, 0.162);
        cursor: pointer;
    }
</style>