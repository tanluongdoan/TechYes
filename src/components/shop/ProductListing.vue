<template>
  <div :class="productWrapClass">
    <aside class="sidebar">this is a test</aside>
    <ul :class="`${productWrapClass} products-container pb-20`">
      <slot name="default-product-listing"></slot>
    </ul>
    <slot name="default-pagination"></slot>
  </div>
</template>
<script setup>
const props = defineProps({
  productWrapClass: String,
  noSsr: Boolean,
});
</script>
<style>
.card-wrapper,
.sidebar {
  max-width: 248px;
}

.products-container,
.sidebar {
  flex: 1;
}
</style>
