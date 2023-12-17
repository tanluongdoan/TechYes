<template>
  <FilterAccordion>
    <template v-slot:accordion-trigger>Price</template>
    <div>
      <div id="slider"></div>
    </div>
  </FilterAccordion>
</template>
<script setup>
import FilterAccordion from "@components/shop/FilterAccordion.vue";
import { onMounted } from "vue";

import noUiSlider from "nouislider";

import "nouislider/dist/nouislider.css";

onMounted(() => {
  // console.log(noUiSlider);
  var slider = document.getElementById("slider");

  noUiSlider.create(slider, {
    start: [20, 80],
    connect: true,
    range: {
      min: 0,
      max: 100,
    },
  });
});
</script>

<style>
.noUi-horizontal .noUi-handle {
  width: 28px;
  height: 28px;
  right: -17px;
  top: -6px;
  border-radius: 50%;
}
</style>
