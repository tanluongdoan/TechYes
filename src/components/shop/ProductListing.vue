<template>
  <div :class="productWrapClass" class="pb-32">
    <aside class="sidebar">
      <button @click="handleClick">Load Data</button>
      <!-- <MultiRangeSlider />s -->
    </aside>
    <div class="products-container">
      <ul :class="`${productWrapClass} pb-20`">
        <li v-for="item in productListing" :key="item">{{ item }}</li>
        <slot name="default-product-listing" v-if="!productListing"></slot>
      </ul>
      <slot name="default-pagination" v-if="!productListing"></slot>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";

const productListing = ref(null);

const handleClick = () => {
  productListing.value = [1, 2, 3, 5];
};

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
