<template>
  <div :class="productWrapClass" class="pb-32">
    <aside class="sidebar">
      <div>
        <PriceFilter />
      </div>
      <div v-for="(value, key) in props.productFilters" :key="key">
        <ProductFilter :value="value" :name="key" />
      </div>

      <ul>
        <li><button @click="handleClick">Load Data</button></li>
        <li><button @click="handleClear">clear Data</button></li>
      </ul>
      <!-- <MultiRangeSlider />s -->
    </aside>
    <div class="products-container">
      <ul :class="`${productWrapClass} pb-20`">
        <li v-for="item in productListing" :key="item">
          <!-- {{ item }} -->
          <ProductCard />
        </li>
        <slot name="default-product-listing" v-if="!productListing"></slot>
      </ul>
      <slot name="default-pagination" v-if="!productListing"></slot>
    </div>
  </div>
</template>
<script setup>
import { getProducts } from "@src/data/supabase";
import { ref } from "vue";

import ProductCard from "@components/shop/ProductCard.vue";
import ProductFilter from "@components/shop/ProductFilter.vue";
import PriceFilter from "@components/shop/PriceFilter.vue";

console.log("import", import.meta.env);

const productListing = ref(null);

const handleClick = async () => {
  productListing.value = await getProducts({});
};

const handleClear = () => {
  productListing.value = null;
};

const props = defineProps({
  productWrapClass: String,
  noSsr: Boolean,
  productFilters: Object,
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
