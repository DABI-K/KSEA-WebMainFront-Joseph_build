import { KseaInfoService } from 'src/app/service/ksea-info.service';

export const environment = {
  production: true,

  cognito: {
    userPoolId: 'us-east-1_TIsOAyCzJ',
    userPoolWebClientId: '5hp575tjd2hnj0dab2niipa1fl',
  },

  external_urls: {
    s3: 'https://ksea-files.s3.us-west-2.amazonaws.com/',
    s3_Scholarship: 'https://ksea-scholarship.s3.amazonaws.com/',
    s3_Yig: 'https://ksea-yig.s3.amazonaws.com/',
    s3_UKC: 'https://ksea-ukc.s3.amazonaws.com/',
  },

  webConfig: {
    kseaInfoId: '52',
    scholarshipDefId: '2024_Scholarship',
    yigDefId: '2024_YIG',
    ukcDefId: '2023_UKC',
    emailCC: 'Sejong@ksea.org',
  },

  votingId: '2024',

  votingManagers: ['park.donghun@gmail.com'],
  // for build (Key-gen Access)
  stripe: {
    priceId: 'price_1MILSxLDuqXil0in04n4oagj',
    publishableKey:
      'pk_live_51MHrRvLDuqXil0inKK7H5wPthUdHk2SXfts5VkPgDp0orcZqkwbGcCTQStrwwMypasnSHH3ubnN0Wh5jlbtvOXcz00RJcOVnIT',
  },

  apiURLs: {
    payment_api_URL: 'https://4qa9vv52a9.execute-api.us-east-1.amazonaws.com',
    voting_api_URL: 'https://0dz0eoo6kb.execute-api.us-east-1.amazonaws.com',
    membership_api_URL:
      'https://agit0a7e4d.execute-api.us-east-1.amazonaws.com',
    user_info_api_URL: 'https://5mrs996ep1.execute-api.us-east-1.amazonaws.com',
    ksea_info_api_URL: 'https://96zizm4sf6.execute-api.us-east-1.amazonaws.com',
    email_api_URL: 'https://ev01ck3eh0.execute-api.us-west-2.amazonaws.com',
    file_api_URL: 'https://i7dou63m35.execute-api.us-east-1.amazonaws.com',
    scholarship_api_URL:
      'https://bxcdrwx5x0.execute-api.us-east-1.amazonaws.com',
    yig_api_URL: 'https://uqnvmsmyia.execute-api.us-east-1.amazonaws.com',
    ukc_c4p_api_URL: 'https://hw2layb5ik.execute-api.us-east-1.amazonaws.com',
    ukc_registration_api_URL:
      'https://hw2layb5ik.execute-api.us-east-1.amazonaws.com',
    cognito_api_URL: 'https://2a5kn5rav6.execute-api.us-east-1.amazonaws.com',
    ukc_GroupCode_api_URL:
      'https://l7na0esy8c.execute-api.us-east-1.amazonaws.com/ukcCodeList/2024_UKC',
  },

  //ukc-monitor access
  ukcAdmin: [
    'jungyubw@gmail.com',
    'park.donghun@gmail.com',
    'itm@ksea.org',
    'it@ksea.org',
    'finance@ksea.org',
    'sejong@ksea.org',
    'katie.sang.park@gmail.com',
    'database@ksea.org',
  ],

  //call4paper reviewers at /ukc-review
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
      email: 'tomohmail@gmail.com',
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
      email: 'ohbong70@gmail.com',
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
      email: 'dr.jayoungkim@gmail.com',
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
      email: 'bkkwon21@gmail.com',
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
      email: 'hyojoohan@gmail.com',
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
      email: 'rhstella.ksea@gmail.com',
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
      email: 'nayoung.kim@uwaterloo.ca',
      keys: ['PHY'],
    },
    {
      email: 'chunghoi@niddk.nih.gov',
      keys: ['CHM'],
    },
    {
      email: 'soeun2@gmail.com',
      keys: ['MAS'],
    },
    {
      email: 'dyoon529@gmail.com',
      keys: ['MPS'],
    },
    {
      email: 'yoo.kim@okstate.edu',
      keys: ['FAN'],
    },
    {
      // email: 'hjkong06@illinois.edu',
      email: 'yjchun@pitt.edu',
      keys: ['BME'],
    },
    {
      email: 'hyun-tae.hwang@uky.edu',
      keys: ['CHE'],
    },
    {
      email: 'eonsoo.lee@njit.edu',
      keys: ['MAN'],
    },
    {
      email: 'cynam@bnl.gov',
      keys: ['MSE'],
    },
    {
      email: 'yseo2@kennesaw.edu',
      keys: ['CEA'],
    },
    {
      email: 'jchoi.ksea@gmail.com',
      keys: ['ECE'],
    },
    {
      email: 'chungsam@cityu.edu',
      keys: ['CIT'],
    },
    {
      email: 'elee3@njcu.edu',
      keys: ['IMS'],
    },
    {
      email: 'saahong@iu.edu',
      keys: ['SSP'],
    },
  ],

  //Do not put the same email at both of scholarshipEvaluator and scholarshipMonitors. "only 1".
  scholarshipEvaluator: [
    'itm@ksea.org',
    'csim@unl.edu',
    'katie@ksea.org',
    'eunjung.chae@csulb.edu',
    'leekw@uri.edu',
    'dongheon.lee@duke.edu',
    'cchoi@mtu.edu',
    'msuh2@ncsu.edu',
    'julianeh@aol.com',
    'jun@alumni.rice.edu',
    'mjsuh79@gmail.com',
  ],

  scholarshipMonitors: [
    'jungyubw@gmail.com',
    'park.donghun@gmail.com',
    'hq@ksea.org',
    'database@ksea.org',
    'joepm1004@gmail.com',
    'katie.sang.park@gmail.com',
  ],

  yigMonitors: [
    'jungyubw@gmail.com',
    'park.donghun@gmail.com',
    'itm@ksea.org',
    'hq@ksea.org',
    'katie.sang.park@gmail.com',
    'sangjin.ryu@unl.edu',
  ],

  // 06-23-2023 removed
  userInfoMonitors: [
    'jeho.park@claremontmckenna.edu',
    'jungyubw@gmail.com',
    'park.donghun@gmail.com',
    'katie.sang.park@gmail.com',
    'itm@ksea.org',
    'sejong@ksea.org',
    'it@ksea.org',
    'database.ksea.org',
    // 'kseachi@gmail.com',
    // 'leemy@ecu.edu',
    // 'bkkwon21@gmail.com',
    // 'byungkim@boisestate.edu',
    // 'sangjin.ryu@unl.edu',
    // 'younghk@gmail.com',
    // 'ohbong70@gmail.com',
    // 'spark.ksea@gmail.com',
    // 'ksea.north.texas@gmail.com',
    // 'maengjooyol@cityu.edu',
    // 'junghwankim@ksea-st.org',
    // 'eunjung.chae@csulb.edu',
    // 'ytkim@vt.edu',
    // 'soo.yoo@utrgv.edu',
    // 'yjryu83@umd.edu',
    // 'steve.j.lee@dot.ca.gov',
    // 'junghwankim@ksea-st.org',
    // 'taesik.oh@auburn.edu',
    // 'gkim@astate.edu',
    // 'is16@txstate.edu',
    // 'hyojin.kim@njit.edu',
    // 'munsup.seoh@wright.edu',
    // 'nutria1007@hotmail.com',
    // 'skim@health.usf.edu',
    // 'hwanhee.hong@duke.edu',
    // 'kooksang@gmail.com',
    // 'csshin@bcm.edu',
    // 'younghk@gmail.com',
    // 'hyeran.kang@ucf.edu',
  ],

  ukc2023RegistrationConfig: {
    isOnline: false, //False only if on-site registration is open.
    isEarlyBird: false, // 6/30/2023 is the last date of Early Bird Date.
    ukcPresenterEmailList: [],

    firePresenterEmailList: [],

    codeAEmailList: [],

    codeBEmailList: [],

    codeCEmailList: [],
    codeDEmailList: [],
    codeEEmailList: [],
    codeFEmailList: [],
    codeIEmailList: [],
    sponsorList: [
      { email: 'itm@ksea.org', numberOfCodes: 100 }, //comment
      { email: '', numberOfCodes: 2 },
    ],
  },

  totalOfMembershipData: 22777,
  totalOfUserInfoData: 35452,

  adminPermissions: [
    {
      email: 'jungyubw@gmail.com',
      type: 'SU',
    },
    {
      email: 'itm@ksea.org',
      type: 'SU',
    },
    {
      email: 'park.donghun@gmail.com',
      type: 'SU',
    },
    {
      email: 'katie.sang.park@gmail.com',
      type: 'SU',
    },
    {
      email: 'it@ksea.org',
      type: 'HQ',
    },
    {
      email: 'joepm1004@gmail.com',
      type: 'HQ',
    },
    {
      email: 'finance@ksea.org',
      type: 'HQ',
    },
    {
      email: 'hq@ksea.org',
      type: 'HQ',
    },
    {
      email: 'database@ksea.org',
      type: 'HQ',
    },
    {
      email: 'jungyubw@gmail.com',
      type: 'HQ',
    },
    {
      email: 'jungyubw1@gmail.com',
      type: 'ECDC',
    },
    {
      email: 'yongho.sohn@ucf.edu',
      type: 'ECDC',
    },
    {
      email: 'tomohmail@gmail.com',
      type: 'ECDC',
    },
    {
      email: 'jeho.park@claremontmckenna.edu',
      type: 'ECDC',
    },
    {
      email: 'ykyoon@ece.ufl.edu',
      type: 'ECDC',
    },
    {
      email: 'rhstella.ksea@gmail.com',
      type: 'ECDC',
    },
    {
      email: 'soyoon.kum@angelo.edu',
      type: 'ECDC',
    },
    {
      email: 'syjung@bcm.edu',
      type: 'ECDC',
    },
    {
      email: 'jungyub.woo1@ontwins.com',
      type: 'APS',
      value: 'KOTAA',
    },
    {
      email: 'jungyub.woo1@ontwins.com',
      type: 'GROUP',
      value: 'C-6',
    },
    {
      email: 'jungyub.woo@ontwins.com',
      type: 'CP',
      value: 'Washington Metro',
    },

    /**/

    // {
    //   email: 'yk525@rutgers.edu',
    //   type: 'APS',
    //   value: 'AKN',
    // },
    // {
    //   email: 'harold.kim@physics.gatech.edu',
    //   type: 'APS',
    //   value: 'AKPA',
    // },
    // {
    //   email: 'ekim121@jhmi.edu',
    //   type: 'APS',
    //   value: 'KLAM',
    // },
    // {
    //   email: 'jahn@fit.edu',
    //   type: 'APS',
    //   value: 'KACEPMA',
    // },
    // {
    //   email: 'sungeun.cho@auburn.edu',
    //   type: 'APS',
    //   value: 'KAFTA',
    // },
    // {
    //   email: 'hoseop.cha@park.edu',
    //   type: 'APS',
    //   value: 'KAGES',
    // },
    // {
    //   email: 'skim@hdp.com',
    //   type: 'APS',
    //   value: 'KAIPBA',
    // },
    // {
    //   email: 'jungj@ecu.edu',
    //   type: 'APS',
    //   value: 'KAMPiNA',
    // },
    // {
    //   email: 'jiyoung.kim@utdallas.edu',
    //   type: 'APS',
    //   value: 'KAMS',
    // },
    // {
    //   email: 'jeongjw@miamioh.edu',
    //   type: 'APS',
    //   value: 'KAMSA',
    // },
    // {
    //   email: 'james.song.nih@gmail.com',
    //   type: 'APS',
    //   value: 'KASBI',
    // },
    // {
    //   email: 'ipaik@wavelifesci.com',
    //   type: 'APS',
    //   value: 'KASBP',
    // },
    // {
    //   email: 'park0223@gmail.com',
    //   type: 'APS',
    //   value: 'KBCAC',
    // },
    // {
    //   email: 'soojungl@umich.edu',
    //   type: 'APS',
    //   value: 'KBM',
    // },
    // {
    //   email: 'hwjun@uab.edu',
    //   type: 'APS',
    //   value: 'KBMES',
    // },
    // {
    //   email: '',
    //   type: 'APS',
    //   value: 'KEPS',
    // },
    // {
    //   email: 'jung0005@mc.duke.edu',
    //   type: 'APS',
    //   value: 'KISS',
    // },
    // {
    //   email: 'kyang@kitee.org',
    //   type: 'APS',
    //   value: 'KITEE',
    // },
    // {
    //   email: 'kyuhlee@uga.edu',
    //   type: 'APS',
    //   value: 'KOCSEA',
    // },
    // {
    //   email: '',
    //   type: 'APS',
    //   value: 'KOEA',
    // },
    // {
    //   email: '',
    //   type: 'APS',
    //   value: 'KOLIS',
    // },
    // {
    //   email: 'eylee@uky.edu',
    //   type: 'APS',
    //   value: 'KOPANA',
    // },
    // {
    //   email: 'kims@uga.edu',
    //   type: 'APS',
    //   value: 'KOTAA',
    // },
    // {
    //   email: 'cocmkim@gmail.com',
    //   type: 'APS',
    //   value: 'KSCEE',
    // },
    // {
    //   email: 'christy.jeon@atkinsglobal.com',
    //   type: 'APS',
    //   value: 'KWISE',
    // },
    // {
    //   email: 'chungj@nhlbi.nih.gov',
    //   type: 'APS',
    //   value: 'NIH-KSA',
    // },
    // {
    //   email: 'mij4006@med.cornell.edu',
    //   type: 'APS',
    //   value: 'NYKB',
    // },
    // {
    //   email: 'yonghojoseph@hotmail.com',
    //   type: 'APS',
    //   value: 'RTP B&B',
    // },
    // {
    //   email: '',
    //   type: 'APS',
    //   value: 'SDKoBA',
    // },
    // {
    //   email: 'sunghwanc@gmail.com',
    //   type: 'APS',
    //   value: 'TeK One',
    // },
    // {
    //   email: '',
    //   type: 'APS',
    //   value: 'KAPAL',
    // },
    // {
    //   email: 'saahong@iu.edu',
    //   type: 'APS',
    //   value: 'KAERA',
    // },
    // {
    //   email: 'chokoret@gmail.com',
    //   type: 'APS',
    //   value: 'SoCal K-Group',
    // },
    // {
    //   email: 'pkwon@egr.msu.edu',
    //   type: 'APS',
    //   value: 'MAKER',
    // },
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
      email: 'csshin@bcm.edu',
      type: 'CP',
      value: 'South Texas/Houston',
    },
    {
      email: 'csshin@bcm.edu',
      type: 'CP',
      value: 'South Texas',
    },
    {
      email: 'skim67@ncsu.edu',
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
      email: 'wodyd716@gmail.com',
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
      email: 'nutria1007@hotmail.com',
      type: 'CP',
      value: 'Chicagoland',
    },
    {
      email: 'hyecheol.jang@wisc.edu',
      type: 'CP',
      value: 'Wisconsin',
    },
    {
      email: 'soo.yoo@utrgv.edu',
      type: 'CP',
      value: 'Texas Coastal Bend',
    },
    {
      email: 'ksea.north.texas@gmail.com',
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
      email: 'hyeran.kang@ucf.edu',
      type: 'CP',
      value: 'Orlando Central Florida',
    },
    {
      email: 'y.jang@ufl.edu',
      type: 'CP',
      value: 'Gainesville FL',
    },
    {
      email: 'skim@health.usf.edu',
      type: 'CP',
      value: 'Tampa Bay',
    },
    // {
    //   email: 'harold.kim@physics.gatech.edu',
    //   type: 'GROUP',
    //   value: 'A-1',
    // },
    // {
    //   email: '',
    //   type: 'GROUP',
    //   value: 'A-2',
    // },
    // {
    //   email: '',
    //   type: 'GROUP',
    //   value: 'A-3',
    // },
    // {
    //   email: 'dyoon529@gmail.com',
    //   type: 'GROUP',
    //   value: 'B-1',
    // },
    // {
    //   email: 'swk.ncsu@gmail.com',
    //   type: 'GROUP',
    //   value: 'B-2',
    // },
    // {
    //   email: 'hjkong06@illinois.edu',
    //   type: 'GROUP',
    //   value: 'B-3',
    // },
    // {
    //   email: 'dhkim@jhu.edu',
    //   type: 'GROUP',
    //   value: 'C-1',
    // },
    // {
    //   email: 'kam@lsu.edu',
    //   type: 'GROUP',
    //   value: 'C-2',
    // },
    // {
    //   email: 'eonsoo.lee@njit.edu',
    //   type: 'GROUP',
    //   value: 'C-3',
    // },
    // {
    //   email: 'cynam@bnl.gov',
    //   type: 'GROUP',
    //   value: 'C-4',
    // },
    // {
    //   email: 'yseo2@kennesaw.edu',
    //   type: 'GROUP',
    //   value: 'C-5',
    // },
    // {
    //   email: 'choi.envirotronics@gmail.com',
    //   type: 'GROUP',
    //   value: 'C-6',
    // },
    // {
    //   email: 'jelee@bridgeport.edu',
    //   type: 'GROUP',
    //   value: 'C-7',
    // },
    // {
    //   email: 'sangdo.choi@snu.ac.kr',
    //   type: 'GROUP',
    //   value: 'C-8',
    // },
    // {
    //   email: 'iminn1@jhmi.edu',
    //   type: 'GROUP',
    //   value: 'D-2',
    // },
  ],

  adminConfig: {
    sizeOfEmailAttachments: 4.5,
    numberOfEmailsPerSending: 3000,
    sendingWaitingTime: 600000,
  },
};
