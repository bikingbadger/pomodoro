<template>
  <header>
    <h1>Pompom</h1>
    <div class="nav">
      <!-- <router-link to="/">
      <prime-button class="p-button-text">Home</prime-button></router-link> -->
      <prime-button @click="showLogin = true">Login</prime-button>
      <prime-button @click="showRegister = true">Register</prime-button>
    </div>
  </header>
  <router-view />
  <prime-dialog v-model:visible="showLogin" position="top"
    ><template #header>
      <h3>Login</h3>
    </template>
    <label for="email">Email</label>
    <prime-input id="email" type="email" v-model="email" class="p-mb-2  p-d-block"/>
    <label for="password">Password</label>
    <prime-password
      id="password"
      v-model="password"
      :feedback="false"
      toggleMask
      class="p-d-block"/>
    <template #footer>
      <prime-button label="Login" autofocus @click="loginUser" />
      <prime-button
        label="Register"
        @click="
          showRegister = true;
          showLogin = false;
        "
        class="p-button-text"
      /> </template
  ></prime-dialog>
  <prime-dialog v-model:visible="showRegister" position="top"
    ><template #header>
      <h3>Register</h3>
    </template>
    <label for="username">Name</label>
    <prime-input id="username" type="text" v-model="username" class="p-mb-2  p-d-block"/>

    <label for="email">Email</label>
    <prime-input id="email" type="email" v-model="email" class="p-mb-2  p-d-block"/>
    <label for="password">Password</label>
    <prime-password
      id="password"
      v-model="password"
      :feedback="false"
      toggleMask
      class="p-d-block"/>
    <template #footer> <prime-button label="Register" @click="registerUser" /> </template
  ></prime-dialog>
</template>

<script>
import { mapActions } from 'vuex';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';

export default {
  components: { PrimeDialog: Dialog, PrimeInput: InputText, PrimePassword: Password },
  data() {
    return {
      username: '',
      email: '',
      password: '',
      showLogin: false,
      showRegister: false,
    };
  },
  methods: {
    ...mapActions('tasks', ['getTodoistTasks']),
    ...mapActions('auth', ['login', 'register']),
    loginUser() {
      this.showLogin = false;
      this.login({ email: this.email, password: this.password });
    },
    registerUser() {
      this.showRegister = false;
      this.register({ username: this.username, email: this.email, password: this.password });
      this.username = '';
      this.email = '';
      this.password = '';
    },
  },
  mounted() {
    // https://blog.logrocket.com/how-to-consume-apis-with-vuex-and-axios/
    console.log('Get tasks from todoist');
    this.getTodoistTasks();
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  list-style: none;
  box-sizing: border-box;
}

:root {
  --clr-accent-500: #002fa7;
}

body {
  font-family: 'PT Sans', sans-serif;
  font-size: 1.25rem;
  font-weight: 400;
}

header {
  margin-bottom: 2rem;
}

h1 {
  text-align: center;
}

.nav {
  display: flex;
  justify-content: center;
  gap: 2rem;
}

/* Utility classes */
.flow-content > * + * {
  margin-top: 0.75rem;
}
</style>
