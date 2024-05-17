console.log('JS is sourced!');
// fetchItems();

// GET
function fetchItems() {
  axios.get('/todos').then((response) => {
    console.log('GET /todos response', response);
    // appendItemsToDom(response.data);
  });
}

// function to append items to DOM

// function to clear form

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
      //clearForm();
      //fetchItems();
    })
    .catch((error) => {
      console.log('Error', error);
      alert('uh oh! item not added to list');
    });
}

// PUT
// function markCompleted

// DELETE
// function deleteItem
