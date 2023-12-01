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

  //check the state
  checkUI();
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
    if (confirm('Are you sure?')) {
      e.target.parentElement.parentElement.remove();
    }
  }
  //check the state
  checkUI();
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
//Event listeners
itemForm.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);
clearBtn.addEventListener('click', clearItems);
itemFilter.addEventListener('input', filterItems);

// check the state
checkUI();
