<template>
  <main>
    <div class="bg-white py-12 sm:py-12">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto text-justify">
          <h1
            class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
          >
            Astrología
          </h1>
          <p>
            La <strong>Astrología</strong> es una antigua disciplina basada en
            la interpretación de los fenómenos celestiales y su influencia sobre
            la vida humana y el mundo natural. Los astrólogos interpretan los
            movimientos y las posiciones relativas de los cuerpos celestes para
            predecir y reflejar las características de la personalidad, así como
            para entender las relaciones entre la gente y el mundo que los
            rodea.
          </p>

          <h2>Historia de la Astrología</h2>
          <p>
            El origen de la astrología se remonta a la antigüedad, cuando las
            personas empezaron a buscar significado en el cielo nocturno. A lo
            largo de la historia, las prácticas astrológicas han variado mucho
            entre diferentes culturas, incluyendo la antigua Mesopotamia,
            Egipto, India, China, Grecia y Roma. Hoy en día, la forma más
            familiar de astrología es el horóscopo, popular en periódicos y
            revistas.
          </p>

          <h2>Horóscopos</h2>
          <p>
            Los horóscopos son una aplicación popular de la astrología. Vinculan
            los signos zodiacales, determinados por la fecha de nacimiento de
            una persona, con las predicciones sobre su carácter y destino.
            Aunque los horóscopos son populares y a menudo vistas como una forma
            de entretenimiento, la astrología como una disciplina es mucho más
            compleja y abarca una amplia variedad de prácticas y creencias.
          </p>

          <h2>La Astrología Hoy</h2>
          <p>
            Aunque la astrología ha sido a menudo criticada por la comunidad
            científica, sigue teniendo un rol importante en muchas culturas y
            vidas individuales en todo el mundo. Para muchos, ofrece consuelo,
            inspiración y una forma de hacer sentido del mundo.
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
const { data } = await useAsyncData('/astrologia', () =>
  queryContent('/astrologia').find()
);
</script>
