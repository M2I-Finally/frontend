import { NgModule, LOCALE_ID, DEFAULT_CURRENCY_CODE} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

//location in france, this pass currency to FR format:
import localeFr from '@angular/common/locales/fr';
registerLocaleData(localeFr);
// to use ngSrc:
import { NgOptimizedImage } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './features/user/user.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { NgFor } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ProductModule } from './features/product/product.module';
import { PaymentModule } from './features/payment/payment.module';
import { ToastrModule } from 'ngx-toastr';
import { InterceptorService } from './shared/services/interceptor.service';
import { PagenotfoundComponent } from './features/pagenotfound/pagenotfound.component';
import { MatMenuModule } from '@angular/material/menu';


@NgModule({
  declarations: [
    AppComponent,
    PagenotfoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UserModule,
    SharedModule,
    BrowserAnimationsModule,
    MatFormFieldModule, 
    MatSelectModule, 
    NgFor, 
    MatInputModule,
    MatIconModule,
    MatSlideToggleModule,
    HttpClientModule,
    ProductModule,
    PaymentModule,
    NgOptimizedImage,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MatMenuModule
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'fr-FR'
     },
     {
       provide: DEFAULT_CURRENCY_CODE,
       useValue: 'EUR'
     },
     {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
