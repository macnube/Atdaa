

const Icons = {
  empty: {
    id: 'empty',
    type: 'special',
    imageURI: 'addTagLight'},
  openButton: {
    id: 'openButton',
    type: 'special',
    imageURI: 'openButton'},
  trash: {
    id: 'trash',
    type: 'special',
    imageURI: 'trash'},

  //Categories

  beer: {
    id: 'beer',
    type: 'category',
    name: 'Beer',
    imageURI: 'beer',
    iconColor: 'rgb(242,185,105)',
  },
  food: {
    id: 'food',
    type: 'note',
    name: 'Food',
    imageURI: 'food',
    iconColor: 'rgb(150,228,228)'
  },
  livemusic: {
    id: 'livemusic',
    type: 'category',
    name: 'Live Music',
    imageURI: 'livemusic',
    iconColor: 'rgb(180,133,187)',
  },
  cocktail: {
    id: 'cocktail',
    type: 'category',
    name: 'Cocktail',
    imageURI: 'cocktail',
    iconColor: 'rgb(241,129,165)',
  },
  wine: {
    id: 'wine',
    type: 'category',
    name: 'Wine',
    imageURI: 'wine',
    iconColor: 'rgb(180,96,125)',
  },
  dj: {
    id: 'dj',
    type: 'category',
    name: 'DJ',
    imageURI: 'dj',
    iconColor: 'rgb(180,133,187)',
  },
  coffee: {
    id: 'coffee',
    type: 'category',
    name: 'Coffee',
    imageURI: 'coffee',
    iconColor: 'rgb(210,178,138)',
  },
  /*
  atmosphere: {
    id: 'atmosphere',
    type: 'category',
    name: 'Atmosphere',
    imageURI: 'atmosphere',
    iconColor: 'rgb(247,154,84)',
  },
  */

  //Atmosphere tags
  /*
  dancing: {
    id: 'dancing',
    type: 'tag',
    name: 'Dancing',
    imageURI: 'atmosphere'
  },
  happy_hour: {
    id: 'happy_hour',
    type: 'tag',
    name: 'Happy Hour',
    imageURI: 'atmosphere'
  },
  socializing: {
    id: 'socializing',
    type: 'tag',
    name: 'Socializing',
    imageURI: 'atmosphere'
  },
  dating: {
    id: 'dating',
    type: 'tag',
    name: 'Dating',
    imageURI: 'atmosphere'
  },
  people_watching: {
    id: 'people_watching',
    type: 'tag',
    name: 'People Watching',
    imageURI: 'atmosphere'
  },
  beer_garden: {
    id: 'beer_garden',
    type: 'tag',
    name: 'Beer Garden',
    imageURI: 'atmosphere'
  },
  milonga_atmosphere: {
    id: 'milonga_atmosphere',
    type: 'tag',
    name: 'Milonga',
    imageURI: 'atmosphere'
  },
  */

  //Cofee Tags
  capuccino: {
    id: 'capuccino',
    type: 'tag',
    name: 'Capuccino',
    imageURI: 'coffee'
  },
  latte: {
    id: 'latte',
    type: 'tag',
    name: 'Latte',
    imageURI: 'coffee'
  },
  aeropress: {
    id: 'aeropress',
    type: 'tag',
    name: 'Aero-Press',
    imageURI: 'coffee'
  },
  french_press: {
    id: 'french_press',
    type: 'tag',
    name: 'French Press',
    imageURI: 'coffee'
  },
  espresso: {
    id: 'espresso',
    type: 'tag',
    name: 'Espresso',
    imageURI: 'coffee'
  },
  americano: {
    id: 'americano',
    type: 'tag',
    name: 'Americano',
    imageURI: 'coffee'
  },
  cold_brew: {
    id: 'cold_brew',
    type: 'tag',
    name: 'Cold Brew',
    imageURI: 'coffee'
  },
  turkish_coffee: {
    id: 'turkish_coffee',
    type: 'tag',
    name: 'Turkish Coffee',
    imageURI: 'coffee'
  },
  cortado: {
    id: 'cortado',
    type: 'tag',
    name: 'Cortado',
    imageURI: 'coffee'
  },
  macchiato: {
    id: 'macchiatto',
    type: 'tag',
    name: 'Macchiato',
    imageURI: 'coffee'
  },

  //DJ Tags
  house: {
    id: 'house',
    type: 'tag',
    name: 'House',
    imageURI: 'dj'
  },
  techno: {
    id: 'techno',
    type: 'tag',
    name: 'Techno',
    imageURI: 'dj'
  },
  deep_house: {
    id: 'deep_house',
    type: 'tag',
    name: 'Deep House',
    imageURI: 'dj'
  },
  disco: {
    id: 'disco',
    type: 'tag',
    name: 'Disco',
    imageURI: 'dj'
  },
  eighties: {
    id: 'eighties',
    type: 'tag',
    name: '80s',
    imageURI: 'dj'
  },
  dubstep: {
    id: 'dubstep',
    type: 'tag',
    name: 'Dubstep',
    imageURI: 'dj'
  },
  hiphop: {
    id: 'hiphop',
    type: 'tag',
    name: 'Hiphop',
    imageURI: 'dj'
  },
  rave: {
    id: 'rave',
    type: 'tag',
    name: 'Rave',
    imageURI: 'dj'
  },

  //Wine Tags
  merlot: {
    id: 'merlot',
    type: 'tag',
    name: 'Merlot',
    imageURI: 'wine'
  },
  chardonney: {
    id: 'chardonney',
    type: 'tag',
    name: 'Chardonney',
    imageURI: 'wine'
  },
  zinfandel: {
    id: 'zinfandel',
    type: 'tag',
    name: 'Zinfandel',
    imageURI: 'wine'
  },
  malbec: {
    id: 'malbec',
    type: 'tag',
    name: 'Malbec',
    imageURI: 'wine'
  },
  bonarda: {
    id: 'bonarda',
    type: 'tag',
    name: 'Bonarda',
    imageURI: 'wine'
  },
  cabernet_sauvignon: {
    id: 'cabernet_sauvignon',
    type: 'tag',
    name: 'Cabernet Sauvignon',
    imageURI: 'wine'
  },
  syrah: {
    id: 'syrah',
    type: 'tag',
    name: 'Syrah',
    imageURI: 'wine'
  },
  tempranillo: {
    id: 'tempranillo',
    type: 'tag',
    name: 'Tempranillo',
    imageURI: 'wine'
  },
  pinot_noir: {
    id: 'pinot_noir',
    type: 'tag',
    name: 'Pinot Noir',
    imageURI: 'wine'
  },


  //Cocktail Tags
  mojito: {
    id: 'mojito',
    type: 'tag',
    name: 'Mojito',
    imageURI: 'cocktail'
  },
  ginTonic: {
    id: 'ginTonic',
    type: 'tag',
    name: 'Gin & Tonic',
    imageURI: 'cocktail'
  },
  sangria: {
    id: 'sangria',
    type: 'tag',
    name: 'Sangria',
    imageURI: 'cocktail'
  },
  martini: {
    id: 'martini',
    type: 'tag',
    name: 'Martini',
    imageURI: 'cocktail'
  },
  margarita: {
    id: 'margarita',
    type: 'tag',
    name: 'Margarita',
    imageURI: 'cocktail'
  },
  whiskey_sour: {
    id: 'whiskey_sour',
    type: 'tag',
    name: 'Whiskey Sour',
    imageURI: 'cocktail'
  },
  manhattan: {
    id: 'manhattan',
    type: 'tag',
    name: 'Manhattan',
    imageURI: 'cocktail'
  },
  highball: {
    id: 'highball',
    type: 'tag',
    name: 'Highball',
    imageURI: 'cocktail'
  },
  cosmopolitan: {
    id: 'cosmopolitan',
    type: 'tag',
    name: 'Cosmopolitan',
    imageURI: 'cocktail'
  },
  mint_julep: {
    id: 'mint_julep',
    type: 'tag',
    name: 'Mint Julep',
    imageURI: 'cocktail'
  },
  bloody_mary: {
    id: 'bloody_mary',
    type: 'tag',
    name: 'Bloody Mary',
    imageURI: 'cocktail'
  },
  fizz: {
    id: 'fizz',
    type: 'tag',
    name: 'Fizz',
    imageURI: 'cocktail'
  },
  sidecar: {
    id: 'sidecar',
    type: 'tag',
    name: 'Sidecar',
    imageURI: 'cocktail'
  },
  gimlet: {
    id: 'gimlet',
    type: 'tag',
    name: 'Gimlet',
    imageURI: 'cocktail'
  },
  negroni: {
    id: 'negroni',
    type: 'tag',
    name: 'Negroni',
    imageURI: 'cocktail'
  },
  daiquiri: {
    id: 'daiquiri',
    type: 'tag',
    name: 'Daiquiri',
    imageURI: 'cocktail'
  },
  french_75: {
    id: 'french_75',
    type: 'tag',
    name: 'French 75',
    imageURI: 'cocktail'
  },
  cuba_libre: {
    id: 'cuba_libre',
    type: 'tag',
    name: 'Cuba Libre',
    imageURI: 'cocktail'
  },
  sazerac: {
    id: 'sazerac',
    type: 'tag',
    name: 'Sazerac',
    imageURI: 'cocktail'
  },
  pina_colada: {
    id: 'pina_colada',
    type: 'tag',
    name: 'Pina Colada',
    imageURI: 'cocktail'
  },
  white_russian: {
    id: 'white_russian',
    type: 'tag',
    name: 'White Russian',
    imageURI: 'cocktail'
  },
  mai_tai: {
    id: 'mai_tai',
    type: 'tag',
    name: 'Mai Tai',
    imageURI: 'cocktail'
  },
  champagnai_cocktail: {
    id: 'champagnai_cocktail',
    type: 'tag',
    name: 'Champagnai Cocktail',
    imageURI: 'cocktail'
  },
  caiprinha: {
    id: 'caiprinha',
    type: 'tag',
    name: 'Caiprinha',
    imageURI: 'cocktail'
  },
  long_island_iced_tea: {
    id: 'long_island_iced_tea',
    type: 'tag',
    name: 'Long Island Iced Tea',
    imageURI: 'cocktail'
  },
  vodka_martini: {
    id: 'vodka_martini',
    type: 'tag',
    name: 'Vodka Martini',
    imageURI: 'cocktail'
  },
  screwdriver: {
    id: 'screwdriver',
    type: 'tag',
    name: 'Screwdriver',
    imageURI: 'cocktail'
  },
  hot_toddy: {
    id: 'hot_toddy',
    type: 'tag',
    name: 'Hot Toddy',
    imageURI: 'cocktail'
  },
  irish_coffee: {
    id: 'irish_coffee',
    type: 'tag',
    name: 'Irish Coffee',
    imageURI: 'cocktail'
  },
  planters_punch: {
    id: 'planters_punch',
    type: 'tag',
    name: 'Planters Punch',
    imageURI: 'cocktail'
  },
  moscow_mule: {
    id: 'moscow_mule',
    type: 'tag',
    name: 'Moscow Mule',
    imageURI: 'cocktail'
  },
  mimosa: {
    id: 'mimosa',
    type: 'tag',
    name: 'Mimosa',
    imageURI: 'cocktail'
  },
  alexander: {
    id: 'alexander',
    type: 'tag',
    name: 'Alexander',
    imageURI: 'cocktail'
  },
  tequila_sunrise: {
    id: 'tequila_sunrise',
    type: 'tag',
    name: 'Tequila Sunrise',
    imageURI: 'cocktail'
  },
  rickey: {
    id: 'rickey',
    type: 'tag',
    name: 'Rickey',
    imageURI: 'cocktail'
  },
  zombie: {
    id: 'zombie',
    type: 'tag',
    name: 'Zombie',
    imageURI: 'cocktail'
  },
  gibson: {
    id: 'gibson',
    type: 'tag',
    name: 'Gibson',
    imageURI: 'cocktail'
  },
  singapore_sling: {
    id: 'singapore_sling',
    type: 'tag',
    name: 'Singapore Sling',
    imageURI: 'cocktail'
  },
  sea_breeze: {
    id: 'sea_breeze',
    type: 'tag',
    name: 'Sea Breeze',
    imageURI: 'cocktail'
  },
  brandy_alexander: {
    id: 'brandy_alexander',
    type: 'tag',
    name: 'Brandy Alexander',
    imageURI: 'cocktail'
  },
  sex_on_the_beach: {
    id: 'sex_on_the_beach',
    type: 'tag',
    name: 'Sex On The Beach',
    imageURI: 'cocktail'
  },
  cape_cod: {
    id: 'cape_cod',
    type: 'tag',
    name: 'Cape Cod',
    imageURI: 'cocktail'
  },
  pisco_sour: {
    id: 'pisco_sour',
    type: 'tag',
    name: 'Pisco Sour',
    imageURI: 'cocktail'
  },
  bellini: {
    id: 'bellini',
    type: 'tag',
    name: 'Bellini',
    imageURI: 'cocktail'
  },
  appletini: {
    id: 'appletini',
    type: 'tag',
    name: 'Appletini',
    imageURI: 'cocktail'
  },
  b52: {
    id: 'b52',
    type: 'tag',
    name: 'B-52',
    imageURI: 'cocktail'
  },
  hurricane: {
    id: 'hurricane',
    type: 'tag',
    name: 'Hurricane',
    imageURI: 'cocktail'
  },
  wine_cocktail: {
    id: 'wine_cocktail',
    type: 'tag',
    name: 'Wine Cocktail',
    imageURI: 'cocktail'
  },
  whiskeyGinger: {
    id: 'whiskeyGinger',
    type: 'tag',
    name: 'Whiskey Ginger',
    imageURI: 'cocktail'
  },
  oldFashioned: {
    id: 'oldFashioned',
    type: 'tag',
    name: 'Old Fashioned',
    imageURI: 'cocktail'
  },

  //Live Music Tags
  milonga: {
    id: 'milonga',
    type: 'tag',
    name: 'Milonga',
    imageURI: 'livemusic'
  },
  rock: {
    id: 'rock',
    type: 'tag',
    name: 'Rock',
    imageURI: 'livemusic'
  },
  concert: {
    id: 'concert',
    type: 'tag',
    name: 'Concert',
    imageURI: 'livemusic'
  },
  jazz: {
    id: 'jazz',
    type: 'tag',
    name: 'Jazz',
    imageURI: 'livemusic'
  },

  //Fingerfood Tags
  hot_dog: {
    id: 'hot_dog',
    type: 'tag',
    name: 'Hot Dog',
    imageURI: 'fingerfood'
  },
  nachos: {
    id: 'nachos',
    type: 'tag',
    name: 'Nachos',
    imageURI: 'fingerfood'
  },
  sandwich: {
    id: 'sandwich',
    type: 'tag',
    name: 'Sandwich',
    imageURI: 'fingerfood'
  },
  french_fries: {
    id: 'french_fries',
    type: 'tag',
    name: 'French Fries',
    imageURI: 'fingerfood'
  },
  tarta: {
    id: 'tarta',
    type: 'tag',
    name: 'Tarta',
    imageURI: 'fingerfood'
  },
  tortilla_espanola: {
    id: 'tortilla_espanola',
    type: 'tag',
    name: 'Tortilla Espanola',
    imageURI: 'fingerfood'
  },
  popcorn: {
    id: 'popcorn',
    type: 'tag',
    name: 'Popcorn',
    imageURI: 'fingerfood'
  },
  pizza: {
    id: 'pizza',
    type: 'tag',
    name: 'Pizza',
    imageURI: 'fingerfood'
  },
  empanada: {
    id: 'empanada',
    type: 'tag',
    name: 'Empanada',
    imageURI: 'fingerfood'
  },
  picada: {
    id: 'picada',
    type: 'tag',
    name: 'Picada',
    imageURI: 'fingerfood'
  },
  choripan: {
    id: 'choripan',
    type: 'tag',
    name: 'Choripan',
    imageURI: 'fingerfood'
  },
  churrasco: {
    id: 'churrasco',
    type: 'tag',
    name: 'Churrasco',
    imageURI: 'fingerfood'
  },
  humita: {
    id: 'humita',
    type: 'tag',
    name: 'Humita',
    imageURI: 'fingerfood'
  },


  //Beer Tags
  ipa: {
    id: 'ipa',
    type: 'tag',
    name: 'India Pale Ale',
    abName: 'IPA',
    imageURI: 'beer'
  },
  double_ipa: {
    id: 'double_ipa',
    type: 'tag',
    name: 'Double India Pale Ale',
    abName: 'Double IPA',
    imageURI: 'beer'
  },
  brown_ale: {
    id: 'brown_ale',
    type: 'tag',
    name: 'Brown Ale',
    imageURI: 'beer'
  },
  pale_ale: {
    id: 'pale_ale',
    type: 'tag',
    name: 'Pale Ale',
    imageURI: 'beer'
  },
  lager: {
    id: 'lager',
    type: 'tag',
    name: 'Lager',
    imageURI: 'beer'
  },
  pilsner: {
    id: 'pilsner',
    type: 'tag',
    name: 'Pilsner',
    imageURI: 'beer'
  },
  amber_ale: {
    id: 'amber_ale',
    type: 'tag',
    name: 'Amber Ale',
    imageURI: 'beer'
  },
  blonde_ale: {
    id: 'blonde_ale',
    type: 'tag',
    name: 'Blonde Ale',
    imageURI: 'beer'
  },
  hefe: {
    id: 'hefe',
    type: 'tag',
    name: 'Hefe',
    imageURI: 'beer'
  },
  weiss_beer: {
    id: 'weiss_beer',
    type: 'tag',
    name: 'Weiss Beer',
    imageURI: 'beer'
  },
  bitter: {
    id: 'bitter',
    type: 'tag',
    name: 'Bitter',
    imageURI: 'beer'
  },
  bock: {
    id: 'bock',
    type: 'tag',
    name: 'Bock',
    imageURI: 'beer'
  },
  cream_ale: {
    id: 'cream_ale',
    type: 'tag',
    name: 'Cream Ale',
    imageURI: 'beer'
  },
  doppelbock: {
    id: 'doppelbock',
    type: 'tag',
    name: 'Doppelbock',
    imageURI: 'beer'
  },
  dunkel: {
    id: 'dunkel',
    type: 'tag',
    name: 'Dunkel',
    imageURI: 'beer'
  },
  eisbock: {
    id: 'eisbock',
    type: 'tag',
    name: 'Eisbock',
    imageURI: 'beer'
  },
  golden_ale: {
    id: 'golden_ale',
    type: 'tag',
    name: 'Golden Ale',
    imageURI: 'beer'
  },
  kölsch: {
    id: 'kölsch',
    type: 'tag',
    name: 'Kölsch',
    imageURI: 'beer'
  },
  lambic: {
    id: 'lambic',
    type: 'tag',
    name: 'Lambic',
    imageURI: 'beer'
  },
  saison: {
    id: 'saison',
    type: 'tag',
    name: 'Saison',
    imageURI: 'beer'
  },
  scotch_ale: {
    id: 'scotch_ale',
    type: 'tag',
    name: 'Scotch Ale',
    imageURI: 'beer'
  },
  kölsch: {
    id: 'kölsch',
    type: 'tag',
    name: 'Kölsch',
    imageURI: 'beer'
  },
  stout: {
    id: 'stout',
    type: 'tag',
    name: 'Stout',
    imageURI: 'beer'
  },
  porter: {
    id: 'porter',
    type: 'tag',
    name: 'Porter',
    imageURI: 'beer'
  },
  barley_wine: {
    id: 'barley_wine',
    type: 'tag',
    name: 'Barley Wine',
    imageURI: 'beer'
  },
}
/*
const Icons = [
  //SPECIAL ICONS
  { id: 0,
    type: 'special',
    name: "empty",
    imageURI: ""},
  { id: 1,
    type: 'special',
    name: "openButton",
    imageURI: "openButton"},
  { id: 2,
    type: 'special',
    name: "trash",
    imageURI: "trash"},

  //CATEGORY ICONS
  { id: 3,
    type: 'category',
    name: "Cheese",
    imageURI: "cheese"},
  { id: 4,
    type: 'category',
    name: "Fish",
    imageURI: "fish"},
  { id: 5,
    type: 'category',
    name: "Wine",
    imageURI: "wine"},
  { id: 6,
    type: 'category',
    name: "Coffee",
    imageURI: "coffee"},
  { id: 7,
    type: 'category',
    name: "cocktail",
    imageURI: "cocktail"},
  { id: 8,
    type: 'category',
    name: "Beer",
    imageURI: "beer"},
  { id: 9,
    type: 'category',
    name: "Music",
    imageURI: "music"},
  { id: 10,
    type: 'category',
    name: "Donut",
    imageURI: "donut"},

  //TAGS
  { id: 11,
    name: "Merlot",
    type: 'tag',
    imageURI: "wine"},
  { id: 12,
    name: "Malbec",
    type: 'tag',
    imageURI: "wine"},
  { id: 13,
    name: "Pinor Noir",
    type: 'tag',
    imageURI: "wine"},
  { id: 14,
    name: "Chardonnay",
    type: 'tag',
    imageURI: "wine"},
  { id: 15,
    name: "Sauvignon Blanc",
    type: 'tag',
    imageURI: "wine"},
  { id: 16,
    name: "Cabernet Sauvignon",
    type: 'tag',
    imageURI: "wine"},
  { id: 17,
    name: "Latte",
    type: 'tag',
    imageURI: "coffee"},
  { id: 18,
    name: "Capuccino",
    type: 'tag',
    imageURI: "coffee"},
  { id: 19,
    name: "Espresso",
    type: 'tag',
    imageURI: "coffee"},
  { id: 20,
    name: "French Press",
    type: 'tag',
    imageURI: "coffee"},
  { id: 21,
    name: "AeroPress",
    type: 'tag',
    imageURI: "coffee"},
  { id: 22,
    name: "Drip",
    type: 'tag',
    imageURI: "coffee"},
  { id: 23,
    name: "Americano",
    type: 'tag',
    imageURI: "coffee"},
  { id: 24,
    name: "Cortado",
    type: 'tag',
    imageURI: "coffee"},
  { id: 25,
    name: "Pilsner",
    type: 'tag',
    imageURI: "beer"},
  { id: 26, 
    name: "Stout",
    type: 'tag',
    imageURI: "beer"},
  { id: 27,
    name: "India Pale Ale",
    type: 'tag',
    imageURI: "beer"},
  { id: 28,
    name: "Porter",
    type: 'tag',
    imageURI: "beer"},
  { id: 29,
    name: "Pale Ale",
    type: 'tag',
    imageURI: "beer"},
  { id: 30,
    name: "BarleyWine",
    type: 'tag',
    imageURI: "beer"},
  { id: 31,
    name: "Honey",
    type: 'tag',
    imageURI: "beer"},
  { id: 32,
    name: "Salmon",
    type: 'tag',
    imageURI: "fish"},
  { id: 33,
    name: "Trout",
    type: 'tag',
    imageURI: "fish"},
]
*/

export default Icons;