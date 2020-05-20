import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ListItemComponent } from '../components/list-item/list-item.component';
import { ToDoItem, ToDoList } from '../classes/item.class';
import { AuthService } from '../services/auth.service'
@Component({
  selector: 'app-list-page',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {

  modal: any;
  data: any;
  user: any;
  itemList: ToDoList;
  signedIn: boolean;

  constructor(
    public modalController: ModalController,
    public authService: AuthService

  ) {
    this.authService.getAuth().subscribe(async (data)=> {
      console.log('Auth GuardData received', data);
      if (data.authState && data.authState.loggedIn){
        this.user = "shravan";
        this.getItems();
      } else {
        // this.itemList.items = [];
      }
    })
  }

  ngOnInit(){
    this.getItems();
    console.log('items'+ JSON.stringify(this.itemList));
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
    this.modal = await this.modalController.create({
      component: ListItemComponent,
      componentProps: props
    });
    // Listen for the modal to be closed...
    this.modal.onDidDismiss((result) => {
      if (result.data.newItem){
        // ...and add a new item if modal passes back newItem
        result.data.itemList.items.push(result.data.newItem)
      } else if (result.data.editItem){
        // ...or splice the items array if the modal passes back editItem
        result.data.itemList.items[i] = result.data.editItem
      }
      this.save(result.data.itemList);
    })
    return this.modal.present()
  }

  delete(i){
    this.itemList.items.splice(i, 1);
    // this.save(this.itemList);
  }

  complete(i){
    this.itemList.items[i].status = "complete";
    // this.save(this.itemList);
  }

  save(list){
    // Use AWS Amplify to save the list...
    // this.itemList = list;
  }

  getItems(){
    this.itemList = {
      userId: 1,
      items: [
        new ToDoItem({
          id: '1',
          title: 'test item 1',
          description: 'my test item',
          status: 'complete'
        }),
        new ToDoItem({
          id: '2',
          title: 'test item 3',
          description: 'my other test item',
          status: 'pending'
        })
      ]
    }
  }
}