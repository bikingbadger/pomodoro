'use strict';
const buttonLogin = document.querySelector('#btn-login');
const todoistConfig = {
  client_id: 'b95092242c9e4fc8b4a7c30c01c4bfe8',
  scope: 'data:read,data:delete',
  state: '0f34fc6173764b51b541204b57e55c7e',
};

const AuthView = {
  load: function () {
    console.log('Loading Auth');
    if (!buttonLogin) {
      throw Error('Login button missing');
    }

    /**
     * Add event listener for click to add a new task
     */
    buttonLogin.addEventListener(
      'click',
      async function () {
        console.log('Config', todoistConfig);
        window.location = `https://todoist.com/oauth/authorize?client_id=${todoistConfig.client_id}&scope=${todoistConfig.scope}&state=${todoistConfig.state}&redirect_uri=localhost:1234`;
      },
      false,
    );
  },
};

export default AuthView;
