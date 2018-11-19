import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import {RouterModule, Routes} from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './service/auth-service';
import { UserService } from './service/domain/user-service';
import { StorageService } from './service/storage.service';
import { HttpClientModule } from '@angular/common/http';
import { BaseService } from './service/domain/base-service';
import { HomeComponent } from './pages/home/home.component';
import { AuthInterceptorProvider } from './interceptor/auth-interceptors';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { SchemaService } from './service/domain/schema-service';
import { SchemaComponent } from './pages/schema/schema.component';
import { BasesComponent } from './pages/bases/bases.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'ng6-toastr';
import { ErrorInterceptorProvider } from './interceptor/error-interceptor';
import { MessageService } from './service/domain/message.service';
import { TableComponent } from './pages/table/table.component';
import { TableService } from './service/domain/table-service';
import { NewAttributeComponent } from './pages/new-attribute/new-attribute.component';
import { AttributeComponent } from './pages/attribute/attribute.component';
import { AttributeService } from './service/domain/attribute-service';
import { UpdateAttributeComponent } from './pages/update-attribute/update-attribute.component';

 const appRoutes: Routes = [
    {path:'', component:HomeComponent},
    {path:"bases/page", component:BasesComponent},
    {path:"bases/:id/schemas/page", component:SchemaComponent},
    {path:"schemas/:id/tables/page", component:TableComponent},
    {path:"tables/:id/attributes/page", component:AttributeComponent},
    {path:"tables/:id/newAttribute", component:NewAttributeComponent},
    {path:"tables/:id/updateAttribute/:ids", component:UpdateAttributeComponent}
  ];
@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    HomeComponent,
    BasesComponent,
    SchemaComponent,
    TableComponent,
    NewAttributeComponent,
    AttributeComponent,
    UpdateAttributeComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule, 
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    AngularFontAwesomeModule,
    ToastModule.forRoot()
  ],
  providers: [
    AuthService,
    AuthInterceptorProvider,
    StorageService,
    UserService,
    BaseService,
    SchemaService,
    ErrorInterceptorProvider,
    MessageService,
    TableService,
    AttributeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
