<template>
    <figure class="mt-16">
        <iframe 
            width="560" 
            height="315" 
            :src="videourl"
            :title="title"
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        <figcaption class="mt-4 flex gap-x-2 text-sm leading-6 text-gray-500">
            <InformationCircleIcon class="mt-0.5 h-5 w-5 flex-none text-gray-300" aria-hidden="true" />
            {{ title  }}
        </figcaption>
    </figure>
</template>
<script setup>
  import { InformationCircleIcon } from '@heroicons/vue/20/solid'
defineProps({
    videourl: {
        type: String
    },
    title: {
        type: String
    }
})
</script>
