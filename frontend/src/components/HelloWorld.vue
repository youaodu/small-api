<script setup>
import { ref, onMounted } from 'vue'
import {GreetService} from "../../bindings/changeme";
import {Events} from "@wailsio/runtime";

const name = ref('')
const result = ref('Please enter your name below 👇')
const time = ref('Listening for Time event...')

const doGreet = () => {
  let localName = name.value;
  if (!localName) {
    localName = 'anonymous';
  }
  GreetService.Greet(localName).then((resultValue) => {
    result.value = resultValue;
  }).catch((err) => {
    console.log(err);
  });
}

onMounted(() => {
  Events.On('time', (timeValue) => {
    time.value = timeValue.data;
  });
})

defineProps({
  msg: String,
})

</script>

<template>
  <div>11111111</div>
</template>
