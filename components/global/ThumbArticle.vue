<template>
    <article
              class="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl mt-4 bg-gray-900 px-8 pb-8 sm:pt-12"
            >
     <img
        :src="post.imageUrl"
        :alt="post.title"
        class="absolute inset-0 -z-10 w-full object-scale-down"
        width="140"
        height="105"
        loading="lazy"
        />
        <div
        class="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40"
        />
        <div
        class="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10"
        />

        <div
        class="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-gray-300"
        >
        <time :datetime="post.created" class="mr-8">{{
            post.created
        }}</time>

        </div>
        <h3 class="mt-3 text-lg font-semibold leading-6 text-white">
        <a :href="post._path" :title="post.title">
            <span class="absolute inset-0" />
            {{ post.title }}
        </a>
        </h3>
    </article>
</template>
<script setup>
const props = defineProps({
    post: {
        type: Object,
        required: true,
  },
});
</script>
