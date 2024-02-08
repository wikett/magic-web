<template>
  <article
    class="relative isolate flex flex-col overflow-hidden mt-4 border-2 border-gray-100 px-2 pb-1 pt-16"
  >
    <img
      :src="post.imageUrl"
      :alt="post.title"
      :title="post.title"
      class="absolute inset-0 -z-10 w-full object-fill h-24"
      width="40"
      height="80"
      loading="lazy"
    />
    <!-- <div
      class="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40"
    />
    <div
      class="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10"
    /> -->

    <h3 class="mt-9 text-base font-semiboldtext-white h-12">
      <a :href="post._path" :title="post.title">
        <span class="absolute inset-0" />
        {{ post.title }}
      </a>
    </h3>
    <div class="flex flex-wrap overflow-hidden text-sm leading-6 text-gray-900">
      <time :datetime="post.created" class="mr-8 mt-2 capitalize">{{
        post.category
      }}</time>
    </div>
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
