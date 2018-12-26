import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './components/app/app.component';
import { TodoComponent } from './components/todo/todo.component';
import { LoginComponent } from './components/login/login.component';

// const appRoutes: Routes = [
//   { path: '', component: TodoComponent },
//   { path: 'login', component: LoginComponent },
// ];
const appRoutes: Routes = [
  { path: 'todo', component: TodoComponent },
  { path: 'login', component: LoginComponent },
  { path: '', component: LoginComponent },
]; // Testing

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    LoginComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true }
    ),
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
