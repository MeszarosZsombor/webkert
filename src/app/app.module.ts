import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";
import { MenuComponent } from './shared/menu/menu/menu.component';
import {MatListItem, MatNavList} from "@angular/material/list";
import {MatButtonModule} from "@angular/material/button";
import {HttpClientModule} from "@angular/common/http";
import { DialogAnimationsExample } from "./shared/dialog/dialog.component";
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIcon,
    MatNavList,
    MatButtonModule,
    MatListItem,
    DialogAnimationsExample,
    provideFirebaseApp(() => initializeApp({"projectId":"webkert-a271a","appId":"1:319911206972:web:0dd94d054d24201ef66339","storageBucket":"webkert-a271a.appspot.com","apiKey":"AIzaSyDagB4relqujl-scQ-zKrPEde4M2Sri8x8","authDomain":"webkert-a271a.firebaseapp.com","messagingSenderId":"319911206972","measurementId":"G-5K5Z51132X"})),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage())
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
