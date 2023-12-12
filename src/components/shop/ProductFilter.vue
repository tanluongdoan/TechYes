<template>
  <div class="border-top-2 mb-3 border-gray-500 bg-white p-1">
    <div>
      <button
        @click="toggleMenu"
        type="button"
        class="border-bottom flex w-full items-center justify-between border-b-0 py-2 text-left font-medium"
        data-accordion-target="#accordion-collapse-body-1"
        aria-expanded="true"
        aria-controls="accordion-collapse-body-1"
      >
        <span>{{ formatName[name] ? formatName[name] : name }}</span>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="h-4 w-4"
        >
          <path
            v-if="isHidden"
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
          <path
            v-else
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M19.5 12h-15"
          />
        </svg>
      </button>
    </div>
    <div
      class="mb-4"
      :class="isHidden ? 'hidden' : ''"
      aria-labelledby="accordion-collapse-heading-1"
    >
      <div class="flex flex-wrap gap-2 px-1">
        <label
          class="flex cursor-pointer items-center space-x-2"
          v-for="item in valueState"
          :key="item"
        >
          <input type="checkbox" :name="Key" :id="'option-' + item" />
          <div :for="'option-' + item">
            {{ formatName[item] ? formatName[item] : item }}
          </div>
        </label>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from "vue";
const isHidden = ref(true);
const valueState = ref();
onMounted(async () => {
  if (name === "Size") {
    valueState.value = convertAndSortRAMSizes(value);
  } else {
    valueState.value = value;
  }
});

const toggleMenu = () => {
  isHidden.value = !isHidden.value;
};
const props = defineProps({
  value: Object,
  name: String,
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
// console.log(convertAndSortRAMSizes(sizes));
</script>
