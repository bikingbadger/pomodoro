<template>
  <Panel header="Login">
    <label for="email">Email</label>
    <InputText id="email" type="email" v-model="email" class="p-mb-2  p-d-block" />
    <label for="password">Password</label>
    <Password id="password" v-model="password" :feedback="false" class="p-d-block" />
    <Button label="Login" autofocus @click="loginUser" />
    <Button label="Register" @click="registerUser" class="p-button-text" />
  </Panel>
</template>

<script>
import { mapActions } from 'vuex';
import router from '@/router';

export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    ...mapActions('auth', ['login']),
    loginUser() {
      this.login({ email: this.email, password: this.password });
      this.email = '';
      this.password = '';
    },
    registerUser() {
      router.replace({ path: 'register' });
    },
  },
};
</script>
