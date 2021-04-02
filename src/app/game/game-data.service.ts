import { Injectable } from '@angular/core';
import { Session, Sessions } from '../data/session';
import { TieColor, TieColors } from '../data/tie-color';
import { randomElement } from '../../util/arrays';
import { ChoirColors } from '../data/choir-color';

export interface PersonData {
  name: string;
  src: string;
  session?: Session;
  tieColor?: TieColor;
}

export type PersonNames =
  | 'henryBEyring'
  | 'dallinHOaks'
  | 'russellMNelson'
  | 'mRussellBallard'
  | 'jeffreyRHolland'
  | 'dieterFUchtdorf'
  | 'davidABednar'
  | 'quentinLCook'
  | 'dToddChristofferson'
  | 'neilLAndersen'
  | 'ronaldARasband'
  | 'garyEStevenson'
  | 'daleGRenlund'
  | 'gerritWGong'
  | 'ulissesSoarses';
export type PersonCorrectsValuesData = Record<
  'sessionName' | 'tieColor',
  Set<string>
>;
export type PersonCorrectsData = Record<PersonNames, PersonCorrectsValuesData>;
export type ChoirCorrectsValuesData = Record<'choirColor', Set<string>>;
export type ChoirCorrectsData = Record<
  'choir',
  Record<Session, ChoirCorrectsValuesData>
>;
export type SongCorrectsData = Record<'songs', Set<string>>;
export type TempleCorrectsData = Record<'temple', Set<string>>;

export type CorrectsData = Partial<
  PersonCorrectsData & ChoirCorrectsData & SongCorrectsData & TempleCorrectsData
>;

@Injectable({
  providedIn: 'root',
})
export class GameDataService {
  public answers = {
    // cSpell: disable
    firstPresidency: {
      henryBEyring: {
        name: 'henryBEyring',
        src: 'assets/people/firstPresidency/henryBEyring.jpg',
      } as PersonData,
      dallinHOaks: {
        name: 'dallinHOaks',
        src: 'assets/people/firstPresidency/dallinHOaks.jpg',
      } as PersonData,
      russellMNelson: {
        name: 'russellMNelson',
        src: 'assets/people/firstPresidency/russellMNelson.jpg',
      } as PersonData,
    },
    apostles: {
      quentinLCook: {
        name: 'quentinLCook',
        src: 'assets/people/apostles/quentinLCook.jpg',
      } as PersonData,
      dieterFUchtdorf: {
        name: 'dieterFUchtdorf',
        src: 'assets/people/apostles/dieterFUchtdorf.jpg',
      } as PersonData,
      ulissesSoarses: {
        name: 'ulissesSoarses',
        src: 'assets/people/apostles/ulissesSoarses.jpg',
      } as PersonData,
      davidABednar: {
        name: 'davidABednar',
        src: 'assets/people/apostles/davidABednar.jpg',
      } as PersonData,
      mRussellBallard: {
        name: 'mRussellBallard',
        src: 'assets/people/apostles/mRussellBallard.jpg',
      } as PersonData,
      dToddChristofferson: {
        name: 'dToddChristofferson',
        src: 'assets/people/apostles/dToddChristofferson.jpg',
      } as PersonData,
      gerritWGong: {
        name: 'gerritWGong',
        src: 'assets/people/apostles/gerritWGong.jpg',
      } as PersonData,
      ronaldARasband: {
        name: 'ronaldARasband',
        src: 'assets/people/apostles/ronaldARasband.jpg',
      } as PersonData,
      neilLAndersen: {
        name: 'neilLAndersen',
        src: 'assets/people/apostles/neilLAndersen.jpg',
      } as PersonData,
      garyEStevenson: {
        name: 'garyEStevenson',
        src: 'assets/people/apostles/garyEStevenson.jpg',
      } as PersonData,
      daleGRenlund: {
        name: 'daleGRenlund',
        src: 'assets/people/apostles/daleGRenlund.jpg',
      } as PersonData,
      jeffreyRHolland: {
        name: 'jeffreyRHolland',
        src: 'assets/people/apostles/jeffreyRHolland.jpg',
      } as PersonData,
    },
    presidencySeventy: {
      robertCGay: {
        name: 'robertCGay',
        src: 'assets/people/presidencySeventy/robertCGay.jpg',
      } as PersonData,
      patrickKearon: {
        name: 'patrickKearon',
        src: 'assets/people/presidencySeventy/patrickKearon.jpg',
      } as PersonData,
      joseATeixeira: {
        name: 'joseATeixeira',
        src: 'assets/people/presidencySeventy/joseATeixeira.jpg',
      } as PersonData,
      terenceMVinson: {
        name: 'terenceMVinson',
        src: 'assets/people/presidencySeventy/terenceMVinson.jpg',
      } as PersonData,
      brentHNielson: {
        name: 'brentHNielson',
        src: 'assets/people/presidencySeventy/brentHNielson.jpg',
      } as PersonData,
      carlosAGodoy: {
        name: 'carlosAGodoy',
        src: 'assets/people/presidencySeventy/carlosAGodoy.jpg',
      } as PersonData,
      carlBCook: {
        name: 'carlBCook',
        src: 'assets/people/presidencySeventy/carlBCook.jpg',
      } as PersonData,
    },
    presidingBishopric: {
      deanMDavies: {
        name: 'deanMDavies',
        src: 'assets/people/presidingBishopric/deanMDavies.jpg',
      } as PersonData,
      wChristopherWaddell: {
        name: 'wChristopherWaddell',
        src: 'assets/people/presidingBishopric/wChristopherWaddell.jpg',
      } as PersonData,
      geraldCausse: {
        name: 'geraldCausse',
        src: 'assets/people/presidingBishopric/geraldCausse.jpg',
      } as PersonData,
    },
    reliefSociety: {
      jeanBBingham: {
        name: 'jeanBBingham',
        src: 'assets/people/reliefSociety/jeanBBingham.jpg',
      } as PersonData,
      reynaIAburto: {
        name: 'reynaIAburto',
        src: 'assets/people/reliefSociety/reynaIAburto.jpg',
      } as PersonData,
      sharonEubank: {
        name: 'sharonEubank',
        src: 'assets/people/reliefSociety/sharonEubank.jpg',
      } as PersonData,
    },
    youngWomen: {
      michelleCraig: {
        name: 'michelleCraig',
        src: 'assets/people/youngWomen/michelleCraig.jpg',
      } as PersonData,
      beckyCraven: {
        name: 'beckyCraven',
        src: 'assets/people/youngWomen/beckyCraven.jpg',
      } as PersonData,
      bonnieHCordon: {
        name: 'bonnieHCordon',
        src: 'assets/people/youngWomen/bonnieHCordon.jpg',
      } as PersonData,
    },
    youngMen: {
      ahmadCorbitt: {
        name: 'ahmadCorbitt',
        src: 'assets/people/youngMen/ahmadCorbitt.jpg',
      } as PersonData,
      bradleyRWilcox: {
        name: 'bradleyRWilcox',
        src: 'assets/people/youngMen/bradleyRWilcox.jpg',
      } as PersonData,
      stevenJLund: {
        name: 'stevenJLund',
        src: 'assets/people/youngMen/stevenJLund.jpg',
      } as PersonData,
    },
    primary: {
      lisaLHarkness: {
        name: 'lisaLHarkness',
        src: 'assets/people/primary/lisaLHarkness.jpg',
      } as PersonData,
      cristinaBFranco: {
        name: 'cristinaBFranco',
        src: 'assets/people/primary/cristinaBFranco.jpg',
      } as PersonData,
      joyDJones: {
        name: 'joyDJones',
        src: 'assets/people/primary/joyDJones.jpg',
      } as PersonData,
    },
    sundaySchool: {
      markLPace: {
        name: 'markLPace',
        src: 'assets/people/sundaySchool/markLPace.jpg',
      } as PersonData,
      miltonCamargo: {
        name: 'miltonCamargo',
        src: 'assets/people/sundaySchool/miltonCamargo.jpg',
      } as PersonData,
      janENewman: {
        name: 'janENewman',
        src: 'assets/people/sundaySchool/janENewman.jpg',
      } as PersonData,
    },
    // cSpell: enable
    choirColors: {
      [Session.SaturdayMorningSession]: randomElement(ChoirColors),
      [Session.SaturdayAfternoonSession]: randomElement(ChoirColors),
      [Session.PriesthoodSession]: randomElement(ChoirColors),
      [Session.SundayMorningSession]: randomElement(ChoirColors),
      [Session.SundayAfternoonSession]: randomElement(ChoirColors),
    },
    selectedHymns: [] as Array<string>,
    newTemples: {
      world: [] as Array<string>,
      usa: [] as Array<string>,
    },
  };

  public corrects: CorrectsData = {};

  public scores: Array<{
    score: number;
    username: string;
  }> = [];

  public constructor() {
    [
      'firstPresidency',
      'apostles',
      'presidencySeventy',
      'presidingBishopric',
      'reliefSociety',
      'youngWomen',
      'youngMen',
      'primary',
      'sundaySchool',
    ].map((category) =>
      Object.values(this.answers[category]).map((name: PersonData) => {
        name.session = randomElement(Sessions);
        name.tieColor = randomElement(TieColors);
      })
    );
  }
}
