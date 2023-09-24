<template>
  <div class="bg-white">

    <div class="relative">
      <div class="mx-auto max-w-7xl">
        <div class="relative z-10 pt-14 lg:w-full lg:max-w-2xl">
          <svg class="absolute inset-y-0 right-8 hidden h-full w-80 translate-x-1/2 transform fill-white lg:block" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <polygon points="0,0 90,0 50,100 0,100" />
          </svg>

          <div class="relative px-6 py-24 sm:py-24 lg:px-8 lg:py-24 lg:pr-0">
            <div class="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl">
              <div class="hidden sm:mb-10 sm:flex">
                <div class="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-500 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                  Con cualquier duda o consulta, utiliza nuestro formulario de <a href="/contacto" class="whitespace-nowrap font-semibold text-indigo-600"><span class="absolute inset-0" aria-hidden="true" />contacto <span aria-hidden="true">&rarr;</span></a>
                </div>
              </div>
              <h1 class="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Mayte y Diana: expertas en limpieza</h1>
              <p class="mt-6 text-lg leading-8 text-gray-600">¡Hola a todos! Mi hija y yo estamos comenzando una nueva aventura. </p>
                <p class="mt-6 text-lg leading-8 text-gray-600">Hemos decidido compartir con el mundo nuestros trucos y tips sobre cómo mantener nuestra casa, ropa y otras cositas limpia y reluciente.</p>
                <p class="mt-6 text-lg leading-8 text-gray-600">Este viaje comienza con la creación de nuestro blog, dedicado a enseñar cómo limpiar desde sofás hasta ropa y muebles de manera efectiva, ecológica y económica. ¿Quién iba a decir que esos viejos trucos de la abuela iban a ser tan útiles? </p>
                <p class="mt-6 text-lg leading-8 text-gray-600">Estamos entusiasmadas por compartir todos nuestros secretos e ideas y esperamos que les puedan ser de gran ayuda. ¡Nos vemos pronto en nuestra nueva aventura digital!</p>
              <div class="mt-10 flex items-center gap-x-6">
                <a href="/" class="text-sm font-semibold leading-6 text-gray-900">Échale un ojo a nuestros últimos artículos <span aria-hidden="true">→</span></a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="bg-gray-50 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img class="aspect-[3/2] object-cover lg:aspect-auto lg:h-full lg:w-full" src="/img/mayte-y-diana.png" alt="Mayte y Diana" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Dialog, DialogPanel } from '@headlessui/vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'

const navigation = [
  { name: 'Product', href: '#' },
  { name: 'Features', href: '#' },
  { name: 'Marketplace', href: '#' },
  { name: 'Company', href: '#' },
  { name: 'Log in', href: '#' },
]

const mobileMenuOpen = ref(false)
</script>