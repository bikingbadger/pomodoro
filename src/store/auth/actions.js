import firebase from '@/utilities/firebase';

const userRef = firebase.firestore().collection('/user');

export default {
  login(context, payload) {
    console.log(context, payload);
    firebase
      .auth()
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then(
        () => {
          context.commit('authSuccess', payload);
        },
        (err) => {
          context.commit('authFail', err);
        },
      );
  },
  register(context, payload) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then(
        // This will return the payload to prevent then chaining
        (userCredential) => userCredential,

        (err) => {
          context.commit('authFail', err);
        },
      )
      .then((userCredential) => {
        const userData = {
          id: userCredential.user.uid,
          // name: payload.name,
          username: payload.username,
          email: payload.email,
        };
        console.log(userData);

        userRef
          .add(userData)
          .then((docRef) => {
            console.log('User created with ID: ', docRef.id);
            context.commit('authSuccess', userData);
          })
          .catch((error) => {
            console.error('Error adding User: ', error);
          });
      });
  },
  logout() {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.isLoggedIn = false;
        this.currentUser = '';
        this.$router.push('login');
      });
  },
  async getUser(context) {
    if (firebase.auth().currentUser) {
      const fbUser = firebase.auth().currentUser;
      const snapshot = await userRef.where('id', '==', fbUser.uid).get();

      if (snapshot.empty) {
        console.log('No matching documents.');
        return;
      }

      const userData = snapshot.docs[0].data();
      context.commit('getUser', userData);
    }
  },
};
