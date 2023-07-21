const countries = [
  { value: "", displayValue: "select country" },
  {
    value: "AF",
    displayValue: "Afghanistan",
  },
  {
    value: "AX",
    displayValue: "Aland Islands",
  },
  {
    value: "AL",
    displayValue: "Albania",
  },
  {
    value: "DZ",
    displayValue: "Algeria",
  },
  {
    value: "AS",
    displayValue: "American Samoa",
  },
  {
    value: "AD",
    displayValue: "Andorra",
  },
  {
    value: "AO",
    displayValue: "Angola",
  },
  {
    value: "AI",
    displayValue: "Anguilla",
  },
  {
    value: "AQ",
    displayValue: "Antarctica",
  },
  {
    value: "AG",
    displayValue: "Antigua and Barbuda",
  },
  {
    value: "AR",
    displayValue: "Argentina",
  },
  {
    value: "AM",
    displayValue: "Armenia",
  },
  {
    value: "AW",
    displayValue: "Aruba",
  },
  {
    value: "AU",
    displayValue: "Australia",
  },
  {
    value: "AT",
    displayValue: "Austria",
  },
  {
    value: "AZ",
    displayValue: "Azerbaijan",
  },
  {
    value: "BS",
    displayValue: "Bahamas",
  },
  {
    value: "BH",
    displayValue: "Bahrain",
  },
  {
    value: "BD",
    displayValue: "Bangladesh",
  },
  {
    value: "BB",
    displayValue: "Barbados",
  },
  {
    value: "BY",
    displayValue: "Belarus",
  },
  {
    value: "BE",
    displayValue: "Belgium",
  },
  {
    value: "BZ",
    displayValue: "Belize",
  },
  {
    value: "BJ",
    displayValue: "Benin",
  },
  {
    value: "BM",
    displayValue: "Bermuda",
  },
  {
    value: "BT",
    displayValue: "Bhutan",
  },
  {
    value: "BO",
    displayValue: "Bolivia",
  },
  {
    value: "BQ",
    displayValue: "Bonaire, Sint Eustatius and Saba",
  },
  {
    value: "BA",
    displayValue: "Bosnia and Herzegovina",
  },
  {
    value: "BW",
    displayValue: "Botswana",
  },
  {
    value: "BV",
    displayValue: "Bouvet Island",
  },
  {
    value: "BR",
    displayValue: "Brazil",
  },
  {
    value: "IO",
    displayValue: "British Indian Ocean Territory",
  },
  {
    value: "BN",
    displayValue: "Brunei Darussalam",
  },
  {
    value: "BG",
    displayValue: "Bulgaria",
  },
  {
    value: "BF",
    displayValue: "Burkina Faso",
  },
  {
    value: "BI",
    displayValue: "Burundi",
  },
  {
    value: "KH",
    displayValue: "Cambodia",
  },
  {
    value: "CM",
    displayValue: "Cameroon",
  },
  {
    value: "CA",
    displayValue: "Canada",
  },
  {
    value: "CV",
    displayValue: "Cape Verde",
  },
  {
    value: "KY",
    displayValue: "Cayman Islands",
  },
  {
    value: "CF",
    displayValue: "Central African Republic",
  },
  {
    value: "TD",
    displayValue: "Chad",
  },
  {
    value: "CL",
    displayValue: "Chile",
  },
  {
    value: "CN",
    displayValue: "China",
  },
  {
    value: "CX",
    displayValue: "Christmas Island",
  },
  {
    value: "CC",
    displayValue: "Cocos (Keeling) Islands",
  },
  {
    value: "CO",
    displayValue: "Colombia",
  },
  {
    value: "KM",
    displayValue: "Comoros",
  },
  {
    value: "CG",
    displayValue: "Congo",
  },
  {
    value: "CD",
    displayValue: "Congo, Democratic Republic of the Congo",
  },
  {
    value: "CK",
    displayValue: "Cook Islands",
  },
  {
    value: "CR",
    displayValue: "Costa Rica",
  },
  {
    value: "CI",
    displayValue: "Cote D'Ivoire",
  },
  {
    value: "HR",
    displayValue: "Croatia",
  },
  {
    value: "CU",
    displayValue: "Cuba",
  },
  {
    value: "CW",
    displayValue: "Curacao",
  },
  {
    value: "CY",
    displayValue: "Cyprus",
  },
  {
    value: "CZ",
    displayValue: "Czech Republic",
  },
  {
    value: "DK",
    displayValue: "Denmark",
  },
  {
    value: "DJ",
    displayValue: "Djibouti",
  },
  {
    value: "DM",
    displayValue: "Dominica",
  },
  {
    value: "DO",
    displayValue: "Dominican Republic",
  },
  {
    value: "EC",
    displayValue: "Ecuador",
  },
  {
    value: "EG",
    displayValue: "Egypt",
  },
  {
    value: "SV",
    displayValue: "El Salvador",
  },
  {
    value: "GQ",
    displayValue: "Equatorial Guinea",
  },
  {
    value: "ER",
    displayValue: "Eritrea",
  },
  {
    value: "EE",
    displayValue: "Estonia",
  },
  {
    value: "ET",
    displayValue: "Ethiopia",
  },
  {
    value: "FK",
    displayValue: "Falkland Islands (Malvinas)",
  },
  {
    value: "FO",
    displayValue: "Faroe Islands",
  },
  {
    value: "FJ",
    displayValue: "Fiji",
  },
  {
    value: "FI",
    displayValue: "Finland",
  },
  {
    value: "FR",
    displayValue: "France",
  },
  {
    value: "GF",
    displayValue: "French Guiana",
  },
  {
    value: "PF",
    displayValue: "French Polynesia",
  },
  {
    value: "TF",
    displayValue: "French Southern Territories",
  },
  {
    value: "GA",
    displayValue: "Gabon",
  },
  {
    value: "GM",
    displayValue: "Gambia",
  },
  {
    value: "GE",
    displayValue: "Georgia",
  },
  {
    value: "DE",
    displayValue: "Germany",
  },
  {
    value: "GH",
    displayValue: "Ghana",
  },
  {
    value: "GI",
    displayValue: "Gibraltar",
  },
  {
    value: "GR",
    displayValue: "Greece",
  },
  {
    value: "GL",
    displayValue: "Greenland",
  },
  {
    value: "GD",
    displayValue: "Grenada",
  },
  {
    value: "GP",
    displayValue: "Guadeloupe",
  },
  {
    value: "GU",
    displayValue: "Guam",
  },
  {
    value: "GT",
    displayValue: "Guatemala",
  },
  {
    value: "GG",
    displayValue: "Guernsey",
  },
  {
    value: "GN",
    displayValue: "Guinea",
  },
  {
    value: "GW",
    displayValue: "Guinea-Bissau",
  },
  {
    value: "GY",
    displayValue: "Guyana",
  },
  {
    value: "HT",
    displayValue: "Haiti",
  },
  {
    value: "HM",
    displayValue: "Heard Island and Mcdonald Islands",
  },
  {
    value: "VA",
    displayValue: "Holy See (Vatican City State)",
  },
  {
    value: "HN",
    displayValue: "Honduras",
  },
  {
    value: "HK",
    displayValue: "Hong Kong",
  },
  {
    value: "HU",
    displayValue: "Hungary",
  },
  {
    value: "IS",
    displayValue: "Iceland",
  },
  {
    value: "IN",
    displayValue: "India",
  },
  {
    value: "ID",
    displayValue: "Indonesia",
  },
  {
    value: "IR",
    displayValue: "Iran, Islamic Republic of",
  },
  {
    value: "IQ",
    displayValue: "Iraq",
  },
  {
    value: "IE",
    displayValue: "Ireland",
  },
  {
    value: "IM",
    displayValue: "Isle of Man",
  },
  {
    value: "IL",
    displayValue: "Israel",
  },
  {
    value: "IT",
    displayValue: "Italy",
  },
  {
    value: "JM",
    displayValue: "Jamaica",
  },
  {
    value: "JP",
    displayValue: "Japan",
  },
  {
    value: "JE",
    displayValue: "Jersey",
  },
  {
    value: "JO",
    displayValue: "Jordan",
  },
  {
    value: "KZ",
    displayValue: "Kazakhstan",
  },
  {
    value: "KE",
    displayValue: "Kenya",
  },
  {
    value: "KI",
    displayValue: "Kiribati",
  },
  {
    value: "KP",
    displayValue: "Korea, Democratic People's Republic of",
  },
  {
    value: "KR",
    displayValue: "Korea, Republic of",
  },
  {
    value: "XK",
    displayValue: "Kosovo",
  },
  {
    value: "KW",
    displayValue: "Kuwait",
  },
  {
    value: "KG",
    displayValue: "Kyrgyzstan",
  },
  {
    value: "LA",
    displayValue: "Lao People's Democratic Republic",
  },
  {
    value: "LV",
    displayValue: "Latvia",
  },
  {
    value: "LB",
    displayValue: "Lebanon",
  },
  {
    value: "LS",
    displayValue: "Lesotho",
  },
  {
    value: "LR",
    displayValue: "Liberia",
  },
  {
    value: "LY",
    displayValue: "Libyan Arab Jamahiriya",
  },
  {
    value: "LI",
    displayValue: "Liechtenstein",
  },
  {
    value: "LT",
    displayValue: "Lithuania",
  },
  {
    value: "LU",
    displayValue: "Luxembourg",
  },
  {
    value: "MO",
    displayValue: "Macao",
  },
  {
    value: "MK",
    displayValue: "Macedonia, the Former Yugoslav Republic of",
  },
  {
    value: "MG",
    displayValue: "Madagascar",
  },
  {
    value: "MW",
    displayValue: "Malawi",
  },
  {
    value: "MY",
    displayValue: "Malaysia",
  },
  {
    value: "MV",
    displayValue: "Maldives",
  },
  {
    value: "ML",
    displayValue: "Mali",
  },
  {
    value: "MT",
    displayValue: "Malta",
  },
  {
    value: "MH",
    displayValue: "Marshall Islands",
  },
  {
    value: "MQ",
    displayValue: "Martinique",
  },
  {
    value: "MR",
    displayValue: "Mauritania",
  },
  {
    value: "MU",
    displayValue: "Mauritius",
  },
  {
    value: "YT",
    displayValue: "Mayotte",
  },
  {
    value: "MX",
    displayValue: "Mexico",
  },
  {
    value: "FM",
    displayValue: "Micronesia, Federated States of",
  },
  {
    value: "MD",
    displayValue: "Moldova, Republic of",
  },
  {
    value: "MC",
    displayValue: "Monaco",
  },
  {
    value: "MN",
    displayValue: "Mongolia",
  },
  {
    value: "ME",
    displayValue: "Montenegro",
  },
  {
    value: "MS",
    displayValue: "Montserrat",
  },
  {
    value: "MA",
    displayValue: "Morocco",
  },
  {
    value: "MZ",
    displayValue: "Mozambique",
  },
  {
    value: "MM",
    displayValue: "Myanmar",
  },
  {
    value: "NA",
    displayValue: "Namibia",
  },
  {
    value: "NR",
    displayValue: "Nauru",
  },
  {
    value: "NP",
    displayValue: "Nepal",
  },
  {
    value: "NL",
    displayValue: "Netherlands",
  },
  {
    value: "AN",
    displayValue: "Netherlands Antilles",
  },
  {
    value: "NC",
    displayValue: "New Caledonia",
  },
  {
    value: "NZ",
    displayValue: "New Zealand",
  },
  {
    value: "NI",
    displayValue: "Nicaragua",
  },
  {
    value: "NE",
    displayValue: "Niger",
  },
  {
    value: "NG",
    displayValue: "Nigeria",
  },
  {
    value: "NU",
    displayValue: "Niue",
  },
  {
    value: "NF",
    displayValue: "Norfolk Island",
  },
  {
    value: "MP",
    displayValue: "Northern Mariana Islands",
  },
  {
    value: "NO",
    displayValue: "Norway",
  },
  {
    value: "OM",
    displayValue: "Oman",
  },
  {
    value: "PK",
    displayValue: "Pakistan",
  },
  {
    value: "PW",
    displayValue: "Palau",
  },
  {
    value: "PS",
    displayValue: "Palestinian Territory, Occupied",
  },
  {
    value: "PA",
    displayValue: "Panama",
  },
  {
    value: "PG",
    displayValue: "Papua New Guinea",
  },
  {
    value: "PY",
    displayValue: "Paraguay",
  },
  {
    value: "PE",
    displayValue: "Peru",
  },
  {
    value: "PH",
    displayValue: "Philippines",
  },
  {
    value: "PN",
    displayValue: "Pitcairn",
  },
  {
    value: "PL",
    displayValue: "Poland",
  },
  {
    value: "PT",
    displayValue: "Portugal",
  },
  {
    value: "PR",
    displayValue: "Puerto Rico",
  },
  {
    value: "QA",
    displayValue: "Qatar",
  },
  {
    value: "RE",
    displayValue: "Reunion",
  },
  {
    value: "RO",
    displayValue: "Romania",
  },
  {
    value: "RU",
    displayValue: "Russian Federation",
  },
  {
    value: "RW",
    displayValue: "Rwanda",
  },
  {
    value: "BL",
    displayValue: "Saint Barthelemy",
  },
  {
    value: "SH",
    displayValue: "Saint Helena",
  },
  {
    value: "KN",
    displayValue: "Saint Kitts and Nevis",
  },
  {
    value: "LC",
    displayValue: "Saint Lucia",
  },
  {
    value: "MF",
    displayValue: "Saint Martin",
  },
  {
    value: "PM",
    displayValue: "Saint Pierre and Miquelon",
  },
  {
    value: "VC",
    displayValue: "Saint Vincent and the Grenadines",
  },
  {
    value: "WS",
    displayValue: "Samoa",
  },
  {
    value: "SM",
    displayValue: "San Marino",
  },
  {
    value: "ST",
    displayValue: "Sao Tome and Principe",
  },
  {
    value: "SA",
    displayValue: "Saudi Arabia",
  },
  {
    value: "SN",
    displayValue: "Senegal",
  },
  {
    value: "RS",
    displayValue: "Serbia",
  },
  {
    value: "SC",
    displayValue: "Seychelles",
  },
  {
    value: "SL",
    displayValue: "Sierra Leone",
  },
  {
    value: "SG",
    displayValue: "Singapore",
  },
  {
    value: "SX",
    displayValue: "Sint Maarten",
  },
  {
    value: "SK",
    displayValue: "Slovakia",
  },
  {
    value: "SI",
    displayValue: "Slovenia",
  },
  {
    value: "SB",
    displayValue: "Solomon Islands",
  },
  {
    value: "SO",
    displayValue: "Somalia",
  },
  {
    value: "ZA",
    displayValue: "South Africa",
  },
  {
    value: "GS",
    displayValue: "South Georgia and the South Sandwich Islands",
  },
  {
    value: "SS",
    displayValue: "South Sudan",
  },
  {
    value: "ES",
    displayValue: "Spain",
  },
  {
    value: "LK",
    displayValue: "Sri Lanka",
  },
  {
    value: "SD",
    displayValue: "Sudan",
  },
  {
    value: "SR",
    displayValue: "Suriname",
  },
  {
    value: "SJ",
    displayValue: "Svalbard and Jan Mayen",
  },
  {
    value: "SZ",
    displayValue: "Swaziland",
  },
  {
    value: "SE",
    displayValue: "Sweden",
  },
  {
    value: "CH",
    displayValue: "Switzerland",
  },
  {
    value: "SY",
    displayValue: "Syrian Arab Republic",
  },
  {
    value: "TW",
    displayValue: "Taiwan, Province of China",
  },
  {
    value: "TJ",
    displayValue: "Tajikistan",
  },
  {
    value: "TZ",
    displayValue: "Tanzania, United Republic of",
  },
  {
    value: "TH",
    displayValue: "Thailand",
  },
  {
    value: "TL",
    displayValue: "Timor-Leste",
  },
  {
    value: "TG",
    displayValue: "Togo",
  },
  {
    value: "TK",
    displayValue: "Tokelau",
  },
  {
    value: "TO",
    displayValue: "Tonga",
  },
  {
    value: "TT",
    displayValue: "Trinidad and Tobago",
  },
  {
    value: "TN",
    displayValue: "Tunisia",
  },
  {
    value: "TR",
    displayValue: "Turkey",
  },
  {
    value: "TM",
    displayValue: "Turkmenistan",
  },
  {
    value: "TC",
    displayValue: "Turks and Caicos Islands",
  },
  {
    value: "TV",
    displayValue: "Tuvalu",
  },
  {
    value: "UG",
    displayValue: "Uganda",
  },
  {
    value: "UA",
    displayValue: "Ukraine",
  },
  {
    value: "AE",
    displayValue: "United Arab Emirates",
  },
  {
    value: "GB",
    displayValue: "United Kingdom",
  },
  {
    value: "US",
    displayValue: "United States",
  },
  {
    value: "UM",
    displayValue: "United States Minor Outlying Islands",
  },
  {
    value: "UY",
    displayValue: "Uruguay",
  },
  {
    value: "UZ",
    displayValue: "Uzbekistan",
  },
  {
    value: "VU",
    displayValue: "Vanuatu",
  },
  {
    value: "VE",
    displayValue: "Venezuela",
  },
  {
    value: "VN",
    displayValue: "Viet Nam",
  },
  {
    value: "VG",
    displayValue: "Virgin Islands, British",
  },
  {
    value: "VI",
    displayValue: "Virgin Islands, U.s.",
  },
  {
    value: "WF",
    displayValue: "Wallis and Futuna",
  },
  {
    value: "EH",
    displayValue: "Western Sahara",
  },
  {
    value: "YE",
    displayValue: "Yemen",
  },
  {
    value: "ZM",
    displayValue: "Zambia",
  },
  {
    value: "ZW",
    displayValue: "Zimbabwe",
  },
];

module.exports.countries = countries;
