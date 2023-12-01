/*
Project Specs:
[ ] add items to list via form
[ ] Remove items from list by clicking the "X" Button
[ ] Clear all items with "clear" button 
[ ] Filter the items by typing in the filter field
[ ] Add localStorage to persist items
[ ] Click on an item to put into "edit mode"
[ ] Update item 
[ ] Deploy to Netlify 
*/

const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');

//functions
function addItem(e) {
  e.preventDefault();
  const newItem = itemInput.value;

  //validate input
  if (newItem === '') {
    alert('please add an item');
    return;
  }

  //create list item
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(newItem));
  // create button
  const button = createButton('remove-item btn-link text-red');
  li.appendChild(button);

  itemList.appendChild(li);

  itemInput.value = '';
}

function createButton(classes) {
  const button = document.createElement('button');
  button.className = classes;
  const icon = createIcon('fa-solid fa-xmark');
  button.appendChild(icon);
  return button;
}

function createIcon(classes) {
  const icon = document.createElement('i');
  icon.className = classes;
  return icon;
}

function removeItem(e) {
  // need to use event delegation
  //   console.log(e.target.parentElement.classList);
  if (e.target.parentElement.classList.contains('remove-item')) {
    // we only want this to fire off if we are clicking on the icon whose parent is a button with a class of remove item
    e.target.parentElement.parentElement.remove();
  }
}

//clear everything
function clearItems() {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }
}

//hide filter and clear all if there are no items to filter or clear

//Event listeners
itemForm.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);
clearBtn.addEventListener('click', clearItems);
