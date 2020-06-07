('use strict');

const saveButton = document.querySelector('#settings-save');
const storageID = 'settings';
let settings = localStorage.getItem(storageID);
settings = settings ? JSON.parse(settings) : { todoistKey: '' };
const todoistInput = document.querySelector('#settings-todoist-token');
todoistInput.value = settings.todoistKey;
console.log(saveButton);
saveButton.addEventListener(
  'click',
  function () {
    settings = { todoistKey: todoistInput.value };
    console.log(settings);
    localStorage.setItem(storageID, JSON.stringify(settings));
  },
  false,
);
