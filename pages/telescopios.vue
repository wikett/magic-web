<template>
  <main>
    <div class="bg-white py-12 sm:py-12">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto text-justify">
          <h1
            class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
          >
            Telescopios
          </h1>
          <p class="mt-2 text-sm leading-8 text-gray-600">
            ¡Bienvenidos al emocionante mundo de los <strong>telescopios</strong>! Como experto en astronomía, me complace guiarte a través de este fascinante instrumento que nos permite explorar los secretos del universo.

            <br/>Un telescopio es un dispositivo óptico diseñado para recolectar y ampliar la luz de los objetos celestes, permitiéndonos observarlos con detalle. Gracias a los <strong>telescopios</strong>, hemos sido capaces de descubrir y estudiar fenómenos astronómicos como estrellas, planetas, galaxias y nebulosas.

            <br/><img :src="data.categoryImages[0].image" :alt="data.categoryImages[0].title" class="aspect-[7/5] w-[37rem] mx-6 max-w-none rounded-2xl object-cover float-right" />Existen diferentes tipos de <strong>telescopios</strong>, cada uno con sus propias características y aplicaciones. Por ejemplo, los <strong>telescopios</strong> refractores utilizan lentes para enfocar la luz, mientras que los <strong>telescopios</strong> reflectores utilizan espejos. Los telescopios catadióptricos combinan ambos elementos, utilizando tanto lentes como espejos.

            <br/>Los telescopios modernos también cuentan con tecnologías avanzadas, como cámaras digitales acopladas a ellos, lo que nos permite capturar imágenes impresionantes del universo. Además, los telescopios espaciales, como el famoso Telescopio Espacial Hubble, nos brindan una visión clara y sin interferencias desde fuera de la atmósfera terrestre.

            <br/>Gracias a estos maravillosos instrumentos, hemos podido hacer descubrimientos asombrosos. Por ejemplo, el telescopio Hubble nos ha mostrado imágenes detalladas de galaxias distantes, ayudándonos a entender mejor la evolución del universo. También hemos podido observar exoplanetas fuera de nuestro <a href="/sistema-solar">Sistema Solar</a>, lo que nos acerca a responder la antigua pregunta "¿estamos solos en el universo?".

            <br/>Además de su importancia científica, los telescopios también nos permiten conectarnos con el cosmos y apreciar su belleza. Observar los anillos de Saturno, los cráteres lunares o las coloridas nebulosas nos recuerda nuestra humilde posición en el vasto universo, llenándonos de asombro y admiración.

            <br/>En resumen, los telescopios son herramientas indispensables para los astrónomos y entusiastas de la astronomía por igual. Nos permiten explorar el universo, descubrir nuevos objetos celestes y comprender los misterios del cosmos. ¡Así que no dudes en mirar a través de un telescopio y dejar que las estrellas y los planetas te hablen en su lenguaje cósmico!
          </p>
        </div>
        <div
          class="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3"
        >
          <ContentList path="/telescopios" v-slot="{ list }">
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