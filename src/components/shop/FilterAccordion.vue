<template>
  <div class="border-top-2 mb-3 bg-white p-2 shadow-md dark:bg-slate-900">
    <button
      @click="toggleMenu"
      type="button"
      class="border-bottom flex w-full items-center justify-between border-b-0 p-2 text-left font-medium"
      data-accordion-target="#accordion-collapse-body-1"
      aria-expanded="true"
      aria-controls="accordion-collapse-body-1"
    >
      <slot name="accordion-trigger" />

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
        ></path>
        <path
          v-else
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M19.5 12h-15"
        ></path>
      </svg>
    </button>

    <div
      class="mb-4"
      :class="isHidden ? 'hidden' : ''"
      aria-labelledby="accordion-collapse-heading-1"
    >
      <div class="gap-2 p-2">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const isHidden = ref(true);

const toggleMenu = () => {
  isHidden.value = !isHidden.value;
};
</script>
