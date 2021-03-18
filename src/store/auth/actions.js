import firebase from '@/utilities/firebase';

const userRef = firebase.firestore().collection('/user');

export default {
  login(context, payload) {
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

        userRef
          .add(userData)
          .then(() => {
            context.commit('authSuccess', userData);
          })
          .catch((error) => {
            console.error('Error adding User: ', error);
          });
      });
  },
  logout({ commit }) {
    firebase
      .auth()
      .signOut()
      .then(() => {
        commit('logout');
      });
  },
  async getUser(context) {
    if (firebase.auth().currentUser) {
      const fbUser = firebase.auth().currentUser;
      const snapshot = await userRef.where('id', '==', fbUser.uid).get();

      if (snapshot.empty) {
        return;
      }

      const userData = snapshot.docs[0].data();
      context.commit('getUser', userData);
    }
  },
};
