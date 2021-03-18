<template>
  <the-header />
  <router-view />
</template>

<script>
import TheHeader from '@/components/ui/TheHeader.vue';

export default {
  components: { TheHeader },
};
</script>
