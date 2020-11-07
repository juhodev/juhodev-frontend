export type UserBasicData = {
	snowflake: string;
	discord_tag: string;
	discord_name: string;
	avatar: string;
	submissions: UserSubmission[];
};

export type UserData = {
	avatar: string;
	name: string;
	tag: string;
	snowflake: string;
};

export type UserSubmission = ClipSubmission | ImageSubmission | QuoteSubmission;

export enum SubmissionType {
	CLIP = 'CLIP',
	IMAGE = 'IMAGE',
	QUOTE = 'QUOTE',
	BAAVO = 'BAAVO',
}

export type ClipSubmission = {
	name: string;
	original_link: string;
	views: number;
	submission_by: string;
	submission_date: number;
	clip_start: number;
	clip_length: number;
	submission_type: SubmissionType;
};

export type ImageSubmission = {
	name: string;
	original_link: string;
	views: number;
	submission_by: string;
	submission_date: number;
	submission_type: SubmissionType;
};

export type QuoteSubmission = {
	id: number;
	name: string;
	content: string;
	views: number;
	submission_by: string;
	submission_date: number;
	submission_type: SubmissionType;
};

export type UserRouteResponse = {
	error: boolean;
	errorCode?: number;
	userData?: UserBasicData;
};

export const ERROR = {
	DISCORD_NOT_AUTHENTICATED: 0,
	USER_NOT_ON_SERVER: 1,
	CLIP_DOES_NOT_EXIST: 2,
};

export type CodeResponse = {
	error: boolean;
	jwt?: string;
};

export type BaavoSubmission = {
	name: string;
	views: number;
	submission_by: string;
	submission_date: number;
};

export type ImageRouteResponse = {
	error: boolean;
	errorCode?: number;
	submissions?: ImageSubmission[];
	userData?: UserData;
};

export const ImageError = {
	DISCORD_NOT_AUTHENTICATED: 0,
	USER_NOT_ON_SERVER: 1,
	NAME_ALREADY_EXISTS: 2,
	IMAGE_DOES_NOT_EXIST: 3,
};

export type ClipsRouteResponse = {
	error: boolean;
	errorCode?: number;
	submissions?: ClipSubmission[];
	userData?: UserData;
};

export const ClipsError = {
	DISCORD_NOT_AUTHENTICATED: 0,
	USER_NOT_ON_SERVER: 1,
};

export type ProfileRouteResponse = {
	error: boolean;
	errorCode?: number;
	userData?: UserData;
	userProfile: UserProfile;
};

export type UserVoiceLog = {
	time: number;
	channel: string;
};

export type UserCommandLog = {
	command: string;
	count: number;
};

export type UserProfile = {
	voiceLog: UserVoiceLog[];
	commandLog: UserCommandLog[];
};

export const UserError = {
	DISCORD_NOT_AUTHENTICATED: 0,
	USER_NOT_ON_SERVER: 1,
};

export type SteamRouteResponse = {
	error: boolean;
	errorCode?: number;
	userData?: UserData;
	csgoProfile?: CsgoProfile;
};

export type CsgoUser = {
	name: string;
	id: string;
};

export type SteamSearchResponse = {
	error: boolean;
	errorCode?: number;
	searchResult?: CsgoUser[];
};

export type CsgoProfile = {
	name: string;
	id: string;
	steamLink: string;
	avatarLink: string;
	matchesPlayed: number;
	gameAverages: CsgoGameStats;
	gameHighest: CsgoGameStats;
	mapStats: CsgoMapStats[];
};

export type CsgoGameStats = {
	ping: { value: number; matchId?: number };
	kills: { value: number; matchId?: number };
	assists: { value: number; matchId?: number };
	deaths: { value: number; matchId?: number };
	mvps: { value: number; matchId?: number };
	hsp: { value: number; matchId?: number };
	score: { value: number; matchId?: number };
	matchDuration: { value: number; matchId?: number };
	waitTime: { value: number; matchId?: number };
};

export type CsgoMapStats = {
	name: string;
	timesPlayed: number;
	averageMatchDuration: number;
	averageWaitTime: number;
};

export type CsgoPlayer = {
	name: string;
	playerId: string;
	avatar: string;
	ping: number;
	kills: number;
	assists: number;
	deaths: number;
	mvps: number;
	hsp: number;
	score: number;
};

export type CsgoMatch = {
	players: CsgoPlayer[];
	map: string;
	matchDuration: number;
	waitTime: number;
};

export type SteamMatchResponse = {
	error: boolean;
	userData?: UserData;
	errorCode?: number;
	csgoMatch: CsgoMatch;
};

export type SteamUploadCodeResponse = {
	error: boolean;
	userData?: UserData;
	errorCode?: number;
	uploadCode?: string;
};
