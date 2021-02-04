import { CsgoMatch, PlayerStatistics } from '../../../../../api/types';
import '@testing-library/jest-dom';
import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import HeatmapContainer from '../HeatmapContainer';
import Heatmap from '../Heatmap';

test('heatmap does not crash when positions are undefined', () => {
	render(<Heatmap positions={undefined} map={'Dust II'} />);
	expect(document.querySelector('img')).toHaveClass('rounded');
});
