<template>
  <main>
    <div class="bg-white py-12 sm:py-12">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto text-justify">
          <h1
            class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
          >
            Mitología
          </h1>
          <p>
            La <strong>mitología</strong> es una colección de puntos de vista
            colectivos y de creencias que generalmente se manifiestan en la
            forma de historias o cuentos. Estas narraciones, llenas de héroes,
            dioses, seres sobrenaturales y simbolismo profundo, son uno de los
            pilares de diversas civilizaciones antiguas, jugando un papel
            esencial en la configuración de su cultura, su religión y su
            comprensión del mundo.
          </p>

          <h2>Mitologías alrededor del mundo</h2>
          <p>
            Las mitologías pueden ser encontradas en todos los rincones del
            mundo. Desde la mitología griega, famosa por sus dioses y semidioses
            como Zeus y Heracles, hasta la mitología nórdica, que nos brinda la
            imagen de valientes dioses y diosas tales como Thor y Freya, la rica
            diversidad de estas historias ha fascinado a la humanidad durante
            siglos.
          </p>

          <h2>Importancia de la mitología</h2>
          <p>
            Más allá de simplemente contar historias, la mitología controbuye a
            proporcionar un marco para el sistema de creencias y la moral de una
            sociedad. Prácticamente, todas las mitologías contienen lecciones de
            vida insertadas en sus narrativas, enseñando a las personas sobre
            las virtudes de la valentía, la bondad, la sabiduría y otras
            cualidades a través de sus personajes y aventuras.
          </p>

          <h2>La mitología en el mundo moderno</h2>
          <p>
            Incluso hoy, la mitología sigue teniendo una presencia prominente en
            la sociedad moderna. Es ampliamente utilizada en diversas formas de
            medios y de entretenimiento, desde libros hasta películas y
            videojuegos. A través de estos medios, las viejas historias son
            contadas de nuevo, manteniendo viva la magia de la mitología para la
            próxima generación.
          </p>
        </div>
        <div
          class="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3"
        >
          <ThumbArticle
            v-for="(post, index) in data"
            :key="index"
            :post="post"
          />
        </div>
      </div>
    </div>
  </main>
</template>
<script setup>
const { data } = await useAsyncData('/mitologia', () =>
  queryContent('/mitologia').find()
);
</script>
