import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { routes } from './app.routing';
import { AddediteventComponent } from './events/addeditevent/addeditevent.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ListeventsComponent } from './events/listevents/listevents.component';
import { TokenInterceptor } from '../../token.interceptor';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddtagDialogComponent } from './events/addeditevent/addtag-dialog/addtag-dialog.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { InputWithTagSuggestionsComponent } from './events/addeditevent/input-with-tag-suggestions/input-with-tag-suggestions.component';
import { MatSelectModule } from '@angular/material/select';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { EventMediaItemComponent } from './event-media-item/event-media-item.component';
import { DragAndDropDirective } from './events/addeditevent/drag-and-drop.directive';
import { AccountrecoveryComponent } from './authentication/accountrecovery/accountrecovery.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    AddediteventComponent,
    ListeventsComponent,
    AddtagDialogComponent,
    DragAndDropDirective,
    AccountrecoveryComponent,
    InputWithTagSuggestionsComponent,
    LoadingSpinnerComponent,
    EventMediaItemComponent,
    InputWithTagSuggestionsComponent,
    LoadingSpinnerComponent,
    InputWithTagSuggestionsComponent,
    LoadingSpinnerComponent,
    DragAndDropDirective,
    AccountrecoveryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    NgbModule,
    FormsModule,
    HttpClientModule,
    NgMultiSelectDropDownModule.forRoot(),
    BrowserAnimationsModule,
    MatDialogModule,
    CdkAccordionModule,
    MatMenuModule,
    MatButtonModule,
    MatSelectModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: MatDialogRef, useValue: {} },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
