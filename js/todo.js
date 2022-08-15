//todo
let addMessage = document.querySelector('.message'),
 addButton = document.querySelector('.add'),
 todo = document.querySelector('.todo');

 let todoList = [];
if(localStorage.getItem('todo')) {
  todoList = JSON.parse(localStorage.getItem('todo'));
  displayMessages();
}

 addButton.addEventListener("click", function( ) {
if (!addMessage.value) return;
   let newTodo = {
     todo: addMessage.value,
     checked: false,
     important: false
   };
   todoList.push(newTodo);
   displayMessages();
   localStorage.setItem('todo', JSON.stringify(todoList));
   addMessage.value = '';
 });
 

 function displayMessages() {
let displayMessages = '';
if(todoList.length === 0) todo.innerHTML = '';
   todoList.forEach(function(item, i) {
  displayMessages += `
  <li id='li_${i}'>
    <input type='checkbox' id='item_${i}' ${item.checked ? 'checked' : ''}>
    <label for = 'item_${i}' class="${item.important ? 'important': ''}">${item.todo}</label>
    <button id='it_${i}'>Del</button>
  </li>
  `;
  todo.innerHTML = displayMessages;
   });
 }

 todo.addEventListener('change', function(event) {
   let idInput = event.target.getAttribute('id');
   let forLabel = todo.querySelector('[for='+ idInput +']');
   let valueLabel = forLabel.innerHTML;

   todoList.forEach(function(item) {
     if(item.todo === valueLabel) {
       item.checked = !item.checked;
       localStorage.setItem('todo', JSON.stringify(todoList) );
     }
   });
 });

 todo.addEventListener('contextmenu', function(event){
   event.preventDefault();
   todoList.forEach(function(item, i ){
     if(item.todo === event.target.innerHTML){
       
       if(event.ctrlKey || event.metaKey){
          todoList.splice(i, 1);
       } else {
        item.important = !item.important;
       }
      
       displayMessages();
       localStorage.setItem('todo', JSON.stringify(todoList) );
     }
   })

 });

 const buttonTodo = document.querySelector(".button-todo");
const todoListOne = document.querySelector(".todo_list");


buttonTodo.addEventListener("click", () => {
  todoListOne.classList.toggle("vigorous");
});

todo.addEventListener("mouseover", function (event) {

  if (event.target.matches("#it_0")) {
    const delOne = document.querySelector('#it_0');
    const liOne = document.querySelector('#li_0')
    delOne.addEventListener("click", () => {
      liOne.classList.add("hidden");
      todoList.splice(0, 1);
      localStorage.setItem('todo', JSON.stringify(todoList));
    });
  } else if (event.target.matches("#it_1")) {
    const delOne = document.querySelector('#it_1');
    const liOne = document.querySelector('#li_1')
    delOne.addEventListener("click", () => {
      liOne.classList.add("hidden");
      todoList.splice(0, 1);
      localStorage.setItem('todo', JSON.stringify(todoList));
    });
  } else if (event.target.matches("#it_2")) {
    const delOne = document.querySelector('#it_2');
    const liOne = document.querySelector('#li_2')
    delOne.addEventListener("click", () => {
      liOne.classList.add("hidden");
      todoList.splice(0, 1);
      localStorage.setItem('todo', JSON.stringify(todoList));
    });
  } else if (event.target.matches("#it_3")) {
    const delOne = document.querySelector('#it_3');
    const liOne = document.querySelector('#li_3')
    delOne.addEventListener("click", () => {
      liOne.classList.add("hidden");
      todoList.splice(0, 1);
      localStorage.setItem('todo', JSON.stringify(todoList));
    });
  }
 }, false);



