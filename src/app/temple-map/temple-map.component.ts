import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { arrayEquals, englishAndJoin } from '../../util/arrays';
import { ReplaySubject, Subject } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { map, switchMap, tap } from 'rxjs/operators';
import { transpose } from '../../util/objects';
import { StringMap } from '@angular/compiler/src/compiler_facade_interface';

type VectorMapInit = JQuery & {
  vectorMap: (addMap: 'addMap', mapName: string, mapContent: any) => JQuery;
};
type VectorMap = JQuery & {
  vectorMap: (options: any) => JQuery;
};

const MAX_REGIONS = 5;

@UntilDestroy()
@Component({
  selector: 'app-temple-map',
  templateUrl: './temple-map.component.html',
  styleUrls: ['./temple-map.component.scss'],
})
export class TempleMapComponent implements OnChanges, AfterViewInit, OnDestroy {
  @ViewChild('map') public mapElement: ElementRef;
  @Input() public mode: 'world' | 'usa';
  @Input() public selectedRegionNames: Array<string>;
  @Output() public selectedRegionNamesChange = new EventEmitter<
    Array<string>
  >();
  private mapObject;
  private selectedRegions = [];
  private readonly regionKeys2RegionNames: StringMap = {};
  private readonly regionNames2RegionKeys: StringMap = {};
  private readonly initComplete = new ReplaySubject<null>(1);
  private readonly onChangeSelectedRegionNames = new Subject<Array<string>>();
  private readonly onChangeSelectedRegionsNamesSubscription = this.onChangeSelectedRegionNames
    .pipe(
      untilDestroyed(this),
      switchMap((value) => this.initComplete.pipe(map(() => value))),
      tap((value) => this.inputUpdateSelectedRegions(value))
    )
    .subscribe();

  public constructor(private readonly ngZone: NgZone) {}

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.mode && !changes.mode.isFirstChange()) {
      throw new Error('Not permitted to change mode!');
    }

    if (changes.selectedRegionNames) {
      this.onChangeSelectedRegionNames.next(this.selectedRegionNames);
    }
  }

  public ngOnDestroy(): void {
    this.mapObject.destroy();
  }

  public ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      jQuery(async () => {
        const mapName = this.mode === 'world' ? 'world-merc' : 'us-merc';
        const mapData = await import('jvectormap-content/' + mapName);

        (jQuery.fn as VectorMapInit).vectorMap(
          'addMap',
          mapName,
          mapData.default
        );

        Object.keys(mapData.default.paths).map((key) => {
          this.regionKeys2RegionNames[key] = mapData.default.paths[key].name;
        });

        Object.assign(
          this.regionNames2RegionKeys,
          transpose(this.regionKeys2RegionNames)
        );

        const mapDiv = (jQuery(
          this.mapElement.nativeElement
        ) as VectorMap).vectorMap({
          map: mapName,
          regionsSelectable: true,
          regionStyle: {
            hover: {
              cursor: 'pointer',
            },
            selected: {
              fill: 'blue',
            },
          },
          series: {
            regions: [
              {
                scale: ['#FF0000', '#FF0000'],
                values: { US: 0 },
                attribute: 'fill',
                min: 0,
                max: 1,
              },
            ],
          },
          onRegionTipShow: (event, element, regionCode) => {
            if (regionCode === 'US') {
              element.html(element.html() + ' is disabled.');
            }
          },
          onRegionSelected: (
            event: Event,
            code: string | undefined,
            isSelected: boolean,
            selectedRegions: Array<string>
          ) => {
            this.mapUpdateSelectedRegions(this.removeAmerica(selectedRegions));
          },
        });

        this.mapObject = mapDiv
          .children('.jvectormap-container')
          .data('mapObject');

        this.initComplete.next(null);
      });
    });
  }

  public inputUpdateSelectedRegions(regionNames: Array<string>): void {
    this.ngZone.run(() => {
      this.selectedRegions = regionNames.map(
        (regionName) => this.regionNames2RegionKeys[regionName]
      );
      this.ngZone.runOutsideAngular(() =>
        this.mapObject.setSelectedRegions(this.selectedRegions)
      );
    });
  }

  public mapUpdateSelectedRegions(regions: Array<string>): void {
    this.ngZone.runOutsideAngular(() => {
      if (arrayEquals(regions, this.selectedRegions)) {
        return;
      }
      regions = regions.slice().sort();

      this.mapObject.setSelectedRegions(regions);
      this.ngZone.run(() => {
        this.selectedRegions = regions;
        this.selectedRegionNamesChange.emit(
          this.selectedRegions.map(
            (regionKey) => this.regionKeys2RegionNames[regionKey]
          )
        );
      });
    });
  }

  public getSelectedRegionNames(): string {
    return englishAndJoin(
      this.selectedRegions.map(
        (regionKey) => this.regionKeys2RegionNames[regionKey]
      )
    );
  }

  private removeAmerica(regions: Array<string>): Array<string> {
    const index = regions.findIndex((regionCode) => regionCode === 'US');
    if (index > -1) {
      regions.splice(index, 1);
      this.mapObject.clearSelectedRegions();
      this.mapObject.setSelectedRegions(regions);
    }
    return regions;
  }
}
