<template>
  <component v-if="isShow" :class="_class" :is="tag">
    <!-- <ins
      v-if="type == 'link'"
      class="adsbygoogle"
      style="display: block"
      :data-ad-channel="channel"
      data-ad-format="fluid"
      data-ad-layout-key="-gb+7+v-no+1a7"
      data-ad-client="ca-pub-8122******"
      data-ad-slot="2872******"
    ></ins> -->
    <ins
      class="adsbygoogle"
      style="display: block; text-align: center"
      data-ad-layout="in-article"
      data-ad-format="fluid"
      data-ad-client="ca-pub-5731349288066148"
      data-ad-slot="4197687694"
    ></ins>
  </component>
</template>
<script setup>
const config = useRuntimeConfig();
const isShow = true; // config.public.enableAdsense;
const props = defineProps({
  _class: {
    type: Array,
  },
  tag: {
    type: String,
    default: 'div',
  },
  type: {
    type: String,
    default: 'display',
  },
  channel: {
    type: String,
    default: 'nochannel',
  },
});
console.log(isShow);
if (isShow) {
  useHead({
    script: {
      src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5731349288066148',
      async: true,
      crossorigin: 'anonymous',
    },
  });
}
onMounted(() => {
  nextTick(() => {
    try {
      // this is required for each ad slot (calling this once will only load 1 ad)
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.error(error);
    }
  });
});
</script>
