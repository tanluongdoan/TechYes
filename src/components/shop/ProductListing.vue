<template>
  <div :class="productWrapClass">
    <aside class="sidebar">test</aside>
    <slot name="default-products"></slot>
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
