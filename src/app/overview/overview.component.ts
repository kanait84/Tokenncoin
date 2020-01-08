import {Component, OnInit, NgZone, OnDestroy, AfterViewInit, Injectable , Inject , PLATFORM_ID} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApiservicesService} from '../apiservices.service';
import {TranslateService} from '@ngx-translate/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { DatePipe } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import am4themes_dark from '@amcharts/amcharts4/themes/dark';
import {LOCAL_STORAGE, WINDOW} from "@ng-toolkit/universal";

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
  providers: [DatePipe]
})
@Injectable({
  providedIn: 'root'
})
export class OverviewComponent implements OnInit, OnDestroy, AfterViewInit {
  mode:string;
  coinData: any;
  historycalData = [];
  onlyDates = [];
  coinId = '';
  coinDescriptions: any;
  private id: string;
  private chart: am4charts.XYChart;
  convertValue = 1;
  currencyString = 'usd';
  lineChartData = [];
  Open = '';
  price = [];
  volume = [];
  Xdates = [];
  marketCap = [];
  candle = false;
  dateFilters = 90;
  constructor( @Inject(PLATFORM_ID) private platformId: object,  private activeRoute: ActivatedRoute ,

               private apiServices: ApiservicesService , private zone: NgZone , private translate: TranslateService ,
               private datepipe: DatePipe) {
  }
  ngOnInit() {
    this.activeRoute.params.subscribe(routeParams => {
      this.synchData(routeParams.id);
    });
// Create chart


  }
  synchData(id) {
    console.log(id);
    if (isPlatformBrowser(this.platformId)) {
      this.apiServices.getCoin(id).subscribe((res) => {
        // @ts-ignore
        this.coinData = res.data;
        // @ts-ignore
        this.coinDescriptions = res.descript;
        // @ts-ignore
        this.coinId = res.data._id;
      });
      this.price = [];
      this.volume = [];
      this.Xdates = [];
      this.marketCap = [];

      if (isPlatformBrowser(this.platformId)) {
        this.convertValue = parseFloat(localStorage.getItem('localCurrencyValue'));
        this.currencyString = localStorage.getItem('localCurrencyFormat');
      }
      this.apiServices.currentMessage.subscribe(message => this.mode = message);
// Themes end
      this.activeRoute.params.subscribe(routeParams => {
        if (isPlatformBrowser(this.platformId)) {
          const takeWidth = window.innerWidth;
          this.apiServices.getCoin(routeParams.id).subscribe((res) => {
            // @ts-ignore
            this.coinId = res.data._id;
            this.apiServices.getLineChart(this.coinId).subscribe(resc => {
              // @ts-ignore
              for (let i = 1; i < resc.data.length; i++) {
                // @ts-ignore
                this.price.push(Number(resc.data[i].price));
                // @ts-ignore
                this.volume.push(Number(resc.data[i].volume_24h));
                // @ts-ignore
                this.marketCap.push(Number(resc.data[i].market_cap));
                // @ts-ignore
                this.Xdates.push(this.datepipe.transform(resc.data[i].timestamp, 'yyyy-MM-dd'));
              }
            }, () => {
            }, () => {
              am4core.useTheme(am4themes_animated);
              this.zone.runOutsideAngular(() => {
                let chart = am4core.create('chartdiv', am4charts.XYChart);
                chart.responsive.enabled = false;
                let data = [];
                let price1 = 1000, price2 = 1000, price3 = 1000, date1 = 1, date2 = 1, date3 = 1, marketCap = 1000;
                let quantity = 30000;
                for (var i = 0; i < this.dateFilters; i++) {
                  price1 = this.price[i];
                  date1 = this.Xdates[i];
                  data.push({date1: date1, price1: price1,});
                  date2 = this.Xdates[i];
                  marketCap = this.marketCap[i];
                  data.push({date2: date2, price2: marketCap});
                  date3 = this.Xdates[i];
                  price3 = this.volume[i];
                  data.push({date3: date3, price3: price3});
                }
                chart.data = data.reverse();
                // chart.data = this.lineChartData;
                let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
                dateAxis.renderer.grid.template.location = 0;
                dateAxis.baseInterval = {
                  "timeUnit": "day",
                  "count": 1
                }
                let dateAxis2 = chart.xAxes.push(new am4charts.DateAxis());
                dateAxis2.renderer.grid.template.location = 0;
                dateAxis2.renderer.labels.template.fill = am4core.color("#dfcc64");
                dateAxis2.baseInterval = {
                  "timeUnit": "day",
                  "count": 1
                };

                let dateAxis3 = chart.xAxes.push(new am4charts.DateAxis());
                dateAxis3.renderer.grid.template.location = 0;
                dateAxis3.renderer.labels.template.fill = am4core.color("#dfcc64");
                dateAxis3.baseInterval = {
                  "timeUnit": "day",
                  "count": 1
                };

                let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

                valueAxis.renderer.opposite = true;
                if (takeWidth >= 768) {
                  valueAxis.title.text = "[font-size: 15px]Price (USD)[/]";
                }
                valueAxis.title.fill = am4core.color("#dfcc64");


                let valueAxis2 = chart.yAxes.push(new am4charts.ValueAxis());
                valueAxis2.tooltip.disabled = true;
                valueAxis2.renderer.grid.template.strokeDasharray = "2,3";


                valueAxis2.title.fill = am4core.color("#e59165");

                let valueAxis3 = chart.yAxes.push(new am4charts.ValueAxis());
                valueAxis3.tooltip.disabled = true;
                if (takeWidth >= 768) {
                  valueAxis2.title.text = "[font-size: 15px]Market Cap[/]";
                }
                valueAxis.renderer.opposite = true;
                if (takeWidth >= 768) {
                  valueAxis3.title.text = "[font-size: 15px]Volume 24h[/]";
                }
                valueAxis3.renderer.grid.template.strokeDasharray = "2,3";
                valueAxis3.title.fill = am4core.color("#45b3ff");

                let series2 = chart.series.push(new am4charts.LineSeries());
                series2.dataFields.dateX = "date2";
                series2.dataFields.valueY = "price2";
                series2.yAxis = valueAxis2;
                series2.xAxis = dateAxis2;
                series2.tooltipText = "[font-size: 15px] Market Cap : [bold] {valueY.value}[/][/]";
                series2.fill = am4core.color("#ffffff");
                series2.stroke = am4core.color("#ff707c");
                series2.strokeWidth = 2;
                chart.numberFormatter.bigNumberPrefixes = [
                  {"number": 1e+3, "suffix": "K"},
                  {"number": 1e+6, "suffix": "M"},
                  {"number": 1e+9, "suffix": "B"},
                ];
                let series = chart.series.push(new am4charts.LineSeries());
                series.dataFields.dateX = "date1";
                series.dataFields.valueY = "price1";
                series.tooltipText = "[font-size: 15px]Price :[bold] {valueY.value}[/][/] ";
                series.fill = am4core.color("#ffffff");
                series.stroke = am4core.color("#dfcc64");
                series.strokeWidth = 2;
                series.tooltip.background.fill = am4core.color('#302f32');

                let series3 = chart.series.push(new am4charts.LineSeries());
                series3.dataFields.dateX = "date3";
                series3.dataFields.valueY = "price3";
                series3.yAxis = valueAxis3;
                series3.xAxis = dateAxis3;
                series3.tooltipText = "[font-size: 15px] Volume 24h : [bold] {valueY.value}[/][/]";
                series3.fill = am4core.color("#ffffff");
                series3.stroke = am4core.color("#7ddbff");
                series3.strokeWidth = 2;
                chart.cursor = new am4charts.XYCursor();
                chart.cursor.xAxis = dateAxis2;

                let scrollbarX = new am4charts.XYChartScrollbar();
                scrollbarX.series.push(series);
                chart.scrollbarX = scrollbarX;
                chart.legend = new am4charts.Legend();
                chart.legend.parent = chart.plotContainer;
                chart.legend.zIndex = 100;

                valueAxis2.renderer.grid.template.stroke = am4core.color("#9c9c9c");
                valueAxis3.renderer.grid.template.stroke = am4core.color("#9c9c9c");
                dateAxis.renderer.grid.template.stroke = am4core.color("#9c9c9c");
                valueAxis.renderer.grid.template.strokeWidth = 2;
                dateAxis2.renderer.grid.template.stroke = am4core.color("#9c9c9c");
                dateAxis3.renderer.grid.template.stroke = am4core.color("#9c9c9c");
                valueAxis.renderer.grid.template.stroke = am4core.color("#9c9c9c");
                valueAxis2.numberFormatter = new am4core.NumberFormatter();
                valueAxis2.numberFormatter.bigNumberPrefixes = [
                  {"number": 1e+3, "suffix": "K"},
                  {"number": 1e+6, "suffix": "M"},
                  {"number": 1e+9, "suffix": "B"},
                ];
                valueAxis2.numberFormatter.numberFormat = "'$' #,### a";
                valueAxis3.numberFormatter = new am4core.NumberFormatter();
                valueAxis3.numberFormatter.bigNumberPrefixes = [
                  {"number": 1e+3, "suffix": "K"},
                  {"number": 1e+6, "suffix": "M"},
                  {"number": 1e+9, "suffix": "B"},
                ];
                valueAxis.numberFormatter.numberFormat = "'$' #";
                valueAxis3.numberFormatter.numberFormat = "'$' #,### a";
                valueAxis.renderer.labels.template.fill = am4core.color("#cdba7a");
                valueAxis2.renderer.labels.template.fill = am4core.color("#ff707c");
                valueAxis3.renderer.labels.template.fill = am4core.color("#45b3ff");
                dateAxis3.renderer.labels.template.fill = am4core.color("#7b7377");
                dateAxis2.renderer.disabled = true;
                dateAxis3.renderer.disabled = true;
                dateAxis.renderer.labels.template.fill = am4core.color("#919191");
                chart.legend.markers.template.disabled = true;
                chart.scrollbarX.background.fill = am4core.color("rgba(138,138,138,0.12)");
                // @ts-ignore
                chart.scrollbarX.unselectedOverlay.fill = am4core.color("rgba(138,138,138,0.12)");
                chart.scrollbarX.startGrip.background.fill = am4core.color("#707070");
                chart.scrollbarX.endGrip.background.fill = am4core.color("#707070");


                if (takeWidth <= 768) {
                  valueAxis3.renderer.labels.template.disabled = true;
                  chart.scrollbarX.start = 0.78;
                }
                this.chart = chart;
              });
            });
          });
        }
      });
    }
  }
  TranslationChanges() {
    this.translate.get('Open').subscribe((text: string) => {this.Open = text;});
  }

  candleShow(){
    if (this.candle === true) {
      this.candle = false;
    } else {
      this.candle = true;
    }
  }
  ngAfterViewInit() {



  }
  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }
  changeDaysFilter(count) {
    this.dateFilters = count;
    this.ngOnInit();
  }
}
