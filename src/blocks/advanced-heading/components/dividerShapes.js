import { __ } from '@wordpress/i18n';

export const DIVIDER_STYLES = [
	{
		value: 'solid',
		label: __( 'Solid Line', 'gravisain' ),
		type: 'css',
	},
	{
		value: 'brush',
		label: __( 'Brush Stroke', 'gravisain' ),
		type: 'svg',
		viewBox: '0 0 500 20',
		path: 'M 2 13 C 35 9 95 4.5 210 4.5 C 315 4.5 410 7 498 9.5 C 440 12 340 15 220 15.5 C 110 16 45 15.5 2 13 Z',
		isFill: true,
	},
	{
		value: 'brush-swoop',
		label: __( 'Brush Swoop', 'gravisain' ),
		type: 'svg',
		viewBox: '0 0 500 24',
		path: 'M 3 6 C 70 12 160 17 260 16 C 350 15 430 11 497 4 C 440 12 350 20 250 20 C 150 20 65 14 3 6 Z',
		isFill: true,
	},
	{
		value: 'curved',
		label: __( 'Curved Arc', 'gravisain' ),
		type: 'svg',
		viewBox: '0 0 500 20',
		path: 'M 2 16 C 140 4 360 4 498 16 C 360 6.5 140 6.5 2 16 Z',
		isFill: true,
	},
	{
		value: 'wave',
		label: __( 'Wave', 'gravisain' ),
		type: 'svg',
		viewBox: '0 0 500 20',
		path: 'M 0 10 Q 25 1 50 10 T 100 10 T 150 10 T 200 10 T 250 10 T 300 10 T 350 10 T 400 10 T 450 10 T 500 10',
		isStroke: true,
	},
	{
		value: 'zigzag',
		label: __( 'Zigzag', 'gravisain' ),
		type: 'svg',
		viewBox: '0 0 500 20',
		path: 'M 0 10 L 25 2 L 50 18 L 75 2 L 100 18 L 125 2 L 150 18 L 175 2 L 200 18 L 225 2 L 250 18 L 275 2 L 300 18 L 325 2 L 350 18 L 375 2 L 400 18 L 425 2 L 450 18 L 475 2 L 500 10',
		isStroke: true,
	},
	{
		value: 'double',
		label: __( 'Double Line', 'gravisain' ),
		type: 'css',
	},
	{
		value: 'dotted',
		label: __( 'Dotted', 'gravisain' ),
		type: 'css',
	},
	{
		value: 'dashed',
		label: __( 'Dashed', 'gravisain' ),
		type: 'css',
	},
];

export const getDividerConfig = ( styleKey ) => {
	return DIVIDER_STYLES.find( ( s ) => s.value === styleKey ) || DIVIDER_STYLES[ 0 ];
};

/**
 * Render the inner SVG or elements for a divider
 */
export const renderDividerGraphic = ( { styleKey, color, height = 4, flip = false } ) => {
	const config = getDividerConfig( styleKey );

	if ( config.type === 'svg' ) {
		const strokeW = Math.max( 2, Math.min( height, 8 ) );
		const svgStyle = {
			width: '100%',
			height: '100%',
			display: 'block',
			overflow: 'visible',
			transform: flip ? 'scaleX(-1)' : 'none',
			transformOrigin: 'center center',
		};

		return (
			<svg
				className="gravisain-divider-svg"
				viewBox={ config.viewBox }
				preserveAspectRatio="none"
				style={ svgStyle }
				aria-hidden="true"
				focusable="false"
			>
				{ config.isFill && (
					<path d={ config.path } fill={ color || 'currentColor' } />
				) }
				{ config.isStroke && (
					<path
						d={ config.path }
						fill="none"
						stroke={ color || 'currentColor' }
						strokeWidth={ strokeW }
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				) }
			</svg>
		);
	}

	return null;
};
