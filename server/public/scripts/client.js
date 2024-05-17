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
// function postItem

// PUT
// function markCompleted

// DELETE
// function deleteItem
