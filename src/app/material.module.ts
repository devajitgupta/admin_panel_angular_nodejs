import { NgModule } from "@angular/core";
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatTableModule} from '@angular/material/table'
import {MatCardModule} from '@angular/material/card'

@NgModule({
    exports:[
        MatButtonModule,MatSidenavModule,MatIconModule,MatToolbarModule,MatMenuModule
,MatCardModule  ,MatTableModule  ]

})

export class MaterialModules{

}