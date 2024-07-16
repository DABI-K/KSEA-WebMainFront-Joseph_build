// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { KseaInfoService } from 'src/app/service/ksea-info.service';

export const environment = {
  production: false,

  cognito: {
    userPoolId: 'us-west-2_OXxFPaD47',
    userPoolWebClientId: '144avh17n7envfbehd4madljqc',
  },

  external_urls: {
    s3: 'https://ksea-files.s3.us-west-2.amazonaws.com/',
    s3_Scholarship: 'https://ksea-scholarship.s3.amazonaws.com/',
    s3_Yig: 'https://ksea-yig.s3.amazonaws.com/',
    s3_UKC: 'https://ksea-ukc.s3.amazonaws.com/',
  },

  webConfig: {
    kseaInfoId: '52', //later, change it to '52' to pull out up-to-date information.
    scholarshipDefId: '2024_Scholarship',
    yigDefId: '2024_YIG',
    ukcDefId: '2024_UKC',
    emailCC: 'it@ksea.org',
  },

  // for localhost
  stripe: {
    priceId: 'price_1MIS8aI3X7wnyEeCczuQX09s',
    publishableKey:
      'pk_test_51MIS7oI3X7wnyEeCvIRB4Il4t6rEIqkCLqOS8BCVU2thYWHrcRrPo2pfOnjMCnt0oDJzFHlLpnnugB7yCTyCwSE000A4WKaf3r',
  },

  votingId: '2024',

  votingManagers: [
    'jungyubw@gmail.com',
    'jungyub.woo@ontwins.com',
    'park.donghun@gmail.com',
    'joepm1004@gmail.com',
  ],

  apiURLs: {
    payment_api_URL:
      'https://bf0u3t79a1.execute-api.us-west-2.amazonaws.com/DEV',
    voting_api_URL:
      'https://q6s798hz45.execute-api.us-west-2.amazonaws.com/DEV',
    membership_api_URL:
      'https://nh952rrvyj.execute-api.us-west-2.amazonaws.com/DEV',
    user_info_api_URL:
      'https://d8w1hvcdbb.execute-api.us-west-2.amazonaws.com/DEV',
    ksea_info_api_URL:
      'https://fdf7fdpkof.execute-api.us-west-2.amazonaws.com/DEV',
    email_api_URL: 'https://ev01ck3eh0.execute-api.us-west-2.amazonaws.com',

    file_api_URL: 'https://i7dou63m35.execute-api.us-east-1.amazonaws.com',

    scholarship_api_URL:
      'https://7tlv8vz97b.execute-api.us-west-2.amazonaws.com',

    yig_api_URL: 'https://1wap14xohk.execute-api.us-west-2.amazonaws.com',

    ukc_c4p_api_URL: 'https://iiw9mgdy55.execute-api.us-west-2.amazonaws.com',
    ukc_registration_api_URL:
      'https://iiw9mgdy55.execute-api.us-west-2.amazonaws.com',
    cognito_api_URL: 'https://sog9rmm1j3.execute-api.us-west-2.amazonaws.com',
    ukc_GroupCode_api_URL:
      'https://jv778xoqi3.execute-api.us-west-2.amazonaws.com/ukcCodeList/2024_UKC',
  },

  ukcAdmin: [
    'jungyubw@gmail.com',
    'itm@ksea.org',
    'joepm1004@gmail.com',
    'katie.sang.park@gmail.com',
  ],

  ukcReviewers: [
    {
      email: 'jungyubw@gmail.com',
      keys: [
        'PHY',
        'CHM',
        'MAS',
        'MPS',
        'FAN',
        'BME',
        'CHE',
        'MAN',
        'MSE',
        'CEA',
        'ECE',
        'CIT',
        'IMS',
        'SSP',
        'TFB',
      ],
    },
    {
      email: 'park.donghun@gmail.com',
      keys: [
        'PHY',
        'CHM',
        'MAS',
        'MPS',
        'FAN',
        'BME',
        'CHE',
        'MAN',
        'MSE',
        'CEA',
        'ECE',
        'CIT',
        'IMS',
        'SSP',
        'TFB',
      ],
    },
    {
      email: 'itm@ksea.org',
      keys: [
        'PHY',
        'CHM',
        'MAS',
        'MPS',
        'FAN',
        'BME',
        'CHE',
        'MAN',
        'MSE',
        'CEA',
        'ECE',
        'CIT',
        'IMS',
        'SSP',
        'TFB',
      ],
    },
    {
      email: 'katie.sang.park@gmail.com',
      keys: [
        'PHY',
        'CHM',
        'MAS',
        'MPS',
        'FAN',
        'BME',
        'CHE',
        'MAN',
        'MSE',
        'CEA',
        'ECE',
        'CIT',
        'IMS',
        'SSP',
        'TFB',
      ],
    },
    {
      email: 'joepm1004@gmail.com',
      keys: [
        'PHY',
        'CHM',
        'MAS',
        'MPS',
        'FAN',
        'BME',
        'CHE',
        'MAN',
        'MSE',
        'CEA',
        'ECE',
        'CIT',
        'IMS',
        'SSP',
        'TFB',
      ],
    },
    // {
    //   email: 'cynam@bnl.gov',
    //   keys: [
    //     'PHY',
    //     'CHM',
    //     'MAS',
    //     'MPS',
    //     'FAN',
    //     'BME',
    //     'CHE',
    //     'MAN',
    //     'MSE',
    //     'CEA',
    //     'ECE',
    //     'CIT',
    //     'IMS',
    //     'SSP',
    //     'TFB',
    //   ],
    // },
    // {
    //   email: 'yongho.sohn@ucf.edu',
    //   keys: [
    //     'PHY',
    //     'CHM',
    //     'MAS',
    //     'MPS',
    //     'FAN',
    //     'BME',
    //     'CHE',
    //     'MAN',
    //     'MSE',
    //     'CEA',
    //     'ECE',
    //     'CIT',
    //     'IMS',
    //     'SSP',
    //     'TFB',
    //   ],
    // },
    // {
    //   email: 'tae-youl.choi@unt.edu',
    //   keys: [
    //     'PHY',
    //     'CHM',
    //     'MAS',
    //     'MPS',
    //     'FAN',
    //     'BME',
    //     'CHE',
    //     'MAN',
    //     'MSE',
    //     'CEA',
    //     'ECE',
    //     'CIT',
    //     'IMS',
    //     'SSP',
    //     'TFB',
    //   ],
    // },
    // {
    //   email: 'harold.kim@physics.gatech.edu',
    //   keys: ['PHY'],
    // },
    // {
    //   email: 'jwpark@uchicago.edu',
    //   keys: ['CHM'],
    // },
    // {
    //   email: 'yjlee@txstate.edu',
    //   keys: ['MAS'],
    // },
    // {
    //   email: 'takim@salud.unm.edu',
    //   keys: ['MPS'],
    // },
    // {
    //   email: 'yoo.kim@okstate.edu',
    //   keys: ['FAN'],
    // },
    // {
    //   email: 'hjkong06@illinois.edu',
    //   keys: ['BME'],
    // },
    // {
    //   email: 'hyun-tae.hwang@uky.edu',
    //   keys: ['CHE'],
    // },
    // {
    //   email: 'eonsoo.lee@njit.edu',
    //   keys: ['MAN'],
    // },
    // {
    //   email: 'jiyoung.kim@utdallas.edu',
    //   keys: ['MSE'],
    // },
    // {
    //   email: 'yseo2@kennesaw.edu',
    //   keys: ['CEA'],
    // },
    // {
    //   email: 'choi.envirotronics@gmail.com',
    //   keys: ['ECE'],
    // },
    // {
    //   email: 'ohbong70@gmail.com',
    //   keys: ['CIT'],
    // },
    // {
    //   email: 'jhchoi@ysu.edu',
    //   keys: ['IMS'],
    // },
  ],
  //Do not put the same email at both of scholarshipEvaluator and scholarshipMonitors. "only 1".
  scholarshipEvaluator: [
    'jungyubw@gmail.com',
    'katie@ksea.org',
    'joepm1004@gmail.com',
    'katie.sang.park@gmail.com',
  ],

  scholarshipMonitors: [
    'jungyubw@gmail.com',
    'park.donghun@gmail.com',
    'hq@ksea.org',
    'database@ksea.org',
    'itm@ksea.org',
  ],

  yigMonitors: [
    'jungyubw@gmail.com',
    'park.donghun@gmail.com',
    'itm@ksea.org',
    'hq@ksea.org',
    'katie.sang.park@gmail.com',
  ],

  userInfoMonitors: [
    'jungyubw@gmail.com',
    'park.donghun@gmail.com',
    'katie.sang.park@gmail.com',
    'itm@ksea.org',
    'sejong@ksea.org',
    'it@ksea.org',
    'database@ksea.org',
  ],

  ukc2023RegistrationConfig: {
    isOnline: false,
    isEarlyBird: false,
    ukcPresenterEmailList: ['itm@ksea.org'],
    firePresenterEmailList: [],
    codeAEmailList: ['joepm1004@gmail.com'],
    codeBEmailList: [],
    codeCEmailList: [],
    codeDEmailList: [],
    codeEEmailList: [],
    codeFEmailList: [],
    codeIEmailList: [],
    sponsorList: [
      { email: 'itm@ksea.org', numberOfCodes: 10 },
      { email: 'joepm1004@gmail.com', numberOfCodes: 10 },
    ],
  },

  totalOfMembershipData: 22777,
  totalOfUserInfoData: 35452,

  adminPermissions: [
    {
      email: 'joepm1004@gmail.com',
      type: 'SU',
    },
    {
      email: 'jungyubw@gmail.com',
      type: 'SU',
    },
    {
      email: 'joepm1004@gmail.com',
      type: 'SU',
    },
    {
      email: 'joepm1004@gmail.com1',
      type: 'APS',
      value: 'KOTAA',
    },
    {
      email: 'jungyub.woo33@ontwins.com',
      type: 'HQ',
    },
    {
      email: 'jungyubw1@gmail.com',
      type: 'ECDC',
    },
    {
      email: 'jungyub.woo1@ontwins.com',
      type: 'GROUP',
      value: 'C-6',
    },
    {
      email: 'jungyub.woo3@ontwins.com',
      type: 'CP',
      value: 'Washington Metro',
    },
    {
      email: 'joepm1004@gmail.com',
      type: 'APS',
      value: 'MAKER',
    },
    /* */
    {
      email: 'yk525@rutgers.edu',
      type: 'APS',
      value: 'AKN',
    },
    {
      email: 'yoonslee@phys.ufl.edu',
      type: 'APS',
      value: 'AKPA',
    },
    {
      email: 'ekim121@jhmi.edu',
      type: 'APS',
      value: 'KLAM',
    },
    {
      email: 'jahn@fit.edu',
      type: 'APS',
      value: 'KACEPMA',
    },
    {
      email: 'sungeun.cho@auburn.edu',
      type: 'APS',
      value: 'KAFTA',
    },
    {
      email: 'hoseop.cha@park.edu',
      type: 'APS',
      value: 'KAGES',
    },
    {
      email: 'skim@hdp.com',
      type: 'APS',
      value: 'KAIPBA',
    },
    {
      email: 'wyjsong@gmail.com',
      type: 'APS',
      value: 'KAMPiNA',
    },
    {
      email: 'jiyoung.kim@utdallas.edu',
      type: 'APS',
      value: 'KAMS',
    },
    {
      email: 'jeongjw@miamioh.edu',
      type: 'APS',
      value: 'KAMSA',
    },
    {
      email: 'james.song.nih@gmail.com',
      type: 'APS',
      value: 'KASBI',
    },
    {
      email: '',
      type: 'APS',
      value: 'KASBP',
    },
    {
      email: 'park0223@gmail.com',
      type: 'APS',
      value: 'KBCAC',
    },
    {
      email: 'soojungl@umich.edu',
      type: 'APS',
      value: 'KBM',
    },
    {
      email: 'hwjun@uab.edu',
      type: 'APS',
      value: 'KBMES',
    },
    {
      email: '',
      type: 'APS',
      value: 'KEPS',
    },
    {
      email: 'jung0005@mc.duke.edu',
      type: 'APS',
      value: 'KISS',
    },
    {
      email: 'kyang@kitee.org',
      type: 'APS',
      value: 'KITEE',
    },
    {
      email: 'kyuhlee@uga.edu',
      type: 'APS',
      value: 'KOCSEA',
    },
    {
      email: '',
      type: 'APS',
      value: 'KOEA',
    },
    {
      email: '',
      type: 'APS',
      value: 'KOLIS',
    },
    {
      email: 'eylee@uky.edu',
      type: 'APS',
      value: 'KOPANA',
    },
    {
      email: 'kims@uga.edu',
      type: 'APS',
      value: 'KOTAA',
    },
    {
      email: 'cocmkim@gmail.com',
      type: 'APS',
      value: 'KSCEE',
    },
    {
      email: 'christy.jeon@atkinsglobal.com',
      type: 'APS',
      value: 'KWISE',
    },
    {
      email: 'chungj@nhlbi.nih.gov',
      type: 'APS',
      value: 'NIH-KSA',
    },
    {
      email: 'mij4006@med.cornell.edu',
      type: 'APS',
      value: 'NYKB',
    },
    {
      email: 'yonghojoseph@hotmail.com',
      type: 'APS',
      value: 'RTP B&B',
    },
    {
      email: '',
      type: 'APS',
      value: 'SDKoBA',
    },
    {
      email: 'sunghwanc@gmail.com',
      type: 'APS',
      value: 'TeK One',
    },
    {
      email: '',
      type: 'APS',
      value: 'KAPAL',
    },
    {
      email: 'saahong@iu.edu',
      type: 'APS',
      value: 'KAERA',
    },
    {
      email: 'repitan@gmail.com',
      type: 'APS',
      value: 'SoCal K-Group',
    },
    {
      email: 'pkwon@egr.msu.edu',
      type: 'APS',
      value: 'MAKER',
    },
    {
      email: 'jy.chang@utah.edu',
      type: 'CP',
      value: 'Utah',
    },
    {
      email: '',
      type: 'CP',
      value: 'San Diego',
    },
    {
      email: 'jw78kr@gmail.com',
      type: 'CP',
      value: 'Philadelphia',
    },
    {
      email: 'ballpark1114@gmail.com',
      type: 'CP',
      value: 'New York Metropolitan',
    },
    {
      email: '',
      type: 'CP',
      value: 'South Texas',
    },
    {
      email: '',
      type: 'CP',
      value: 'North Carolina',
    },
    {
      email: 'hyunsu.shin2012@gmail.com',
      type: 'CP',
      value: 'Washington Metro',
    },
    {
      email: 'shpark92@gmail.com',
      type: 'CP',
      value: 'Georgia',
    },
    {
      email: 'jingihong01@gmail.com',
      type: 'CP',
      value: 'Southern CA',
    },
    {
      email: 'byungkim@boisestate.edu',
      type: 'CP',
      value: 'Idaho',
    },
    {
      email: 'gwansuk@stanford.edu',
      type: 'CP',
      value: 'Silicon Valley',
    },
    {
      email: 'gee.sunghoon@gmail.com',
      type: 'CP',
      value: 'Minnesota',
    },
    {
      email: 'sangjin.ryu@unl.edu',
      type: 'CP',
      value: 'Nebraska',
    },
    {
      email: 'sjun@uams.edu',
      type: 'CP',
      value: 'Arkansas',
    },
    {
      email: 'is16@txstate.edu',
      type: 'CP',
      value: 'Austin TX',
    },
    {
      email: 'good4min@yahoo.com',
      type: 'CP',
      value: 'Indiana',
    },
    {
      email: 'munsup.seoh@wright.edu',
      type: 'CP',
      value: 'Ohio',
    },
    {
      email: 'younghk@gmail.com',
      type: 'CP',
      value: 'New England',
    },
    {
      email: 'sshim@axisd.com',
      type: 'CP',
      value: 'New Jersey',
    },
    {
      email: 'ytkim@vt.edu',
      type: 'CP',
      value: 'Southern VA',
    },
    {
      email: 'taesik.oh@auburn.edu',
      type: 'CP',
      value: 'Alabama',
    },
    {
      email: 'johnlee2816@gmail.com',
      type: 'CP',
      value: 'Seattle',
    },
    {
      email: '',
      type: 'CP',
      value: 'Berkeley',
    },
    {
      email: 'steve.j.lee@dot.ca.gov',
      type: 'CP',
      value: 'Sacramento',
    },
    {
      email: 'yes.andrew@gmail.com',
      type: 'CP',
      value: 'Central Illinois',
    },
    {
      email: 'kseachi@gmail.com',
      type: 'CP',
      value: 'Chicagoland',
    },
    {
      email: '',
      type: 'CP',
      value: 'Wisconsin',
    },
    {
      email: 'soo.yoo@utrgv.edu',
      type: 'CP',
      value: 'Texas Coastal Bend',
    },
    {
      email: 'wooram.park@utdallas.edu',
      type: 'CP',
      value: 'North TX',
    },
    {
      email: '',
      type: 'CP',
      value: 'Michigan',
    },
    {
      email: 'christian.hong@uc.edu',
      type: 'CP',
      value: 'Southwest Ohio',
    },
    {
      email: 'iminn1@jhmi.edu',
      type: 'CP',
      value: 'Baltimore',
    },
    {
      email: 'hurmi@ecu.edu',
      type: 'CP',
      value: 'Eastern Carolina',
    },
    {
      email: 'schung@virginia.edu',
      type: 'CP',
      value: 'Central VA',
    },
    {
      email: '',
      type: 'CP',
      value: 'Orlando Central Florida',
    },
    {
      email: 'y.jang@ufl.edu',
      type: 'CP',
      value: 'Gainesville FL',
    },
    {
      email: '',
      type: 'CP',
      value: 'Tampa Bay',
    },
    {
      email: 'harold.kim@physics.gatech.edu',
      type: 'GROUP',
      value: 'A-1',
    },
    {
      email: '',
      type: 'GROUP',
      value: 'A-2',
    },
    {
      email: '',
      type: 'GROUP',
      value: 'A-3',
    },
    {
      email: 'dyoon529@gmail.com',
      type: 'GROUP',
      value: 'B-1',
    },
    {
      email: 'swk.ncsu@gmail.com',
      type: 'GROUP',
      value: 'B-2',
    },
    {
      email: 'hjkong06@illinois.edu',
      type: 'GROUP',
      value: 'B-3',
    },
    {
      email: 'dhkim@jhu.edu',
      type: 'GROUP',
      value: 'C-1',
    },
    {
      email: 'kam@lsu.edu',
      type: 'GROUP',
      value: 'C-2',
    },
    {
      email: 'eonsoo.lee@njit.edu',
      type: 'GROUP',
      value: 'C-3',
    },
    {
      email: 'cynam@bnl.gov',
      type: 'GROUP',
      value: 'C-4',
    },
    {
      email: 'yseo2@kennesaw.edu',
      type: 'GROUP',
      value: 'C-5',
    },
    {
      email: '',
      type: 'GROUP',
      value: 'C-6',
    },
    {
      email: 'jelee@bridgeport.edu',
      type: 'GROUP',
      value: 'C-7',
    },
    {
      email: 'sangdo.choi@snu.ac.kr',
      type: 'GROUP',
      value: 'C-8',
    },
    {
      email: 'iminn1@jhmi.edu',
      type: 'GROUP',
      value: 'D-2',
    },
  ],

  adminConfig: {
    sizeOfEmailAttachments: 4.5,
    numberOfEmailsPerSending: 3000,
    sendingWaitingTime: 600000,
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
