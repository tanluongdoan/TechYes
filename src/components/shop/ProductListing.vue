<template>
  <div :class="productWrapClass" class="pb-32">
    <aside class="sidebar">this is a test</aside>
    <div class="products-container">
      <ul :class="`${productWrapClass} pb-20`">
        <slot name="default-product-listing"></slot>
      </ul>
      <slot name="default-pagination"></slot>
    </div>
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
