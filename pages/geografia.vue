<template>
  <main>
    <div class="bg-white py-12 sm:py-12">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto text-justify">
          <h1
            class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
          >
            Geografía
          </h1>
          <p>
            La <strong>geografía</strong> es una ciencia que estudia las
            propiedades de la Tierra, las distribuciones espaciales de la vida y
            los fenómenos terrestres, los paisajes, los lugares y las regiones,
            así como las relaciones espaciales y temporales entre la naturaleza
            y las actividades humanas. Los geógrafos examinan el impacto de la
            cultura y la economía en el medio ambiente y viceversa, utilizando
            diversas herramientas y técnicas para analizar y visualizar estos
            complejos sistemas.
          </p>

          <h2>Tipos de Geografía</h2>
          <p>
            Hay muchas ramas de la geografía, pero los dos campos principales
            son la geografía física y la geografía humana. La geografía física
            se centra en el estudio del medio ambiente y de los procesos físicos
            que dan forma al paisaje, como el clima, las corrientes oceánicas,
            los fenómenos volcánicos y tectónicos, y otros. La geografía humana,
            por su parte, estudia las actividades y comportamientos humanos tal
            cómo se interrelacionan con y modifican el entorno natural.
          </p>

          <h2>Aplicaciones de la Geografía</h2>
          <p>
            Las aplicaciones de la geografía son diversas y enriquecedoras para
            cualquier persona. La geografía nos permite entender por qué llueve
            más en algunas regiones que en otras, por qué ocurren determinados
            fenómenos naturales y cómo los humanos influyen en estos procesos.
            Además, proporciona habilidades prácticas de gran utilidad en muchas
            profesiones y campos de estudio, incluyendo la planificación urbana,
            la sostenibilidad y el medio ambiente, las políticas públicas, el
            turismo, el comercio y mucho más.
          </p>

          <h2>La Geografía en el Mundo Moderno</h2>
          <p>
            En la era de la globalización, comprender la geografía es más
            importante que nunca. Nos permite entender y hacer frente a las
            cuestiones que son críticas en el mundo moderno, como el cambio
            climático, la urbanización, los desastres naturales y los patrones
            de migración. Así, la geografía nos ayuda a ver el mundo en su
            totalidad y a comprender cómo interactúan las diversas regiones y
            culturas.
          </p>
        </div>
        <div
          class="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3"
        >
          <ContentList path="/geografia" v-slot="{ list }">
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
<script setup></script>
