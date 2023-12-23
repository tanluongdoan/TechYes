<template>
  <div :class="productWrapClass" class="pb-32">
    <aside class="sidebar">
      <div>
        <PriceFilter 
        :productCustomFilters="productCustomFilters"
        
        />
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
      <div
        v-if="productListing"
        class="flex items-center justify-end space-x-1 py-2 pt-12"
      >
        <!-- prev button (previous page) -->
        <button
          @click="gotoPage(currentPage - 1)"
          :disabled="currentPage === 1"
          class="flex h-8 w-8 items-center justify-center rounded hover:border-black hover:bg-primary hover:text-white disabled:pointer-events-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-3 w-3"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </button>

        <!--  stepping through each page  -->
        <div
          v-for="page in sizePage"
          :key="page"
          class="flex items-center justify-between"
        >
          <button
            @click="gotoPage(page)"
            :disabled="page === currentPage"
            class="block h-8 w-8 rounded border-none border-gray-100 text-center leading-8 hover:bg-primary hover:text-white disabled:bg-primary disabled:text-white"
          >
            {{ page }}
          </button>
        </div>

        <!-- next button (next page) -->
        <button
          @click="gotoPage(currentPage + 1)"
          :disabled="currentPage === sizePage"
          class="flex h-8 w-8 items-center justify-center rounded hover:border-black hover:bg-primary hover:text-white disabled:pointer-events-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-3 w-3"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>
      <slot name="default-pagination" v-if="!productListing"> </slot>
    </div>
  </div>
</template>
<script setup>
import { computed, ref, defineProps, watch } from "vue";
import ProductFilter from "@components/shop/ProductFilter.vue";
import PriceFilter from "@components/shop/PriceFilter.vue";
import supabase, {
  getProductsByFilters,
  getProductsByFiltersSize,
} from "@src/data/supabase";

// pagination
const currentPage = ref(1);
const sizePage = ref();
const gotoPage = async (page) => {
  if (page >= 1 && page <= sizePage.value) {
    currentPage.value = page;
  }
};
// console.log("import", import.meta.env);

const props = defineProps({
  productWrapClass: String,
  noSsr: Boolean,
  productFilters: Object,
  slug: String,
});
const productListing = ref(null);
const productCustomFilters = ref({
  price:[10,90],
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

const getProductFilers = async () => {
  const temArray = { ...productCustomFilters.value };
  delete temArray.price
  const items = Object.entries(temArray).reduce(
    (prev, [key, values]) => {
      if (values.length > 0) {
        const keywords = Array.from(values)
          .map((item) => JSON.stringify(item))
          .join(",");
        const condition = `${key}.in.(${keywords})`;
        return [...prev, condition];
      }

      return prev;
    },
    [],
  );

  if (items.length === 0) {
    productListing.value = null;
    return;
  }

  if (items.length > 0) {
    const { data, error } = await getProductsByFilters(
      productCustomFilters.value.price,
      items.join(", "),
      (currentPage.value - 1) * 9,
      props.slug.toLowerCase(),
    );
    const { data: dataSize } = await getProductsByFiltersSize(
      productCustomFilters.value.price,
      items.join(", "),
      props.slug.toLowerCase(),
    );
    if (dataSize) {
      sizePage.value = Math.ceil(dataSize.length / 8);
    }
    productListing.value = data;
    return;
  }
};
// a computed ref
watch(productCustomFilters.value, async () => {
  getProductFilers();
});

watch(
  () => currentPage.value,
  async () => {
    getProductFilers();
  },
);
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
