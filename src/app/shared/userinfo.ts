export interface UserInfo {
  id: string;
  email: string;
  kseaInfo: KSEAInfo;
  userInfo: any;
  educationInfo: EducationInfo[];
  currentJob: JobInfo;
  jobHistory: JobInfo[];
}

export interface KSEAInfo {
  localChapter: string;
  aps1: string;
  aps2: string;
  aps3: string;
  group1: string;
  group2: string;
  specialty: string;
  keywords: string;
}

export interface EducationInfo {
  degree: string;
  major: string;
  school: string;
  yearEarned: number;
  thesisTitle: string;
}

export interface JobInfo {
  startDate: Date;
  endDate: Date;
  employer: string;
  city: string;
  state: string;
  jobTitle: string;
  jobDesc: string;
}
