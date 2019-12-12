import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { InsertFormComponent } from './insert-form/insert-form.component';

import { OktaAuthModule, OktaCallbackComponent, OktaAuthGuard } from '@okta/okta-angular';
import { VideoInfoComponent } from './video-info/video-info.component';

const routes: Routes = [
 { path: '', component: LoginComponent },
 {
   path: 'home',
   component: HomeComponent,
   canActivate: [OktaAuthGuard],
 },
 { path: 'insert', component: InsertFormComponent },
 { path: 'videos/:id', component: VideoInfoComponent },
 { path: 'implicit/callback', component: OktaCallbackComponent },
];

@NgModule({
 imports: [
   RouterModule.forRoot(routes),
   OktaAuthModule.initAuth({
     issuer: "https://dev-771711.okta.com",
     clientId: "0oa252ftlxmdGGu1q357",
     redirectUri: 'http://localhost:8080/implicit/callback',
     scope: 'openid profile email'
   })
 ],
 exports: [RouterModule]
})
export class AppRoutingModule { }
