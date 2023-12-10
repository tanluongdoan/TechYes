<!-- component -->
<template>
  <div class="range_container">
    <div class="sliders_control">
      <input id="fromSlider" type="range" value="10" min="0" max="100" />
      <input id="toSlider" type="range" value="40" min="0" max="100" />
    </div>
    <div class="form_control">
      <div class="form_control_container">
        <div class="form_control_container__time">Min</div>
        <input
          class="form_control_container__time__input"
          type="number"
          id="fromInput"
          value="10"
          min="0"
          max="100"
        />
      </div>
      <div class="form_control_container">
        <div class="form_control_container__time">Max</div>
        <input
          class="form_control_container__time__input"
          type="number"
          id="toInput"
          value="40"
          min="0"
          max="100"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const scripLoaded = ref(false);

// function LoadJS() {
//   let script = document.createElement("script");
//   script.type = "text/javascript";
//   script.src =
//     "https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.x.x/dist/alpine.min.js";
//   if (!scripLoaded.value) {
//     document.head.appendChild(script);
//   }
// }

// if (!window.Snipcart) {
//   setTimeout(() => {
//     LoadJS();
//     scripLoaded.value = true;
//   }, 1000);
// }
</script>

<style>
.range_container {
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 35% auto;
}

.sliders_control {
  position: relative;
  min-height: 50px;
}

.form_control {
  position: relative;
  display: flex;
  justify-content: space-between;
  font-size: 24px;
  color: #635a5a;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  pointer-events: all;
  width: 24px;
  height: 24px;
  background-color: #fff;
  border-radius: 50%;
  box-shadow: 0 0 0 1px #c6c6c6;
  cursor: pointer;
}

input[type="range"]::-moz-range-thumb {
  -webkit-appearance: none;
  pointer-events: all;
  width: 24px;
  height: 24px;
  background-color: #fff;
  border-radius: 50%;
  box-shadow: 0 0 0 1px #c6c6c6;
  cursor: pointer;
}

input[type="range"]::-webkit-slider-thumb:hover {
  background: #f7f7f7;
}

input[type="range"]::-webkit-slider-thumb:active {
  box-shadow:
    inset 0 0 3px #387bbe,
    0 0 9px #387bbe;
  -webkit-box-shadow:
    inset 0 0 3px #387bbe,
    0 0 9px #387bbe;
}

input[type="number"] {
  color: #8a8383;
  width: 50px;
  height: 30px;
  font-size: 20px;
  border: none;
}

input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  opacity: 1;
}

input[type="range"] {
  -webkit-appearance: none;
  appearance: none;
  height: 2px;
  width: 100%;
  position: absolute;
  background-color: #c6c6c6;
  pointer-events: none;
}

#fromSlider {
  height: 0;
  z-index: 1;
}
</style>
