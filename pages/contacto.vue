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
      <form name="contact" method="POST" data-netlify="true">
        <p>
          <label>Your Name: <input type="text" name="name" /></label>
        </p>
        <p>
          <label>Your Email: <input type="email" name="email" /></label>
        </p>
        <p>
          <label
            >Your Role:
            <select name="role[]" multiple>
              <option value="leader">Leader</option>
              <option value="follower">Follower</option>
            </select></label
          >
        </p>
        <p>
          <label>Message: <textarea name="message"></textarea></label>
        </p>
        <p>
          <button type="submit">Send</button>
        </p>
      </form>
    </div>
    <input type="hidden" name="form-name" value="contact">
  </div>
</template>
  
  <script>
export default {
  data() {
    return {
      accepted: false,
      error: false,
    };
  },
};
</script>
  
  