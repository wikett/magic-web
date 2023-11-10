<template>
    <figure class="mt-16">
        <img class="w-full rounded-xl bg-gray-50 object-cover" loading="lazy" width="312" height="234" :src="imageurl" :alt="title" />
        <figcaption class="mt-4 flex gap-x-2 text-sm leading-6 text-gray-500">
            <InformationCircleIcon class="mt-0.5 h-5 w-5 flex-none text-gray-300" aria-hidden="true" />
            {{ title  }}
        </figcaption>
    </figure>
</template>
<script setup>
  import { InformationCircleIcon } from '@heroicons/vue/20/solid'
defineProps({
    imageurl: {
        type: String
    },
    title: {
        type: String
    }
})
</script>
