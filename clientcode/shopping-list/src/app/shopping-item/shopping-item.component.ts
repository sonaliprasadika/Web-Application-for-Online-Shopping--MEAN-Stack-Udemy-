import { Component, OnInit } from '@angular/core';
import { Item } from '../item';
import { DataService } from '../data.service';

@Component({
  selector: 'app-shopping-item',
  templateUrl: './shopping-item.component.html',
  styleUrls: ['./shopping-item.component.css'],
  // to display data services
  providers: [DataService]
})
export class ShoppingItemComponent implements OnInit {

  shoppingItemList: Item[]=[];
  selectedItem: Item;
  toggleForm: boolean = false;

  constructor(private datasevice: DataService) { }

  // get items from database and store then shopping item property
  getItems(){
    this.datasevice.getShoppingItems()
    // subscribe to observable
    .subscribe( items => {
      this.shoppingItemList = items;
      console.log('data from data service : ' + this.shoppingItemList[0].itemName);

    });

  }

  addItem(form){
    let newItem: Item = {
      itemName: form.value.itemName,
      itemQuantity: form.value.itemQuantity,
      itemBought: false
    }
    this.datasevice.addShoppingItems(newItem)
    .subscribe(item =>{
      console.log(item);
      this.getItems();
    });

  }


  deleteItem(id){
    this.datasevice.deleteShoppingItem(id)
    .subscribe(data =>{
      console.log(data);
      // if one item delete from list
      if(data.n == 1){
        for(var i=0; i< this.shoppingItemList.length; i++){
          // if the condition matches it will update the list
          if(id == this.shoppingItemList[i]._id){
            this.shoppingItemList.splice(i,1);// 1 means one item has been removed
          }
        }
      }
    });
  }


  showEditForm(item){
    this.selectedItem = item;
    this.toggleForm = !this.toggleForm;

  }


  editItem(form){
    let newItem: Item = {
      _id: this.selectedItem._id,
      itemName: form.value.itemName,
      itemQuantity: form.value.itemQuantity,
      itemBought: form.value.itemBought
    }
    this.datasevice.updateShoppingItems(newItem)
    .subscribe(result =>{
      console.log('original item to be updated with old value :'+result.itemQuantity);
      this.getItems();
    });
    this.toggleForm = !this.toggleForm;
  }


  updateItemChecked(item){
    item.itemBought = !item.itemBought;
    this.datasevice.updateShoppingItems(item)
    .subscribe(result =>{
      console.log('original checkbox values :'+result.itemBought);
      this.getItems();
    });
  }


  ngOnInit() {
    this.getItems();
  }

}
