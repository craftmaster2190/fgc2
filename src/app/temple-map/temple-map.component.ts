import {
  AfterViewInit,
  Component,
  ElementRef,
  NgZone,
  OnInit,
  ViewChild,
} from '@angular/core';
import { arrayEquals, englishAndJoin } from '../../util/arrays';

type VectorMapInit = JQuery & {
  vectorMap: (addMap: 'addMap', mapName: string, mapContent: any) => JQuery;
};
type VectorMap = JQuery & {
  vectorMap: (options: any) => JQuery;
};

@Component({
  selector: 'app-temple-map',
  templateUrl: './temple-map.component.html',
  styleUrls: ['./temple-map.component.scss'],
})
export class TempleMapComponent implements OnInit, AfterViewInit {
  @ViewChild('map') public mapElement: ElementRef;
  private mapObject;
  private selectedRegions = [];
  private readonly regionNames: { [key: string]: string } = {};

  public constructor(private readonly ngZone: NgZone) {}

  public ngOnInit(): void {}

  public ngAfterViewInit(): void {
    this.ngZone.runOutsideAngular(() => {
      jQuery(async () => {
        const mapName = 'world-merc';
        const mapData = await import('jvectormap-content/' + mapName);

        (jQuery.fn as VectorMapInit).vectorMap(
          'addMap',
          mapName,
          mapData.default
        );

        Object.keys(mapData.default.paths).map((key) => {
          this.regionNames[key] = mapData.default.paths[key].name;
        });

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
          onRegionSelected: (
            event: Event,
            code: string | undefined,
            isSelected: boolean,
            selectedRegions: Array<string>
          ) => {
            this.updateSelectedRegions(selectedRegions);
          },
        });

        this.mapObject = mapDiv
          .children('.jvectormap-container')
          .data('mapObject');
      });
    });
  }

  public updateSelectedRegions(regions: Array<string>): void {
    this.ngZone.runOutsideAngular(() => {
      if (arrayEquals(regions, this.selectedRegions)) {
        return;
      }
      regions = regions.slice().sort();

      this.mapObject.setSelectedRegions(regions);
      this.ngZone.run(() => (this.selectedRegions = regions));
    });
  }

  public getSelectedRegionNames(): string {
    return englishAndJoin(
      this.selectedRegions.map((regionKey) => this.regionNames[regionKey])
    );
  }
}
