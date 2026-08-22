import { useBlockProps } from '@wordpress/block-editor';
import parseCustomCSS from '../../controls/parseCustomCSS';

export default function save( { attributes } ) {
	const {
		targetDate,
		timezoneBasis,
		siteOffset,
		labelDays,
		labelHours,
		labelMinutes,
		labelSeconds,
		showDays,
		showHours,
		showMinutes,
		showSeconds,
		layout,
		boxBackgroundColor,
		numberColor,
		labelColor,
		borderColor,
		borderWidth,
		borderRadius,
		numberFontSize,
		labelFontSize,
		gap,
		expiryAction,
		expiryMessage,
		alignment,
		alignmentTablet,
		alignmentMobile,
		anchor,
		customClassName,
		customCSS,
	} = attributes;

	const blockProps = useBlockProps.save( {
		id: anchor || undefined,
		className: [
			'gravisain-countdown',
			`layout-${ layout || 'boxes' }`,
			alignment ? `align-${ alignment }` : '',
			alignmentTablet ? `align-tablet-${ alignmentTablet }` : '',
			alignmentMobile ? `align-mobile-${ alignmentMobile }` : '',
			customClassName || '',
		].filter( Boolean ).join( ' ' ),
		style: {
			'--gravisain-cd-box-bg': boxBackgroundColor || '#f8fafc',
			'--gravisain-cd-num-color': numberColor || '#007cba',
			'--gravisain-cd-label-color': labelColor || '#666666',
			'--gravisain-cd-border-color': borderColor || '#e2e8f0',
			'--gravisain-cd-border-width': `${ borderWidth }px`,
			'--gravisain-cd-radius': `${ borderRadius }px`,
			'--gravisain-cd-num-size': `${ numberFontSize }px`,
			'--gravisain-cd-label-size': `${ labelFontSize }px`,
			'--gravisain-cd-gap': `${ gap }px`,
			...parseCustomCSS( customCSS ),
		},
		'data-target': targetDate,
		'data-timezone-basis': timezoneBasis || 'site',
		'data-site-offset': siteOffset || '+00:00',
		'data-expiry-action': expiryAction,
		'data-expiry-msg': expiryMessage || '',
	} );

	return (
		<div { ...blockProps }>
			<div className="gravisain-countdown-items">
				{ showDays && (
					<div className="gravisain-countdown-item" data-unit="days">
						<span className="gravisain-cd-number">00</span>
						<span className="gravisain-cd-label">{ labelDays }</span>
					</div>
				) }
				{ showHours && (
					<div className="gravisain-countdown-item" data-unit="hours">
						<span className="gravisain-cd-number">00</span>
						<span className="gravisain-cd-label">{ labelHours }</span>
					</div>
				) }
				{ showMinutes && (
					<div className="gravisain-countdown-item" data-unit="minutes">
						<span className="gravisain-cd-number">00</span>
						<span className="gravisain-cd-label">{ labelMinutes }</span>
					</div>
				) }
				{ showSeconds && (
					<div className="gravisain-countdown-item" data-unit="seconds">
						<span className="gravisain-cd-number">00</span>
						<span className="gravisain-cd-label">{ labelSeconds }</span>
					</div>
				) }
			</div>
			<div className="gravisain-countdown-expired-msg" style={ { display: 'none' } }>
				{ expiryMessage }
			</div>
		</div>
	);
}
