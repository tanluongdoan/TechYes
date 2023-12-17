<template>
  <FilterAccordion>
    <template v-slot:accordion-trigger>{{
      formatName[name] ? formatName[name] : name
    }}</template>
    <div
      class="flex cursor-pointer items-center space-x-2"
      v-for="item in valueState"
      :key="item"
    >
      <input
        class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
        type="checkbox"
        :name="name"
        :id="'option-' + item"
        :aria-label="name"
        :value="item || ''"
        v-model="modelValue[name]"
      />
      <label :for="'option-' + item">
        {{ item !== null && formatName[item] ? formatName[item] : item }}
        {{ item === null ? "Unknown" : "" }}
      </label>
    </div>
  </FilterAccordion>
</template>
<script setup>
import FilterAccordion from "@components/shop/FilterAccordion.vue";

import { onMounted, defineProps, defineEmits, ref } from "vue";

const valueState = ref();

onMounted(async () => {
  if (name === "Size") {
    valueState.value = convertAndSortRAMSizes(value);
  } else {
    valueState.value = value;
  }
});

const props = defineProps({
  value: Object,
  name: String,
  modelValue: Object,
});
const { value, name } = props;
const formatName = {
  Brand: "Brand",
  1: "Yes",
  0: "No",
  HasHeatsink: "Has Heatsink",
  FormFactor: "Form Factor",
  SocketType: "Socket Type",
  CPURange: "CPU Range",
  CPUCores: "CPU Cores",
  GPUType: "GPU Type",
  CPUType: "CPU Type",
  GPUSize: "GPU Size",
  HasWiFi: "Has WiFi",
  HasRGB: "Has RGB",
};

function convertAndSortRAMSizes(sizes) {
  const formatSize = (num) => {
    if (num >= 1000) {
      return num / 1000 + "TB";
    }
    return num + "GB";
  };

  const convertedSizes = sizes.map((size) => {
    if (size.includes("GB")) {
      return parseInt(size);
    } else if (size.includes("TB")) {
      return parseInt(size) * 1000;
    }
    return 0;
  });

  convertedSizes.sort((a, b) => a - b);

  const formattedSizes = convertedSizes.map((size) => formatSize(size));

  return formattedSizes;
}
</script>
