<template>
  <button class="snipcart-customer-signin grid h-full place-items-center">
    My Account
  </button>
</template>

<script setup>
import { ref, onMounted } from "vue";

const props = defineProps({
  label: String,
});

onMounted(() => {
  document.addEventListener("snipcart.ready", () => {
    console.log("ready 2");

    Snipcart.events.on("customer.signedin", (customer) => {
      console.log(`Customer ${customer.email} just signed in.`);
    });

    Snipcart.events.on("customer.signedout", () => {
      console.log("Customer signed out");
    });

    Snipcart.events.on("authentication.success", function (email) {
      console.log(email);
    });

    Snipcart.events.on("authentication.fail", function (email) {
      console.log(email);
    });
  });
});
</script>
