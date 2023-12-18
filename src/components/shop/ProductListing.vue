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
      <ul :class="`${productWrapClass} pb-20`">
        <li
          v-for="item in productListing"
          :key="item.ProductCode"
          class="custom-grid-item overflow-hidden"
        >
          <div class="card-wrapper">
            <a
              href="/"
              class="flex-card fade-up group relative z-10 flex max-w-md flex-1 flex-col items-center gap-4 rounded-md text-center"
            >
              <div class="h-40 w-40 shrink-0 grow-0 overflow-hidden">
                <div
                  class="transition-transform duration-500 group-hover:scale-110 group-hover:duration-[3s]"
                >
                  <img
                    class="block"
                    :src="item.FeaturedImage"
                    :alt="item.FeaturedImage"
                  />
                </div>
              </div>
              <div class="opacity-90 group-hover:opacity-100">
                <h2 class="balance mb-3 group-hover:text-primary">
                  {{ item.ProductTitle }}
                </h2>
              </div>
            </a>

            <div class="flex flex-wrap items-center justify-center gap-4">
              <div class="">
                <div class="grid gap-0 text-xl font-bold leading-none">
                  <span>R{{ item.PriceInclVAT }}</span>
                </div>
              </div>
            </div>
          </div>
        </li>
        <slot name="default-product-listing" v-if="!productListing"></slot>
      </ul>
      <slot name="default-pagination" v-if="!productListing"></slot>
    </div>
  </div>
</template>
<script setup>
import { computed, ref, defineProps, watch } from "vue";

import ProductFilter from "@components/shop/ProductFilter.vue";
import PriceFilter from "@components/shop/PriceFilter.vue";
import supabase, { getProductsByFilters } from "@src/data/supabase";

// console.log("import", import.meta.env);

const props = defineProps({
  productWrapClass: String,
  noSsr: Boolean,
  productFilters: Object,
});

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

// a computed ref
watch(productCustomFilters.value, async (newValue) => {
  const items = Object.entries(newValue).reduce((prev, [key, values]) => {
    if (values.length > 0) {
      const keywords = Array.from(values)
        .map((item) => JSON.stringify(item))
        .join(",");
      const condition = `${key}.in.(${keywords})`;
      return [...prev, condition];
    }

    return prev;
  }, []);

  console.log(items);
  if (items.length === 0) {
    productListing.value = null;
    return;
  }

  if (items.length > 0) {
    const { data, error } = await getProductsByFilters(items.join(", "), 0);
    // console.log(data);
    productListing.value = data;
    return;
  }
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

<style>
.flex-card {
  min-width: min(100vw - var(--spacing), 14rem);
  max-width: 22rem;
}
</style>
