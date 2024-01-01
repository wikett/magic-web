<template>
    <main>
        <div class="bg-white px-6 py-12 lg:px-8">
            <div class="mx-auto max-w-2xl text-center">
            <p class="text-base font-semibold leading-7 text-indigo-600">Eventos astronómicos para el mes de Enero de 2024</p>
            <h1 class="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Guia del cielo para el mes de Enero 2024</h1>
            <p class="mt-6 text-lg leading-8 text-gray-600">Todos los <strong>eventos astronómicos</strong> más importantes para el mes de Enero 2024. Fases de la luna, eclipses, lluvia de meteoros y otros eventos.</p>
            </div>
        </div>
        <div class="relative bg-gray-900">
    <div class="relative h-80 overflow-hidden bg-white md:absolute md:left-0 md:h-full md:w-1/3 lg:w-1/2">
      <a href="/img/2024/cielo-enero-2024-hemisferio-norte.webp" target="_blank" title="cielo enero 2024">
        <img class="h-full w-full object-cover" src="/img/2024/cielo-enero-2024-hemisferio-norte.webp" alt="Cielo Enero 2024 Hemisferio Norte" title="Cielo Enero 2024 Hemisferio Norte" />
      </a>
    </div>
    <div class="relative mx-auto max-w-7xl py-24 sm:py-32 lg:px-8 lg:py-40">
      <div class="pl-6 pr-6 md:ml-auto md:w-2/3 md:pl-16 lg:w-1/2 lg:pl-24 lg:pr-0 xl:pl-32">
        <p class="text-base font-semibold leading-7 text-indigo-400">Posición del cielo Enero 2024 hemisferio Norte</p>
        <h2 class="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">Mapa de las posiciones de los planetas en enero 2024</h2>
        <p class="mt-6 text-base leading-7 text-gray-300">Guia de observación del cielo para el mes de Enero en el hemisferio Norte</p>
        <div class="mt-8">
          <a href="/img/2024/cielo-enero-2024-hemisferio-norte.webp" 
          target="_blank" 
          class="inline-flex rounded-md bg-white/10 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
          Ver mapa</a>
          <a href="/pdf/2024/aspecto-del-cielo-para-el-mes-de-enero-2024.pdf" 
          target="_blank" 
          class="inline-flex rounded-md ml-4 bg-blue-700 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
          Descargar en PDF</a>
        </div>
      </div>
    </div>
  </div>
 
  <div class="bg-white px-6 py-32 lg:px-8">
    <div class="mx-auto max-w-3xl text-base leading-7 text-gray-700">
        <div class="md:grid md:grid-cols-2 md:divide-x md:divide-gray-200">
    <div class="md:pr-14">
      <div class="flex items-center">
        <h2 class="flex-auto text-sm font-semibold text-gray-900">Enero 2024</h2>
      </div>
      <div class="mt-10 grid grid-cols-7 text-center text-xs leading-6 text-gray-500">
        <div>L</div>
        <div>M</div>
        <div>X</div>
        <div>J</div>
        <div>V</div>
        <div>S</div>
        <div>D</div>
      </div>
      <div class="mt-2 grid grid-cols-7 text-sm">
        <div v-for="(day, dayIdx) in days" :key="day.date" :class="[dayIdx > 6 && 'border-t border-gray-200', 'py-2']">
          <button type="button" 
          :class="[day.isSelected && 'text-white',
           !day.isSelected && !day.isToday && day.isCurrentMonth && 'text-gray-900',
           !day.isSelected && !day.isToday && !day.isCurrentMonth && 'text-gray-400',
           day.isSelected && day.isToday && 'bg-indigo-600',
           day.bgColor,
           !day.isSelected && 'hover:bg-gray-200',
           (day.isSelected || day.isToday) && 'font-semibold',
           'mx-auto flex h-8 w-8 items-center justify-center rounded-full']
          ">
            <time :datetime="day.date">{{ day.date.split('-').pop().replace(/^0/, '') }}</time>
          </button>
        </div>
      </div>
    </div>
    <section class="mt-12 md:mt-0 md:pl-2">
      <h2 class="text-base font-semibold leading-6 text-gray-900 lg:ml-2">Eventos astronómicos para <time datetime="2022-01-01">Enero 2024</time></h2>
      <ol class="mt-4 space-y-1 text-sm leading-6 text-blue-800 ml-0 lg:ml-4">
        <li v-for="item in agenda" :key="item.id"
          :class="[item.bgColor, item.bgColorHover, 'group flex items-center space-x-4 rounded-xl px-4 py-2  focus-within:bg-gray-100']" 
          >
          <img :src="item.imageUrl" :alt="item.type" class="h-10 w-10 flex-none rounded-full" />
          <div class="flex-auto">
            <p class="text-gray-900">{{ item.name }}</p>
            <p class="mt-0.5 font-bold">
              {{ item.label }}
            </p>
          </div>
        </li>
      </ol>
    </section>
  </div>
      <p class="mt-24 text-base font-semibold leading-7 text-indigo-600">Hemisferio Norte</p>
      <h2 class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Guía de observación del cielo en enero de 2024</h2>
      <p class="mt-6 text-xl leading-8">En esta guía de observación del cielo, exploraremos los fenómenos celestiales más destacados que se podrán apreciar durante este mes. Desde los majestuosos planetas hasta las brillantes estrellas, descubriremos qué maravillas nos esperan en la vastedad del universo.</p>
      <div class="mt-10 max-w-2xl">
        <h2 class="mt-16 text-2xl font-bold tracking-tight text-gray-900">Los planetas</h2>
        <p class="mt-6">Durante la mayoría del mes, <strong>Mercurio</strong> puede ser contemplado en la dirección sureste al romper el alba. Su visibilidad es óptima durante la primera mitad del mes, especialmente del 6 al 10, a pesar de que su máxima elongación de 23.5 grados al oeste del Sol se produce el día 12. Verlo se vuelve cada vez más desafiante a medida que se acerca el final de enero.</p>
        <p class="mt-6"><strong>Venus</strong>, con su brillo de magnitud -4.0, aparece a la vista al amanecer y cada día está más bajo en el horizonte sureste. Su surgimiento en el este-sureste ocurre antes del crepúsculo, más de una hora antes al principio del mes y solo media hora antes al final de enero. A lo largo del mes, Venus se desplaza por las constelaciones de Escorpio, Ofiuco y Sagitario. </p>
        <p class="mt-6"><strong>Marte</strong> solo puede ser avistado a finales de enero durante el amanecer, y se le ve con gran dificultad, apenas elevándose sobre el horizonte este-sureste. Se ubica en Sagitario y su magnitud es de 1.4.</p>
        <p class="mt-6"><strong>Júpiter</strong> se puede observar desde el crepúsculo, cuando culmina sobre el sur, hasta el amanecer, cuando se pone en el oeste-noroeste. Brilla con una magnitud de -2.5 en Aries, donde inicia el mes estacionario antes de retomar su trayectoria directa.</p>
        <p class="mt-6"><strong>Saturno</strong> es visible al anochecer y durante las primeras horas de la noche, cada vez más cerca del horizonte oeste-suroeste. Se le observa con una magnitud de 1.0 en Acuario.</p>
        <h2 class="mt-16 text-2xl font-bold tracking-tight text-gray-900">Lluvia de Meteoros</h2>
        <p class="mt-6"><strong>Las Cuadrántidas</strong> se pueden observar durante el primer tercio de enero, aunque su actividad máxima está muy concentrada en la mañana del día 4. Este año, la presencia de la Luna en cuarto menguante durante la madrugada dificulta su visualización, ya que es durante estas horas que su punto radiante, localizado en la región septentrional del <strong>Boyero</strong>, alcanza su máxima altura sobre el este-nordeste.</p>
        <h2 class="mt-16 text-2xl font-bold tracking-tight text-gray-900">La Tierra en su órbita</h2>
        <p class="mt-6">El 3 de enero a las 0:39 TU, la Tierra llega al perihelio, que es el punto de su órbita más cercano al <a href="/sistema-solar/sol" title="sol">Sol</a>, a una distancia de 147 100 600 km esta vez. Desde la perspectiva de la Tierra, el Sol muestra su mayor diámetro aparente del año, con 32.5 minutos de arco.</p>
        <h2 class="mt-16 text-2xl font-bold tracking-tight text-gray-900">Fases de la Luna</h2>
        <div>
    
    <div class="mt-8 flow-root overflow-hidden">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <table class="w-full text-left">
          <thead class="bg-white">
            <tr>
              <th scope="col" class="relative isolate py-3.5 pr-3 text-left text-sm font-semibold text-gray-900">
                Fases de la Luna
                <div class="absolute inset-y-0 right-full -z-10 w-screen border-b border-b-gray-200" />
                <div class="absolute inset-y-0 left-0 -z-10 w-screen border-b border-b-gray-200" />
              </th>
              <th scope="col" class="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"></th>
              <th scope="col" class="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 md:table-cell"></th>
              <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Fecha</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="person in people" :key="person.email">
              <td class="relative py-4 pr-3 text-sm font-medium text-gray-900">
                {{ person.name }}
                <div class="absolute bottom-0 right-full h-px w-screen bg-gray-100" />
                <div class="absolute bottom-0 left-0 h-px w-screen bg-gray-100" />
              </td>
              <td class="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell"></td>
              <td class="hidden px-3 py-4 text-sm text-gray-500 md:table-cell"></td>
              <td class="px-3 py-4 text-sm text-gray-500">{{ person.role }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
      </div>
      <figure class="mt-16">
        <a href="/img/2024/luna/fases-luna-enero-2024.webp" target="_blank" title="Fases de la luna enero 2024">
          <img class="aspect-video rounded-xl bg-gray-50 object-cover"
         src="/img/2024/luna/fases-luna-enero-2024.webp" alt="Fases de la luna enero 2024" />
        </a>
        
        <figcaption class="mt-4 flex gap-x-2 text-sm leading-6 text-gray-500">
          <InformationCircleIcon class="mt-0.5 h-5 w-5 flex-none text-gray-300" aria-hidden="true" />
          Fases de la luna enero 2024
        </figcaption>
      </figure>
      <h3 class="mt-16 text-2xl font-bold tracking-tight text-gray-900">Compártelo con tus amigos:</h3>
      <div class="flex flex-row gap-2">
        <SocialShare
          v-for="network in ['facebook', 'twitter', 'linkedin', 'whatsapp', 'telegram']"
          :key="network"
          :network="network"
          :styled="false"
          :label="false"
          class="p-4 rounded-none"
        />
      </div>
    </div>
    
  </div>
  
    </main>
  </template>
  <script setup>
  import { InformationCircleIcon } from '@heroicons/vue/20/solid'
  const { data } = await useAsyncData('article', () => queryContent('/info').findOne())
  const todayEnero = '2024-01-01T17:14:32.901Z'

const people = [
  { name: 'Cuarto menguante',  role: 'jueves 4 de enero a las 03:30 TU en Virgo' },
  { name: 'Luna nueva',  role: 'jueves 11 de enero a las 11:57 TU en Sagitario' },
  { name: 'Cuarto creciente',  role: 'jueves 18 de enero a las 03:53 TU en Piscis' },
  { name: 'Luna llena',  role: 'jueves 25 de enero a las 17:54 TU en Cáncer' },
]
const days = [
  { date: '2024-01-01', isCurrentMonth: true },
  { date: '2024-01-02', isCurrentMonth: true },
  { date: '2024-01-03', isCurrentMonth: true },
  { date: '2024-01-04', isCurrentMonth: true, bgColor: 'bg-pink-600' },
  { date: '2024-01-05', isCurrentMonth: true },
  { date: '2024-01-06', isCurrentMonth: true },
  { date: '2024-01-07', isCurrentMonth: true },
  { date: '2024-01-08', isCurrentMonth: true, bgColor: 'bg-purple-600' },
  { date: '2024-01-09', isCurrentMonth: true, bgColor: 'bg-purple-600' },
  { date: '2024-01-10', isCurrentMonth: true },
  { date: '2024-01-11', isCurrentMonth: true },
  { date: '2024-01-12', isCurrentMonth: true, bgColor: 'bg-green-600' },
  { date: '2024-01-13', isCurrentMonth: true },
  { date: '2024-01-14', isCurrentMonth: true, bgColor: 'bg-purple-600' },
  { date: '2024-01-15', isCurrentMonth: true },
  { date: '2024-01-16', isCurrentMonth: true },
  { date: '2024-01-17', isCurrentMonth: true },
  { date: '2024-01-18', isCurrentMonth: true, bgColor: 'bg-purple-600' },
  { date: '2024-01-19', isCurrentMonth: true },
  { date: '2024-01-20', isCurrentMonth: true },
  { date: '2024-01-21', isCurrentMonth: true },
  { date: '2024-01-22', isCurrentMonth: true },
  { date: '2024-01-23', isCurrentMonth: true },
  { date: '2024-01-24', isCurrentMonth: true },
  { date: '2024-01-25', isCurrentMonth: true, bgColor: 'bg-purple-600' },
  { date: '2024-01-26', isCurrentMonth: true },
  { date: '2024-01-27', isCurrentMonth: true, bgColor: 'bg-green-600' },
  { date: '2024-01-28', isCurrentMonth: true },
  { date: '2024-01-29', isCurrentMonth: true },
  { date: '2024-01-30', isCurrentMonth: true },
  { date: '2024-01-31', isCurrentMonth: true },
  { date: '2024-02-01' },
  { date: '2024-02-02' },
  { date: '2024-02-03' },
  { date: '2024-02-04' }
]
const agenda = [
  {
    id: 1,
    name: 'Lluvia de meteoros Cuadrántidas',
    imageUrl: '/img/icono-meteoros.webp',
    type: 'Meteoros',
    label: '4 de Enero',
    bgColor: 'bg-pink-300',
    bgColorHover: 'hover:bg-pink-400'
  },
  {
    id: 2,
    name: 'Luna cerca de Venus',
    imageUrl: '/img/icono-luna.webp',
    type: 'Luna',
    label: '8 de Enero',
    bgColor: 'bg-purple-300',
    bgColorHover: 'hover:bg-purple-400'
  },
  {
    id: 3,
    name: 'Luna cerca de Mercurio',
    imageUrl: '/img/icono-luna.webp',
    type: 'Luna',
    label: '9 de Enero',
    bgColor: 'bg-purple-300',
    bgColorHover: 'hover:bg-purple-400'
  },
  {
    id: 4,
    name: 'Mercurio en la mayor elongación oeste',
    imageUrl: '/img/icono-planetas.webp',
    type: 'Planetas',
    label: '12 de Enero',
    bgColor: 'bg-green-300',
    bgColorHover: 'hover:bg-green-400'
  },
  {
    id: 5,
    name: 'La Luna cerca de Saturno',
    imageUrl: '/img/icono-luna.webp',
    type: 'Luna',
    label: '14 de Enero',
    bgColor: 'bg-purple-300',
    bgColorHover: 'hover:bg-purple-400'
  },
  {
    id: 6,
    name: 'La Luna cerca de Júpiter',
    imageUrl: '/img/icono-luna.webp',
    type: 'Luna',
    label: '18 de Enero',
    bgColor: 'bg-purple-300',
    bgColorHover: 'hover:bg-purple-400'
  },
  {
    id: 7,
    name: 'Luna llena',
    imageUrl: '/img/icono-luna.webp',
    type: 'Luna',
    label: '25 de Enero',
    bgColor: 'bg-purple-300',
    bgColorHover: 'hover:bg-purple-400'
  },
  {
    id: 8,
    name: 'Mercurio cerca de Marte',
    imageUrl: '/img/icono-planetas.webp',
    type: 'Planetas',
    label: '27 de Enero',
    bgColor: 'bg-green-300',
    bgColorHover: 'hover:bg-green-400'
  },
]

useJsonld([
  {
  '@context': 'https://schema.org',
  '@type': 'Article',
  'headline': 'Eventos astronómicos para el mes de Enero de 2024',
  'image': {
    '@type': 'ImageObject',
    'url': 'https://blog.astroingeo.org/img/2024/cielo-enero-2024-hemisferio-norte.webp',
    'width': '1024',
    'height': '1024'
  },
  'author': {
    '@type': 'Person',
    'name': `${data._rawValue.author}`,
    'url': `https://${data._rawValue.domain}/quienes-somos`
  },
  'publisher': {
    '@type': 'Organization',
    'name': `${data._rawValue.domain}`,
    'logo': {
      '@type': 'ImageObject',
      'url': `https://${data._rawValue.domain}/img/logo.webp`,
      'width': '600',
      'height': '200'
    }
  },
  'datePublished': todayEnero
  },
  {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    'headline': 'Eventos astronómicos para el mes de Enero de 2024',
    'image': {
      '@type': 'ImageObject',
      'url': 'https://blog.astroingeo.org/img/2024/cielo-enero-2024-hemisferio-norte.webp',
      'width': '1024',
      'height': '1024'
    },
    'datePublished': todayEnero,
    'dateModified': todayEnero,
    'author': {
    '@type': 'Person',
    'name': `${data._rawValue.author}`,
    'url': `https://${data._rawValue.domain}/quienes-somos}`
  }
  }
  ]
);
  </script>
