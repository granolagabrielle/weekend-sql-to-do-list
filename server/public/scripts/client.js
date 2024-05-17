console.log('JS is sourced!');
fetchItems();

// GET
function fetchItems() {
  axios.get('/todos').then((response) => {
    console.log('GET /todos response', response);
    appendItemsToDom(response.data);
  });
}

// function to append items to DOM
function appendItemsToDom(itemList) {
  let itemTableBody = document.getElementById('toDoList');
  itemTableBody.innerHTML = '';
  for (let item of itemList) {
    itemTableBody.innerHTML += `
        <tr>
            <td><button>Complete</button></td>
            <td>${item.text}</td>
            <td><button id="deleteButton" data-testid="deleteButton" onclick="deleteItem(${item.id})">Delete</button></td>
        <tr>    
            `;
  }
}

// function to clear form
function clearForm() {
  document.getElementById('toDoItem').value = '';
}

// POST
function postItem(event) {
  event.preventDefault();
  let payloadObject = {
    text: document.getElementById('toDoItem').value,
  };
  axios
    .post('/todos', payloadObject)
    .then((response) => {
      console.log('item added to server!');
      clearForm();
      fetchItems();
    })
    .catch((error) => {
      console.log('Error', error);
      alert('uh oh! item not added to list');
    });
}

// PUT
// function markCompleted(event) {
//     console.log(event.target.dataset);
//     const itemid = event.target.closest('td')
// }

// DELETE
function deleteItem(todoid) {
  console.log('delete button clicked');
  axios
    .delete(`/todos/${todoid}`)
    .then((response) => {
      fetchItems();
    })
    .catch((error) => {
      console.log('Error deleting item on DOM', error);
      alert('Error deleting item on DOM');
    });
}
