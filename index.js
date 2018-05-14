'use strict';
////////////   Data Store  //////////////


const STORE = {
  items:[
    {name: 'apples', checked: false},
    {name: 'oranges', checked: false},
    {name: 'milk', checked: true},
    {name: 'bread', checked: true}
  ],
  hideCheckedItems: false
};


////////////////    Item Blueprint  ////////////////

function generateItemElement(item, itemIndex, template) {
  return `
    <li class="js-item-index-element" data-item-index="${itemIndex}">
      <span class="shopping-item js-shopping-item ${item.checked ? 'shopping-item__checked' : ''}">${item.name}</span>
      <div class="shopping-item-controls">
        <button class="shopping-item-toggle js-item-toggle">
            <span class="button-label">check</span>
        </button>
        <button class="shopping-item-delete js-item-delete">
            <span class="button-label">delete</span>
        </button>
        <input type="text" name="shopping-item-entry" class="js-shopping-item-entry" placeholder="">
        <button type="submit" class="js-edit-current-item">Edit item</button>
      </div>
    </li>`;
}

//////////////////   Render   ////////////////////

//to do the search function serperate out the list create function then return a result to 
//  pass into the generate string function into the html function.  Ill have to add an off off 
// toggle for the search button like with the check uncheck 


function generateShoppingItemsString(shoppingList) {
  const items = shoppingList.map((item, index) => generateItemElement(item, index));
  return items.join('');
}

function getVisibleList (state){


}

function renderShoppingList() {
  console.log('render ran');

  const list = [...STORE['items']];
  let listResults = list.filter(function(item){
    return item.checked === false;
  });

   
  if(STORE.hideCheckedItems === true){
    let shoppingListItemsString = generateShoppingItemsString(list);
    $('.js-shopping-list').html(shoppingListItemsString);
  }
  else if(STORE.hideCheckedItems === false){
    let shoppingListItemsString = generateShoppingItemsString(listResults);
    $('.js-shopping-list').html(shoppingListItemsString);
  }
}


////////////////    Add Item  ///////////////////////

function addItemToShoppingList(itemName) {
  STORE['items'].push({name: itemName, checked: false});
}

function handleNewItemSubmit() {
  $('#js-shopping-list-form').submit(function(event) {
    event.preventDefault();
    const newItemName = $('.js-shopping-list-entry').val();
    $('.js-shopping-list-entry').val('');
    addItemToShoppingList(newItemName);
    renderShoppingList();
  });
}

//////////////////   Get Item Index    /////////////////////

function getItemIndexFromElement(item) {
  const itemIndexString = $(item)
    .closest('.js-item-index-element')
    .attr('data-item-index');
  return parseInt(itemIndexString, 10);
}


//////////////////   Toggle Checked     /////////////////////

function toggleCheckedForListItem(itemIndex) {
  STORE.items[itemIndex].checked = !STORE.items[itemIndex].checked;
}

function handleItemCheckClicked() {
  $('.js-shopping-list').on('click', '.js-item-toggle', function (event, arg) {
    console.log(this);
    console.log(event.currentTarget);
    console.log(arg);        
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    toggleCheckedForListItem(itemIndex);
    renderShoppingList();
  });
}

/////////////////////    Delete Item   ////////////////////////

function handleDeleteItemClicked() {
  $('.js-shopping-list').on('click', '.js-item-delete', event => {
    
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    STORE['items'].splice(itemIndex,1);
    renderShoppingList();
    
  }); 
}

////////////////   Toggle Show/hide Check    //////////////////

function toggleCheckUncheck() {
  STORE.hideCheckedItems = !STORE.hideCheckedItems;
}

function handleCheckUncheck(){
  $('#js-extra-buttons').on('click', '.js-check-uncheck', function(event) {
    toggleCheckUncheck();
    renderShoppingList();
  });
}

///////////////  Edit Item Title  //////////////

function editItemName(itemIndex, itemName) {
  STORE.items[itemIndex].name= itemName;
  console.log(itemIndex);
  console.log(itemName);
}

function handleNewItemName() {
  $('.js-shopping-list').on('click','.js-edit-current-item', function(event) {
    event.preventDefault();
    const targetParent= $(event.currentTarget).parent();
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    const newItemName = targetParent.find('.js-shopping-item-entry').val();
    targetParent.find('.js-shopping-item-entry').val('');

    editItemName(itemIndex, newItemName);
    renderShoppingList();
  });
}

/////////////////   Search Item   /////////////////  

function getSearchedItem(newSearchItem){
  
}

function handleSearchItem() {
  $('#js-extra-buttons').on('click', '.js-search-item', function(event) {
    event.preventDefault();
    
    const newSearchItem = $('.js-shopping-list-entry').val();
    $('.js-shopping-list-entry').val('');
  
    getSearchedItem(newSearchItem);
    
  });
}

///////////////   Call   //////////////////


function handleShoppingList() {
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
  handleSearchItem();
  handleCheckUncheck();
  handleNewItemName();
}

$(handleShoppingList);