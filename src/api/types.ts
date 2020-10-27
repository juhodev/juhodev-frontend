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
