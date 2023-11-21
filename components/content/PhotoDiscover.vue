<template>
    <div>
        <img :src="imageurl" :alt="title" :title="title" class="mt-8 rounded-xl shadow-2xl ring-1 ring-gray-900/10" width="1024" height="1024" loading="lazy" />
        <div class="relative" aria-hidden="true">
            <div class="absolute -inset-x-20 bottom-0 bg-gradient-to-t from-white pt-[7%]" />
        </div>
    </div>
  </template>
  
  <script setup>

  defineProps({
    imageurl: {
        type: String
    },
    title: {
        type: String
    }
})
  </script>