import {Component, OnInit, NgZone, OnDestroy, AfterViewInit, Injectable , Inject , PLATFORM_ID} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ApiservicesService} from '../apiservices.service';
import {TranslateService} from '@ngx-translate/core';


import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import am4themes_dark from '@amcharts/amcharts4/themes/dark';
import {isPlatformBrowser} from '@angular/common';
import {LOCAL_STORAGE} from '@ng-toolkit/universal';

@Component({
  selector: 'app-overview-candle-stick',
  templateUrl: './overview-candle-stick.component.html',
  styleUrls: ['./overview-candle-stick.component.scss']
})
export class OverviewCandleStickComponent implements OnInit, OnDestroy, AfterViewInit {
  mode: string;
  coinData: any;
  historycalData = [];
  onlyDates = [];
  coinId = '';
  coinDescriptions: any;
  private id: string;
  private chart: am4charts.XYChart;
  convertValue = 1;
  currencyString = 'usd';
  Open = '';
  constructor( @Inject(PLATFORM_ID) private platformId: object,     private activeRoute: ActivatedRoute , private apiServices: ApiservicesService , private zone: NgZone , private translate: TranslateService) {
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.activeRoute.params.subscribe(routeParams => {
        this.synchData(routeParams.id);
      });
      this.convertValue = parseFloat(localStorage.getItem('localCurrencyValue'));
      this.currencyString = localStorage.getItem('localCurrencyFormat');
      this.apiServices.currentMessage.subscribe(message => this.mode = message);
    }
  }
  synchData(id) {
    if (isPlatformBrowser(this.platformId)) {
      this.apiServices.getCoin(id).subscribe((res) => {
        // @ts-ignore
        this.coinData = res.data;
        // @ts-ignore
        this.coinDescriptions = res.descript;
        // @ts-ignore
        this.coinId = res.data._id;
        this.apiServices.getLineChart(this.coinId).subscribe(resc => {
        });
      }, () => {
      }, () => {
        if (isPlatformBrowser(this.platformId)) {
          this.zone.runOutsideAngular(() => {
            am4core.useTheme(am4themes_animated);
// Themes end
            const chart = am4core.create('chartdiv2', am4charts.XYChart);
            chart.paddingRight = 20;

            chart.dateFormatter.inputDateFormat = 'yyyy-MM-dd';

            const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
            dateAxis.renderer.grid.template.location = 0;

            const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
            valueAxis.tooltip.disabled = true;

            const series = chart.series.push(new am4charts.CandlestickSeries());
            series.dataFields.dateX = 'date';
            series.dataFields.valueY = 'close';
            series.dataFields.openValueY = 'open';
            series.dataFields.lowValueY = 'low';
            series.dataFields.highValueY = 'high';
            series.tooltipText = '[bold]Open[/]: ${openValueY.value}\n[bold]Low[/]: ${lowValueY.value}\n[bold]High[/]: ${highValueY.value}\n[bold]Close[/]: ${valueY.value}';
// important!
// candlestick series colors are set in states.
            series.riseFromOpenState.properties.fill = am4core.color('#84e666');
            series.dropFromOpenState.properties.fill = am4core.color('#ff3023');
            series.riseFromOpenState.properties.fill = am4core.color('#84e666');
            series.dropFromOpenState.properties.stroke = am4core.color('#ff3023');
            series.tooltip.getFillFromObject = false;
            series.tooltip.background.fill = am4core.color('rgba(0,0,0,0.73)');

            series.riseFromPreviousState.properties.fillOpacity = 1;
            series.dropFromPreviousState.properties.fillOpacity = 1;
            valueAxis.title.fill = am4core.color('#939393');
            chart.cursor = new am4charts.XYCursor();

// a separate series for scrollbar
            const lineSeries = chart.series.push(new am4charts.LineSeries());
            lineSeries.dataFields.dateX = 'date';
            lineSeries.dataFields.valueY = 'close';
// need to set on default state, as initially series is "show"
            lineSeries.defaultState.properties.visible = false;
            const takeWidth = window.innerWidth;
// hide from legend too (in case there is one)

            lineSeries.hiddenInLegend = true;
            lineSeries.fillOpacity = 0.5;
            lineSeries.strokeOpacity = 0.5;
            valueAxis.renderer.labels.template.fill = am4core.color('#857d81');
            dateAxis.renderer.labels.template.fill = am4core.color('#857d81');
            valueAxis.renderer.grid.template.stroke = am4core.color('#9c9c9c');
            dateAxis.renderer.grid.template.stroke = am4core.color('#9c9c9c');
            if (takeWidth >= 768) {
              valueAxis.title.text = '[font-size: 15px]Price (USD)[/]';
            }

            const scrollbarX = new am4charts.XYChartScrollbar();
            scrollbarX.series.push(lineSeries);
            chart.scrollbarX = scrollbarX;

            if (takeWidth <= 768) {
              chart.scrollbarX.start = 0.8;
            }

            this.activeRoute.params.subscribe(routeParams => {
              this.apiServices.getCoin(routeParams.id).subscribe(rest => {
                // @ts-ignore
                this.coinId = rest.data._id;
                this.apiServices.getCoinHistory(this.coinId).subscribe(res => {
                  // @ts-ignore
                  chart.data = res.data.reverse();
                });
              });
            });
          });
        }
      });
    }
  }
  TranslationChanges() {
    this.translate.get('Open').subscribe((text: string) => {this.Open = text; });
  }
  ngAfterViewInit() {
    {

    }
  }
  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }
}
