<template>
  <main>
    <div class="bg-white py-12 sm:py-12">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto text-justify">
          <h1
            class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
          >
            Constelaciones
          </h1>
          <p class="mt-2 text-sm leading-8 text-gray-600">
            ¡Bienvenidos al fascinante mundo de las
            <strong>constelaciones</strong>! <br />Como experto en astronomía,
            me complace guiarlos a través de este maravilloso universo estelar.

            <br />Las constelaciones son agrupaciones de estrellas que forman
            figuras reconocibles en el cielo nocturno. Estas figuras han sido
            utilizadas desde tiempos antiguos como mapas celestes para
            orientarnos y contar historias sobre los dioses y mitos que nos
            rodean.

            <br /><img
              :src="data.categoryImages[2].image"
              :alt="data.categoryImages[2].title"
              class="aspect-[7/5] w-[37rem] mx-6 max-w-none rounded-2xl object-cover float-right"
            />La palabra <strong>"constelación"</strong> deriva del término
            latino <strong>"constellatio"</strong>, que significa "conjunto de
            estrellas". Durante miles de años, diferentes culturas alrededor del
            mundo han creado sus propias interpretaciones de estas agrupaciones
            celestiales.

            <br />Hoy en día, contamos con 88 constelaciones reconocidas
            oficialmente en el ámbito astronómico, cada una con su propia
            identidad y peculiaridades. Las constelaciones se agrupan en
            <strong>dos hemisferios celestes:</strong> el hemisferio norte y el
            hemisferio sur. Esto significa que, dependiendo de nuestra ubicación
            geográfica, podremos observar unas constelaciones y no otras.

            <br />Cada constelación tiene estrellas que se encuentran a
            distintas distancias de la Tierra, lo que da lugar a la aparente
            formación de patrones en el cielo nocturno. Sin embargo, es
            importante destacar que estas estrellas no están realmente
            relacionadas entre sí, simplemente parecen estarlo desde nuestra
            perspectiva terrestre.

            <br />El estudio de las constelaciones nos permite explorar y
            comprender mejor el vasto cosmos que nos rodea. Nos ayuda a
            ubicarnos en el espacio, a identificar estrellas y planetas y a
            navegar por la bóveda celeste. Además, nos enseña sobre la evolución
            y la historia de la astronomía, ya que muchas constelaciones tienen
            raíces en civilizaciones antiguas.

            <br />A medida que descubramos más y más acerca de nuestro universo,
            es emocionante pensar que podrían surgir nuevas constelaciones en el
            futuro, a medida que observamos objetos celestiales aún
            desconocidos.

            <br />Así que, prepárate para adentrarte en el asombroso mundo de
            las <strong>constelaciones</strong>. Te invito a explorarlas y
            desvelar sus secretos mientras abrimos las puertas hacia los
            misterios del cosmos. ¡La belleza infinita del firmamento te espera
            con sus constelaciones brillantes y evocadoras!
          </p>
        </div>
        <div
          class="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3"
        >
          <ContentList path="/constelaciones" v-slot="{ list }">
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
