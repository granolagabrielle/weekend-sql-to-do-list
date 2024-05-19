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
    const itemClass = item.isComplete ? 'completed' : 'incomplete';
    itemTableBody.innerHTML += `
        <tr data-todoid="${item.id}" data-testid="toDoItem" id="toDo" class="${itemClass}">
            <td><button data-testid="completeButton" onclick="markCompleted(event)">Complete</button></td>
            <td id="list-item">${item.text}</td>
            <td><button id="deleteButton" data-testid="deleteButton" onclick="deleteItem(${item.id})">Delete</button></td>
        <tr>    
            `;
  }
}

// function to clear form
function clearForm() {
  document.getElementById('toDoItem').value = '';
}

// POST to add new item
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
function markCompleted(event) {
  console.log('item marked as completed');
  console.log(event.target.closest('tr').dataset);
  const todoid = event.target.closest('tr').dataset.todoid;
  axios({
    method: 'PUT',
    url: `/todos/${todoid}`,
  })
    .then((response) => {
      const completedItem = document.getElementById('toDo');
      completedItem.classList.remove('notCompleted');
      completedItem.classList.add('completed');
      fetchItems();
    })
    .catch((error) => {
      console.log('error marking as completed', error);
      alert('error marking as completed');
    });
}

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
