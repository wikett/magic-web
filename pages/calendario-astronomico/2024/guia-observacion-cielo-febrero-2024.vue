<template>
  <main>
    <div class="bg-white px-6 py-12 lg:px-8">
      <div class="mx-auto max-w-2xl text-center">
        <p class="text-base font-semibold leading-7 text-indigo-600">
          Eventos astronómicos para el mes de Febrero de 2024
        </p>
        <h1
          class="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl"
        >
          Guia del cielo para el mes de Febrero 2024
        </h1>
        <p class="mt-6 text-lg leading-8 text-gray-600">
          Todos los <strong>eventos astronómicos</strong> más importantes para
          el mes de Febrero 2024. Fases de la luna, eclipses, lluvia de meteoros
          y otros eventos.
        </p>
      </div>
    </div>
    <div class="relative bg-gray-900">
      <div
        class="relative h-80 overflow-hidden bg-white md:absolute md:left-0 md:h-full md:w-1/3 lg:w-1/2"
      >
        <a
          href="/img/2024/febrero/cielo-febrero-2024-hemisferio-norte.webp"
          target="_blank"
          title="cielo Febrero 2024"
        >
          <img
            class="h-full w-full object-cover"
            src="/img/2024/febrero/cielo-febrero-2024-hemisferio-norte.webp"
            alt="Cielo Febrero 2024 Hemisferio Norte"
            title="Cielo Febrero 2024 Hemisferio Norte"
          />
        </a>
      </div>
      <div class="relative mx-auto max-w-7xl py-24 sm:py-32 lg:px-8 lg:py-40">
        <div
          class="pl-6 pr-6 md:ml-auto md:w-2/3 md:pl-16 lg:w-1/2 lg:pl-24 lg:pr-0 xl:pl-32"
        >
          <p class="text-base font-semibold leading-7 text-indigo-400">
            Posición del cielo Febrero 2024 hemisferio Norte
          </p>
          <h2
            class="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl"
          >
            Mapa de las posiciones de los planetas en Febrero 2024
          </h2>
          <p class="mt-6 text-base leading-7 text-gray-300">
            Guia de observación del cielo para el mes de Febrero en el
            hemisferio Norte
          </p>
          <div class="mt-8">
            <a
              href="/img/2024/febrero/cielo-febrero-2024-hemisferio-norte.webp"
              target="_blank"
              class="inline-flex rounded-md bg-white/10 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Ver mapa</a
            >
            <a
              @click="triggerEvent"
              href="/pdf/2024/aspecto-del-cielo-para-el-mes-de-febrero-2024.pdf"
              target="_blank"
              class="inline-flex rounded-md ml-4 bg-blue-700 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Descargar en PDF</a
            >
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white px-6 py-32 lg:px-8">
      <div class="mx-auto max-w-3xl text-base leading-7 text-gray-700">
        <div class="md:grid md:grid-cols-2 md:divide-x md:divide-gray-200">
          <div class="md:pr-14">
            <div class="flex items-center">
              <h2 class="flex-auto text-sm font-semibold text-gray-900">
                Febrero 2024
              </h2>
            </div>
            <div
              class="mt-10 grid grid-cols-7 text-center text-xs leading-6 text-gray-500"
            >
              <div>L</div>
              <div>M</div>
              <div>X</div>
              <div>J</div>
              <div>V</div>
              <div>S</div>
              <div>D</div>
            </div>
            <div class="mt-2 grid grid-cols-7 text-sm">
              <div
                v-for="(day, dayIdx) in days"
                :key="day.date"
                :class="[dayIdx > 6 && 'border-t border-gray-200', 'py-2']"
              >
                <button
                  type="button"
                  :class="[
                    day.isSelected && 'text-white',
                    !day.isSelected &&
                      !day.isToday &&
                      day.isCurrentMonth &&
                      'text-gray-900',
                    !day.isSelected &&
                      !day.isToday &&
                      !day.isCurrentMonth &&
                      'text-gray-400',
                    day.isSelected && day.isToday && 'bg-indigo-600',
                    day.bgColor,
                    !day.isSelected && 'hover:bg-gray-200',
                    (day.isSelected || day.isToday) && 'font-semibold',
                    'mx-auto flex h-8 w-8 items-center justify-center rounded-full',
                  ]"
                >
                  <time :datetime="day.date">{{
                    day.date.split("-").pop().replace(/^0/, "")
                  }}</time>
                </button>
              </div>
            </div>
          </div>
          <section class="mt-12 md:mt-0 md:pl-2">
            <h2 class="text-base font-semibold leading-6 text-gray-900 lg:ml-2">
              Eventos astronómicos para
              <time datetime="2022-02-01">Febrero 2024</time>
            </h2>
            <ol
              class="mt-4 space-y-1 text-sm leading-6 text-blue-800 ml-0 lg:ml-4"
            >
              <li
                v-for="item in agenda"
                :key="item.id"
                :class="[
                  item.bgColor,
                  item.bgColorHover,
                  'group flex items-center space-x-4 rounded-xl px-4 py-2  focus-within:bg-gray-100',
                ]"
              >
                <img
                  :src="item.imageUrl"
                  :alt="item.type"
                  class="h-10 w-10 flex-none rounded-full"
                />
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
        <p class="mt-24 text-base font-semibold leading-7 text-indigo-600">
          Hemisferio Norte
        </p>
        <h2
          class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
        >
          Guía de observación del cielo en Febrero de 2024
        </h2>
        <p class="mt-6 text-xl leading-8">
          En esta guía de observación del cielo, exploraremos los fenómenos
          celestiales más destacados que se podrán apreciar durante este mes.
          Desde los majestuosos planetas hasta las brillantes estrellas,
          descubriremos qué maravillas nos esperan en la vastedad del universo.
        </p>
        <div class="mt-10 max-w-2xl">
          <h2 class="mt-16 text-2xl font-bold tracking-tight text-gray-900">
            Los planetas
          </h2>
          <p class="mt-6">
            <strong>Mercurio</strong> no es visible este mes. El día 28 pasa por
            su conjunción superior.
          </p>
          <p class="mt-6">
            <strong>Venus</strong> se observa durante el alba, elevándose cada
            mañana un poco menos sobre el horizonte este-sureste. Brilla con
            magnitud -3.9 en Sagitario la primera mitad del mes y en Capricornio
            la segunda.
          </p>
          <p class="mt-6">
            <strong>Marte</strong> puede verse durante el alba, con dificultad
            la primera mitad del mes por su muy reducida altura sobre el
            horizonte este-sureste que apenas se incrementa con el paso de los
            días. Muestra la magnitud 1.3 entre Sagitario y Capricornio.
          </p>
          <p class="mt-6">
            <strong>Júpiter</strong> se observa desde el anochecer hasta la
            medianoche, hacia el oeste. Brilla con magnitud -2.3 en Aries. A
            medida que avanza el mes su visibilidad se va reduciendo, hasta
            quedar limitada al primer tercio de la noche a finales de febrero.
          </p>
          <p class="mt-6">
            <strong>Saturno</strong> con magnitud 1.0 en Acuario, solo es
            visible la primera mitad del mes en el crepúsculo vespertino, cada
            día más próximo al horizonte oeste-suroeste. El 28 de febrero pasa
            por su conjunción con el Sol.
          </p>
          <div>
            <div class="mt-8 flow-root overflow-hidden">
              <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <table class="w-full text-left">
                  <thead class="bg-white">
                    <tr>
                      <th
                        scope="col"
                        class="relative isolate py-3.5 pr-3 text-left text-sm font-semibold text-gray-900"
                      >
                        Fases de la Luna
                        <div
                          class="absolute inset-y-0 right-full -z-10 w-screen border-b border-b-gray-200"
                        />
                        <div
                          class="absolute inset-y-0 left-0 -z-10 w-screen border-b border-b-gray-200"
                        />
                      </th>
                      <th
                        scope="col"
                        class="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                      ></th>
                      <th
                        scope="col"
                        class="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 md:table-cell"
                      ></th>
                      <th
                        scope="col"
                        class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Fecha
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="person in people" :key="person.email">
                      <td
                        class="relative py-4 pr-3 text-sm font-medium text-gray-900"
                      >
                        {{ person.name }}
                        <div
                          class="absolute bottom-0 right-full h-px w-screen bg-gray-100"
                        />
                        <div
                          class="absolute bottom-0 left-0 h-px w-screen bg-gray-100"
                        />
                      </td>
                      <td
                        class="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell"
                      ></td>
                      <td
                        class="hidden px-3 py-4 text-sm text-gray-500 md:table-cell"
                      ></td>
                      <td class="px-3 py-4 text-sm text-gray-500">
                        {{ person.role }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <figure class="mt-16">
          <a
            href="/img/2024/luna/fases-luna-febrero-2024.webp"
            target="_blank"
            title="Fases de la luna Febrero 2024"
          >
            <img
              class="aspect-video rounded-xl bg-gray-50 object-cover"
              src="/img/2024/luna/fases-luna-febrero-2024.webp"
              alt="Fases de la luna Febrero 2024"
            />
          </a>

          <figcaption class="mt-4 flex gap-x-2 text-sm leading-6 text-gray-500">
            <InformationCircleIcon
              class="mt-0.5 h-5 w-5 flex-none text-gray-300"
              aria-hidden="true"
            />
            Fases de la luna Febrero 2024
          </figcaption>
        </figure>
        <h3 class="mt-16 text-2xl font-bold tracking-tight text-gray-900">
          Compártelo con tus amigos:
        </h3>
        <div class="flex flex-row gap-2">
          <SocialShare
            v-for="network in [
              'facebook',
              'twitter',
              'linkedin',
              'whatsapp',
              'telegram',
            ]"
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
import { InformationCircleIcon } from "@heroicons/vue/20/solid";
const { data } = await useAsyncData("article", () =>
  queryContent("/info").findOne()
);
const titlePage = "Eventos astronómicos para el mes de Febrero de 2024";
const descriptionPage =
  "Una guia para no perderte nada del cielo en este Febrero 2024. Posición de la Luna, planetas, meteoros y mucho más.";
const urlPage = `https://blog.astroingeo.org/calendario-astronomico/2024/guia-observacion-cielo-febrero-2024`;
const imagePage =
  "https://blog.astroingeo.org/img/2024/febrero/cielo-febrero-2024-hemisferio-norte.webp";

const gtm = useGtm();

function triggerEvent() {
  console.log("triggerEvent");
  gtm.trackEvent({
    event: "ctr_pdf",
    category: "calendario",
    action: "click",
  });
}

useHead({
  title: titlePage,
  description: descriptionPage,
  link: [{ rel: "canonical", href: urlPage }],
  meta: [
    { hid: "description", name: "description", content: descriptionPage },
    { hid: "og:title", property: "og:title", content: titlePage },
    { hid: "og:type", property: "og:type", content: "website" },
    { hid: "og:url", property: "og:url", content: urlPage },
    {
      hid: "og:description",
      property: "og:description",
      content: descriptionPage,
    },
    { hid: "og:image", property: "og:image", content: imagePage },

    // twitter card
    { hid: "twitter:title", name: "twitter:title", content: titlePage },
    { hid: "twitter:url", name: "twitter:url", content: urlPage },
    {
      hid: "twitter:description",
      name: "twitter:description",
      content: descriptionPage,
    },
    { hid: "twitter:image", name: "twitter:image", content: imagePage },
  ],
});

const todayFebrero = "2024-02-01T17:14:32.901Z";

const people = [
  {
    name: "Cuarto menguante",
    role: "viernes 2 de febrero a las 23:18 TU en Libra",
  },
  {
    name: "Luna nueva",
    role: "viernes 9 de febrero a las 22:59 TU en Capricornio",
  },
  {
    name: "Cuarto creciente",
    role: "viernes 16 de febrero a las 15:01 TU en Tauro",
  },
  { name: "Luna llena", role: "sábado 24 de febrero a las 12:30 TU en Leo" },
];
const days = [
  { date: "2024-01-29", isCurrentMonth: false },
  { date: "2024-01-30", isCurrentMonth: false },
  { date: "2024-01-31", isCurrentMonth: false },
  { date: "2024-02-01", isCurrentMonth: true },
  { date: "2024-02-02", isCurrentMonth: true },
  { date: "2024-02-03", isCurrentMonth: true },
  { date: "2024-02-04", isCurrentMonth: true },
  { date: "2024-02-05", isCurrentMonth: true },
  { date: "2024-02-06", isCurrentMonth: true },
  { date: "2024-02-07", isCurrentMonth: true, bgColor: "bg-purple-600" },
  { date: "2024-02-08", isCurrentMonth: true, bgColor: "bg-purple-600" },
  { date: "2024-02-09", isCurrentMonth: true, bgColor: "bg-purple-600" },
  { date: "2024-02-10", isCurrentMonth: true },
  { date: "2024-02-11", isCurrentMonth: true, bgColor: "bg-purple-600" },
  { date: "2024-02-12", isCurrentMonth: true },
  { date: "2024-02-13", isCurrentMonth: true },
  { date: "2024-02-14", isCurrentMonth: true },
  { date: "2024-02-15", isCurrentMonth: true, bgColor: "bg-purple-600" },
  { date: "2024-02-16", isCurrentMonth: true },
  { date: "2024-02-17", isCurrentMonth: true },
  { date: "2024-02-18", isCurrentMonth: true },
  { date: "2024-02-19", isCurrentMonth: true },
  { date: "2024-02-20", isCurrentMonth: true },
  { date: "2024-02-21", isCurrentMonth: true },
  { date: "2024-02-22", isCurrentMonth: true },
  { date: "2024-02-23", isCurrentMonth: true },
  { date: "2024-02-24", isCurrentMonth: true, bgColor: "bg-purple-600" },
  { date: "2024-02-25", isCurrentMonth: true },
  { date: "2024-02-26", isCurrentMonth: true },
  { date: "2024-02-27", isCurrentMonth: true },
  { date: "2024-02-28", isCurrentMonth: true },
  { date: "2024-02-29", isCurrentMonth: true },
  { date: "2024-02-30", isCurrentMonth: true },
  { date: "2024-02-31", isCurrentMonth: true },
  { date: "2024-03-02", isCurrentMonth: false },
  { date: "2024-03-02", isCurrentMonth: false },
  { date: "2024-03-03", isCurrentMonth: false },
];
const agenda = [
  {
    id: 1,
    name: "Conjunción de la Luna y Venus",
    imageUrl: "/img/icono-luna.webp",
    type: "Luna",
    label: "7 de Febrero",
    bgColor: "bg-purple-300",
    bgColorHover: "hover:bg-purple-400",
  },
  {
    id: 2,
    name: "Conjunción de la Luna y Mercurio",
    imageUrl: "/img/icono-luna.webp",
    type: "Luna",
    label: "8 de Febrero",
    bgColor: "bg-purple-300",
    bgColorHover: "hover:bg-purple-400",
  },
  {
    id: 3,
    name: "Luna Nueva",
    imageUrl: "/img/icono-luna.webp",
    type: "Luna",
    label: "9 de Febrero",
    bgColor: "bg-purple-300",
    bgColorHover: "hover:bg-purple-400",
  },
  {
    id: 5,
    name: "La Luna cerca de Saturno",
    imageUrl: "/img/icono-luna.webp",
    type: "Luna",
    label: "11 de Febrero",
    bgColor: "bg-purple-300",
    bgColorHover: "hover:bg-purple-400",
  },
  {
    id: 6,
    name: "La Luna cerca de Júpiter",
    imageUrl: "/img/icono-luna.webp",
    type: "Luna",
    label: "15 de Febrero",
    bgColor: "bg-purple-300",
    bgColorHover: "hover:bg-purple-400",
  },
  {
    id: 7,
    name: "Luna llena",
    imageUrl: "/img/icono-luna.webp",
    type: "Luna",
    label: "24 de Febrero",
    bgColor: "bg-purple-300",
    bgColorHover: "hover:bg-purple-400",
  },
];

useJsonld([
  {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Eventos astronómicos para el mes de Febrero de 2024",
    image: {
      "@type": "ImageObject",
      url: "https://blog.astroingeo.org/img/2024/febrero/cielo-febrero-2024-hemisferio-norte.webp",
      width: "1024",
      height: "1024",
    },
    author: {
      "@type": "Person",
      name: `${data._rawValue.author}`,
      url: `https://${data._rawValue.domain}/quienes-somos`,
    },
    publisher: {
      "@type": "Organization",
      name: `${data._rawValue.domain}`,
      logo: {
        "@type": "ImageObject",
        url: `https://${data._rawValue.domain}/img/logo.webp`,
        width: "600",
        height: "200",
      },
    },
    datePublished: todayFebrero,
  },
  {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: "Eventos astronómicos para el mes de Febrero de 2024",
    image: {
      "@type": "ImageObject",
      url: "https://blog.astroingeo.org/img/2024/febrero/cielo-febrero-2024-hemisferio-norte.webp",
      width: "1024",
      height: "1024",
    },
    datePublished: todayFebrero,
    dateModified: todayFebrero,
    author: {
      "@type": "Person",
      name: `${data._rawValue.author}`,
      url: `https://${data._rawValue.domain}/quienes-somos}`,
    },
  },
]);
</script>
