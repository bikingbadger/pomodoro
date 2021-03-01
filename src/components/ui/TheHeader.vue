<template>
  <Menubar :model="items">
    <template #start>
      <!-- <img alt="logo" src="../../assets/images/logo.svg" height="40" class="p-mr-2" /> -->
    </template>
    <template #end>
      <timer-bar></timer-bar>
      <!-- <InputText placeholder="Search" type="text" /> -->
      <div>
        <Button
          v-if="isLoggedIn"
          icon="pi pi-lock-open"
          @click="logout"
          class="p-mr-2 p-button-rounded"
        />
        <router-link to="login" v-if="!isLoggedIn">
          <Button icon="pi pi-lock" class="p-mr-2 p-button-rounded"></Button>
        </router-link>
        <router-link to="register" v-if="!isLoggedIn">
          <Button icon="pi pi-pencil" class="p-mr-2 p-button-rounded" @click="register"
        /></router-link>
      </div>
    </template>
  </Menubar>
</template>

<script>
import firebase from '@/utilities/firebase';
import { mapActions } from 'vuex';
import TimerBar from '@/components/timer/TimerBar.vue';
import Menubar from 'primevue/menubar';

export default {
  components: { TimerBar, Menubar },
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

<style>
.p-menubar {
  position: sticky;
  top: 0;
  background-color: #3f51b5;
  color: white;
}

.p-menubar-end {
  display: flex;
}
</style>
