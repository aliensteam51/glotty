// src/seeds.js

const feathers = require('feathers/client');
const rest = require('feathers-rest/client');
const superagent = require('superagent');
const hooks = require('feathers-hooks');
const auth = require('feathers-authentication-client');

const user = {
  email: 'admin@admin.com',
  password: 'qwerty1'
};

const locales = [
  {
    'name': 'English (Zambia)',
    'code': 'en_ZM',
    'deleted': 0
  },
  {
    'name': 'Mongolian (Cyrillic, Mongolia)',
    'code': 'mn_Cyrl_MN',
    'deleted': 0
  },
  {
    'name': 'Basque',
    'code': 'eu',
    'deleted': 0
  },
  {
    'name': 'Arabic (Chad)',
    'code': 'ar_TD',
    'deleted': 0
  },
  {
    'name': 'Japanese (Japan)',
    'code': 'ja_JP',
    'deleted': 0
  },
  {
    'name': 'Meru (Kenya)',
    'code': 'mer_KE',
    'deleted': 0
  },
  {
    'name': 'Arabic',
    'code': 'ar',
    'deleted': 0
  },
  {
    'name': 'English (Kenya)',
    'code': 'en_KE',
    'deleted': 0
  },
  {
    'name': 'Assamese',
    'code': 'as',
    'deleted': 0
  },
  {
    'name': 'Lingala (Congo - Brazzaville)',
    'code': 'ln_CG',
    'deleted': 0
  },
  {
    'name': 'Arabic (Israel)',
    'code': 'ar_IL',
    'deleted': 0
  },
  {
    'name': 'Samburu (Kenya)',
    'code': 'saq_KE',
    'deleted': 0
  },
  {
    'name': 'Friulian (Italy)',
    'code': 'fur_IT',
    'deleted': 0
  },
  {
    'name': 'English (Cyprus)',
    'code': 'en_CY',
    'deleted': 0
  },
  {
    'name': 'Spanish (Guatemala)',
    'code': 'es_GT',
    'deleted': 0
  },
  {
    'name': 'Shambala (Tanzania)',
    'code': 'ksb_TZ',
    'deleted': 0
  },
  {
    'name': 'Lithuanian (Lithuania)',
    'code': 'lt_LT',
    'deleted': 0
  },
  {
    'name': 'Spanish (Uruguay)',
    'code': 'es_UY',
    'deleted': 0
  },
  {
    'name': 'Swahili (Uganda)',
    'code': 'sw_UG',
    'deleted': 0
  },
  {
    'name': 'Arabic (Saudi Arabia)',
    'code': 'ar_SA',
    'deleted': 0
  },
  {
    'name': 'English (Nauru)',
    'code': 'en_NR',
    'deleted': 0
  },
  {
    'name': 'Arabic (Libya)',
    'code': 'ar_LY',
    'deleted': 0
  },
  {
    'name': 'Spanish (Peru)',
    'code': 'es_PE',
    'deleted': 0
  },
  {
    'name': 'Azerbaijani',
    'code': 'az',
    'deleted': 0
  },
  {
    'name': 'Tachelhit (Tifinagh, Morocco)',
    'code': 'shi_Tfng_MA',
    'deleted': 0
  },
  {
    'name': 'English (Czech Republic)',
    'code': 'en_CZ',
    'deleted': 0
  },
  {
    'name': 'Vunjo (Tanzania)',
    'code': 'vun_TZ',
    'deleted': 0
  },
  {
    'name': 'Swiss German',
    'code': 'gsw',
    'deleted': 0
  },
  {
    'name': 'Sichuan Yi (China)',
    'code': 'ii_CN',
    'deleted': 0
  },
  {
    'name': 'Aghem (Cameroon)',
    'code': 'agq_CM',
    'deleted': 0
  },
  {
    'name': 'Jola-Fonyi',
    'code': 'dyo',
    'deleted': 0
  },
  {
    'name': 'Vai (Latin, Liberia)',
    'code': 'vai_Latn_LR',
    'deleted': 0
  },
  {
    'name': 'Ewe (Togo)',
    'code': 'ee_TG',
    'deleted': 0
  },
  {
    'name': 'English (Macau SAR China)',
    'code': 'en_MO',
    'deleted': 0
  },
  {
    'name': 'Kazakh (Cyrillic, Kazakhstan)',
    'code': 'kk_Cyrl_KZ',
    'deleted': 0
  },
  {
    'name': 'Catalan (Italy)',
    'code': 'ca_IT',
    'deleted': 0
  },
  {
    'name': 'Central Atlas Tamazight (Latin)',
    'code': 'tzm_Latn',
    'deleted': 0
  },
  {
    'name': 'English (Botswana)',
    'code': 'en_BW',
    'deleted': 0
  },
  {
    'name': 'English (American Samoa)',
    'code': 'en_AS',
    'deleted': 0
  },
  {
    'name': 'Swiss German (Liechtenstein)',
    'code': 'gsw_LI',
    'deleted': 0
  },
  {
    'name': 'Vai (Vai, Liberia)',
    'code': 'vai_Vaii_LR',
    'deleted': 0
  },
  {
    'name': 'Basaa (Cameroon)',
    'code': 'bas_CM',
    'deleted': 0
  },
  {
    'name': 'English (Northern Mariana Islands)',
    'code': 'en_MP',
    'deleted': 0
  },
  {
    'name': 'Ngomba (Cameroon)',
    'code': 'jgo_CM',
    'deleted': 0
  },
  {
    'name': 'Arabic (Kuwait)',
    'code': 'ar_KW',
    'deleted': 0
  },
  {
    'name': 'Zulu (South Africa)',
    'code': 'zu_ZA',
    'deleted': 0
  },
  {
    'name': 'Amharic (Ethiopia)',
    'code': 'am_ET',
    'deleted': 0
  },
  {
    'name': 'Nyankole',
    'code': 'nyn',
    'deleted': 0
  },
  {
    'name': 'English (Austria)',
    'code': 'en_AT',
    'deleted': 0
  },
  {
    'name': 'French (Vanuatu)',
    'code': 'fr_VU',
    'deleted': 0
  },
  {
    'name': 'Ewe (Ghana)',
    'code': 'ee_GH',
    'deleted': 0
  },
  {
    'name': 'Tamil (India)',
    'code': 'ta_IN',
    'deleted': 0
  },
  {
    'name': 'French (Réunion)',
    'code': 'fr_RE',
    'deleted': 0
  },
  {
    'name': 'Arabic (Sudan)',
    'code': 'ar_SD',
    'deleted': 0
  },
  {
    'name': 'Turkish (Cyprus)',
    'code': 'tr_CY',
    'deleted': 0
  },
  {
    'name': 'English (Niue)',
    'code': 'en_NU',
    'deleted': 0
  },
  {
    'name': 'Vai (Vai)',
    'code': 'vai_Vaii',
    'deleted': 0
  },
  {
    'name': 'Spanish (Philippines)',
    'code': 'es_PH',
    'deleted': 0
  },
  {
    'name': 'English (Kiribati)',
    'code': 'en_KI',
    'deleted': 0
  },
  {
    'name': 'English (Jersey)',
    'code': 'en_JE',
    'deleted': 0
  },
  {
    'name': 'English (Australia)',
    'code': 'en_AU',
    'deleted': 0
  },
  {
    'name': 'Belarusian (Belarus)',
    'code': 'be_BY',
    'deleted': 0
  },
  {
    'name': 'French (Tunisia)',
    'code': 'fr_TN',
    'deleted': 0
  },
  {
    'name': 'Persian (Afghanistan)',
    'code': 'fa_AF',
    'deleted': 0
  },
  {
    'name': 'Arabic (Iraq)',
    'code': 'ar_IQ',
    'deleted': 0
  },
  {
    'name': 'French (Guinea)',
    'code': 'fr_GN',
    'deleted': 0
  },
  {
    'name': 'Slovak (Slovakia)',
    'code': 'sk_SK',
    'deleted': 0
  },
  {
    'name': 'Jola-Fonyi (Senegal)',
    'code': 'dyo_SN',
    'deleted': 0
  },
  {
    'name': 'Chinese (Traditional, Hong Kong SAR China)',
    'code': 'zh_Hant_HK',
    'deleted': 0
  },
  {
    'name': 'Arabic (World)',
    'code': 'ar_001',
    'deleted': 0
  },
  {
    'name': 'English (Belize)',
    'code': 'en_BZ',
    'deleted': 0
  },
  {
    'name': 'Russian (Kazakhstan)',
    'code': 'ru_KZ',
    'deleted': 0
  },
  {
    'name': 'English (St. Vincent & Grenadines)',
    'code': 'en_VC',
    'deleted': 0
  },
  {
    'name': 'Asu (Tanzania)',
    'code': 'asa_TZ',
    'deleted': 0
  },
  {
    'name': 'Dutch (Aruba)',
    'code': 'nl_AW',
    'deleted': 0
  },
  {
    'name': 'Scottish Gaelic (United Kingdom)',
    'code': 'gd_GB',
    'deleted': 0
  },
  {
    'name': 'Hausa (Latin, Ghana)',
    'code': 'ha_Latn_GH',
    'deleted': 0
  },
  {
    'name': 'Northern Sami (Norway)',
    'code': 'se_NO',
    'deleted': 0
  },
  {
    'name': 'Spanish (El Salvador)',
    'code': 'es_SV',
    'deleted': 0
  },
  {
    'name': 'Portuguese (Portugal)',
    'code': 'pt_PT',
    'deleted': 0
  },
  {
    'name': 'English (Montserrat)',
    'code': 'en_MS',
    'deleted': 0
  },
  {
    'name': 'Inuktitut (Unified Canadian Aboriginal Syllabics)',
    'code': 'iu_Cans',
    'deleted': 0
  },
  {
    'name': 'Korean (North Korea)',
    'code': 'ko_KP',
    'deleted': 0
  },
  {
    'name': 'Chinese (Simplified, China)',
    'code': 'zh_Hans_CN',
    'deleted': 0
  },
  {
    'name': 'Tamil',
    'code': 'ta',
    'deleted': 0
  },
  {
    'name': 'Telugu',
    'code': 'te',
    'deleted': 0
  },
  {
    'name': 'English (Malta)',
    'code': 'en_MT',
    'deleted': 0
  },
  {
    'name': 'French (Haiti)',
    'code': 'fr_HT',
    'deleted': 0
  },
  {
    'name': 'Tajik',
    'code': 'tg',
    'deleted': 0
  },
  {
    'name': 'French (Guadeloupe)',
    'code': 'fr_GP',
    'deleted': 0
  },
  {
    'name': 'Kabuverdianu',
    'code': 'kea',
    'deleted': 0
  },
  {
    'name': 'Turkmen (Latin)',
    'code': 'tk_Latn',
    'deleted': 0
  },
  {
    'name': 'Punjabi',
    'code': 'pa',
    'deleted': 0
  },
  {
    'name': 'Thai',
    'code': 'th',
    'deleted': 0
  },
  {
    'name': 'Punjabi (Arabic, Pakistan)',
    'code': 'pa_Arab_PK',
    'deleted': 0
  },
  {
    'name': 'Tigrinya',
    'code': 'ti',
    'deleted': 0
  },
  {
    'name': 'Spanish (Spain)',
    'code': 'es_ES',
    'deleted': 0
  },
  {
    'name': 'North Ndebele (Zimbabwe)',
    'code': 'nd_ZW',
    'deleted': 0
  },
  {
    'name': 'Spanish (Dominican Republic)',
    'code': 'es_DO',
    'deleted': 0
  },
  {
    'name': 'Turkmen',
    'code': 'tk',
    'deleted': 0
  },
  {
    'name': 'Malay (Latin, Singapore)',
    'code': 'ms_Latn_SG',
    'deleted': 0
  },
  {
    'name': 'Chinese (Simplified, Singapore)',
    'code': 'zh_Hans_SG',
    'deleted': 0
  },
  {
    'name': 'Yoruba (Benin)',
    'code': 'yo_BJ',
    'deleted': 0
  },
  {
    'name': 'English (Mauritius)',
    'code': 'en_MU',
    'deleted': 0
  },
  {
    'name': 'Korean (South Korea)',
    'code': 'ko_KR',
    'deleted': 0
  },
  {
    'name': 'Luxembourgish',
    'code': 'lb',
    'deleted': 0
  },
  {
    'name': 'French (Equatorial Guinea)',
    'code': 'fr_GQ',
    'deleted': 0
  },
  {
    'name': 'English (Ireland)',
    'code': 'en_IE',
    'deleted': 0
  },
  {
    'name': 'Tamil (Singapore)',
    'code': 'ta_SG',
    'deleted': 0
  },
  {
    'name': 'Tongan',
    'code': 'to',
    'deleted': 0
  },
  {
    'name': 'Yoruba (Nigeria)',
    'code': 'yo_NG',
    'deleted': 0
  },
  {
    'name': 'French (Canada)',
    'code': 'fr_CA',
    'deleted': 0
  },
  {
    'name': 'Portuguese (Cape Verde)',
    'code': 'pt_CV',
    'deleted': 0
  },
  {
    'name': 'Makonde (Tanzania)',
    'code': 'kde_TZ',
    'deleted': 0
  },
  {
    'name': 'Portuguese (Brazil)',
    'code': 'pt_BR',
    'deleted': 0
  },
  {
    'name': 'Spanish (Chile)',
    'code': 'es_CL',
    'deleted': 0
  },
  {
    'name': 'French (Senegal)',
    'code': 'fr_SN',
    'deleted': 0
  },
  {
    'name': 'Irish (Ireland)',
    'code': 'ga_IE',
    'deleted': 0
  },
  {
    'name': 'Uzbek (Arabic)',
    'code': 'uz_Arab',
    'deleted': 0
  },
  {
    'name': 'Polish',
    'code': 'pl',
    'deleted': 0
  },
  {
    'name': 'Turkish',
    'code': 'tr',
    'deleted': 0
  },
  {
    'name': 'Bemba',
    'code': 'bem',
    'deleted': 0
  },
  {
    'name': 'Hausa',
    'code': 'ha',
    'deleted': 0
  },
  {
    'name': 'Central Kurdish',
    'code': 'ckb',
    'deleted': 0
  },
  {
    'name': 'English (New Zealand)',
    'code': 'en_NZ',
    'deleted': 0
  },
  {
    'name': 'Ganda',
    'code': 'lg',
    'deleted': 0
  },
  {
    'name': 'Arabic (Qatar)',
    'code': 'ar_QA',
    'deleted': 0
  },
  {
    'name': 'English (Liberia)',
    'code': 'en_LR',
    'deleted': 0
  },
  {
    'name': 'English (St. Kitts & Nevis)',
    'code': 'en_KN',
    'deleted': 0
  },
  {
    'name': 'Cornish (United Kingdom)',
    'code': 'kw_GB',
    'deleted': 0
  },
  {
    'name': 'English (Zimbabwe)',
    'code': 'en_ZW',
    'deleted': 0
  },
  {
    'name': 'Serbian (Cyrillic, Kosovo)',
    'code': 'sr_Cyrl_XK',
    'deleted': 0
  },
  {
    'name': 'Hebrew',
    'code': 'he',
    'deleted': 0
  },
  {
    'name': 'Kazakh (Cyrillic)',
    'code': 'kk_Cyrl',
    'deleted': 0
  },
  {
    'name': 'Fulah (Guinea)',
    'code': 'ff_GN',
    'deleted': 0
  },
  {
    'name': 'Portuguese (Angola)',
    'code': 'pt_AO',
    'deleted': 0
  },
  {
    'name': 'English (British Virgin Islands)',
    'code': 'en_VG',
    'deleted': 0
  },
  {
    'name': 'Kyrgyz (Cyrillic)',
    'code': 'ky_Cyrl',
    'deleted': 0
  },
  {
    'name': 'Arabic (Tunisia)',
    'code': 'ar_TN',
    'deleted': 0
  },
  {
    'name': 'Lakota (United States)',
    'code': 'lkt_US',
    'deleted': 0
  },
  {
    'name': 'Danish',
    'code': 'da',
    'deleted': 0
  },
  {
    'name': 'Pashto',
    'code': 'ps',
    'deleted': 0
  },
  {
    'name': 'English (Malawi)',
    'code': 'en_MW',
    'deleted': 0
  },
  {
    'name': 'Portuguese',
    'code': 'pt',
    'deleted': 0
  },
  {
    'name': 'Central Kurdish (Iraq)',
    'code': 'ckb_IQ',
    'deleted': 0
  },
  {
    'name': 'Lingala',
    'code': 'ln',
    'deleted': 0
  },
  {
    'name': 'Hindi',
    'code': 'hi',
    'deleted': 0
  },
  {
    'name': 'Lao',
    'code': 'lo',
    'deleted': 0
  },
  {
    'name': 'Embu',
    'code': 'ebu',
    'deleted': 0
  },
  {
    'name': 'English (Lesotho)',
    'code': 'en_LS',
    'deleted': 0
  },
  {
    'name': 'Telugu (India)',
    'code': 'te_IN',
    'deleted': 0
  },
  {
    'name': 'German',
    'code': 'de',
    'deleted': 0
  },
  {
    'name': 'Sena',
    'code': 'seh',
    'deleted': 0
  },
  {
    'name': 'Inuktitut (Unified Canadian Aboriginal Syllabics, Canada)',
    'code': 'iu_Cans_CA',
    'deleted': 0
  },
  {
    'name': 'Hungarian (Hungary)',
    'code': 'hu_HU',
    'deleted': 0
  },
  {
    'name': 'Tachelhit (Latin)',
    'code': 'shi_Latn',
    'deleted': 0
  },
  {
    'name': 'Lithuanian',
    'code': 'lt',
    'deleted': 0
  },
  {
    'name': 'Albanian (Albania)',
    'code': 'sq_AL',
    'deleted': 0
  },
  {
    'name': 'German (Liechtenstein)',
    'code': 'de_LI',
    'deleted': 0
  },
  {
    'name': 'Luba-Katanga',
    'code': 'lu',
    'deleted': 0
  },
  {
    'name': 'English (Lithuania)',
    'code': 'en_LT',
    'deleted': 0
  },
  {
    'name': 'Serbian (Latin, Kosovo)',
    'code': 'sr_Latn_XK',
    'deleted': 0
  },
  {
    'name': 'Latvian',
    'code': 'lv',
    'deleted': 0
  },
  {
    'name': 'Kalenjin (Kenya)',
    'code': 'kln_KE',
    'deleted': 0
  },
  {
    'name': 'Koyraboro Senni (Mali)',
    'code': 'ses_ML',
    'deleted': 0
  },
  {
    'name': 'Sangu',
    'code': 'sbp',
    'deleted': 0
  },
  {
    'name': 'Swiss German (France)',
    'code': 'gsw_FR',
    'deleted': 0
  },
  {
    'name': 'Arabic (Egypt)',
    'code': 'ar_EG',
    'deleted': 0
  },
  {
    'name': 'French (Congo - Kinshasa)',
    'code': 'fr_CD',
    'deleted': 0
  },
  {
    'name': 'Croatian',
    'code': 'hr',
    'deleted': 0
  },
  {
    'name': 'English (U.S. Virgin Islands)',
    'code': 'en_VI',
    'deleted': 0
  },
  {
    'name': 'Spanish (Colombia)',
    'code': 'es_CO',
    'deleted': 0
  },
  {
    'name': 'Nepali (Nepal)',
    'code': 'ne_NP',
    'deleted': 0
  },
  {
    'name': 'Czech (Czech Republic)',
    'code': 'cs_CZ',
    'deleted': 0
  },
  {
    'name': 'Cherokee',
    'code': 'chr',
    'deleted': 0
  },
  {
    'name': 'Hungarian',
    'code': 'hu',
    'deleted': 0
  },
  {
    'name': 'Malay (Latin, Brunei)',
    'code': 'ms_Latn_BN',
    'deleted': 0
  },
  {
    'name': 'Central Kurdish (Iran)',
    'code': 'ckb_IR',
    'deleted': 0
  },
  {
    'name': 'Greek (Greece)',
    'code': 'el_GR',
    'deleted': 0
  },
  {
    'name': 'English (Malaysia)',
    'code': 'en_MY',
    'deleted': 0
  },
  {
    'name': 'English (Luxembourg)',
    'code': 'en_LU',
    'deleted': 0
  },
  {
    'name': 'Kabyle (Algeria)',
    'code': 'kab_DZ',
    'deleted': 0
  },
  {
    'name': 'English (Jamaica)',
    'code': 'en_JM',
    'deleted': 0
  },
  {
    'name': 'Meru',
    'code': 'mer',
    'deleted': 0
  },
  {
    'name': 'Tachelhit',
    'code': 'shi',
    'deleted': 0
  },
  {
    'name': 'Catalan (France)',
    'code': 'ca_FR',
    'deleted': 0
  },
  {
    'name': 'Arabic (Western Sahara)',
    'code': 'ar_EH',
    'deleted': 0
  },
  {
    'name': 'Bena',
    'code': 'bez',
    'deleted': 0
  },
  {
    'name': 'Lao (Laos)',
    'code': 'lo_LA',
    'deleted': 0
  },
  {
    'name': 'Kako',
    'code': 'kkj',
    'deleted': 0
  },
  {
    'name': 'Armenian',
    'code': 'hy',
    'deleted': 0
  },
  {
    'name': 'English (World)',
    'code': 'en_001',
    'deleted': 0
  },
  {
    'name': 'Teso',
    'code': 'teo',
    'deleted': 0
  },
  {
    'name': 'French (French Polynesia)',
    'code': 'fr_PF',
    'deleted': 0
  },
  {
    'name': 'Bosnian (Latin)',
    'code': 'bs_Latn',
    'deleted': 0
  },
  {
    'name': 'Icelandic (Iceland)',
    'code': 'is_IS',
    'deleted': 0
  },
  {
    'name': 'Koyra Chiini',
    'code': 'khq',
    'deleted': 0
  },
  {
    'name': 'English (Latvia)',
    'code': 'en_LV',
    'deleted': 0
  },
  {
    'name': 'Fulah (Senegal)',
    'code': 'ff_SN',
    'deleted': 0
  },
  {
    'name': 'Portuguese (Macau SAR China)',
    'code': 'pt_MO',
    'deleted': 0
  },
  {
    'name': 'Spanish (Nicaragua)',
    'code': 'es_NI',
    'deleted': 0
  },
  {
    'name': 'French (France)',
    'code': 'fr_FR',
    'deleted': 0
  },
  {
    'name': 'English (United Kingdom)',
    'code': 'en_GB',
    'deleted': 0
  },
  {
    'name': 'Western Frisian (Netherlands)',
    'code': 'fy_NL',
    'deleted': 0
  },
  {
    'name': 'Afrikaans (Namibia)',
    'code': 'af_NA',
    'deleted': 0
  },
  {
    'name': 'Albanian (Macedonia)',
    'code': 'sq_MK',
    'deleted': 0
  },
  {
    'name': 'French (Djibouti)',
    'code': 'fr_DJ',
    'deleted': 0
  },
  {
    'name': 'French (Central African Republic)',
    'code': 'fr_CF',
    'deleted': 0
  },
  {
    'name': 'Tachelhit (Tifinagh)',
    'code': 'shi_Tfng',
    'deleted': 0
  },
  {
    'name': 'Dzongkha',
    'code': 'dz',
    'deleted': 0
  },
  {
    'name': 'Koyraboro Senni',
    'code': 'ses',
    'deleted': 0
  },
  {
    'name': 'English (Uganda)',
    'code': 'en_UG',
    'deleted': 0
  },
  {
    'name': 'Soga (Uganda)',
    'code': 'xog_UG',
    'deleted': 0
  },
  {
    'name': 'English (Turks & Caicos Islands)',
    'code': 'en_TC',
    'deleted': 0
  },
  {
    'name': 'Yangben (Cameroon)',
    'code': 'yav_CM',
    'deleted': 0
  },
  {
    'name': 'Ngiemboon',
    'code': 'nnh',
    'deleted': 0
  },
  {
    'name': 'Spanish (Puerto Rico)',
    'code': 'es_PR',
    'deleted': 0
  },
  {
    'name': 'German (Austria)',
    'code': 'de_AT',
    'deleted': 0
  },
  {
    'name': 'Gujarati (India)',
    'code': 'gu_IN',
    'deleted': 0
  },
  {
    'name': 'French (Congo - Brazzaville)',
    'code': 'fr_CG',
    'deleted': 0
  },
  {
    'name': 'Spanish (Costa Rica)',
    'code': 'es_CR',
    'deleted': 0
  },
  {
    'name': 'Urdu (Pakistan)',
    'code': 'ur_PK',
    'deleted': 0
  },
  {
    'name': 'Arabic (Somalia)',
    'code': 'ar_SO',
    'deleted': 0
  },
  {
    'name': 'Marathi (India)',
    'code': 'mr_IN',
    'deleted': 0
  },
  {
    'name': 'Bosnian (Cyrillic)',
    'code': 'bs_Cyrl',
    'deleted': 0
  },
  {
    'name': 'Vietnamese (Vietnam)',
    'code': 'vi_VN',
    'deleted': 0
  },
  {
    'name': 'English (Israel)',
    'code': 'en_IL',
    'deleted': 0
  },
  {
    'name': 'English (Grenada)',
    'code': 'en_GD',
    'deleted': 0
  },
  {
    'name': 'French (Switzerland)',
    'code': 'fr_CH',
    'deleted': 0
  },
  {
    'name': 'Lakota',
    'code': 'lkt',
    'deleted': 0
  },
  {
    'name': 'Spanish (Bolivia)',
    'code': 'es_BO',
    'deleted': 0
  },
  {
    'name': 'Somali (Somalia)',
    'code': 'so_SO',
    'deleted': 0
  },
  {
    'name': 'Croatian (Croatia)',
    'code': 'hr_HR',
    'deleted': 0
  },
  {
    'name': 'Bulgarian (Bulgaria)',
    'code': 'bg_BG',
    'deleted': 0
  },
  {
    'name': 'English (Isle of Man)',
    'code': 'en_IM',
    'deleted': 0
  },
  {
    'name': 'Lingala (Angola)',
    'code': 'ln_AO',
    'deleted': 0
  },
  {
    'name': 'Sinhala (Sri Lanka)',
    'code': 'si_LK',
    'deleted': 0
  },
  {
    'name': 'Serbian (Latin)',
    'code': 'sr_Latn',
    'deleted': 0
  },
  {
    'name': 'French (Côte d’Ivoire)',
    'code': 'fr_CI',
    'deleted': 0
  },
  {
    'name': 'French (Belgium)',
    'code': 'fr_BE',
    'deleted': 0
  },
  {
    'name': 'Italian (Italy)',
    'code': 'it_IT',
    'deleted': 0
  },
  {
    'name': 'English (Solomon Islands)',
    'code': 'en_SB',
    'deleted': 0
  },
  {
    'name': 'Assamese (India)',
    'code': 'as_IN',
    'deleted': 0
  },
  {
    'name': 'Teso (Kenya)',
    'code': 'teo_KE',
    'deleted': 0
  },
  {
    'name': 'Afrikaans (South Africa)',
    'code': 'af_ZA',
    'deleted': 0
  },
  {
    'name': 'English (India)',
    'code': 'en_IN',
    'deleted': 0
  },
  {
    'name': 'Catalan (Spain)',
    'code': 'ca_ES',
    'deleted': 0
  },
  {
    'name': 'French (Burkina Faso)',
    'code': 'fr_BF',
    'deleted': 0
  },
  {
    'name': 'English (Samoa)',
    'code': 'en_WS',
    'deleted': 0
  },
  {
    'name': 'Spanish (Cuba)',
    'code': 'es_CU',
    'deleted': 0
  },
  {
    'name': 'English (Seychelles)',
    'code': 'en_SC',
    'deleted': 0
  },
  {
    'name': 'Akan (Ghana)',
    'code': 'ak_GH',
    'deleted': 0
  },
  {
    'name': 'Slovenian (Slovenia)',
    'code': 'sl_SI',
    'deleted': 0
  },
  {
    'name': 'French (New Caledonia)',
    'code': 'fr_NC',
    'deleted': 0
  },
  {
    'name': 'Bodo (India)',
    'code': 'brx_IN',
    'deleted': 0
  },
  {
    'name': 'English (British Indian Ocean Territory)',
    'code': 'en_IO',
    'deleted': 0
  },
  {
    'name': 'English (Hong Kong SAR China)',
    'code': 'en_HK',
    'deleted': 0
  },
  {
    'name': 'English (Guernsey)',
    'code': 'en_GG',
    'deleted': 0
  },
  {
    'name': 'Malay (Latin)',
    'code': 'ms_Latn',
    'deleted': 0
  },
  {
    'name': 'Teso (Uganda)',
    'code': 'teo_UG',
    'deleted': 0
  },
  {
    'name': 'Arabic (Djibouti)',
    'code': 'ar_DJ',
    'deleted': 0
  },
  {
    'name': 'Ewondo',
    'code': 'ewo',
    'deleted': 0
  },
  {
    'name': 'Sango (Central African Republic)',
    'code': 'sg_CF',
    'deleted': 0
  },
  {
    'name': 'Catalan (Andorra)',
    'code': 'ca_AD',
    'deleted': 0
  },
  {
    'name': 'Swahili (Congo - Kinshasa)',
    'code': 'sw_CD',
    'deleted': 0
  },
  {
    'name': 'Arabic (South Sudan)',
    'code': 'ar_SS',
    'deleted': 0
  },
  {
    'name': 'English (Sudan)',
    'code': 'en_SD',
    'deleted': 0
  },
  {
    'name': 'Norwegian Bokmål (Norway)',
    'code': 'nb_NO',
    'deleted': 0
  },
  {
    'name': 'Romansh (Switzerland)',
    'code': 'rm_CH',
    'deleted': 0
  },
  {
    'name': 'Masai (Kenya)',
    'code': 'mas_KE',
    'deleted': 0
  },
  {
    'name': 'English (Ghana)',
    'code': 'en_GH',
    'deleted': 0
  },
  {
    'name': 'Taita (Kenya)',
    'code': 'dav_KE',
    'deleted': 0
  },
  {
    'name': 'English (Europe)',
    'code': 'en_150',
    'deleted': 0
  },
  {
    'name': 'Lower Sorbian (Germany)',
    'code': 'dsb_DE',
    'deleted': 0
  },
  {
    'name': 'Somali (Djibouti)',
    'code': 'so_DJ',
    'deleted': 0
  },
  {
    'name': 'French (Syria)',
    'code': 'fr_SY',
    'deleted': 0
  },
  {
    'name': 'English (U.S. Outlying Islands)',
    'code': 'en_UM',
    'deleted': 0
  },
  {
    'name': 'Rwa',
    'code': 'rwk',
    'deleted': 0
  },
  {
    'name': 'Kamba (Kenya)',
    'code': 'kam_KE',
    'deleted': 0
  },
  {
    'name': 'English (Sweden)',
    'code': 'en_SE',
    'deleted': 0
  },
  {
    'name': 'French (St. Pierre & Miquelon)',
    'code': 'fr_PM',
    'deleted': 0
  },
  {
    'name': 'Galician (Spain)',
    'code': 'gl_ES',
    'deleted': 0
  },
  {
    'name': 'Tibetan (China)',
    'code': 'bo_CN',
    'deleted': 0
  },
  {
    'name': 'French (Niger)',
    'code': 'fr_NE',
    'deleted': 0
  },
  {
    'name': 'French (Morocco)',
    'code': 'fr_MA',
    'deleted': 0
  },
  {
    'name': 'English (Cayman Islands)',
    'code': 'en_KY',
    'deleted': 0
  },
  {
    'name': 'Northern Sami',
    'code': 'se',
    'deleted': 0
  },
  {
    'name': 'English (Gibraltar)',
    'code': 'en_GI',
    'deleted': 0
  },
  {
    'name': 'Sango',
    'code': 'sg',
    'deleted': 0
  },
  {
    'name': 'French (Cameroon)',
    'code': 'fr_CM',
    'deleted': 0
  },
  {
    'name': 'French (Burundi)',
    'code': 'fr_BI',
    'deleted': 0
  },
  {
    'name': 'Tajik (Cyrillic, Tajikistan)',
    'code': 'tg_Cyrl_TJ',
    'deleted': 0
  },
  {
    'name': 'Sinhala',
    'code': 'si',
    'deleted': 0
  },
  {
    'name': 'Mongolian (Cyrillic)',
    'code': 'mn_Cyrl',
    'deleted': 0
  },
  {
    'name': 'Khmer (Cambodia)',
    'code': 'km_KH',
    'deleted': 0
  },
  {
    'name': 'Albanian (Kosovo)',
    'code': 'sq_XK',
    'deleted': 0
  },
  {
    'name': 'Slovak',
    'code': 'sk',
    'deleted': 0
  },
  {
    'name': 'Spanish (Paraguay)',
    'code': 'es_PY',
    'deleted': 0
  },
  {
    'name': 'Italian (San Marino)',
    'code': 'it_SM',
    'deleted': 0
  },
  {
    'name': 'Slovenian',
    'code': 'sl',
    'deleted': 0
  },
  {
    'name': 'Georgian',
    'code': 'ka',
    'deleted': 0
  },
  {
    'name': 'Uzbek (Arabic, Afghanistan)',
    'code': 'uz_Arab_AF',
    'deleted': 0
  },
  {
    'name': 'Shona',
    'code': 'sn',
    'deleted': 0
  },
  {
    'name': 'French (Benin)',
    'code': 'fr_BJ',
    'deleted': 0
  },
  {
    'name': 'Quechua (Ecuador)',
    'code': 'qu_EC',
    'deleted': 0
  },
  {
    'name': 'Somali',
    'code': 'so',
    'deleted': 0
  },
  {
    'name': 'Masai (Tanzania)',
    'code': 'mas_TZ',
    'deleted': 0
  },
  {
    'name': 'French (Rwanda)',
    'code': 'fr_RW',
    'deleted': 0
  },
  {
    'name': 'English (Tokelau)',
    'code': 'en_TK',
    'deleted': 0
  },
  {
    'name': 'Dzongkha (Bhutan)',
    'code': 'dz_BT',
    'deleted': 0
  },
  {
    'name': 'English (Singapore)',
    'code': 'en_SG',
    'deleted': 0
  },
  {
    'name': 'Tasawaq',
    'code': 'twq',
    'deleted': 0
  },
  {
    'name': 'Albanian',
    'code': 'sq',
    'deleted': 0
  },
  {
    'name': 'Maltese (Malta)',
    'code': 'mt_MT',
    'deleted': 0
  },
  {
    'name': 'Konkani (India)',
    'code': 'kok_IN',
    'deleted': 0
  },
  {
    'name': 'French (Monaco)',
    'code': 'fr_MC',
    'deleted': 0
  },
  {
    'name': 'Azerbaijani (Latin)',
    'code': 'az_Latn',
    'deleted': 0
  },
  {
    'name': 'Serbian',
    'code': 'sr',
    'deleted': 0
  },
  {
    'name': 'Central Atlas Tamazight',
    'code': 'tzm',
    'deleted': 0
  },
  {
    'name': 'Irish',
    'code': 'ga',
    'deleted': 0
  },
  {
    'name': 'Luxembourgish (Luxembourg)',
    'code': 'lb_LU',
    'deleted': 0
  },
  {
    'name': 'Oromo',
    'code': 'om',
    'deleted': 0
  },
  {
    'name': 'English (Iceland)',
    'code': 'en_IS',
    'deleted': 0
  },
  {
    'name': 'Arabic (Eritrea)',
    'code': 'ar_ER',
    'deleted': 0
  },
  {
    'name': 'Kikuyu',
    'code': 'ki',
    'deleted': 0
  },
  {
    'name': 'Scottish Gaelic',
    'code': 'gd',
    'deleted': 0
  },
  {
    'name': 'Swedish',
    'code': 'sv',
    'deleted': 0
  },
  {
    'name': 'Spanish (Argentina)',
    'code': 'es_AR',
    'deleted': 0
  },
  {
    'name': 'Kazakh',
    'code': 'kk',
    'deleted': 0
  },
  {
    'name': 'English (St. Helena)',
    'code': 'en_SH',
    'deleted': 0
  },
  {
    'name': 'Swahili',
    'code': 'sw',
    'deleted': 0
  },
  {
    'name': 'Kalaallisut',
    'code': 'kl',
    'deleted': 0
  },
  {
    'name': 'German (Luxembourg)',
    'code': 'de_LU',
    'deleted': 0
  },
  {
    'name': 'Oriya',
    'code': 'or',
    'deleted': 0
  },
  {
    'name': 'Catalan',
    'code': 'ca',
    'deleted': 0
  },
  {
    'name': 'Khmer',
    'code': 'km',
    'deleted': 0
  },
  {
    'name': 'Ossetic',
    'code': 'os',
    'deleted': 0
  },
  {
    'name': 'Metaʼ (Cameroon)',
    'code': 'mgo_CM',
    'deleted': 0
  },
  {
    'name': 'English (Italy)',
    'code': 'en_IT',
    'deleted': 0
  },
  {
    'name': 'Kannada',
    'code': 'kn',
    'deleted': 0
  },
  {
    'name': 'Croatian (Bosnia & Herzegovina)',
    'code': 'hr_BA',
    'deleted': 0
  },
  {
    'name': 'Kikuyu (Kenya)',
    'code': 'ki_KE',
    'deleted': 0
  },
  {
    'name': 'Korean',
    'code': 'ko',
    'deleted': 0
  },
  {
    'name': 'Kako (Cameroon)',
    'code': 'kkj_CM',
    'deleted': 0
  },
  {
    'name': 'French (St. Barthélemy)',
    'code': 'fr_BL',
    'deleted': 0
  },
  {
    'name': 'English (Vanuatu)',
    'code': 'en_VU',
    'deleted': 0
  },
  {
    'name': 'English (Slovenia)',
    'code': 'en_SI',
    'deleted': 0
  },
  {
    'name': 'Galician',
    'code': 'gl',
    'deleted': 0
  },
  {
    'name': 'Swahili (Tanzania)',
    'code': 'sw_TZ',
    'deleted': 0
  },
  {
    'name': 'Kashmiri',
    'code': 'ks',
    'deleted': 0
  },
  {
    'name': 'Portuguese (Mozambique)',
    'code': 'pt_MZ',
    'deleted': 0
  },
  {
    'name': 'Gusii (Kenya)',
    'code': 'guz_KE',
    'deleted': 0
  },
  {
    'name': 'Azerbaijani (Cyrillic)',
    'code': 'az_Cyrl',
    'deleted': 0
  },
  {
    'name': 'Russian (Russia)',
    'code': 'ru_RU',
    'deleted': 0
  },
  {
    'name': 'English (Gambia)',
    'code': 'en_GM',
    'deleted': 0
  },
  {
    'name': 'English (Finland)',
    'code': 'en_FI',
    'deleted': 0
  },
  {
    'name': 'English (Estonia)',
    'code': 'en_EE',
    'deleted': 0
  },
  {
    'name': 'Arabic (Bahrain)',
    'code': 'ar_BH',
    'deleted': 0
  },
  {
    'name': 'Cornish',
    'code': 'kw',
    'deleted': 0
  },
  {
    'name': 'Tachelhit (Latin, Morocco)',
    'code': 'shi_Latn_MA',
    'deleted': 0
  },
  {
    'name': 'Punjabi (Gurmukhi, India)',
    'code': 'pa_Guru_IN',
    'deleted': 0
  },
  {
    'name': 'Arabic (Syria)',
    'code': 'ar_SY',
    'deleted': 0
  },
  {
    'name': 'Fulah (Cameroon)',
    'code': 'ff_CM',
    'deleted': 0
  },
  {
    'name': 'Basque (Spain)',
    'code': 'eu_ES',
    'deleted': 0
  },
  {
    'name': 'Kyrgyz',
    'code': 'ky',
    'deleted': 0
  },
  {
    'name': 'Tigrinya (Eritrea)',
    'code': 'ti_ER',
    'deleted': 0
  },
  {
    'name': 'French (St. Martin)',
    'code': 'fr_MF',
    'deleted': 0
  },
  {
    'name': 'Arabic (Morocco)',
    'code': 'ar_MA',
    'deleted': 0
  },
  {
    'name': 'Igbo (Nigeria)',
    'code': 'ig_NG',
    'deleted': 0
  },
  {
    'name': 'Gujarati',
    'code': 'gu',
    'deleted': 0
  },
  {
    'name': 'English (Croatia)',
    'code': 'en_HR',
    'deleted': 0
  },
  {
    'name': 'Manx',
    'code': 'gv',
    'deleted': 0
  },
  {
    'name': 'English (Fiji)',
    'code': 'en_FJ',
    'deleted': 0
  },
  {
    'name': 'Somali (Ethiopia)',
    'code': 'so_ET',
    'deleted': 0
  },
  {
    'name': 'Arabic (United Arab Emirates)',
    'code': 'ar_AE',
    'deleted': 0
  },
  {
    'name': 'Oriya (India)',
    'code': 'or_IN',
    'deleted': 0
  },
  {
    'name': 'English (United States)',
    'code': 'en_US',
    'deleted': 0
  },
  {
    'name': 'English (Tonga)',
    'code': 'en_TO',
    'deleted': 0
  },
  {
    'name': 'Czech',
    'code': 'cs',
    'deleted': 0
  },
  {
    'name': 'English (Slovakia)',
    'code': 'en_SK',
    'deleted': 0
  },
  {
    'name': 'Armenian (Armenia)',
    'code': 'hy_AM',
    'deleted': 0
  },
  {
    'name': 'Bosnian (Cyrillic, Bosnia & Herzegovina)',
    'code': 'bs_Cyrl_BA',
    'deleted': 0
  },
  {
    'name': 'French (Madagascar)',
    'code': 'fr_MG',
    'deleted': 0
  },
  {
    'name': 'Kalaallisut (Greenland)',
    'code': 'kl_GL',
    'deleted': 0
  },
  {
    'name': 'English (Falkland Islands)',
    'code': 'en_FK',
    'deleted': 0
  },
  {
    'name': 'Norwegian Nynorsk (Norway)',
    'code': 'nn_NO',
    'deleted': 0
  },
  {
    'name': 'Morisyen',
    'code': 'mfe',
    'deleted': 0
  },
  {
    'name': 'Oromo (Ethiopia)',
    'code': 'om_ET',
    'deleted': 0
  },
  {
    'name': 'Welsh',
    'code': 'cy',
    'deleted': 0
  },
  {
    'name': 'Duala (Cameroon)',
    'code': 'dua_CM',
    'deleted': 0
  },
  {
    'name': 'Filipino (Philippines)',
    'code': 'fil_PH',
    'deleted': 0
  },
  {
    'name': 'English (Sierra Leone)',
    'code': 'en_SL',
    'deleted': 0
  },
  {
    'name': 'Chinese (Simplified)',
    'code': 'zh_Hans',
    'deleted': 0
  },
  {
    'name': 'Tigrinya (Ethiopia)',
    'code': 'ti_ET',
    'deleted': 0
  },
  {
    'name': 'Uzbek (Latin)',
    'code': 'uz_Latn',
    'deleted': 0
  },
  {
    'name': 'Ossetic (Georgia)',
    'code': 'os_GE',
    'deleted': 0
  },
  {
    'name': 'Malay (Arabic, Brunei)',
    'code': 'ms_Arab_BN',
    'deleted': 0
  },
  {
    'name': 'Spanish (Canary Islands)',
    'code': 'es_IC',
    'deleted': 0
  },
  {
    'name': 'Northern Sami (Sweden)',
    'code': 'se_SE',
    'deleted': 0
  },
  {
    'name': 'Russian (Moldova)',
    'code': 'ru_MD',
    'deleted': 0
  },
  {
    'name': 'Danish (Greenland)',
    'code': 'da_GL',
    'deleted': 0
  },
  {
    'name': 'Malay (Latin, Malaysia)',
    'code': 'ms_Latn_MY',
    'deleted': 0
  },
  {
    'name': 'Hausa (Latin, Niger)',
    'code': 'ha_Latn_NE',
    'deleted': 0
  },
  {
    'name': 'Manx (Isle of Man)',
    'code': 'gv_IM',
    'deleted': 0
  },
  {
    'name': 'English (Hungary)',
    'code': 'en_HU',
    'deleted': 0
  },
  {
    'name': 'English (Micronesia)',
    'code': 'en_FM',
    'deleted': 0
  },
  {
    'name': 'Standard Moroccan Tamazight (Morocco)',
    'code': 'zgh_MA',
    'deleted': 0
  },
  {
    'name': 'English (Germany)',
    'code': 'en_DE',
    'deleted': 0
  },
  {
    'name': 'English (Canada)',
    'code': 'en_CA',
    'deleted': 0
  },
  {
    'name': 'Filipino',
    'code': 'fil',
    'deleted': 0
  },
  {
    'name': 'English (Turkey)',
    'code': 'en_TR',
    'deleted': 0
  },
  {
    'name': 'Italian (Switzerland)',
    'code': 'it_CH',
    'deleted': 0
  },
  {
    'name': 'Spanish (Venezuela)',
    'code': 'es_VE',
    'deleted': 0
  },
  {
    'name': 'Kashmiri (Arabic, India)',
    'code': 'ks_Arab_IN',
    'deleted': 0
  },
  {
    'name': 'Arabic (Oman)',
    'code': 'ar_OM',
    'deleted': 0
  },
  {
    'name': 'Ewondo (Cameroon)',
    'code': 'ewo_CM',
    'deleted': 0
  },
  {
    'name': 'English (Greece)',
    'code': 'en_GR',
    'deleted': 0
  },
  {
    'name': 'French (Algeria)',
    'code': 'fr_DZ',
    'deleted': 0
  },
  {
    'name': 'Nepali (India)',
    'code': 'ne_IN',
    'deleted': 0
  },
  {
    'name': 'Bambara (Latin)',
    'code': 'bm_Latn',
    'deleted': 0
  },
  {
    'name': 'Arabic (Lebanon)',
    'code': 'ar_LB',
    'deleted': 0
  },
  {
    'name': 'Faroese (Faroe Islands)',
    'code': 'fo_FO',
    'deleted': 0
  },
  {
    'name': 'English (Diego Garcia)',
    'code': 'en_DG',
    'deleted': 0
  },
  {
    'name': 'Serbian (Cyrillic)',
    'code': 'sr_Cyrl',
    'deleted': 0
  },
  {
    'name': 'English (Cocos [Keeling] Islands)',
    'code': 'en_CC',
    'deleted': 0
  },
  {
    'name': 'Chinese (Simplified, Macau SAR China)',
    'code': 'zh_Hans_MO',
    'deleted': 0
  },
  {
    'name': 'Nuer (Sudan)',
    'code': 'nus_SD',
    'deleted': 0
  },
  {
    'code': 'en_TT',
    'deleted': 0
  },
  {
    'name': 'Chinese (Traditional)',
    'code': 'zh_Hant',
    'deleted': 0
  },
  {
    'name': 'Duala',
    'code': 'dua',
    'deleted': 0
  },
  {
    'name': 'Arabic (Palestinian Territories)',
    'code': 'ar_PS',
    'deleted': 0
  },
  {
    'name': 'French (Mali)',
    'code': 'fr_ML',
    'deleted': 0
  },
  {
    'name': 'Malayalam (India)',
    'code': 'ml_IN',
    'deleted': 0
  },
  {
    'name': 'Quechua (Peru)',
    'code': 'qu_PE',
    'deleted': 0
  },
  {
    'name': 'Kalenjin',
    'code': 'kln',
    'deleted': 0
  },
  {
    'name': 'Latvian (Latvia)',
    'code': 'lv_LV',
    'deleted': 0
  },
  {
    'name': 'Rombo',
    'code': 'rof',
    'deleted': 0
  },
  {
    'name': 'Dutch (Suriname)',
    'code': 'nl_SR',
    'deleted': 0
  },
  {
    'name': 'Konkani',
    'code': 'kok',
    'deleted': 0
  },
  {
    'name': 'Serbian (Cyrillic, Serbia)',
    'code': 'sr_Cyrl_RS',
    'deleted': 0
  },
  {
    'name': 'Northern Sami (Finland)',
    'code': 'se_FI',
    'deleted': 0
  },
  {
    'name': 'Swedish (Åland Islands)',
    'code': 'sv_AX',
    'deleted': 0
  },
  {
    'name': 'Turkish (Turkey)',
    'code': 'tr_TR',
    'deleted': 0
  },
  {
    'name': 'Spanish (Mexico)',
    'code': 'es_MX',
    'deleted': 0
  },
  {
    'name': 'Chinese',
    'code': 'zh',
    'deleted': 0
  },
  {
    'name': 'English (Guam)',
    'code': 'en_GU',
    'deleted': 0
  },
  {
    'name': 'Mundang',
    'code': 'mua',
    'deleted': 0
  },
  {
    'name': 'Arabic (Yemen)',
    'code': 'ar_YE',
    'deleted': 0
  },
  {
    'name': 'English (Bosnia & Herzegovina)',
    'code': 'en_BA',
    'deleted': 0
  },
  {
    'name': 'Central Atlas Tamazight (Latin, Morocco)',
    'code': 'tzm_Latn_MA',
    'deleted': 0
  },
  {
    'name': 'English (Tuvalu)',
    'code': 'en_TV',
    'deleted': 0
  },
  {
    'name': 'Tajik (Cyrillic)',
    'code': 'tg_Cyrl',
    'deleted': 0
  },
  {
    'name': 'Shona (Zimbabwe)',
    'code': 'sn_ZW',
    'deleted': 0
  },
  {
    'name': 'Rwa (Tanzania)',
    'code': 'rwk_TZ',
    'deleted': 0
  },
  {
    'name': 'Bengali (India)',
    'code': 'bn_IN',
    'deleted': 0
  },
  {
    'name': 'Vietnamese',
    'code': 'vi',
    'deleted': 0
  },
  {
    'name': 'Soga',
    'code': 'xog',
    'deleted': 0
  },
  {
    'name': 'English (France)',
    'code': 'en_FR',
    'deleted': 0
  },
  {
    'name': 'Colognian (Germany)',
    'code': 'ksh_DE',
    'deleted': 0
  },
  {
    'name': 'English (Barbados)',
    'code': 'en_BB',
    'deleted': 0
  },
  {
    'name': 'Norwegian Bokmål',
    'code': 'nb',
    'deleted': 0
  },
  {
    'name': 'English (South Sudan)',
    'code': 'en_SS',
    'deleted': 0
  },
  {
    'name': 'Portuguese (Timor-Leste)',
    'code': 'pt_TL',
    'deleted': 0
  },
  {
    'name': 'English (Romania)',
    'code': 'en_RO',
    'deleted': 0
  },
  {
    'name': 'Serbian (Latin, Serbia)',
    'code': 'sr_Latn_RS',
    'deleted': 0
  },
  {
    'name': 'English (Papua New Guinea)',
    'code': 'en_PG',
    'deleted': 0
  },
  {
    'name': 'Zulu',
    'code': 'zu',
    'deleted': 0
  },
  {
    'name': 'North Ndebele',
    'code': 'nd',
    'deleted': 0
  },
  {
    'name': 'Bafia (Cameroon)',
    'code': 'ksf_CM',
    'deleted': 0
  },
  {
    'name': 'Nama (Namibia)',
    'code': 'naq_NA',
    'deleted': 0
  },
  {
    'name': 'Nepali',
    'code': 'ne',
    'deleted': 0
  },
  {
    'name': 'Arabic (Algeria)',
    'code': 'ar_DZ',
    'deleted': 0
  },
  {
    'name': 'English (Denmark)',
    'code': 'en_DK',
    'deleted': 0
  },
  {
    'name': 'Romanian (Romania)',
    'code': 'ro_RO',
    'deleted': 0
  },
  {
    'name': 'Japanese',
    'code': 'ja',
    'deleted': 0
  },
  {
    'name': 'Romansh',
    'code': 'rm',
    'deleted': 0
  },
  {
    'name': 'Rundi',
    'code': 'rn',
    'deleted': 0
  },
  {
    'name': 'Romanian',
    'code': 'ro',
    'deleted': 0
  },
  {
    'name': 'English (Philippines)',
    'code': 'en_PH',
    'deleted': 0
  },
  {
    'name': 'Luo (Kenya)',
    'code': 'luo_KE',
    'deleted': 0
  },
  {
    'name': 'Sena (Mozambique)',
    'code': 'seh_MZ',
    'deleted': 0
  },
  {
    'name': 'Greek (Cyprus)',
    'code': 'el_CY',
    'deleted': 0
  },
  {
    'name': 'Dutch',
    'code': 'nl',
    'deleted': 0
  },
  {
    'name': 'Bodo',
    'code': 'brx',
    'deleted': 0
  },
  {
    'name': 'Persian',
    'code': 'fa',
    'deleted': 0
  },
  {
    'name': 'English (Switzerland)',
    'code': 'en_CH',
    'deleted': 0
  },
  {
    'name': 'Norwegian Nynorsk',
    'code': 'nn',
    'deleted': 0
  },
  {
    'name': 'Azerbaijani (Cyrillic, Azerbaijan)',
    'code': 'az_Cyrl_AZ',
    'deleted': 0
  },
  {
    'name': 'Luba-Katanga (Congo - Kinshasa)',
    'code': 'lu_CD',
    'deleted': 0
  },
  {
    'name': 'Russian',
    'code': 'ru',
    'deleted': 0
  },
  {
    'name': 'Dutch (Belgium)',
    'code': 'nl_BE',
    'deleted': 0
  },
  {
    'name': 'English (United States, Computer)',
    'code': 'en_US_POSIX',
    'deleted': 0
  },
  {
    'name': 'Friulian',
    'code': 'fur',
    'deleted': 0
  },
  {
    'name': 'French (Martinique)',
    'code': 'fr_MQ',
    'deleted': 0
  },
  {
    'name': 'English (Namibia)',
    'code': 'en_NA',
    'deleted': 0
  },
  {
    'name': 'Kinyarwanda',
    'code': 'rw',
    'deleted': 0
  },
  {
    'name': 'Fulah',
    'code': 'ff',
    'deleted': 0
  },
  {
    'name': 'Luo',
    'code': 'luo',
    'deleted': 0
  },
  {
    'name': 'Burmese (Myanmar [Burma])',
    'code': 'my_MM',
    'deleted': 0
  },
  {
    'name': 'English (Guyana)',
    'code': 'en_GY',
    'deleted': 0
  },
  {
    'name': 'Persian (Iran)',
    'code': 'fa_IR',
    'deleted': 0
  },
  {
    'name': 'English (Dominica)',
    'code': 'en_DM',
    'deleted': 0
  },
  {
    'name': 'English (Belgium)',
    'code': 'en_BE',
    'deleted': 0
  },
  {
    'name': 'Finnish',
    'code': 'fi',
    'deleted': 0
  },
  {
    'name': 'French (Wallis & Futuna)',
    'code': 'fr_WF',
    'deleted': 0
  },
  {
    'name': 'English (Tanzania)',
    'code': 'en_TZ',
    'deleted': 0
  },
  {
    'name': 'Upper Sorbian (Germany)',
    'code': 'hsb_DE',
    'deleted': 0
  },
  {
    'name': 'Belarusian',
    'code': 'be',
    'deleted': 0
  },
  {
    'name': 'Serbian (Cyrillic, Bosnia & Herzegovina)',
    'code': 'sr_Cyrl_BA',
    'deleted': 0
  },
  {
    'name': 'French (Mauritania)',
    'code': 'fr_MR',
    'deleted': 0
  },
  {
    'name': 'Bulgarian',
    'code': 'bg',
    'deleted': 0
  },
  {
    'name': 'Tongan (Tonga)',
    'code': 'to_TO',
    'deleted': 0
  },
  {
    'name': 'Chiga (Uganda)',
    'code': 'cgg_UG',
    'deleted': 0
  },
  {
    'name': 'English (Eritrea)',
    'code': 'en_ER',
    'deleted': 0
  },
  {
    'name': 'Azerbaijani (Latin, Azerbaijan)',
    'code': 'az_Latn_AZ',
    'deleted': 0
  },
  {
    'name': 'Rombo (Tanzania)',
    'code': 'rof_TZ',
    'deleted': 0
  },
  {
    'name': 'Faroese',
    'code': 'fo',
    'deleted': 0
  },
  {
    'name': 'Nuer',
    'code': 'nus',
    'deleted': 0
  },
  {
    'name': 'Uzbek (Cyrillic, Uzbekistan)',
    'code': 'uz_Cyrl_UZ',
    'deleted': 0
  },
  {
    'name': 'Vunjo',
    'code': 'vun',
    'deleted': 0
  },
  {
    'name': 'Hausa (Latin, Nigeria)',
    'code': 'ha_Latn_NG',
    'deleted': 0
  },
  {
    'name': 'French',
    'code': 'fr',
    'deleted': 0
  },
  {
    'name': 'Dutch (Sint Maarten)',
    'code': 'nl_SX',
    'deleted': 0
  },
  {
    'name': 'English (Pakistan)',
    'code': 'en_PK',
    'deleted': 0
  },
  {
    'name': 'Pashto (Afghanistan)',
    'code': 'ps_AF',
    'deleted': 0
  },
  {
    'name': 'Bambara',
    'code': 'bm',
    'deleted': 0
  },
  {
    'name': 'Bengali',
    'code': 'bn',
    'deleted': 0
  },
  {
    'name': 'Somali (Kenya)',
    'code': 'so_KE',
    'deleted': 0
  },
  {
    'name': 'Gusii',
    'code': 'guz',
    'deleted': 0
  },
  {
    'name': 'Tibetan',
    'code': 'bo',
    'deleted': 0
  },
  {
    'name': 'English (Spain)',
    'code': 'en_ES',
    'deleted': 0
  },
  {
    'name': 'Georgian (Georgia)',
    'code': 'ka_GE',
    'deleted': 0
  },
  {
    'name': 'English (Cook Islands)',
    'code': 'en_CK',
    'deleted': 0
  },
  {
    'name': 'Rundi (Burundi)',
    'code': 'rn_BI',
    'deleted': 0
  },
  {
    'name': 'Russian (Kyrgyzstan)',
    'code': 'ru_KG',
    'deleted': 0
  },
  {
    'name': 'Serbian (Latin, Bosnia & Herzegovina)',
    'code': 'sr_Latn_BA',
    'deleted': 0
  },
  {
    'name': 'English (Sint Maarten)',
    'code': 'en_SX',
    'deleted': 0
  },
  {
    'name': 'Breton',
    'code': 'br',
    'deleted': 0
  },
  {
    'name': 'Danish (Denmark)',
    'code': 'da_DK',
    'deleted': 0
  },
  {
    'name': 'Luyia',
    'code': 'luy',
    'deleted': 0
  },
  {
    'name': 'English (Poland)',
    'code': 'en_PL',
    'deleted': 0
  },
  {
    'name': 'Bosnian',
    'code': 'bs',
    'deleted': 0
  },
  {
    'name': 'Western Frisian',
    'code': 'fy',
    'deleted': 0
  },
  {
    'name': 'Spanish (Latin America)',
    'code': 'es_419',
    'deleted': 0
  },
  {
    'name': 'Hawaiian (United States)',
    'code': 'haw_US',
    'deleted': 0
  },
  {
    'name': 'Punjabi (Gurmukhi)',
    'code': 'pa_Guru',
    'deleted': 0
  },
  {
    'name': 'Swahili (Kenya)',
    'code': 'sw_KE',
    'deleted': 0
  },
  {
    'name': 'Swiss German (Switzerland)',
    'code': 'gsw_CH',
    'deleted': 0
  },
  {
    'name': 'German (Germany)',
    'code': 'de_DE',
    'deleted': 0
  },
  {
    'name': 'Oromo (Kenya)',
    'code': 'om_KE',
    'deleted': 0
  },
  {
    'name': 'Uzbek (Latin, Uzbekistan)',
    'code': 'uz_Latn_UZ',
    'deleted': 0
  },
  {
    'name': 'Bosnian (Latin, Bosnia & Herzegovina)',
    'code': 'bs_Latn_BA',
    'deleted': 0
  },
  {
    'name': 'English (South Africa)',
    'code': 'en_ZA',
    'deleted': 0
  },
  {
    'name': 'English (Andorra)',
    'code': 'en_AD',
    'deleted': 0
  },
  {
    'name': 'Sakha (Russia)',
    'code': 'sah_RU',
    'deleted': 0
  },
  {
    'name': 'English (Russia)',
    'code': 'en_RU',
    'deleted': 0
  },
  {
    'name': 'Malay (Arabic)',
    'code': 'ms_Arab',
    'deleted': 0
  },
  {
    'name': 'Nyankole (Uganda)',
    'code': 'nyn_UG',
    'deleted': 0
  },
  {
    'name': 'French (Mauritius)',
    'code': 'fr_MU',
    'deleted': 0
  },
  {
    'name': 'Chinese (Simplified, Hong Kong SAR China)',
    'code': 'zh_Hans_HK',
    'deleted': 0
  },
  {
    'name': 'French (Comoros)',
    'code': 'fr_KM',
    'deleted': 0
  },
  {
    'name': 'Makhuwa-Meetto (Mozambique)',
    'code': 'mgh_MZ',
    'deleted': 0
  },
  {
    'name': 'Kwasio (Cameroon)',
    'code': 'nmg_CM',
    'deleted': 0
  },
  {
    'name': 'Kabyle',
    'code': 'kab',
    'deleted': 0
  },
  {
    'name': 'Zarma (Niger)',
    'code': 'dje_NE',
    'deleted': 0
  },
  {
    'name': 'English (Cameroon)',
    'code': 'en_CM',
    'deleted': 0
  },
  {
    'name': 'Finnish (Finland)',
    'code': 'fi_FI',
    'deleted': 0
  },
  {
    'name': 'Tamil (Sri Lanka)',
    'code': 'ta_LK',
    'deleted': 0
  },
  {
    'name': 'English (Swaziland)',
    'code': 'en_SZ',
    'deleted': 0
  },
  {
    'name': 'Kabuverdianu (Cape Verde)',
    'code': 'kea_CV',
    'deleted': 0
  },
  {
    'name': 'English (Pitcairn Islands)',
    'code': 'en_PN',
    'deleted': 0
  },
  {
    'name': 'Russian (Belarus)',
    'code': 'ru_BY',
    'deleted': 0
  },
  {
    'name': 'Walser (Switzerland)',
    'code': 'wae_CH',
    'deleted': 0
  },
  {
    'name': 'English (Norfolk Island)',
    'code': 'en_NF',
    'deleted': 0
  },
  {
    'name': 'Cherokee (United States)',
    'code': 'chr_US',
    'deleted': 0
  },
  {
    'name': 'Machame (Tanzania)',
    'code': 'jmc_TZ',
    'deleted': 0
  },
  {
    'name': 'Fulah (Mauritania)',
    'code': 'ff_MR',
    'deleted': 0
  },
  {
    'name': 'Uzbek (Cyrillic)',
    'code': 'uz_Cyrl',
    'deleted': 0
  },
  {
    'name': 'Bambara (Latin, Mali)',
    'code': 'bm_Latn_ML',
    'deleted': 0
  },
  {
    'name': 'Spanish (Ceuta & Melilla)',
    'code': 'es_EA',
    'deleted': 0
  },
  {
    'name': 'Punjabi (Arabic)',
    'code': 'pa_Arab',
    'deleted': 0
  },
  {
    'name': 'English (Rwanda)',
    'code': 'en_RW',
    'deleted': 0
  },
  {
    'name': 'Langi',
    'code': 'lag',
    'deleted': 0
  },
  {
    'name': 'Sangu (Tanzania)',
    'code': 'sbp_TZ',
    'deleted': 0
  },
  {
    'name': 'English (Nigeria)',
    'code': 'en_NG',
    'deleted': 0
  },
  {
    'name': 'Arabic (Mauritania)',
    'code': 'ar_MR',
    'deleted': 0
  },
  {
    'name': 'French (Mayotte)',
    'code': 'fr_YT',
    'deleted': 0
  },
  {
    'name': 'Spanish (Honduras)',
    'code': 'es_HN',
    'deleted': 0
  },
  {
    'name': 'Makonde',
    'code': 'kde',
    'deleted': 0
  },
  {
    'name': 'English (Antigua & Barbuda)',
    'code': 'en_AG',
    'deleted': 0
  },
  {
    'name': 'Chiga',
    'code': 'cgg',
    'deleted': 0
  },
  {
    'name': 'Langi (Tanzania)',
    'code': 'lag_TZ',
    'deleted': 0
  },
  {
    'name': 'Basaa',
    'code': 'bas',
    'deleted': 0
  },
  {
    'name': 'Malay (Arabic, Malaysia)',
    'code': 'ms_Arab_MY',
    'deleted': 0
  },
  {
    'name': 'Kamba',
    'code': 'kam',
    'deleted': 0
  },
  {
    'name': 'Sakha',
    'code': 'sah',
    'deleted': 0
  },
  {
    'name': 'Koyra Chiini (Mali)',
    'code': 'khq_ML',
    'deleted': 0
  },
  {
    'name': 'Walser',
    'code': 'wae',
    'deleted': 0
  },
  {
    'name': 'Kinyarwanda (Rwanda)',
    'code': 'rw_RW',
    'deleted': 0
  },
  {
    'name': 'Spanish (Ecuador)',
    'code': 'es_EC',
    'deleted': 0
  },
  {
    'name': 'Breton (France)',
    'code': 'br_FR',
    'deleted': 0
  },
  {
    'name': 'Romanian (Moldova)',
    'code': 'ro_MD',
    'deleted': 0
  },
  {
    'name': 'Thai (Thailand)',
    'code': 'th_TH',
    'deleted': 0
  },
  {
    'name': 'Embu (Kenya)',
    'code': 'ebu_KE',
    'deleted': 0
  },
  {
    'name': 'French (Luxembourg)',
    'code': 'fr_LU',
    'deleted': 0
  },
  {
    'name': 'Uyghur (Arabic, China)',
    'code': 'ug_Arab_CN',
    'deleted': 0
  },
  {
    'name': 'English (Montenegro)',
    'code': 'en_ME',
    'deleted': 0
  },
  {
    'name': 'Zarma',
    'code': 'dje',
    'deleted': 0
  },
  {
    'name': 'Hindi (India)',
    'code': 'hi_IN',
    'deleted': 0
  },
  {
    'name': 'Russian (Ukraine)',
    'code': 'ru_UA',
    'deleted': 0
  },
  {
    'name': 'Serbian (Cyrillic, Montenegro)',
    'code': 'sr_Cyrl_ME',
    'deleted': 0
  },
  {
    'name': 'French (Gabon)',
    'code': 'fr_GA',
    'deleted': 0
  },
  {
    'name': 'Swedish (Sweden)',
    'code': 'sv_SE',
    'deleted': 0
  },
  {
    'name': 'Vai',
    'code': 'vai',
    'deleted': 0
  },
  {
    'name': 'Taita',
    'code': 'dav',
    'deleted': 0
  },
  {
    'name': 'English (Bermuda)',
    'code': 'en_BM',
    'deleted': 0
  },
  {
    'name': 'English (Anguilla)',
    'code': 'en_AI',
    'deleted': 0
  },
  {
    'name': 'English (Puerto Rico)',
    'code': 'en_PR',
    'deleted': 0
  },
  {
    'name': 'Nama',
    'code': 'naq',
    'deleted': 0
  },
  {
    'name': 'Ganda (Uganda)',
    'code': 'lg_UG',
    'deleted': 0
  },
  {
    'name': 'Makhuwa-Meetto',
    'code': 'mgh',
    'deleted': 0
  },
  {
    'name': 'Arabic (Comoros)',
    'code': 'ar_KM',
    'deleted': 0
  },
  {
    'name': 'Kyrgyz (Cyrillic, Kyrgyzstan)',
    'code': 'ky_Cyrl_KG',
    'deleted': 0
  },
  {
    'name': 'Masai',
    'code': 'mas',
    'deleted': 0
  },
  {
    'name': 'Portuguese (Guinea-Bissau)',
    'code': 'pt_GW',
    'deleted': 0
  },
  {
    'name': 'Hausa (Latin)',
    'code': 'ha_Latn',
    'deleted': 0
  },
  {
    'name': 'Aghem',
    'code': 'agq',
    'deleted': 0
  },
  {
    'name': 'Morisyen (Mauritius)',
    'code': 'mfe_MU',
    'deleted': 0
  },
  {
    'name': 'Hawaiian',
    'code': 'haw',
    'deleted': 0
  },
  {
    'code': 'yi',
    'deleted': 0
  },
  {
    'name': 'Inari Sami (Finland)',
    'code': 'smn_FI',
    'deleted': 0
  },
  {
    'name': 'Quechua (Bolivia)',
    'code': 'qu_BO',
    'deleted': 0
  },
  {
    'name': 'Norwegian Bokmål (Svalbard & Jan Mayen)',
    'code': 'nb_SJ',
    'deleted': 0
  },
  {
    'name': 'Turkmen (Latin, Turkmenistan)',
    'code': 'tk_Latn_TM',
    'deleted': 0
  },
  {
    'name': 'Samburu',
    'code': 'saq',
    'deleted': 0
  },
  {
    'name': 'Portuguese (São Tomé & Príncipe)',
    'code': 'pt_ST',
    'deleted': 0
  },
  {
    'name': 'Urdu (India)',
    'code': 'ur_IN',
    'deleted': 0
  },
  {
    'name': 'Uyghur',
    'code': 'ug',
    'deleted': 0
  },
  {
    'name': 'Serbian (Latin, Montenegro)',
    'code': 'sr_Latn_ME',
    'deleted': 0
  },
  {
    'name': 'English (Madagascar)',
    'code': 'en_MG',
    'deleted': 0
  },
  {
    'name': 'Machame',
    'code': 'jmc',
    'deleted': 0
  },
  {
    'name': 'English (St. Lucia)',
    'code': 'en_LC',
    'deleted': 0
  },
  {
    'name': 'Kashmiri (Arabic)',
    'code': 'ks_Arab',
    'deleted': 0
  },
  {
    'name': 'Tasawaq (Niger)',
    'code': 'twq_NE',
    'deleted': 0
  },
  {
    'name': 'Dutch (Netherlands)',
    'code': 'nl_NL',
    'deleted': 0
  },
  {
    'name': 'Ngiemboon (Cameroon)',
    'code': 'nnh_CM',
    'deleted': 0
  },
  {
    'name': 'Yoruba',
    'code': 'yo',
    'deleted': 0
  },
  {
    'name': 'Chinese (Traditional, Taiwan)',
    'code': 'zh_Hant_TW',
    'deleted': 0
  },
  {
    'name': 'German (Switzerland)',
    'code': 'de_CH',
    'deleted': 0
  },
  {
    'name': 'Ngomba',
    'code': 'jgo',
    'deleted': 0
  },
  {
    'name': 'Ukrainian',
    'code': 'uk',
    'deleted': 0
  },
  {
    'name': 'French (Chad)',
    'code': 'fr_TD',
    'deleted': 0
  },
  {
    'name': 'Asu',
    'code': 'asa',
    'deleted': 0
  },
  {
    'name': 'Mundang (Cameroon)',
    'code': 'mua_CM',
    'deleted': 0
  },
  {
    'name': 'Spanish (United States)',
    'code': 'es_US',
    'deleted': 0
  },
  {
    'name': 'English (Portugal)',
    'code': 'en_PT',
    'deleted': 0
  },
  {
    'name': 'English (Netherlands)',
    'code': 'en_NL',
    'deleted': 0
  },
  {
    'name': 'Metaʼ',
    'code': 'mgo',
    'deleted': 0
  },
  {
    'name': 'English (Marshall Islands)',
    'code': 'en_MH',
    'deleted': 0
  },
  {
    'name': 'Bena (Tanzania)',
    'code': 'bez_TZ',
    'deleted': 0
  },
  {
    'name': 'German (Belgium)',
    'code': 'de_BE',
    'deleted': 0
  },
  {
    'name': 'Standard Moroccan Tamazight',
    'code': 'zgh',
    'deleted': 0
  },
  {
    'name': 'Vai (Latin)',
    'code': 'vai_Latn',
    'deleted': 0
  },
  {
    'name': 'Lower Sorbian',
    'code': 'dsb',
    'deleted': 0
  },
  {
    'name': 'Welsh (United Kingdom)',
    'code': 'cy_GB',
    'deleted': 0
  },
  {
    'name': 'English (Albania)',
    'code': 'en_AL',
    'deleted': 0
  },
  {
    'name': 'Urdu',
    'code': 'ur',
    'deleted': 0
  },
  {
    'name': 'Hebrew (Israel)',
    'code': 'he_IL',
    'deleted': 0
  },
  {
    'name': 'Tibetan (India)',
    'code': 'bo_IN',
    'deleted': 0
  },
  {
    'name': 'Dutch (Caribbean Netherlands)',
    'code': 'nl_BQ',
    'deleted': 0
  },
  {
    'name': 'Malagasy',
    'code': 'mg',
    'deleted': 0
  },
  {
    'name': 'Chinese (Traditional, Macau SAR China)',
    'code': 'zh_Hant_MO',
    'deleted': 0
  },
  {
    'name': 'Kwasio',
    'code': 'nmg',
    'deleted': 0
  },
  {
    'name': 'Bemba (Zambia)',
    'code': 'bem_ZM',
    'deleted': 0
  },
  {
    'name': 'Indonesian',
    'deleted': 0
  },
  {
    'name': 'Estonian (Estonia)',
    'code': 'et_EE',
    'deleted': 0
  },
  {
    'name': 'Upper Sorbian',
    'code': 'hsb',
    'deleted': 0
  },
  {
    'name': 'Yangben',
    'code': 'yav',
    'deleted': 0
  },
  {
    'name': 'Macedonian',
    'code': 'mk',
    'deleted': 0
  },
  {
    'name': 'Malayalam',
    'code': 'ml',
    'deleted': 0
  },
  {
    'name': 'Igbo',
    'code': 'ig',
    'deleted': 0
  },
  {
    'code': 'yi_001',
    'deleted': 0
  },
  {
    'name': 'Mongolian',
    'code': 'mn',
    'deleted': 0
  },
  {
    'name': 'Shambala',
    'code': 'ksb',
    'deleted': 0
  },
  {
    'name': 'Uzbek',
    'code': 'uz',
    'deleted': 0
  },
  {
    'name': 'Swedish (Finland)',
    'code': 'sv_FI',
    'deleted': 0
  },
  {
    'name': 'Sichuan Yi',
    'code': 'ii',
    'deleted': 0
  },
  {
    'name': 'Polish (Poland)',
    'code': 'pl_PL',
    'deleted': 0
  },
  {
    'name': 'Quechua',
    'code': 'qu',
    'deleted': 0
  },
  {
    'name': 'Uyghur (Arabic)',
    'code': 'ug_Arab',
    'deleted': 0
  },
  {
    'name': 'Spanish (Panama)',
    'code': 'es_PA',
    'deleted': 0
  },
  {
    'name': 'Ewe',
    'code': 'ee',
    'deleted': 0
  },
  {
    'name': 'Macedonian (Macedonia)',
    'code': 'mk_MK',
    'deleted': 0
  },
  {
    'name': 'Lingala (Congo - Kinshasa)',
    'code': 'ln_CD',
    'deleted': 0
  },
  {
    'name': 'French (French Guiana)',
    'code': 'fr_GF',
    'deleted': 0
  },
  {
    'name': 'Luyia (Kenya)',
    'code': 'luy_KE',
    'deleted': 0
  },
  {
    'name': 'Marathi',
    'code': 'mr',
    'deleted': 0
  },
  {
    'name': 'Spanish (Equatorial Guinea)',
    'code': 'es_GQ',
    'deleted': 0
  },
  {
    'name': 'Malay',
    'code': 'ms',
    'deleted': 0
  },
  {
    'name': 'Kannada (India)',
    'code': 'kn_IN',
    'deleted': 0
  },
  {
    'name': 'Dutch (Curaçao)',
    'code': 'nl_CW',
    'deleted': 0
  },
  {
    'name': 'Maltese',
    'code': 'mt',
    'deleted': 0
  },
  {
    'name': 'French (Togo)',
    'code': 'fr_TG',
    'deleted': 0
  },
  {
    'name': 'French (Seychelles)',
    'code': 'fr_SC',
    'deleted': 0
  },
  {
    'name': 'English (Palau)',
    'code': 'en_PW',
    'deleted': 0
  },
  {
    'name': 'Bafia',
    'code': 'ksf',
    'deleted': 0
  },
  {
    'name': 'English (Norway)',
    'code': 'en_NO',
    'deleted': 0
  },
  {
    'name': 'Ukrainian (Ukraine)',
    'code': 'uk_UA',
    'deleted': 0
  },
  {
    'name': 'Afrikaans',
    'code': 'af',
    'deleted': 0
  },
  {
    'name': 'Greek',
    'code': 'el',
    'deleted': 0
  },
  {
    'name': 'Icelandic',
    'code': 'is',
    'deleted': 0
  },
  {
    'name': 'Colognian',
    'code': 'ksh',
    'deleted': 0
  },
  {
    'name': 'Burmese',
    'code': 'my',
    'deleted': 0
  },
  {
    'name': 'English (Bahamas)',
    'code': 'en_BS',
    'deleted': 0
  },
  {
    'name': 'English',
    'code': 'en',
    'deleted': 0
  },
  {
    'name': 'Italian',
    'code': 'it',
    'deleted': 0
  },
  {
    'name': 'Tamil (Malaysia)',
    'code': 'ta_MY',
    'deleted': 0
  },
  {
    'name': 'Indonesian (Indonesia)',
    'deleted': 0
  },
  {
    'name': 'Inari Sami',
    'code': 'smn',
    'deleted': 0
  },
  {
    'name': 'Inuktitut',
    'code': 'iu',
    'deleted': 0
  },
  {
    'name': 'Esperanto',
    'code': 'eo',
    'deleted': 0
  },
  {
    'name': 'Malagasy (Madagascar)',
    'code': 'mg_MG',
    'deleted': 0
  },
  {
    'name': 'Ossetic (Russia)',
    'code': 'os_RU',
    'deleted': 0
  },
  {
    'name': 'Akan',
    'code': 'ak',
    'deleted': 0
  },
  {
    'name': 'Arabic (Jordan)',
    'code': 'ar_JO',
    'deleted': 0
  },
  {
    'name': 'Lingala (Central African Republic)',
    'code': 'ln_CF',
    'deleted': 0
  },
  {
    'name': 'Amharic',
    'code': 'am',
    'deleted': 0
  },
  {
    'name': 'Spanish',
    'code': 'es',
    'deleted': 0
  },
  {
    'name': 'Bengali (Bangladesh)',
    'code': 'bn_BD',
    'deleted': 0
  },
  {
    'name': 'Estonian',
    'code': 'et',
    'deleted': 0
  },
  {
    'name': 'English (Christmas Island)',
    'code': 'en_CX',
    'deleted': 0
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
          feathersClient.service('locales').create(locale)
            .then((result) => {
              console.log('Locale seeded...', result.name);
            }).catch((error) => {
              console.error('Error seeding locale!', error.message);
            });
        });
      })
      .catch(function(error){
        console.error('Error authenticating!', error);
      });
  })
  .catch(function(error) {
    console.error('Error creating user!');
  });
