<template>
  <main>
    <div class="bg-white py-12 sm:py-12">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto text-justify">
          <h1
            class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
          >
            Listado con todas las imágenes del día de la NASA del 2024
          </h1>
          <p class="mt-2 text-sm leading-8 text-gray-600">
            Histórico de todas las imágenes del día para este 2024
          </p>
        </div>
        <div
          class="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3"
        >
          <ContentList path="/nasa" v-slot="{ list }">
            <ThumbArticle
                v-for="(post, index) in list"
                :key="index"
                :post="post" />
          </ContentList>
        </div>
      </div>
    </div>
  </main>
</template>
<script setup lang="ts">
const { data } = await useAsyncData('article', () => queryContent('/info').findOne())
</script>