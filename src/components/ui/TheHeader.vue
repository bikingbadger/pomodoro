<template>
  <Menubar :model="items">
    <template #start>
      <h1>Pompom</h1>
      <!-- <img alt="logo" src="../../assets/images/logo.svg" height="40" class="p-mr-2" /> -->
    </template>
    <template #end>
      <!-- <InputText placeholder="Search" type="text" /> -->
      <Button
        v-if="isLoggedIn"
        label="Logout"
        icon="pi pi-lock-open"
        @click="logout"
        class="p-mr-2"
      />
      <router-link to="login" v-if="!isLoggedIn">
        <Button label="Login" icon="pi pi-lock" class="p-mr-2"></Button>
      </router-link>
      <router-link to="register" v-if="!isLoggedIn">
        <Button label="Register" icon="pi pi-pencil" @click="register"
      /></router-link>
    </template>
  </Menubar>
</template>

<script>
import firebase from '@/utilities/firebase';
import { mapActions } from 'vuex';
import Menubar from 'primevue/menubar';

export default {
  components: { Menubar },
  emits: ['showLogin', 'showRegister'],
  data() {
    return {
      items: [
        {
          label: 'Home',
          icon: 'pi pi-fw pi-home',
          to: '/home',
        },
      ],
    };
  },
  computed: {
    isLoggedIn() {
      return firebase.auth().currentUser;
    },
  },
  methods: {
    ...mapActions('auth', ['logout']),
    login() {
      this.$emit('login');
    },
    register() {
      this.$emit('register');
    },
  },
};
</script>
