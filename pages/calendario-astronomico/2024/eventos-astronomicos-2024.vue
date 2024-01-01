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
            <a :href="item.href" class="font-medium text-gray-900 hover:text-gray-600">{{ item.name }}</a>
            <p class="text-gray-700">{{ item.fecha }}</p>
          </div>
        </div>
      </li>
    </ul>
    <p class="mt-5">Abre el siguiente enlace sobre el <a class="font-medium text-blue-500" href="/calendario-astronomico/2024/guia-observacion-cielo-enero-2024" title="Cielo de Enero para observar" >Cielo en el Mes de Enero en España</a> si quieres una guia más detallada de los eventos astronómicos para el mes de Enero, conjunto con un mapa celestial para este mes</p>
  </div>
    </main>
  </template>
  <script setup>
  
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
  </script>
