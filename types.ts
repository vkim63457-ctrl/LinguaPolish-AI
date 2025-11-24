export enum CorrectionType {
  BASIC = 'BASIC',
  ADVANCED = 'ADVANCED'
}

export interface CorrectionResponse {
  correctedText: string;
  changes?: string[];
  explanation?: string;
}

export interface AdStatus {
  isWatching: boolean;
  timeLeft: number;
}
