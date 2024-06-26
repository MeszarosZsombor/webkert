import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";
import { MenuComponent } from './shared/menu/menu.component';
import {MatListItem, MatNavList} from "@angular/material/list";
import {MatButtonModule} from "@angular/material/button";
import {HttpClientModule} from "@angular/common/http";
import { BuyPackageDialogAnimations } from "./shared/dialog/dialog.component";
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import {environment} from "./environment/environment";
import {AngularFireModule} from "@angular/fire/compat";
import {SnackBarComponent} from "./shared/snack-bar/snack-bar.component";
import {DeleteDialogAnimations} from "./shared/dialog/dialog-delete.component";
import {MatPrefix} from "@angular/material/form-field";

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
        BuyPackageDialogAnimations,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        provideAuth(() => getAuth()),
        provideFirestore(() => getFirestore()),
        provideStorage(() => getStorage()),
        MatPrefix
    ],
    providers: [
        provideClientHydration(),
        provideAnimationsAsync(),
        SnackBarComponent,
        DeleteDialogAnimations
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
