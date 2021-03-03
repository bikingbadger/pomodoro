<template>
  <Panel header="Register">
    <label for="username">Username</label>
    <InputText id="username" type="text" v-model="username" class="p-mb-2  p-d-block" />
    <label for="email">Email</label>
    <InputText id="email" type="email" v-model="email" class="p-mb-2  p-d-block" />
    <label for="password">Password</label>
    <Password id="password" v-model="password" :feedback="false" class="p-d-block" />
    <Button label="Register" @click="registerUser" />
  </Panel>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
    };
  },
  methods: {
    ...mapActions('auth', ['register']),
    registerUser() {
      this.register({ username: this.username, email: this.email, password: this.password });
      this.username = '';
      this.email = '';
      this.password = '';
    },
  },
};
</script>
