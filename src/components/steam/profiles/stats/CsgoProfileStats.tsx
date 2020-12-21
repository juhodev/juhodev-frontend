import * as React from 'react';
import { CsgoProfile } from '../../../../api/types';
import DetailedStats from './DetailedStats';

type Props = {
	csgoProfile: CsgoProfile;
};

const CsgoProfileStats = (props: Props) => {
	return <DetailedStats csgoProfile={props.csgoProfile} />;
};

export default CsgoProfileStats;
