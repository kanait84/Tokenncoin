import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LandingComponent} from './landing/landing.component';
import {CoinComponent} from './coin/coin.component';
import {MarketComponent} from './market/market.component';
import {IcosComponent} from './icos/icos.component';
import {NewsComponent} from './news/news.component';
import {CoinCompareComponent} from './coin-compare/coin-compare.component';
import {EventsComponent} from './events/events.component';
import {CryptocurrenciesComponent} from './cryptocurrencies/cryptocurrencies.component';
import {ExchangesComponent} from './exchanges/exchanges.component';
import {WatchlistComponent} from './watchlist/watchlist.component';
import {FaqComponent} from './aaLinks/faq/faq.component';
import {AdmindashComponent} from './admindash/admindash.component';
import {TermsNConditionComponent} from './aaLinks/terms-ncondition/terms-ncondition.component';
import {CookiesPolicyComponent} from './aaLinks/cookies-policy/cookies-policy.component';
import {PrivacyPolicyComponent} from './aaLinks/privacy-policy/privacy-policy.component';
import {DisclaimerComponent} from './aaLinks/disclaimer/disclaimer.component';
import {AboutUsComponent} from './aaLinks/about-us/about-us.component';
import {GlossaryComponent} from './aaLinks/glossary/glossary.component';
import {GlossaryAdvancedOptionComponent} from './aaLinks/glossary-advanced-option/glossary-advanced-option.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';

const routes: Routes = [
  {path: '', component: LandingComponent},
  {path: 'cryptocurrencies', component: CryptocurrenciesComponent},
  {path: 'page/:page', component: CryptocurrenciesComponent},
  {path: 'exchanges', component: ExchangesComponent},
  {path: 'exchanges/page/:page', component: ExchangesComponent},
  {path: 'watchlist', component: WatchlistComponent},
  {path: 'cryptocurrencies/:id', component: CoinComponent},
  {path: 'exchanges/:id', component: MarketComponent},
  {path: 'icos', component: IcosComponent},
  {path: 'news' , component: NewsComponent},
  {path: 'events' , component: EventsComponent},
  {path: 'coin-compare' , component: CoinCompareComponent},
  {path: '174bb5549686c555c6b9' , component: AdmindashComponent},
  {path: 'faq' , component: FaqComponent},
  {path: 'terms-and-conditions' , component: TermsNConditionComponent},
  {path: 'cookies-policy' , component: CookiesPolicyComponent},
  {path: 'privacy-policy' , component: PrivacyPolicyComponent},
  {path: 'disclaimer' , component: DisclaimerComponent},
  {path: 'about-us' , component: AboutUsComponent},
  {path: 'advanced-crypto-glossary' , component: GlossaryAdvancedOptionComponent },
  {path: 'beginner-crypto-glossary' , component: GlossaryComponent },
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
