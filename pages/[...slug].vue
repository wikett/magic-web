<template>
    <div>
      <div>
      <ul v-if="toc && toc.links">
        <li v-for="link in toc.links" :key="link.text">
          <a :href="`#${link.id}`">
            {{ link.text }}
          </a>
        </li>
      </ul>
    </div>
      <main>
        <ContentDoc v-slot="{ doc }">
          <!-- <pre>{{ doc }}</pre> -->
          <ContentRenderer :value="doc" />
        </ContentDoc>
      </main>
      <div>
        <h2>links</h2>
        <!-- <pre>{{ prev }}</pre> -->
        <NuxtLink v-if="prev" :to="prev._path">{{ prev.title }}</NuxtLink>
        <NuxtLink v-if="next" :to="next._path">{{ next.title }}</NuxtLink>
      </div>
    </div>
    
  </template>
<script setup lang="ts">
  const { toc, prev, next } = useContent()
  const route = useRoute()
  useHead({
    meta: [
      { name: 'description', content: 'pepito'}
    ],
    link: [
      { rel: 'canonical', href: `https://comolimpiarcomoexpertas.com${route.path}`}
    ]
  })
</script>
  
