import * as React from 'react';
import Text from './utils/Text';

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
		<div className="flex xl:flex-col flex-row xl:p-4 p-2 xl:m-4 mx-2 border-solid border-2 border-gray-800 xl:w-80">
			<div className="flex xl:w-full justify-center items-center mr-2 xl:mr-0">
				<img className="rounded-full xl:w-32 xl:h-32 w-12 h-12" src={avatarUrl} />
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
