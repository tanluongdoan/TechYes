<template>
  <FilterAccordion>
    <template v-slot:accordion-trigger>Price</template>
    <div>
      <div id="slider"></div>
    </div>
    <div class="flex justify-between items-center w-full pt-3">
      <p>
        {{ props.productCustomFilters.price[0] }}
      </p>
      <p>
        {{ props.productCustomFilters.price[1] }}
      </p>
    </div>
  </FilterAccordion>
</template>
<script setup>
import FilterAccordion from "@components/shop/FilterAccordion.vue";
import { onMounted, ref } from "vue";
import noUiSlider from "nouislider";
import "nouislider/dist/nouislider.css";
const props = defineProps({
  productCustomFilters: Object,
});
onMounted(() => {
  var slider = document.getElementById("slider");
  noUiSlider.create(slider, {
    start: [props.productCustomFilters.price[0], props.productCustomFilters.price[1]],
    start: [20, 80],
    connect: true,
    range: {
      min: 0,
      max: 100,
    },
  });
  slider.noUiSlider.on("change", (values, handle) => {
    props.productCustomFilters.price = values
  });
});
</script>
<style>
/* Your existing styles */
</style>
