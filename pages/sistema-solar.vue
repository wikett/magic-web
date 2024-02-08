<template>
  <main>
    <div class="bg-white py-12 sm:py-12">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto text-justify">
          <h1
            class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
          >
            Sistema Solar
          </h1>
          <p class="mt-2 text-sm leading-8 text-gray-600">
            ¡Bienvenidos a un viaje por el <strong>Sistema Solar</strong>, el
            lugar donde habitamos junto a otros fascinantes astros! Como experto
            en astronomía, me complace compartirles conocimientos sobre este
            maravilloso sistema planetario.

            <br />El Sistema Solar está compuesto por el Sol, nuestra estrella
            central, y todos los cuerpos celestes que orbitan a su alrededor.
            Estos cuerpos incluyen planetas, lunas, asteroides, cometas y muchos
            otros objetos cósmicos.

            <br />
            Comencemos por el astro rey, <strong>el Sol</strong>. Es una
            estrella gigantesca compuesta principalmente de hidrógeno y helio, y
            es responsable de proporcionar la energía necesaria para que la vida
            en la Tierra prospere. Su luz y calor brindan un ambiente propicio
            para la existencia de diferentes formas de vida.

            <br />En nuestro vecindario estelar, encontramos planetas como
            Mercurio, Venus, la Tierra, Marte, Júpiter, Saturno, Urano y
            Neptuno. Cada uno de ellos tiene características únicas que los
            distinguen. <strong>La Tierra</strong>, nuestro hogar preciado, se
            destaca por ser el único planeta con condiciones adecuadas para
            albergar vida, gracias a la presencia de aire, agua y una
            temperatura moderada.

            <br />A su vez, estos planetas suelen tener compañeros en forma de
            lunas. Por ejemplo, la Tierra tiene una única y hermosa luna,
            mientras que Júpiter cuenta con un sistema de lunas impresionante,
            incluyendo la galileana Europa, que podría tener océanos bajo su
            superficie helada. Además, también hay objetos más pequeños, como
            asteroides y cometas, que se encuentran dispersos en el espacio.

            <br />Explorar el Sistema Solar ha sido un desafío emocionante para
            la humanidad. A través de misiones espaciales, hemos enviado sondas
            y astronautas para estudiar de cerca nuestros vecinos cósmicos,
            revelando maravillas y secretos cósmicos.

            <br />El estudio del <strong>Sistema Solar</strong> nos brinda una
            visión más profunda de nuestro lugar en el cosmos, al tiempo que nos
            invita a reflexionar sobre la posibilidad de vida en otros planetas
            o lunas. Además, el conocimiento adquirido sobre nuestro vecindario
            estelar nos ayuda a entender mejor el funcionamiento del universo en
            su conjunto.

            <br />¡Acompáñenme en este viaje de descubrimiento y maravíllense
            con las maravillas del <strong>Sistema Solar</strong>! Estoy seguro
            de que les fascinará explorar los distintos mundos y objetos
            celestiales que lo conforman.
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
const { data } = await useAsyncData('/sistema-solar', () =>
  queryContent('/sistema-solar').find()
);
</script>
