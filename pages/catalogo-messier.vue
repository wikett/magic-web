<template>
  <main>
    <div class="bg-white py-12 sm:py-12">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto text-justify">
          <h1
            class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
          >
            Catálogo Messier
          </h1>
          
          <p><img src="/img/messier-catalogue.webp" alt="Catalogo Messier" class="aspect-[7/5] w-[37rem] mx-6 max-w-none rounded-2xl object-cover float-right" />El <strong>Catálogo Messier</strong>, llamado así por el astrónomo francés <em>Charles Messier</em>, es una colección de 110 objetos astronómicos que fueron catalogados por primera vez en el siglo XVIII. Este catálogo es especialmente importante en la <strong>historia de la astronomía</strong> porque representa uno de los primeros intentos de listar objetos astronómicos no estelares. Es una lista esencial para los astrónomos y entusiastas del cielo nocturno, y su estudio nos puede ofrecer mejor comprensión de nuestro <em>Universo</em>.</p>

          <p>Los objetos Messier incluyen <strong> nebulosas, galaxias y cúmulos estelares</strong>. Algunos de los objetos más famosos en este catálogo incluyen la <strong>Galaxia de Andrómeda</strong> (M31), la <strong>Nebulosa del Cangrejo</strong> (M1) y la <strong>Nebulosa de Orión</strong> (M42). Cada objeto tiene su propia historia, procedencia y características.</p>

          <p>El estudio de los <em>objetos Messier</em> ofrece una excelente introducción a la <strong>astronomía de objetos de cielo profundo</strong>. No sólo nos proporcionan información sobre la estructura y la historia del universo, sino que también nos fascinan con su belleza y nos inspiran a aprender más sobre el misterio que es nuestro <strong>Universo</strong>.</p>
        </div>
        <div
          class="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3"
        >
          <ContentList path="/catalogo-messier" v-slot="{ list }">
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
