import { SVG, Rect } from '@wordpress/components';

const iconProps = { fill: 'currentColor', height: '60' };
const svgProps = {
	viewBox: '0 0 120 60',
	width: '100%',
	height: '100%',
	xmlns: 'http://www.w3.org/2000/svg',
	style: { width: '100%', height: '100%', display: 'block' }
};

const Icon100 = (
	<SVG { ...svgProps }>
		<Rect x="0" y="0" width="120" { ...iconProps } />
	</SVG>
);

const Icon50_50 = (
	<SVG { ...svgProps }>
		<Rect x="0" y="0" width="59" { ...iconProps } />
		<Rect x="61" y="0" width="59" { ...iconProps } />
	</SVG>
);

const Icon66_33 = (
	<SVG { ...svgProps }>
		<Rect x="0" y="0" width="79" { ...iconProps } />
		<Rect x="81" y="0" width="39" { ...iconProps } />
	</SVG>
);

const Icon33_66 = (
	<SVG { ...svgProps }>
		<Rect x="0" y="0" width="39" { ...iconProps } />
		<Rect x="41" y="0" width="79" { ...iconProps } />
	</SVG>
);

const Icon33_33_33 = (
	<SVG { ...svgProps }>
		<Rect x="0" y="0" width="39" { ...iconProps } />
		<Rect x="41" y="0" width="38" { ...iconProps } />
		<Rect x="81" y="0" width="39" { ...iconProps } />
	</SVG>
);

const Icon50_25_25 = (
	<SVG { ...svgProps }>
		<Rect x="0" y="0" width="58" { ...iconProps } />
		<Rect x="60" y="0" width="29" { ...iconProps } />
		<Rect x="91" y="0" width="29" { ...iconProps } />
	</SVG>
);

const Icon25_25_50 = (
	<SVG { ...svgProps }>
		<Rect x="0" y="0" width="29" { ...iconProps } />
		<Rect x="30" y="0" width="29" { ...iconProps } />
		<Rect x="61" y="0" width="59" { ...iconProps } />
	</SVG>
);

const Icon25_50_25 = (
	<SVG { ...svgProps }>
		<Rect x="0" y="0" width="29" { ...iconProps } />
		<Rect x="31" y="0" width="58" { ...iconProps } />
		<Rect x="91" y="0" width="29" { ...iconProps } />
	</SVG>
);

const Icon25_x4 = (
	<SVG { ...svgProps }>
		<Rect x="0" y="0" width="29" { ...iconProps } />
		<Rect x="30" y="0" width="29" { ...iconProps } />
		<Rect x="61" y="0" width="29" { ...iconProps } />
		<Rect x="91" y="0" width="29" { ...iconProps } />
	</SVG>
);

const Icon20_x5 = (
	<SVG { ...svgProps }>
		<Rect x="0" y="0" width="23" { ...iconProps } />
		<Rect x="25" y="0" width="23" { ...iconProps } />
		<Rect x="50" y="0" width="23" { ...iconProps } />
		<Rect x="75" y="0" width="23" { ...iconProps } />
		<Rect x="100" y="0" width="23" { ...iconProps } />
	</SVG>
);

const Icon16_x6 = (
	<SVG { ...svgProps }>
		<Rect x="0" y="0" width="18" { ...iconProps } />
		<Rect x="20" y="0" width="18" { ...iconProps } />
		<Rect x="40" y="0" width="18" { ...iconProps } />
		<Rect x="60" y="0" width="18" { ...iconProps } />
		<Rect x="80" y="0" width="18" { ...iconProps } />
		<Rect x="100" y="0" width="18" { ...iconProps } />
	</SVG>
);

export const layoutPresets = [
	{ name: '100', label: '1 Column', cols: 1, widths: ['100%'], gridTemplate: '1fr', icon: Icon100 },
	{ name: '50-50', label: '2 Columns (50/50)', cols: 2, widths: ['50%', '50%'], gridTemplate: '1fr 1fr', icon: Icon50_50 },
	{ name: '66-33', label: '2 Columns (66/33)', cols: 2, widths: ['66.66%', '33.33%'], gridTemplate: '2fr 1fr', icon: Icon66_33 },
	{ name: '33-66', label: '2 Columns (33/66)', cols: 2, widths: ['33.33%', '66.66%'], gridTemplate: '1fr 2fr', icon: Icon33_66 },
	{ name: '33-33-33', label: '3 Columns (33/33/33)', cols: 3, widths: ['33.33%', '33.33%', '33.33%'], gridTemplate: '1fr 1fr 1fr', icon: Icon33_33_33 },
	{ name: '50-25-25', label: '3 Columns (50/25/25)', cols: 3, widths: ['50%', '25%', '25%'], gridTemplate: '2fr 1fr 1fr', icon: Icon50_25_25 },
	{ name: '25-25-50', label: '3 Columns (25/25/50)', cols: 3, widths: ['25%', '25%', '50%'], gridTemplate: '1fr 1fr 2fr', icon: Icon25_25_50 },
	{ name: '25-50-25', label: '3 Columns (25/50/25)', cols: 3, widths: ['25%', '50%', '25%'], gridTemplate: '1fr 2fr 1fr', icon: Icon25_50_25 },
	{ name: '25-25-25-25', label: '4 Columns (25/25/25/25)', cols: 4, widths: ['25%', '25%', '25%', '25%'], gridTemplate: '1fr 1fr 1fr 1fr', icon: Icon25_x4 },
	{ name: '20-x5', label: '5 Columns Equal', cols: 5, widths: ['20%', '20%', '20%', '20%', '20%'], gridTemplate: '1fr 1fr 1fr 1fr 1fr', icon: Icon20_x5 },
	{ name: '16-x6', label: '6 Columns Equal', cols: 6, widths: ['16.66%', '16.66%', '16.66%', '16.66%', '16.66%', '16.66%'], gridTemplate: '1fr 1fr 1fr 1fr 1fr 1fr', icon: Icon16_x6 },
];
