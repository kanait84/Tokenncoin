import { BrowserModule } from '@angular/platform-browser';
import {MatExpansionModule} from '@angular/material/expansion';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LandingComponent } from './landing/landing.component';
import { CoinComponent } from './coin/coin.component';
import { CoinmarketsComponent } from './coinmarkets/coinmarkets.component';
import { CoinchartsComponent } from './coincharts/coincharts.component';
import { MarketComponent } from './market/market.component';
import {DropdownModule} from 'ngx-dropdown';
import { OverviewComponent } from './overview/overview.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CoinListComponent } from './coin-list/coin-list.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { SearchComponent } from './search/search.component';
import { CoinsocialComponent } from './coinsocial/coinsocial.component';
import {MatButtonModule} from '@angular/material/button';
import { IcosComponent } from './icos/icos.component';
import { NewsComponent } from './news/news.component';
import { IcossingleComponent } from './icossingle/icossingle.component';
import { CoinCompareComponent } from './coin-compare/coin-compare.component';
import { EventsComponent } from './events/events.component';
import {IgxFinancialChartModule} from 'igniteui-angular-charts/ES5/igx-financial-chart-module';
import { CryptocurrenciesComponent } from './cryptocurrencies/cryptocurrencies.component';
import { ExchangesComponent } from './exchanges/exchanges.component';
import { WatchlistComponent } from './watchlist/watchlist.component';
import { FaqComponent } from './aaLinks/faq/faq.component';
import {DataTableModule} from 'angular-6-datatable';
import { AdmindashComponent } from './admindash/admindash.component';
import {PathLocationStrategy, LocationStrategy, DatePipe} from '@angular/common';
import { CoinHistoriComponent } from './coin-histori/coin-histori.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TermsNConditionComponent } from './aaLinks/terms-ncondition/terms-ncondition.component';
import { PrivacyPolicyComponent } from './aaLinks/privacy-policy/privacy-policy.component';
import { DisclaimerComponent } from './aaLinks/disclaimer/disclaimer.component';
import { CookiesPolicyComponent } from './aaLinks/cookies-policy/cookies-policy.component';
import { AboutUsComponent } from './aaLinks/about-us/about-us.component';
import { DragScrollModule } from 'ngx-drag-scroll';
import { NoRightClickDirective } from './no-right-click.directive';
import { MatFormFieldModule, MatSelectModule } from '@angular/material';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import {MatInputModule} from '@angular/material';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OverviewCandleStickComponent } from './overview-candle-stick/overview-candle-stick.component';
import { GlossaryComponent } from './aaLinks/glossary/glossary.component';
import { GlossaryAdvancedOptionComponent } from './aaLinks/glossary-advanced-option/glossary-advanced-option.component';
import { HashLocationStrategy } from '@angular/common';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LandingComponent,
    CoinComponent,
    NoRightClickDirective,
    CoinmarketsComponent,
    CoinchartsComponent,
    MarketComponent,
    OverviewComponent,
    CoinListComponent,
    SearchComponent,
    CoinsocialComponent,
    IcosComponent,
    NewsComponent,
    IcossingleComponent,
    CoinCompareComponent,
    EventsComponent,
    CryptocurrenciesComponent,
    ExchangesComponent,
    WatchlistComponent,
    FaqComponent,
    AdmindashComponent,
    CoinHistoriComponent,
    TermsNConditionComponent,
    PrivacyPolicyComponent,
    DisclaimerComponent,
    CookiesPolicyComponent,
    AboutUsComponent,
    OverviewCandleStickComponent,
    GlossaryComponent,
    GlossaryAdvancedOptionComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    MatExpansionModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    DropdownModule,
    HttpClientModule,
    FormsModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
    MatButtonModule,
    IgxFinancialChartModule,
    MatSelectModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    NgxMatSelectSearchModule,
    DataTableModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    DragScrollModule,
    ReactiveFormsModule
  ],
  providers: [{provide: LocationStrategy, useClass: PathLocationStrategy}, [DatePipe]],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
