<template>
  <form name="contact" method="POST" class="mb-24" netlify>
    <div class="space-y-12">
      <div class="pb-6">
        <h2 class="font-semibold leading-7 text-gray-900">Contacto</h2>
        <p class="mt-1 leading-6 text-gray-600">Con cualquier duda, sugerencia o pregunta que tengas, estaremos encantados de darte una respuesta lo más rápido posible 😊</p>

        <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          
          <div class="sm:col-span-3">
            <label for="name" class="block font-medium leading-6 text-gray-900">Nombre</label>
            <div class="mt-2">
              <input type="text" name="name" id="name" autocomplete="name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:sm:leading-6" />
            </div>
          </div>

          <div class="sm:col-span-3">
            <label for="last-name" class="block font-medium leading-6 text-gray-900">Email</label>
            <div class="mt-2">
              <input id="email" name="email" type="email" autocomplete="email" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:sm:leading-6" />
            </div>
          </div>

          <div class="col-span-full">
            <label for="message" class="block font-medium leading-6 text-gray-900">Mensaje</label>
            <div class="mt-2">
              <textarea id="message" name="message" rows="3" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:sm:leading-6" />
            </div>
            <p class="mt-3 leading-6 text-gray-600">Escribe en unas pocas líneas tu duda/comentario/pregunta.</p>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-2 flex items-center justify-end gap-x-6">
      <button type="submit" class="rounded-md bg-emerald-600 px-3 py-2 font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Enviar</button>
    </div>
  </form>
</template>

<script setup>

</script>