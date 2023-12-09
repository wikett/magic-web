<template>
    <main class="isolate">
      <!-- Hero section -->
      <div class="relative isolate -z-10 overflow-hidden bg-gradient-to-b from-indigo-100/20 pt-16">
        <div class="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:-mr-80 lg:-mr-96" aria-hidden="true" />
        <div class="mx-auto max-w-7xl px-6 sm:py-8 lg:px-8">
          <div class="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-6 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8">
            <h1 class="max-w-2xl text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:col-span-2 xl:col-auto">{{ data.authors }}</h1>
            <div class="mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1" v-html="data.authorsDescription"></div>
            <img src="/img/autor.webp" alt="Autores" class="mt-10 aspect-[1/1] w-full max-w-lg rounded-2xl object-cover sm:mt-16 lg:mt-0 lg:max-w-none xl:row-span-2 xl:row-end-2 xl:mt-36" />
          </div>
        </div>
        <div class="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white sm:h-32" />
      </div>

      <!-- Timeline section -->
      <div class="mx-auto mt-8 max-w-7xl px-6 lg:px-8">
        <div class="mx-auto grid max-w-2xl grid-cols-1 gap-8 overflow-hidden lg:mx-0 lg:max-w-none lg:grid-cols-4">
          <div v-for="item in articles.data._rawValue" :key="item.url">
            <time :datetime="item.published_time" class="flex items-center text-sm font-semibold leading-6 text-indigo-600">
            <svg viewBox="0 0 4 4" class="mr-4 h-1 w-1 flex-none" aria-hidden="true">
                <circle cx="2" cy="2" r="2" fill="currentColor" />
            </svg>
            {{ item.created }}
            <div class="absolute -ml-2 h-px w-screen -translate-x-full bg-gray-900/10 sm:-ml-4 lg:static lg:-mr-6 lg:ml-8 lg:w-auto lg:flex-auto lg:translate-x-0" aria-hidden="true" />
            </time>
            <a :href="item.url">
                <p class="mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-900">{{ item.title }}</p>
            </a>
            <p class="mt-1 text-base leading-7 text-gray-600">{{ item.description }}</p>
          </div>
        </div>
      </div>

      <!-- Logo cloud -->
      <div v-if="data.amazon.length > 0" class="mx-auto mt-32 max-w-7xl sm:mt-40 sm:px-6 lg:px-8">
        <div class="relative isolate overflow-hidden bg-gray-900 px-6 py-24 text-center shadow-2xl sm:rounded-3xl sm:px-16">
          <h2 class="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">Marcas que recomendamos</h2>
          <p class="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-300">{{ data.amazonDescription }}</p>
          <div class="mx-auto mt-20 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-12 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 sm:gap-y-14 lg:max-w-4xl lg:grid-cols-5">
            <a v-for="(item, index) in data.amazon" :key="index" :href="item.url">
              <img class="col-span-2 max-h-12 w-full object-contain lg:col-span-1" :src="item.image" :alt="item.title" width="158" height="48" />
            </a>
          </div>
          <div class="absolute -top-24 right-0 -z-10 transform-gpu blur-3xl" aria-hidden="true">
            <div class="aspect-[1404/767] w-[87.75rem] bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-25" style="clip-path: polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)" />
          </div>
        </div>
      </div>

      <!-- Content section -->
      <div class="mt-32 overflow-hidden sm:mt-40">
        <div class="mx-auto max-w-7xl px-6 lg:flex lg:px-8">
          <div class="mx-auto grid max-w-2xl grid-cols-1 gap-x-12 gap-y-16 lg:mx-0 lg:min-w-full lg:max-w-none lg:flex-none lg:gap-y-8">
            <div class="lg:col-end-1 lg:w-full lg:max-w-lg lg:pb-8">
              <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{{ data.category }}</h2>
              <p class="mt-6 text-xl leading-8 text-gray-600">{{ data.categoryDescription }}</p>
            </div>
            <div class="flex flex-wrap items-start justify-end gap-6 sm:gap-8 lg:contents">
              <div class="w-0 flex-auto lg:ml-auto lg:w-auto lg:flex-none lg:self-end">
                <img :src="data.categoryImages[0].image" :alt="data.categoryImages[0].title" class="aspect-[7/5] w-[37rem] max-w-none rounded-2xl bg-gray-50 object-cover" />
              </div>
              <div class="contents lg:col-span-2 lg:col-end-2 lg:ml-auto lg:flex lg:w-[37rem] lg:items-start lg:justify-end lg:gap-x-8">
                <div class="order-first flex w-64 flex-none justify-end self-end lg:w-auto">
                  <img :src="data.categoryImages[1].image" :alt="data.categoryImages[1].title" class="pl-32 aspect-[4/3] w-[24rem] max-w-none flex-none rounded-2xl bg-gray-50 object-fill overflow-hidden" />
                </div>
                <div class="flex w-96 flex-auto justify-end lg:w-auto lg:flex-none">
                  <img :src="data.categoryImages[2].image" :alt="data.categoryImages[2].title" class="aspect-[7/5] w-[37rem] max-w-none flex-none rounded-2xl bg-gray-50 object-cover" />
                </div>
                <div class="hidden sm:block sm:w-0 sm:flex-auto lg:w-auto lg:flex-none">
                  <img :src="data.categoryImages[3].image" :alt="data.categoryImages[3].title" class="aspect-[4/3] w-[24rem] max-w-none rounded-2xl bg-gray-50 object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- CTA Section -->
      <CTASection
       :description="data.tiendaAmiga[0].description"
       :link="data.tiendaAmiga[0].link"
       :alt="data.tiendaAmiga[0].alt"
       :image="data.tiendaAmiga[0].image"
       ></CTASection>

      <!-- Stats -->
      <div class="mx-auto mt-32 max-w-7xl px-6 sm:mt-40 lg:px-8">
        <div class="mx-auto max-w-2xl lg:mx-0">
          <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Aquí tienes algunos datos curiosos sobre: {{ data.category }}</h2>
          <p class="mt-6 text-base leading-7 text-gray-600">Aquí tienes unos datos curiosos para ir abriendo boca</p>
        </div>
        <div class="mx-auto mt-16 flex max-w-2xl flex-col gap-8 lg:mx-0 lg:mt-20 lg:max-w-none lg:flex-row lg:items-end">
          <div v-for="item in data.datosCuriosos" 
            class="flex flex-col-reverse justify-between gap-x-16 gap-y-8 rounded-2xl bg-sky-950 p-8 sm:w-3/4 sm:max-w-md sm:flex-row-reverse sm:items-end lg:w-72 lg:max-w-none lg:flex-none lg:flex-col lg:items-start">
            <p class="flex-none text-3xl font-bold tracking-tight text-gray-200 " >{{ item.title }}</p>
            <div class="sm:w-80 sm:shrink lg:w-auto lg:flex-none">
              <p class="mt-2 text-base leading-7 text-gray-300">{{ item.description }} </p>
            </div>
          </div>
        </div>
      </div>      
    </main>
</template>
<script setup>
import { ref } from 'vue'
const { data } = await useAsyncData('article', () => queryContent('/info').findOne())
const articles = await useAsyncData('home', () => queryContent('/').limit(4).find())

useHead({
    title: data.value?.title,
    meta: [
      { name: 'description', content: data.value?.description}
    ],
    link: [
      { rel: 'canonical', href: data.value?.domain}
    ]
  })

const mobileMenuOpen = ref(false)
</script>
