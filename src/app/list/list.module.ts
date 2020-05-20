import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListPageRoutingModule } from './list-routing.module';

import { ListPage } from './list.page';
import { ListItemComponent } from '../components/list-item/list-item.component';
import { AuthService } from '../services/auth.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListPageRoutingModule
  ],
  declarations: [
    // Importing your components
     ListPage,
     ListItemComponent
   ],
  entryComponents: [
    ListPage
  ],
  providers: [AuthService]
})
export class ListPageModule {}
