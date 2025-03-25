<script setup>
    import { ref } from 'vue';
    import router from '../router/router';
import { VContainer } from 'vuetify/components';

    const width = ref(8)
    const height = ref(8)
    const minesNumber = ref(10)

    function ChangeSetting(_width, _height, _minesNumber) {   
        width.value = _width
        height.value = _height
        minesNumber.value = _minesNumber

        StartGame()
    }

    function StartGame() {
        if (width.value > 32 || height.value > 32 || minesNumber.value > (width.value * height.value * 0.5)
            || width.value < 8 || height.value < 8 || minesNumber.value < 2)
        {
            alert("Невозможно запустить игру!")
            return
        }
        router.push({path: `/game/${width.value}/${height.value}/${minesNumber.value}`})
    }

</script>

<template>
    <div class="difficulty_levels">
            <v-container>
                <v-row>
                    <v-col>
                        <h2>Выбери уровень</h2>
                    </v-col>
                </v-row>
                <v-row align="center">
                    <v-col cols="12" md="4">
                        <v-card class="mx-auto" color="green">
                            <template v-slot:title>
                                <span class="font-weight-black">Простой</span>
                            </template>

                            <v-card-text class="bg-surface-light pt-4">
                                Игровое поле: 8x8 <br> Число мин: 10
                            </v-card-text>
                            
                            <v-card-actions class="bg-surface-light">
                                <v-btn @click="ChangeSetting(8,8,10)">Начать</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-card color="yellow-darken-4">
                            <template v-slot:title>
                                <span class="font-weight-black">Средний</span>
                            </template>

                            <v-card-text class="bg-surface-light pt-4">
                                Игровое поле: 16x16 <br> Число мин: 40
                            </v-card-text>
                            
                            <v-card-actions class="bg-surface-light">
                                <v-btn @click="ChangeSetting(16,16,40)">Начать</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-card color="red">
                            <template v-slot:title>
                                <span class="font-weight-black">Сложный</span>
                            </template>

                            <v-card-text class="bg-surface-light pt-4">
                                Игровое поле: 32x16 <br> Число мин: 100
                            </v-card-text>
                            
                            <v-card-actions class="bg-surface-light">
                            <v-btn @click="ChangeSetting(32,16,100)">Начать</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <h2>Или настрой сам</h2>
                    </v-col>
                </v-row>
                <v-row align="center">
                    <v-col class="px-0">
                        <v-form>
                            <v-container>
                                <v-row align="center">
                                    <v-col cols="12" md="4">
                                        <v-text-field v-model="width" label="Ширина поля"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="4">
                                        <v-text-field v-model="height" label="Высота поля"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="4">
                                        <v-text-field v-model="minesNumber" label="Число мин"></v-text-field>
                                    </v-col>
                                    <v-col cols="auto" md="4">
                                        <v-btn @click="StartGame">Начать</v-btn>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-form>
                    </v-col>
                </v-row>
            </v-container>
    </div>
</template>

<style scoped>
    .difficulty_levels {
        margin-top: 50px;
    }
</style>