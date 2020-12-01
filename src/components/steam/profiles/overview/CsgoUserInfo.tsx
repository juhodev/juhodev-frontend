import * as React from 'react';
import { CsgoProfile } from '../../../../api/types';

type Props = {
	csgoProfile: CsgoProfile;
};

const CsgoUserInfo = (props: Props) => {
	const { csgoProfile } = props;
	
	return (
		<div className="flex flex-col rounded-b-lg bg-gray-800 p-4">
			<div className="flex flex-col lg:flex-row lg:items-end">
				<div className="flex-1 flex items-center">
					<img className="w-12 h-12" src={csgoProfile.avatarLink} />
					<div className="mx-4 flex flex-col">
						<a
							className="text-3xl text-gray-100 leading-none"
							href={csgoProfile.steamLink}
						>
							{csgoProfile.name}
						</a>
						<span className="text-gray-500">{csgoProfile.id}</span>
					</div>
				</div>
				<div className="flex flex-col">
					<span className="hidden lg:block font-bold text-blue-500 text-2xl leading-none">{`${csgoProfile.matchesPlayed} games saved`}</span>
					<a
						className="text-sm text-gray-100 lg:text-right"
						href={`${window.location.origin}/matches?id=${csgoProfile.id}&page=0`}
					>
						View full history
					</a>
				</div>
			</div>
		</div>
	);
};

export default CsgoUserInfo;
