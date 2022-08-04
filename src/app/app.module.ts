
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxCaptchaModule } from 'ngx-captcha';
//Http Requests
import { HttpClientModule, HttpHeaders, HTTP_INTERCEPTORS } from '@angular/common/http';
//Services
import { AuthService } from './services/auth/auth.service';

//Models
import { UserModel } from './models/user/user.module';

//Installed extra modules
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PortalModule } from '@angular/cdk/portal';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DataTablesModule } from 'angular-datatables';

import { ToastrModule } from 'ngx-toastr';
// RECOMMENDED
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
//Routes
import { AppRoutingModule } from './app-routing.module';
//Interceptors
import { AuthInterceptor } from './interceptors/auth.interceptor';

//Pages and single components
import { AppComponent } from './app.component';

import { LoginComponent } from './components/pages/login/login.component';

import { HeaderComponent } from './components/shared/header/header.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { SpinnerComponent } from './components/shared/spinner/spinner.component';

import { ScrollTopComponent } from './components/shared/scrolltop/scrolltop.component';
import { ProfileComponent } from './components/shared/profile/profile.component';
import { HomeComponent } from './components/pages/home/home.component';
import { MantainanceComponent } from './components/pages/mantainance/mantainance.component';


import { AccordionModule } from 'primeng/accordion';     //accordion and accordion tab
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { SliderModule } from 'primeng/slider';
import { MultiSelectModule } from 'primeng/multiselect';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { InputTextModule } from 'primeng/inputtext';
import { TooltipModule } from 'primeng/tooltip';
import {CheckboxModule} from 'primeng/checkbox';
import { MenuModule } from 'primeng/menu';
import {CardModule} from 'primeng/card';
import {ChartModule} from 'primeng/chart';
import { DividerModule } from "primeng/divider";
import {RadioButtonModule} from 'primeng/radiobutton';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {TabViewModule} from 'primeng/tabview';
import {FileUploadModule} from 'primeng/fileupload';
import {RatingModule} from 'primeng/rating';
import {RippleModule} from 'primeng/ripple';
import {InputNumberModule} from 'primeng/inputnumber';
import {PanelModule} from 'primeng/panel';
import {ToolbarModule} from 'primeng/toolbar';
import {TreeTableModule} from 'primeng/treetable';
import {NgxPermissionsModule } from 'ngx-permissions';
import {BlockUIModule } from 'primeng/blockui';
import {StepsModule} from 'primeng/steps';
import {MenuItem} from 'primeng/api';
import {DataViewModule} from 'primeng/dataview';
import {KeyFilterModule} from 'primeng/keyfilter';


import { ValveComponent } from './components/pages/valve/valve.component';
import { ValveMovementComponent } from './components/pages/valve-movement/valve-movement.component';
import { ValveEditComponent } from './components/pages/valve-edit/valve-edit.component';
import { ValveTableComponent } from './components/pages/valve-table/valve-table.component';
import { ValvesDetailComponent } from './components/pages/valves/valves-detail/valves-detail.component';
import { ValvesPageComponent } from './components/pages/valves/valves-page/valves-page.component';
import { ValveMovementEditComponent } from './components/pages/valve-movement-edit/valve-movement-edit.component';

import { MapComponent } from './components/pages/map/map.component';
import { EsriMapComponent } from './components/shared/esri-map/esri-map.component';


import {NgxImageCompressService} from 'ngx-image-compress';








@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    MantainanceComponent,
    SpinnerComponent,
    ScrollTopComponent,
    ProfileComponent,
    ValveComponent,
    ValveMovementComponent,
    ValveEditComponent,
    ValveTableComponent,
    ValvesDetailComponent,
    ValvesPageComponent,
    ValveMovementEditComponent,
    MapComponent,
    EsriMapComponent


  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    DataTablesModule,
    FormsModule,
    ReactiveFormsModule,
    NgxChartsModule,
    NgxPermissionsModule,
    BrowserAnimationsModule,
    PortalModule,
    BsDatepickerModule.forRoot(),
    NgxPermissionsModule.forRoot(),
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
    CardModule,
    ChartModule,
    DividerModule,    
    ToastrModule,
    NgxCaptchaModule,
    StepsModule,
    DataViewModule,
    KeyFilterModule,
    
    
  ],
  providers: [UserModel, AuthService,NgxImageCompressService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  },
  { provide: LocationStrategy, useClass: HashLocationStrategy } ],
  bootstrap: [AppComponent],
  exports: [
    BsDatepickerModule,
    NgxPermissionsModule
  ]
})
export class AppModule { }