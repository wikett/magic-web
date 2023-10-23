<template>
  <div class="bg-white px-6 py-8 lg:px-8">
    <div class="mx-auto max-w-3xl text-base leading-7 text-gray-700">
      <TransitionRoot as="template" :show="open">
        <Dialog as="div" class="relative z-10" @close="open = false">
          <div class="fixed inset-0" />

          <div class="fixed inset-0 overflow-hidden">
            <div class="absolute inset-0 overflow-hidden">
              <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <TransitionChild as="template" enter="transform transition ease-in-out duration-500 sm:duration-700" enter-from="translate-x-full" enter-to="translate-x-0" leave="transform transition ease-in-out duration-500 sm:duration-700" leave-from="translate-x-0" leave-to="translate-x-full">
                  <DialogPanel class="pointer-events-auto w-screen max-w-md">
                    <div class="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                      <div class="px-4 sm:px-6">
                        <div class="flex items-start justify-between">
                          <DialogTitle class="text-base font-semibold leading-6 text-gray-900">📰 Tabla de Contenido</DialogTitle>
                          <div class="ml-3 flex h-7 items-center">
                            <button type="button" class="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" @click="open = false">
                              <span class="absolute -inset-2.5" />
                              <span class="sr-only">Close panel</span>
                              <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div class="relative mt-6 flex-1 px-4 sm:px-6">
                        <!-- Your content -->
                        <ul v-if="toc && toc.links">
                          <li v-for="link in toc.links" :key="link.text">
                            <a @click="open=false" :href="`#${link.id}`">
                              {{ link.text }}
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </DialogPanel>
                </TransitionChild>
              </div>
            </div>
          </div>
        </Dialog>
      </TransitionRoot>
      
      <div class="max-w-2xl">
        <a href="#" class="cursor-pointer" @click="open = true">📰 Tabla de Contenido</a>
        <ContentDoc v-slot="{ doc }">
          <!-- <a :href="`/${doc.category}`">
            <p class="text-base font-semibold leading-7 text-indigo-600">{{ doc.category.charAt(0).toUpperCase() + doc.category.slice(1)  }}</p>
          </a> -->
          
          
          <ContentRenderer :value="doc" />
          <!-- <figure class="mt-16">
            <img class="w-full rounded-xl bg-gray-50 object-cover" :src="doc.imageUrl" :alt="doc.title" />
            <figcaption class="mt-4 flex gap-x-2 text-sm leading-6 text-gray-500">
              <InformationCircleIcon class="mt-0.5 h-5 w-5 flex-none text-gray-300" aria-hidden="true" />
              {{ doc.title  }}
            </figcaption>
          </figure> -->
        </ContentDoc>
        
      </div>
      <section class="isolate overflow-hidden bg-white px-6 lg:px-8">
    <div class="relative mx-auto max-w-2xl py-24 sm:py-32 lg:max-w-4xl">
      <div class="absolute left-1/2 top-0 -z-10 h-[50rem] w-[90rem] -translate-x-1/2 bg-[radial-gradient(50%_100%_at_top,theme(colors.indigo.100),white)] opacity-20 lg:left-36" />
      <div class="absolute inset-y-0 right-1/2 -z-10 mr-12 w-[150vw] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-20 md:mr-0 lg:right-full lg:-mr-36 lg:origin-center" />
      <figure class="grid grid-cols-1 items-center gap-x-6 gap-y-8 lg:gap-x-10">
        <div class="relative col-span-2 lg:col-start-1 lg:row-start-2">
          <svg viewBox="0 0 162 128" fill="none" aria-hidden="true" class="absolute -top-12 left-0 -z-10 h-32 stroke-gray-900/10">
            <path id="b56e9dab-6ccb-4d32-ad02-6b4bb5d9bbeb" d="M65.5697 118.507L65.8918 118.89C68.9503 116.314 71.367 113.253 73.1386 109.71C74.9162 106.155 75.8027 102.28 75.8027 98.0919C75.8027 94.237 75.16 90.6155 73.8708 87.2314C72.5851 83.8565 70.8137 80.9533 68.553 78.5292C66.4529 76.1079 63.9476 74.2482 61.0407 72.9536C58.2795 71.4949 55.276 70.767 52.0386 70.767C48.9935 70.767 46.4686 71.1668 44.4872 71.9924L44.4799 71.9955L44.4726 71.9988C42.7101 72.7999 41.1035 73.6831 39.6544 74.6492C38.2407 75.5916 36.8279 76.455 35.4159 77.2394L35.4047 77.2457L35.3938 77.2525C34.2318 77.9787 32.6713 78.3634 30.6736 78.3634C29.0405 78.3634 27.5131 77.2868 26.1274 74.8257C24.7483 72.2185 24.0519 69.2166 24.0519 65.8071C24.0519 60.0311 25.3782 54.4081 28.0373 48.9335C30.703 43.4454 34.3114 38.345 38.8667 33.6325C43.5812 28.761 49.0045 24.5159 55.1389 20.8979C60.1667 18.0071 65.4966 15.6179 71.1291 13.7305C73.8626 12.8145 75.8027 10.2968 75.8027 7.38572C75.8027 3.6497 72.6341 0.62247 68.8814 1.1527C61.1635 2.2432 53.7398 4.41426 46.6119 7.66522C37.5369 11.6459 29.5729 17.0612 22.7236 23.9105C16.0322 30.6019 10.618 38.4859 6.47981 47.558L6.47976 47.558L6.47682 47.5647C2.4901 56.6544 0.5 66.6148 0.5 77.4391C0.5 84.2996 1.61702 90.7679 3.85425 96.8404L3.8558 96.8445C6.08991 102.749 9.12394 108.02 12.959 112.654L12.959 112.654L12.9646 112.661C16.8027 117.138 21.2829 120.739 26.4034 123.459L26.4033 123.459L26.4144 123.465C31.5505 126.033 37.0873 127.316 43.0178 127.316C47.5035 127.316 51.6783 126.595 55.5376 125.148L55.5376 125.148L55.5477 125.144C59.5516 123.542 63.0052 121.456 65.9019 118.881L65.5697 118.507Z" />
            <use href="#b56e9dab-6ccb-4d32-ad02-6b4bb5d9bbeb" x="86" />
          </svg>
          <blockquote class="text-xl font-semibold leading-8 text-gray-900 sm:text-xl sm:leading-9">
            <p>¡Hola a todos! Somos Mayte y Diana, madre e hija adictas a la limpieza. Hemos decidido compartir con el mundo nuestros trucos y tips sobre cómo mantener nuestra casa, ropa y otras cositas limpia y reluciente.</p>
          </blockquote>
        </div>
        <div class="col-end-1 w-16 lg:row-span-4 lg:w-72">
          <img class="aspect-square object-cover rounded-xl bg-indigo-50 lg:rounded-3xl" src="/img/mayte-y-diana.png" alt="Mayte y Diana" />
        </div>
        <figcaption class="text-base lg:col-start-1 lg:row-start-3">
          <div class="font-semibold text-blue-900"><a href="/quienes-somos">Mayte y Diana</a></div>
          <div class="flex my-3 space-x-6">
            <a v-for="item in navigation.social" :key="item.name" :href="item.href" class="text-gray-500 hover:text-gray-400">
              <span class="sr-only">{{ item.name }}</span>
              <component :is="item.icon" class="h-6 w-6" aria-hidden="true" />
            </a>
          </div>
          <div class="mt-1 text-gray-500">Editoras en <span class="text-indigo-400 italic">comolimpiarcomoexpertas.com</span></div>
        </figcaption>
      </figure>
    </div>
  </section>

  <blockquote class="text-sm font-light text-gray-700 sm:text-sm">
            <p><strong>DISCLAIMER: </strong>Al leer esto, acepta todo lo siguiente: entiende que esto es una <strong>expresión de opiniones y no un consejo profesional</strong>. Usted es el único responsable del uso de cualquier contenido y exime a ©COMOLIMPIARCOMOEXPERTAS.COM y a todos los miembros y afiliados de cualquier evento o reclamo. La información proporcionada en el sitio podrá contener errores, tanto gramaticales como de contexto y/o información, le recomendamos que haga su propia investigación por los medios que considere pertinentes para satisfacer su intención de búsqueda. Si compra algo a través de un enlace, debe asumir que tenemos una relación de afiliado con la empresa que proporciona el producto o servicios que compra y se nos pagará de alguna manera. Le recomendamos que haga su propia investigación independiente antes de comprar cualquier cosa.</p>
  </blockquote>

  <h3>Más artículos que te pueden interesar</h3>
  <div
          class="mx-auto grid max-w-2xl auto-rows-fr grid-cols-2 gap-8 sm:mt-8 lg:mx-0 lg:max-w-none lg:grid-cols-2"
        >
    <ThumbArticle
        :post="anterior" />
    <ThumbArticle
        :post="siguiente" />
  </div>
    </div>
  </div>
    
  </template>
<script setup lang="ts">
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { ChevronDownIcon } from '@heroicons/vue/20/solid'
import { ref } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'

const open = ref(false)
const { toc, prev, next } = useContent()
const route = useRoute()
const { data } = await useAsyncData('article', () => queryContent(route.params.slug[0], route.params.slug[1]).findOne())
const anterior = {
  imageUrl: prev.value?.imageUrl,
  created: prev.value?.created,
  _path: prev.value?._path,
  title: prev.value?.title
}
const siguiente = {
  imageUrl: next.value?.imageUrl,
  created: next.value?.created,
  _path: next.value?._path,
  title: next.value?.title
}

let navigation = {
    social: [
      {
        name: 'Facebook',
        href: 'https://www.facebook.com/groups/827877335714291/',
        icon: defineComponent({
          render: () =>
            h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [
              h('path', {
                'fill-rule': 'evenodd',
                d: 'M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z',
                'clip-rule': 'evenodd',
              }),
            ]),
        }),
      },
      {
      name: 'Instagram',
      href: 'https://www.instagram.com/car.tulinasdecolores/',
      icon: defineComponent({
        render: () =>
          h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [
            h('path', {
              'fill-rule': 'evenodd',
              d: 'M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z',
              'clip-rule': 'evenodd',
            }),
          ]),
      }),
    },
      {
        name: 'Twitter',
        href: 'https://twitter.com/mayteydiana',
        icon: defineComponent({
          render: () =>
            h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [
              h('path', {
                d: 'M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84',
              }),
            ]),
        }),
      },
    ],
  }

useHead({
  link: [
    { rel: 'canonical', href: `https://comolimpiarcomoexpertas.com${route.path}`}
  ]
})
useJsonld({
  '@context': 'https://schema.org',
  '@type': 'Article',
  'headline': data.value?.title,
  'image': {
    '@type': 'ImageObject',
    'url': data.value?.imageUrl,
    'width': '480',
    'height': '360'
  },
  'author': {
    '@type': 'Person',
    'name': 'Mayte y Diana',
    'url': 'https://comolimpiarcomoexpertas.com/quienes-somos'
  },
  'publisher': {
    '@type': 'Organization',
    'name': 'comolimpiarcomoexpertas.com',
    'logo': {
      '@type': 'ImageObject',
      'url': 'https://comolimpiarcomoexpertas.com/img/como-limpiar-logo.png',
      'width': '600',
      'height': '200'
    }
  },
  'datePublished': data.value?.published_time
});
</script>
  
