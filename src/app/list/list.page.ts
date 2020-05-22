import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ListItemComponent } from '../components/list-item/list-item.component';
import { ToDoItem, ToDoList } from '../classes/item.class';
import { AuthService } from '../services/auth.service'
import { DataStore } from 'aws-amplify';
import { Todo } from '../../models';
import { JsonPipe } from '@angular/common';
@Component({
  selector: 'app-list-page',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {

  data: any;
  user: any;
  itemList: ToDoList;
  signedIn: boolean;

  constructor(
    public modalController: ModalController,
    public authService: AuthService

  ) {
/*     this.authService.getAuth().subscribe(async (data)=> {
      console.log('Auth GuardData received', data);
      if (data.authState && data.authState.loggedIn){
        this.user = "shravan";
        this.getItems();
      } else {
        // this.itemList.items = [];
      }
    }) */
  }

  ionViewDidEnter(){
    DataStore.observe().subscribe(this.getItems).unsubscribe();
    DataStore.observe().subscribe(this.getItems);
  }
  ngOnInit(){
    this.getItems();
    //console.log('items'+ JSON.stringify(this.itemList));
  }

  async modify(item, i) {
    let props = {
      itemList: this.itemList,
      /*
        We pass in an item parameter only when the user clicks on an existing item
        and therefore populate an editItem value so that our modal knows this is an edit operation.
      */
      editItem: item || undefined
    };

    // Create the modal
    const modal = await this.modalController.create({
      component: ListItemComponent,
      componentProps: props
    });
    // Listen for the modal to be closed...
    modal.onDidDismiss().then((result) => {
      console.log("modal data: "+ JSON.stringify(result));
      if (result.data.newItem){
        // ...and add a new item if modal passes back newItem
        // result.data.itemList.items.push(result.data.newItem)
        this.saveItem(result.data.newItem).then(()=> {
          this.getItems();
        });
        
      } else if (result.data.editItem){
        this.updateItem(result.data.editItem).then(()=> {
          this.getItems();
        });
      }
    })
    return modal.present()
  }

  async delete(i){
    await this.deleteItem(this.itemList.items[i]);
    this.getItems();
  }

  async complete(i){
    this.itemList.items[i].status = "complete";
    await this.updateItem(this.itemList.items[i]);
    this.getItems();
  }

  save(list){
    // Use AWS Amplify to save the list...
    // this.itemList = list;
  }
  async saveItem(item:ToDoItem){
    try{
    await DataStore.save(
      new Todo({
        title: item.title,
        description: item.description,
        status: item.status
      })
    );
    }
    catch(error){
      console.log("Save Error: "+ error)
    }
    //this.itemList.items.push(item);
  }
  async updateItem(item:ToDoItem){
    const original = await DataStore.query(Todo, item.id);

    await DataStore.save(
      Todo.copyOf(original, updated => {
        updated.title = item.title;
        updated.description = item.description;
        updated.status =item.status;
      })
    );
  }
  async deleteItem(item:ToDoItem){
    await DataStore.delete(Todo, item.id);
  }
  async getItems(){
    var toDoItems: ToDoItem[] = [];
    const todos = await DataStore.query(Todo, c => c.status("ne", "delete"));
    console.log('todos'+ JSON.stringify(todos));
    for (let index = 0; index < todos.length; index++) {
      const element = todos[index];
      var toDoItem = new ToDoItem({
        id: element["id"],
        title: element.title,
        description: element.description,
        status: element.status
      })
      toDoItems.push(toDoItem);
    }
    this.itemList = {
      userId: 1,
      items: toDoItems
    }
    console.log('items'+ JSON.stringify(this.itemList));
  }
}