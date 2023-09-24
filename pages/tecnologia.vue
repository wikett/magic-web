<template>
  <main>
    <div class="bg-white py-12 sm:py-12">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="mx-auto max-w-2xl text-center">
          <h2
            class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
          >
            Tecnología
          </h2>
          <p class="mt-2 text-lg leading-8 text-gray-600">
            Cuando hablamos de limpiar, no es solo coger la fregona o el paño de limpieza, también podemos limpiar nuestro móvil de esas aplicaciones innecesarias, archivos que se quedan ocupando espacio en la memoria, o esos videos de whatsapp que no sabemos de donde han salido.
          </p>
        </div>
        <div
          class="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3"
        >
          <ContentList path="/tecnologia" v-slot="{ list }">
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
