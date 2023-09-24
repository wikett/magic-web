<template>
    <div class="relative max-w-xl mx-auto mt-10">
      <svg
        class="absolute transform translate-x-1/2 left-full"
        width="404"
        height="404"
        fill="none"
        viewBox="0 0 404 404"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="85737c0e-0916-41d7-917f-596dc7edfa27"
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <rect
              x="0"
              y="0"
              width="4"
              height="4"
              class="text-gray-200"
              fill="currentColor"
            />
          </pattern>
        </defs>
        <rect
          width="404"
          height="404"
          fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)"
        />
      </svg>
      <svg
        class="absolute bottom-0 transform -translate-x-1/2 right-full"
        width="404"
        height="404"
        fill="none"
        viewBox="0 0 404 404"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="85737c0e-0916-41d7-917f-596dc7edfa27"
            x="0"
            y="0"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <rect
              x="0"
              y="0"
              width="4"
              height="4"
              class="text-gray-200"
              fill="currentColor"
            />
          </pattern>
        </defs>
        <rect
          width="404"
          height="404"
          fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)"
        />
      </svg>
      <div class="text-center">
        <h2
          class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl"
        >
          Contacto
        </h2>
        <p class="mt-4 text-lg leading-6 text-gray-500">
          Ponte en contacto con nosotros con cualquier duda, sugerencia o
          inquietud.
        </p>
      </div>
      <div class="mt-12">
        <form
          name="contact"
          method="POST"
          class="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8"
          data-netlify="true"
        >
          <div class="sm:col-span-2">
            <label for="fullname" class="block text-sm font-medium text-gray-700"
              >Nombre</label
            >
            <div class="mt-1">
              <input
                type="text"
                name="fullname"
                id="fullname"
                autocomplete="Nombre completo"
                class="block w-full px-4 py-3 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
          </div>
          <div class="sm:col-span-2">
            <label for="email" class="block text-sm font-medium text-gray-700"
              >Email</label
            >
            <div class="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                autocomplete="email"
                class="block w-full px-4 py-3 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
          </div>
          <div class="sm:col-span-2">
            <label for="message" class="block text-sm font-medium text-gray-700"
              >Mensaje</label
            >
            <div class="mt-1">
              <textarea
                id="message"
                name="message"
                rows="4"
                class="block w-full px-4 py-3 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                required
              ></textarea>
            </div>
          </div>
          <div class="sm:col-span-2">
            <div class="flex items-start">
              <div class="flex-shrink-0">
                <!-- Enabled: "bg-indigo-600", Not Enabled: "bg-gray-200" -->
                <button
                  type="button"
                  class="relative inline-flex flex-shrink-0 h-6 transition-colors duration-200 ease-in-out bg-gray-200 border-2 border-transparent rounded-full cursor-pointer w-11 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  aria-pressed="false"
                  @click="accepted = !accepted"
                  :class="{ 'bg-indigo-600': accepted }"
                >
                  <span class="sr-only">Agree to policies</span>
                  <!-- Enabled: "translate-x-5", Not Enabled: "translate-x-0" -->
                  <span
                    aria-hidden="true"
                    class="inline-block w-5 h-5 transition duration-200 ease-in-out transform translate-x-0 bg-white rounded-full shadow ring-0"
                    :class="{ 'translate-x-5': accepted }"
                  ></span>
                </button>
              </div>
              <div class="ml-3">
                <p class="text-base text-gray-500">
                  Seleccionado esto, aceptas la
                  <a href="#" class="font-medium text-gray-700 underline"
                    >Politica de privacidad</a
                  >
                  y
                  <a href="#" class="font-medium text-gray-700 underline"
                    >Política de Cookies</a
                  >.
                </p>
              </div>
            </div>
          </div>
          <div class="sm:col-span-2">
            <button
              type="submit"
              class="inline-flex items-center justify-center w-full px-6 py-3 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              :class="{ 'opacity-50': !accepted }"
              :disabled="!accepted"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        accepted: false,
        error: false,
      }
    },
  }
  </script>
  
  <style></style>
  