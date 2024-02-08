<template>
  <main>
    <div class="bg-white py-12 sm:py-12">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto text-justify">
          <h1
            class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
          >
            Eclipses
          </h1>

          <p>
            Los <strong>eclipses</strong> son fenómenos astronómicos fascinantes
            que han capturado la imaginación de la humanidad a lo largo de la
            historia. Un eclipse ocurre cuando un cuerpo celeste se interpone en
            el camino de la luz de otro. Hay dos tipos principales de eclipses
            que podemos presenciar aquí en la Tierra: los
            <strong>eclipses solares</strong> y los eclipses lunares. En un
            eclipse solar, la Luna se interpone entre la Tierra y el Sol,
            bloqueando temporalmente la luz del Sol.
          </p>

          <p>
            <em
              >En un <strong>eclipse lunar</strong>, la Tierra se interpone
              entre el Sol y la Luna, por lo que la Luna, la Tierra y el Sol
              están alineados, haciendo que la luz del sol no llegue
              directamente a la Luna. Este evento da lugar a diferentes tipos de
              eclipses, dependiendo de cómo los cuerpos celestes estén
              alineados. Aunque los eclipses son eventos relativamente raros,
              nos ofrecen valiosa información sobre nuestro sistema solar y la
              física celestial.</em
            >
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
const { data } = await useAsyncData('/eclipses', () =>
  queryContent('/eclipses').find()
);
</script>
