import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ManageUsersRoutingModule } from './manage-users-routing.module';
import {ManageUsersComponent} from './manage-users.component';
import {NewUserComponent} from './new-user/new-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';

//primeNG
import { AccordionModule } from "primeng/accordion"; //accordion and accordion tab
import { TableModule } from "primeng/table";
import { ToastModule } from "primeng/toast";
import { CalendarModule } from "primeng/calendar";
import { SliderModule } from "primeng/slider";
import { MultiSelectModule } from "primeng/multiselect";
import { ContextMenuModule } from "primeng/contextmenu";
import { DialogModule } from "primeng/dialog";
import { ButtonModule } from "primeng/button";
import { DropdownModule } from "primeng/dropdown";
import { ProgressBarModule } from "primeng/progressbar";
import { ProgressSpinnerModule } from "primeng/progressspinner";
import { InputTextModule } from "primeng/inputtext";
import { TooltipModule } from "primeng/tooltip";
import { TreeTableModule } from "primeng/treetable";
import { BlockUIModule } from "primeng/blockui";
import { PanelModule } from "primeng/panel";
import { RippleModule } from "primeng/ripple";
import { ToolbarModule } from "primeng/toolbar";
import { InputNumberModule } from "primeng/inputnumber";
import { CheckboxModule } from "primeng/checkbox";
import { RadioButtonModule } from "primeng/radiobutton";
import { InputTextareaModule } from "primeng/inputtextarea";
import { TabViewModule } from "primeng/tabview";
import { FileUploadModule } from "primeng/fileupload";
import { RatingModule } from "primeng/rating";
import { MenuModule } from "primeng/menu";
import { CardModule } from "primeng/card";
import { CommonModule } from '@angular/common';
import { DividerModule } from "primeng/divider";

@NgModule({
  declarations: [
    ManageUsersComponent,
    NewUserComponent,
    EditUserComponent
  ],
  imports: [
    CommonModule,
    ManageUsersRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CardModule,
    AccordionModule,
    TableModule,
    ToolbarModule,
    CalendarModule,
    SliderModule,
    DialogModule,
    MultiSelectModule,
    ContextMenuModule,
    DropdownModule,
    ButtonModule,
    ToastModule,
    InputTextModule,
    ProgressBarModule,
    ProgressSpinnerModule,
    TooltipModule,
    TreeTableModule,
    BlockUIModule,
    PanelModule,
    InputNumberModule,
    RippleModule,
    CheckboxModule,
    RadioButtonModule,
    InputTextareaModule,
    TabViewModule,
    MenuModule,
    FileUploadModule,
    RatingModule,
    DividerModule
  ]
})
export class ManageUsersModule { }
