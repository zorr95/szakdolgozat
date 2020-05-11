import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { environment } from '../../src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { DocumentModule } from '@inclouded/angularfire-document-mapper';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AppRoutingModule } from './app-routing.module';
import { FoodAndNutrientService } from './services/foodandnutrient.service';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IonicStorageModule } from '@ionic/storage';
import { PatientModule } from '@inclouded/fhir-patient';
import { LoginModule, TranslateService, setupTranslateFactory } from '@inclouded/ionic4-inclouded-lib';
import { PractitionerService } from './services/practitioner.service';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(),
    LoginModule.forRoot({ title: ' Nutrition ', version: 'v' + environment.version, versionLink: 'https://www.google.hu/' }),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    IonicStorageModule.forRoot(),
    HttpClientModule,
    PatientModule,
    DocumentModule
    ,

  ],

  providers: [
    FoodAndNutrientService,
    PractitionerService,
    StatusBar,
    SplashScreen,
    {
       provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
       TranslateService,
       {
         provide: APP_INITIALIZER,
         useFactory: setupTranslateFactory,
         deps: [TranslateService],
         multi: true
       },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
