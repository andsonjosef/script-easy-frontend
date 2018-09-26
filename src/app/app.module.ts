import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import {RouterModule, Routes} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './service/auth-service';
import { UserService } from './service/domain/user-service';
import { StorageService } from './service/storage.service';
import { HttpClientModule } from '@angular/common/http';
import { BaseService } from './service/domain/base-service';
import { HomeComponent } from './pages/home/home.component';
import { BasesComponent } from './pages/bases/bases.component';
import { AuthInterceptorProvider } from './interceptor/auth-interceptors';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { SchemaService } from './service/domain/schema-service';
import { SchemaComponent } from './pages/schema/schema.component';

 const appRoutes: Routes = [
    {path:'', component:HomeComponent},
    {path:"bases", component:BasesComponent},
    {path:"bases/:id/schemas", component:SchemaComponent}
  ];
@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    HomeComponent,
    BasesComponent,
    SchemaComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFontAwesomeModule
  ],
  providers: [
    AuthService,
    AuthInterceptorProvider,
    StorageService,
    UserService,
    BaseService,
    SchemaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
