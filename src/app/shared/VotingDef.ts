export interface VotingDef {
  id: string;
  title: string;
  description: string;
  url: string;
  votingStartDate?: Date;
  votingEndDate?: Date;
  votingEligibilityStartDate?: Date;
  votingEligibilityEndDate?: Date;
  questionnaire: Questionnaire[];
  voters: string[];
  key: string;
  votersStats: any;
}

export interface Questionnaire {
  index: number;
  question: string;
  numberOfChoices: number;
  listAlternatives: Alternative[];
}

export interface Alternative {
  code: string;
  desc: string;
  videoUrl: string;
}
