<template>
    <div>
        <img :src="imageurl" :alt="title" :title="title" class="rounded-xl shadow-2xl ring-1 ring-gray-900/10" width="1024" height="1024" />
        <div class="relative" aria-hidden="true">
            <div class="absolute -inset-x-20 bottom-0 bg-gradient-to-t from-white pt-[7%]" />
        </div>
    </div>
  </template>
  
  <script setup>

  defineProps({
    imageurl: {
        type: String
    }
})
  </script>