<template>
  <div :class="productWrapClass" class="pb-32">
    <aside class="sidebar">
      <div>
        <PriceFilter />
      </div>
      <div v-for="(value, key) in props.productFilters" :key="key">
        <ProductFilter
          :model-value="productCustomFilters"
          :value="value"
          :name="key"
        />
      </div>

      <!-- <MultiRangeSlider />s -->
    </aside>
    <div class="products-container">
      <!-- {{ JSON.stringify(productCustomFilters) }} -->
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
import { computed, ref, defineProps } from "vue";

import ProductCard from "@components/shop/ProductCard.vue";
import ProductFilter from "@components/shop/ProductFilter.vue";
import PriceFilter from "@components/shop/PriceFilter.vue";

// console.log("import", import.meta.env);

const productListing = ref(null);
const productCustomFilters = ref({
  Brand: [],
  Interface: [],
  Supplier: [],
  HasHeatsink: [],
  Size: [],
  FormFactor: [],
  Generation: [],
  HasRGB: [],
  Speed: [],
  CPUCores: [],
  CPUType: [],
  CPURange: [],
  HasWiFi: [],
  SocketType: [],
  GPUType: [],
  GPUSize: [],
});

const props = defineProps({
  productWrapClass: String,
  noSsr: Boolean,
  productFilters: Object,
});

// a computed ref
// const computedValue = computed(async () => {
//   setTimeout(() => {
//     return "good";
//   }, 3000);
//   return "item";
// });
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
