<template>
  <div :class="productWrapClass" class="pb-32">
    <aside class="sidebar">
      <!-- {{ JSON.stringify(props.productFilters) }} -->

      <div v-for="(value, key) in props.productFilters" :key="key">
        <p>{{ key }}</p>

        <ul>
          <li v-for="item in value" :key="item">
            <input type="checkbox" :name="Key" :id="'option-' + item" /><label
              :for="'option-' + item"
              >{{ item }}</label
            >
          </li>
        </ul>
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
import ProductCard from "@components/shop/ProductCard.vue";

import { ref } from "vue";

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
