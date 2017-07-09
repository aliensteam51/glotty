// src/setup-seeds.js

const feathers = require('feathers/client');
const rest = require('feathers-rest/client');
const superagent = require('superagent');
const hooks = require('feathers-hooks');
const auth = require('feathers-authentication-client');

const user = {
  name: 'admin',
  email: 'admin@admin.com',
  password: 'qwerty1',
  roles: ['super-admin']
};

const locales = [
  {
    'code': 'af',
    'name': 'Afrikaans'
  },
  {
    'code': 'sq',
    'name': 'Albanian'
  },
  {
    'code': 'am',
    'name': 'Amharic'
  },
  {
    'code': 'ar',
    'name': 'Arabic'
  },
  {
    'code': 'hy',
    'name': 'Armenian'
  },
  {
    'code': 'az',
    'name': 'Azerbaijani'
  },
  {
    'code': 'eu',
    'name': 'Basque'
  },
  {
    'code': 'be',
    'name': 'Belarusian'
  },
  {
    'code': 'bn',
    'name': 'Bengali'
  },
  {
    'code': 'bs',
    'name': 'Bosnian'
  },
  {
    'code': 'bg',
    'name': 'Bulgarian'
  },
  {
    'code': 'ca',
    'name': 'Catalan'
  },
  {
    'code': 'ceb',
    'name': 'Cebuano'
  },
  {
    'code': 'ny',
    'name': 'Chichewa'
  },
  {
    'code': 'zh',
    'name': 'Chinese (Simplified)'
  },
  {
    'code': 'zh-TW',
    'name': 'Chinese (Traditional)'
  },
  {
    'code': 'co',
    'name': 'Corsican'
  },
  {
    'code': 'hr',
    'name': 'Croatian'
  },
  {
    'code': 'cs',
    'name': 'Czech'
  },
  {
    'code': 'da',
    'name': 'Danish'
  },
  {
    'code': 'nl',
    'name': 'Dutch'
  },
  {
    'code': 'en',
    'name': 'English'
  },
  {
    'code': 'eo',
    'name': 'Esperanto'
  },
  {
    'code': 'et',
    'name': 'Estonian'
  },
  {
    'code': 'tl',
    'name': 'Filipino'
  },
  {
    'code': 'fi',
    'name': 'Finnish'
  },
  {
    'code': 'fr',
    'name': 'French'
  },
  {
    'code': 'fy',
    'name': 'Frisian'
  },
  {
    'code': 'gl',
    'name': 'Galician'
  },
  {
    'code': 'ka',
    'name': 'Georgian'
  },
  {
    'code': 'de',
    'name': 'German'
  },
  {
    'code': 'el',
    'name': 'Greek'
  },
  {
    'code': 'gu',
    'name': 'Gujarati'
  },
  {
    'code': 'ht',
    'name': 'Haitian Creole'
  },
  {
    'code': 'ha',
    'name': 'Hausa'
  },
  {
    'code': 'haw',
    'name': 'Hawaiian'
  },
  {
    'code': 'iw',
    'name': 'Hebrew'
  },
  {
    'code': 'hi',
    'name': 'Hindi'
  },
  {
    'code': 'hmn',
    'name': 'Hmong'
  },
  {
    'code': 'hu',
    'name': 'Hungarian'
  },
  {
    'code': 'is',
    'name': 'Icelandic'
  },
  {
    'code': 'ig',
    'name': 'Igbo'
  },
  {
    'code': 'id',
    'name': 'Indonesian'
  },
  {
    'code': 'ga',
    'name': 'Irish'
  },
  {
    'code': 'it',
    'name': 'Italian'
  },
  {
    'code': 'ja',
    'name': 'Japanese'
  },
  {
    'code': 'jw',
    'name': 'Javanese'
  },
  {
    'code': 'kn',
    'name': 'Kannada'
  },
  {
    'code': 'kk',
    'name': 'Kazakh'
  },
  {
    'code': 'km',
    'name': 'Khmer'
  },
  {
    'code': 'ko',
    'name': 'Korean'
  },
  {
    'code': 'ku',
    'name': 'Kurdish (Kurmanji)'
  },
  {
    'code': 'ky',
    'name': 'Kyrgyz'
  },
  {
    'code': 'lo',
    'name': 'Lao'
  },
  {
    'code': 'la',
    'name': 'Latin'
  },
  {
    'code': 'lv',
    'name': 'Latvian'
  },
  {
    'code': 'lt',
    'name': 'Lithuanian'
  },
  {
    'code': 'lb',
    'name': 'Luxembourgish'
  },
  {
    'code': 'mk',
    'name': 'Macedonian'
  },
  {
    'code': 'mg',
    'name': 'Malagasy'
  },
  {
    'code': 'ms',
    'name': 'Malay'
  },
  {
    'code': 'ml',
    'name': 'Malayalam'
  },
  {
    'code': 'mt',
    'name': 'Maltese'
  },
  {
    'code': 'mi',
    'name': 'Maori'
  },
  {
    'code': 'mr',
    'name': 'Marathi'
  },
  {
    'code': 'mn',
    'name': 'Mongolian'
  },
  {
    'code': 'my',
    'name': 'Myanmar (Burmese)'
  },
  {
    'code': 'ne',
    'name': 'Nepali'
  },
  {
    'code': 'no',
    'name': 'Norwegian'
  },
  {
    'code': 'ps',
    'name': 'Pashto'
  },
  {
    'code': 'fa',
    'name': 'Persian'
  },
  {
    'code': 'pl',
    'name': 'Polish'
  },
  {
    'code': 'pt',
    'name': 'Portuguese'
  },
  {
    'code': 'pa',
    'name': 'Punjabi'
  },
  {
    'code': 'ro',
    'name': 'Romanian'
  },
  {
    'code': 'ru',
    'name': 'Russian'
  },
  {
    'code': 'sm',
    'name': 'Samoan'
  },
  {
    'code': 'gd',
    'name': 'Scots Gaelic'
  },
  {
    'code': 'sr',
    'name': 'Serbian'
  },
  {
    'code': 'st',
    'name': 'Sesotho'
  },
  {
    'code': 'sn',
    'name': 'Shona'
  },
  {
    'code': 'sd',
    'name': 'Sindhi'
  },
  {
    'code': 'si',
    'name': 'Sinhala'
  },
  {
    'code': 'sk',
    'name': 'Slovak'
  },
  {
    'code': 'sl',
    'name': 'Slovenian'
  },
  {
    'code': 'so',
    'name': 'Somali'
  },
  {
    'code': 'es',
    'name': 'Spanish'
  },
  {
    'code': 'su',
    'name': 'Sundanese'
  },
  {
    'code': 'sw',
    'name': 'Swahili'
  },
  {
    'code': 'sv',
    'name': 'Swedish'
  },
  {
    'code': 'tg',
    'name': 'Tajik'
  },
  {
    'code': 'ta',
    'name': 'Tamil'
  },
  {
    'code': 'te',
    'name': 'Telugu'
  },
  {
    'code': 'th',
    'name': 'Thai'
  },
  {
    'code': 'tr',
    'name': 'Turkish'
  },
  {
    'code': 'uk',
    'name': 'Ukrainian'
  },
  {
    'code': 'ur',
    'name': 'Urdu'
  },
  {
    'code': 'uz',
    'name': 'Uzbek'
  },
  {
    'code': 'vi',
    'name': 'Vietnamese'
  },
  {
    'code': 'cy',
    'name': 'Welsh'
  },
  {
    'code': 'xh',
    'name': 'Xhosa'
  },
  {
    'code': 'yi',
    'name': 'Yiddish'
  },
  {
    'code': 'yo',
    'name': 'Yoruba'
  },
  {
    'code': 'zu',
    'name': 'Zulu'
  }
];

const platforms = [
  {
    name: 'default',
    description: 'Default keys and translations',
    code: 'default'
  },
  {
    name: 'iOS',
    description: 'iOS specific keys and translations',
    code: 'ios'
  },
  {
    name: 'Android',
    description: 'Android specific keys and translations',
    code: 'android'
  },
  {
    name: 'i18n',
    description: 'i18n internalization format specific keys and translations',
    code: 'i18n'
  }
];

const feathersClient = feathers();

feathersClient
  .configure(hooks())
  .configure(rest('http://localhost:3030').superagent(superagent))
  .configure(auth());

feathersClient.service('users').create(user)
  .then(() => {
    feathersClient.authenticate({
      strategy: 'local',
      email: user.email,
      password: user.password
    })
      .then(() => {
        locales.map((locale) => {
          feathersClient.service('locales').create(locale, {deleted: false})
            .then((local) => {
              console.log('Locale seeded...', local.name);
            }).catch((error) => {
              console.error('Error seeding locale!', error.message);
            });
        });
        platforms.map((platform) => {
          feathersClient.service('platforms').create(platform)
            .then((platf) => {
              console.log('Platform seeded...', platf.name);
            }).catch((error) => {
              console.log('Error seeding platform!', error.message);
            });
        });
      })
      .catch(function(error){
        console.error('Error authenticating!', error.message);
      });
  })
  .catch(function(error) {
    console.error('Error creating user!', error.message);
  });
