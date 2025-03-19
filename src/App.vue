<script setup>
    import { RouterLink } from 'vue-router';
</script>

<template>
    
    <nav class="navigation">
        <RouterLink to="/">Settings</RouterLink>
        <RouterLink to="game">Игра</RouterLink>
    </nav>
  
    <main>
        <RouterView />
    </main>

</template>

<style scoped>
    .navigation {
        background-color: aqua;
    }
</style>
