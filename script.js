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
const itemFilter = document.getElementById('filter');

//functions

function displayItems() {
  const itemsFromStorage = getItemsFromStorage();
  itemsFromStorage.forEach((item) => addItemToDom(item));

  //state check
  checkUI();
}

function onAddItemSubmit(e) {
  e.preventDefault();
  const newItem = itemInput.value;

  //validate input
  if (newItem === '') {
    alert('please add an item');
    return;
  }
  // create item dom element
  addItemToDom(newItem);

  //add item to local storage
  addItemToStorage(newItem);

  //check the state
  checkUI();

  itemInput.value = '';
}

function addItemToDom(item) {
  //create list item
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(item));
  // create button
  const button = createButton('remove-item btn-link text-red');
  li.appendChild(button);

  itemList.appendChild(li);
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

function addItemToStorage(item) {
  // creating vairable
  const itemsFromStorage = getItemsFromStorage();

  // add new item to array
  itemsFromStorage.push(item);

  //convert to JSON string and set to local storage
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function getItemsFromStorage() {
  let itemsFromStorage;

  //checking to see if there are items in storage
  if (localStorage.getItem('items') === null) {
    // no items -> empty array
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem('items')); // if not empty array of whatever is in storage
  }

  return itemsFromStorage;
}

function onClickItem(e) {
  if (e.target.parentElement.classList.contains('remove-item')) {
    removeItem(e.target.parentElement.parentElement);
  }
}

function removeItem(item) {
  if (confirm('Are you sure?')) {
    //remove from dom
    item.remove();

    //remove from storage
    removeItemFromStorage(item.textContent);

    //check the state
    checkUI();
  }
}

function removeItemFromStorage(item) {
  let itemsFromStorage = getItemsFromStorage();

  //filter out item to remove\
  itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

  //re-set to localstorage
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

//clear everything
function clearItems() {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }

  checkUI();
}

function filterItems(e) {
  const items = itemList.querySelectorAll('li');
  // get text being typed
  const text = e.target.value.toLowerCase();

  items.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase(); // first child is the text of the li tag

    // matching the input
    if (itemName.indexOf(text) != -1) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
}

//hide filter and clear all if there are no items to filter or clear
function checkUI() {
  const items = itemList.querySelectorAll('li');
  if (items.length === 0) {
    // meaning there is nothing in the node list
    clearBtn.style.display = 'none';
    itemFilter.style.display = 'none';
  } else {
    clearBtn.style.display = 'block';
    itemFilter.style.display = 'block';
  }
}

//init function -> initialize app

function init() {
  //Event listeners
  itemForm.addEventListener('submit', onAddItemSubmit);
  itemList.addEventListener('click', onClickItem);
  clearBtn.addEventListener('click', clearItems);
  itemFilter.addEventListener('input', filterItems);
  document.addEventListener('DOMContentLoaded', displayItems);

  // check the state
  checkUI();
}

init();
