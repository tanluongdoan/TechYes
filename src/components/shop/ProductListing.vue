<template>
  <div :class="productWrapClass">
    <aside class="sidebar">test</aside>
    <ul :class="`${productWrapClass} products-container pb-20`">
      <slot name="default-products"></slot>
    </ul>
  </div>
</template>
<script setup>
const props = defineProps({
  productWrapClass: String,
  noSsr: Boolean,
});
</script>
