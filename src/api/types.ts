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
	won: number;
	lost: number;
	tied: number;
	gameAverages: CsgoGameStats;
	gameHighest: CsgoGameStats;
	mapStats: CsgoMapStats[];
	tenBestGames: GameWithStats[];
	dateMatches: DateMatches[];
	mapStatistics: MapStatistics;
};

export type GameWithStats = {
	id: number;
	date: number;
	map: string;
	matchDuration: number;
	ctRounds: number;
	tRounds: number;
	player: CsgoPlayer;
};

export type CsgoGameStats = {
	ping: {
		value: number;
		matchId?: number;
		standardDeviation?: number;
		standardError?: number;
	};
	kills: {
		value: number;
		matchId?: number;
		standardDeviation?: number;
		standardError?: number;
	};
	assists: {
		value: number;
		matchId?: number;
		standardDeviation?: number;
		standardError?: number;
	};
	deaths: {
		value: number;
		matchId?: number;
		standardDeviation?: number;
		standardError?: number;
	};
	mvps: {
		value: number;
		matchId?: number;
		standardDeviation?: number;
		standardError?: number;
	};
	hsp: {
		value: number;
		matchId?: number;
		standardDeviation?: number;
		standardError?: number;
	};
	score: {
		value: number;
		matchId?: number;
		standardDeviation?: number;
		standardError?: number;
	};
	matchDuration: {
		value: number;
		matchId?: number;
		standardDeviation?: number;
		standardError?: number;
	};
	waitTime: {
		value: number;
		matchId?: number;
		standardDeviation?: number;
		standardError?: number;
	};
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
	steamLink: string;
	avatar: string;
	ping: number;
	kills: number;
	assists: number;
	deaths: number;
	mvps: number;
	hsp: number;
	score: number;
	side: string;
	unnecessaryStats?: UnnecessaryStats;
};

export type CsgoMatch = {
	date: number;
	players: PlayerStatistics[];
	map: string;
	matchDuration: number;
	waitTime: number;
	ctRounds: number;
	tRounds: number;
	winner: string;
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

export type SteamGamesResponse = {
	error: boolean;
	errorCode?: number;
	matches?: MatchWithPlayerStats[];
	mapStatistics?: MapStatistics;
	matchFrequency?: DateMatches[];
};

export type SteamUserResponse = {
	error: boolean;
	errorCode?: number;
	user?: SteamUser;
};

export type SteamUser = {
	name: string;
	steamId: string;
	steamLink: string;
	avatar: string;
};

export type CsgoMap = {
	name: string;
	timesPlayed: number;
};

export type MapStatistics = {
	maps: CsgoMap[];
};

export type DateMatches = {
	date: number;
	matches: number;
};

export type SteamLeaderboardResponse = {
	error: boolean;
	errorCode?: number;
	leaderboard?: CsgoPlayer[];
};

export type SteamProfilesResponse = {
	error: boolean;
	errorCode?: number;
	profiles?: BuiltProfile[];
};

export type BuiltProfile = {
	name: string;
	id: string;
	steamLink: string;
	avatarLink: string;
	matchesCount: number;
};

export type SteamStatisticsResponse = {
	error: boolean;
	errorCode?: number;
	data: number[];
};

export type SteamLinkResponse = {
	error: boolean;
	errorCode?: number;
};

export const SteamError = {
	DISCORD_NOT_AUTHENTICATED: 0,
	USER_NOT_ON_SERVER: 1,
	COULD_NOT_FETCH_MATCH_CODE: 2,
};

export type WorkerStatus = {
	working: boolean;
	alive: boolean;
	processing: ProcessingMetrics;
};

export type ProcessingMetrics = {
	average: number;
	longest: number;
	all: number[];
};

export type SiteMetric = {
	name: string;
	values: number[];
};

export type UnnecessaryStats = {
	jumps: number;
	fallDamage: number;
	weaponFire: WeaponFire[];
	weaponZooms: number;
	damageTaken: DamageTaken[];
	blind: Blind;
	itemPickup: ItemPickup[];
	reloads: number;
	footsteps: number;
	bombPlants: number;
};

export type WeaponFire = {
	weapon: string;
	count: number;
};

export type DamageTaken = {
	weapon: string;
	amount: number;
};

export type Blind = {
	times: number;
	duration: number;
};

export type ItemPickup = {
	item: string;
	count: number;
	silent: number;
};

export type MatchWithPlayerStats = {
	id: number;
	date: number;
	ctRounds: number;
	tRounds: number;
	map: string;
	matchDuration: number;
	player: PlayerStatistics;
};

export type PlayerStatistics = {
	player: PlayerData;
	ping: number;
	kills: number;
	assists: number;
	deaths: number;
	mvps: number;
	hsp: number;
	score: number;
	side: Side;
	unnecessaryStats?: UnnecessaryStats;
};

export type PlayerData = {
	name: string;
	id: string;
	avatarLink: string;
	steamLink: string;
};

export type Side = 'T' | 'CT' | 'TIE';

export type SteamUniqueMapsResponse = {
	error: boolean;
	errorCode?: number;
	data: string[];
};
