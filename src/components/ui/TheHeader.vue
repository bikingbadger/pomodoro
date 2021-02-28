<template>
  <Menubar :model="items">
    <template #start>
      <h1>Pompom</h1>
      <!-- <img alt="logo" src="../../assets/images/logo.svg" height="40" class="p-mr-2" /> -->
    </template>
    <template #end>
      <!-- <InputText placeholder="Search" type="text" /> -->
      <Button label="Logout" icon="pi pi-lock-open" @click="logout" class="p-mr-2" />
      <router-link to="login">
        <Button label="Login" icon="pi pi-lock" class="p-mr-2"></Button>
      </router-link>
      <router-link to="register">
        <Button label="Register" icon="pi pi-pencil" @click="register"
      /></router-link>
    </template>
  </Menubar>
</template>

<script>
import Menubar from 'primevue/menubar';

export default {
  components: { Menubar },
  emits: ['showLogin', 'showRegister'],
  data() {
    return {
      items: [],
    };
  },
  methods: {
    logout() {
      this.$emit('logout');
    },
    login() {
      this.$emit('login');
    },
    register() {
      this.$emit('register');
    },
  },
};
</script>
