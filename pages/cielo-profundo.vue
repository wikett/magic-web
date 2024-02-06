<template>
  <main>
    <div class="bg-white py-12 sm:py-12">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto text-justify">
          <h1
            class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
          >
            Cielo Profundo
          </h1>
          <p class="mt-2 text-sm leading-8 text-gray-600">
            ¡Bienvenidos al apasionante mundo del Cielo Profundo! Como experto
            en astronomía, me complace sumergirnos en este intrigante y
            misterioso rincón del universo.

            <br />El Cielo Profundo se refiere a todo aquello que se encuentra
            más allá de
            <strong><a href="/sistema-solar">nuestro Sistema Solar</a></strong
            >. A diferencia de las estrellas individuales y los planetas que
            componen nuestro sistema estelar cercano, el Cielo Profundo nos
            muestra estructuras cósmicas más grandes, como galaxias, cúmulos
            estelares, nebulosas y otros objetos celestes.

            <br /><img
              :src="data.categoryImages[3].image"
              :alt="data.categoryImages[3].title"
              class="aspect-[7/5] w-[37rem] mx-6 max-w-none rounded-2xl object-cover float-right"
            />Uno de los aspectos más fascinantes del
            <strong>Cielo Profundo</strong> es la gran cantidad de galaxias que
            podemos observar. Estas vastas agrupaciones de estrellas, gas y
            polvo cósmico nos muestran la diversidad y la inmensidad del
            universo. Desde las galaxias espirales, con sus brazos en espiral
            distintivos, hasta las galaxias elípticas y las irregulares, cada
            una tiene su propia historia y composición única.

            <br />Otro elemento emocionante del Cielo Profundo son los cúmulos
            estelares. Estas agrupaciones de estrellas se forman cuando una gran
            cantidad de estrellas nacen de una nube de gas y polvo en la misma
            región del espacio. Los cúmulos estelares pueden ser abiertos, con
            estrellas más jóvenes y dispersas, o globulares, con estrellas más
            antiguas y densamente concentradas.

            <br />Además, las nebulosas son otro espectáculo impresionante del
            <strong>Cielo Profundo</strong>. Estas nubes de gas y polvo cósmico
            se iluminan gracias a la radiación de estrellas cercanas, creando
            hermosas formas y colores en el cielo nocturno. Algunas nebulosas
            son lugares de formación estelar, donde nuevas estrellas están
            naciendo, mientras que otras son remanentes de explosiones estelares
            catastróficas.

            <br />Explorar el Cielo Profundo es un desafío apasionante para los
            astrónomos. Utilizando
            <a href="/telescopios">telescopios</a> potentes y tecnologías
            avanzadas, podemos adentrarnos en el reino de los objetos celestes
            distantes y desvelar sus secretos.

            <br />El estudio del Cielo Profundo nos ayuda a comprender la
            evolución del universo, cómo se forman y se desarrollan las
            galaxias, y cómo se producen los elementos químicos necesarios para
            la vida. También nos permite apreciar la belleza y la majestuosidad
            del cosmos en toda su gloria.

            <br />¡Así que prepárense para explorar el
            <strong>Cielo Profundo</strong> y dejarse maravillar por las
            maravillas cósmicas que nos esperan! Adéntrate en un viaje a través
            de las galaxias, descubre cúmulos estelares y desvela los secretos
            de las nebulosas. El Cielo Profundo nos espera con un sinfín de
            fascinantes descubrimientos.
          </p>
        </div>
        <div
          class="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3"
        >
          <ContentList path="/cielo-profundo" v-slot="{ list }">
            <ThumbArticle
              v-for="(post, index) in list"
              :key="index"
              :post="post"
            />
          </ContentList>
        </div>
      </div>
    </div>
  </main>
</template>
<script setup>
import data from "../content/info.json";
</script>
