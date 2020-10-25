import * as React from 'react';
import Text from './Text';

type Props = {
	snowflake: string;
	discordTag: string;
	discordName: string;
	avatar: string;
};

const User = (props: Props) => {
	let avatarUrl: string;

	if (props.avatar === undefined) {
		avatarUrl = 'http://placekitten.com/500/500';
	} else {
		avatarUrl = `https://cdn.discordapp.com/avatars/${props.snowflake}/${props.avatar}`;
	}

	return (
		<div className="p-4 m-4 border-solid border-2 border-gray-800 w-80">
			<div className="flex w-full justify-center items-center">
				<img className="rounded-full w-32 h-32" src={avatarUrl} />
			</div>
			<Text
				title="Discord"
				subText={`${props.discordName}#${props.discordTag}`}
			/>
			<Text title="Role" subText="admin" />
		</div>
	);
};

export default User;
