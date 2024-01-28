<template>
  <main>
    <div class="bg-white py-12 sm:py-12">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto text-justify">
          <h1
            class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
          >
            Astrobiologia
          </h1>
          
          <p><img src="/img/astrobiologia.webp" alt="Catalogo Messier" class="aspect-[7/5] w-[37rem] mx-6 max-w-none rounded-2xl object-cover float-right" />La <strong>Astrobiología</strong> es una rama interdisciplinaria de la ciencia que investiga la posibilidad de vida más allá de la Tierra. Fusiona conceptos tomados de la astronomía, la biología, la química y la geología para examinar la práctica y teoría de phenoména biológico a través del universo.</p>

<p><em>Esta ciencia es muy emocionante porque toma preguntas fundamentales que los humanos han estado haciendo desde el inicio de los tiempos, "<strong>¿Estamos solos en el universo</strong>?" y utiliza métodos científicos para intentar encontrar una respuesta.</em></p>

<p>Los astrobiólogos no solo buscan signos activos de vida en otros planetas, sino también indicadores de vida microbiana pasada, como <mark>fósiles</mark> o variaciones en las atmósferas planetarias. Su trabajo también tiene implicaciones para entender el origen de la vida en la Tierra.</p>

<p>Además, la astrobiología explorar la resiliencia de la vida en condiciones extremas, estudiando organismos de la Tierra conocidos como <strong><em>extremófilos</em></strong>, que pueden soportar entornos extremadamente fríos, secos, ácidos o salados. Comprender estos seres puede ayudarnos a imaginar cómo la vida puede adaptarse y prosperar en planetas que albergan condiciones igualmente desafiantes. </p>
        </div>
        <div
          class="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3"
        >
          <ContentList path="/astrobiologia" v-slot="{ list }">
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
<script setup>

const { data } = await useAsyncData('article', () => queryContent('/info').findOne())
</script>
