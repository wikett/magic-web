<template>
    <main>
        <div class="bg-white px-6 py-12 lg:px-8">
            <div class="mx-auto max-w-2xl text-center">
            <p class="text-base font-semibold leading-7 text-indigo-600">Agenda astronómica 2024</p>
            <h1 class="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Calendario Astronómico 2024</h1>
            <p class="mt-6 text-lg leading-8 text-gray-600">Todos los <strong>eventos astronómicos</strong> más importantes para este 2024. Fases de la luna, eclipses, lluvia de meteoros y otros eventos.</p>
            </div>
        </div>
        <div>
        <a href="/calendario-astronomico/2024/guia-observacion-cielo-enero-2024" title="Guia de observacion de cielo Enero 2024"><h2 class="text-xl font-medium text-gray-500">Enero 2024</h2></a>
        <ul role="list" class="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          <li v-for="item in enero" :key="item.name" class="col-span-1 flex rounded-md shadow-sm">
            <div :class="[item.bgColor, 'flex w-24 flex-shrink-0 items-center justify-center rounded-l-md text-sm font-medium text-white']">{{ item.initials }}</div>
            <div class="flex flex-1 items-center justify-between rounded-r-md border-b border-r border-t border-gray-200 bg-white">
              <div class="flex-1 px-4 py-2 text-sm">
                <p class="font-medium text-gray-900">{{ item.name }}</p>
                <p class="text-gray-700">{{ item.fecha }}</p>
              </div>
            </div>
          </li>
        </ul>
        <p class="mt-5">Abre el siguiente enlace sobre el <a class="font-medium text-blue-500" href="/calendario-astronomico/2024/guia-observacion-cielo-enero-2024" title="Cielo de Enero para observar" >Cielo en el Mes de Enero en España</a> si quieres una guia más detallada de los eventos astronómicos para el mes de Enero, conjunto con un mapa celestial para este mes</p>
        <hr class="my-12" />
        <a href="#" title="Guia de observacion de cielo Febrero 2024"><h2 class="text-xl font-medium text-gray-500">Febrero 2024</h2></a>
        <ul role="list" class="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          <li v-for="item in febrero" :key="item.name" class="col-span-1 flex rounded-md shadow-sm">
            <div :class="[item.bgColor, 'flex w-24 flex-shrink-0 items-center justify-center rounded-l-md text-sm font-medium text-white']">{{ item.initials }}</div>
            <div class="flex flex-1 items-center justify-between rounded-r-md border-b border-r border-t border-gray-200 bg-white">
              <div class="flex-1 px-4 py-2 text-sm">
                <p class="font-medium text-gray-900">{{ item.name }}</p>
                <p class="text-gray-700">{{ item.fecha }}</p>
              </div>
            </div>
          </li>
        </ul>
        <hr class="my-12" />
        <a href="#" title="Guia de observacion de cielo Marzo 2024"><h2 class="text-xl font-medium text-gray-500">Marzo 2024</h2></a>
        <ul role="list" class="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          <li v-for="item in marzo" :key="item.name" class="col-span-1 flex rounded-md shadow-sm">
            <div :class="[item.bgColor, 'flex w-24 flex-shrink-0 items-center justify-center rounded-l-md text-sm font-medium text-white']">{{ item.initials }}</div>
            <div class="flex flex-1 items-center justify-between rounded-r-md border-b border-r border-t border-gray-200 bg-white">
              <div class="flex-1 px-4 py-2 text-sm">
                <p class="font-medium text-gray-900">{{ item.name }}</p>
                <p class="text-gray-700">{{ item.fecha }}</p>
              </div>
            </div>
          </li>
        </ul>
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
    </main>
  </template>
  <script setup>
  const { data } = await useAsyncData('article', () => queryContent('/info').findOne())
  const todayEnero = '2024-01-01T17:14:32.901Z'

  const enero = [
    { name: 'Lluvia de meteoros Cuadrántidas', initials: 'Meteoros', href: '#', fecha: '4 de enero', bgColor: 'bg-pink-600' },
    { name: 'Luna cerca de Venus', initials: 'Luna', href: '#', fecha: '8 de enero', bgColor: 'bg-purple-600' },
    { name: 'Luna cerca de Mercurio', initials: 'Luna', href: '#', fecha: '9 de enero', bgColor: 'bg-purple-600' },
    { name: 'Mercurio en la mayor elongación oeste', initials: 'Planetas', href: '#', fecha: '12 de enero', bgColor: 'bg-green-600' },
    { name: 'La Luna cerca de Saturno', initials: 'Luna', href: '#', fecha: '14 de enero', bgColor: 'bg-purple-600' },
    { name: 'La Luna cerca de Júpiter', initials: 'Luna', href: '#', fecha: '18 de enero', bgColor: 'bg-purple-600' },
    { name: 'Luna Llena', initials: 'Luna', href: '#', fecha: '25 de enero', bgColor: 'bg-purple-600' },
    { name: 'Mercurio cerca de Marte', initials: 'Planetas', href: '#', fecha: '27 de enero', bgColor: 'bg-green-600' }
  ]

  // { name: '', initials: 'Meteoros', href: '#', fecha: '4 de enero', bgColor: 'bg-pink-600' },
  // { name: '', initials: 'Luna', href: '#', fecha: '7 de febrero', bgColor: 'bg-purple-600' },
  // { name: '', initials: 'Planetas', href: '#', fecha: '27 de enero', bgColor: 'bg-green-600' },

  const marzo = [
  { name: 'Luna cerca de Marte', initials: 'Luna', href: '#', fecha: '8 de marzo', bgColor: 'bg-purple-600' },
  { name: 'Luna cerca de Venus', initials: 'Luna', href: '#', fecha: '8 de marzo', bgColor: 'bg-purple-600' },
  { name: 'Luna Nueva', initials: 'Luna', href: '#', fecha: '10 de marzo', bgColor: 'bg-purple-600' },
  { name: 'Luna cerca de Júpiter', initials: 'Luna', href: '#', fecha: '13 de marzo', bgColor: 'bg-purple-600' },
  { name: 'Equinoccio de marzo', initials: 'Planetas', href: '#', fecha: '20 de marzo', bgColor: 'bg-green-600' },
  { name: 'Venus cerca de Saturno', initials: 'Planetas', href: '#', fecha: '21 de marzo', bgColor: 'bg-green-600' },
  { name: 'Mercurio en su máxima elongación', initials: 'Planetas', href: '#', fecha: '24 de marzo', bgColor: 'bg-green-600' },
  { name: 'Luna Llena, eclipse lunar penumbral', initials: 'Luna', href: '#', fecha: '25 de marzo: ', bgColor: 'bg-purple-600' },
  ]

  const febrero = [
    { name: 'La Luna cerca de Venus', initials: 'Luna', href: '#', fecha: '7 de febrero', bgColor: 'bg-purple-600' },
    { name: 'Luna Nueva', initials: 'Luna', href: '#', fecha: '9 de febrero', bgColor: 'bg-purple-600' },
    { name: 'Luna cerca de Júpiter', initials: 'Luna', href: '#', fecha: '15 de febrero', bgColor: 'bg-purple-600' },
    { name: 'Venus cerca de Marte', initials: 'Planetas', href: '#', fecha: '22 de febrero', bgColor: 'bg-green-600' },
    { name: 'Luna Llena', initials: 'Luna', href: '#', fecha: '24 de febrero', bgColor: 'bg-purple-600' },
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
