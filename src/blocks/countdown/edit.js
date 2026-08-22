import { __ } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';
import { useBlockProps } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { getSettings } from '@wordpress/date';
import Inspector from './components/Inspector';
import parseCustomCSS from '../../controls/parseCustomCSS';
import './editor.scss';

export default function Edit( props ) {
	const { attributes, setAttributes } = props;
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

	const previewDeviceType = useSelect( ( select ) => {
		const editorDevice = select( 'core/editor' )?.getDeviceType?.();
		const postDevice = select( 'core/edit-post' )?.__experimentalGetPreviewDeviceType?.();
		const siteDevice = select( 'core/edit-site' )?.__experimentalGetPreviewDeviceType?.();
		return editorDevice || postDevice || siteDevice || 'Desktop';
	}, [] );

	const currentAlignment = previewDeviceType === 'Tablet' && alignmentTablet
		? alignmentTablet
		: previewDeviceType === 'Mobile' && alignmentMobile
		? alignmentMobile
		: alignment;

	const [ timeLeft, setTimeLeft ] = useState( { days: 0, hours: 0, minutes: 0, seconds: 0, expired: false } );

	useEffect( () => {
		try {
			const settings = getSettings();
			const offset = settings?.timezone?.offset;
			if ( typeof offset === 'number' && ! isNaN( offset ) ) {
				const sign = offset >= 0 ? '+' : '-';
				const abs = Math.abs( offset );
				const hours = Math.floor( abs );
				const minutes = Math.round( ( abs - hours ) * 60 );
				const pad = ( n ) => ( n < 10 ? '0' + n : n );
				const formatted = `${ sign }${ pad( hours ) }:${ pad( minutes ) }`;
				if ( formatted !== siteOffset && setAttributes ) {
					setAttributes( { siteOffset: formatted } );
				}
			}
		} catch ( e ) {}
	}, [] );

	useEffect( () => {
		const updateTimer = () => {
			let target;
			if ( timezoneBasis === 'site' && siteOffset ) {
				target = new Date( `${ targetDate }${ siteOffset }` ).getTime();
			} else {
				target = new Date( targetDate ).getTime();
			}
			const now = new Date().getTime();
			const diff = target - now;

			if ( isNaN( diff ) || diff <= 0 ) {
				setTimeLeft( { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true } );
				return;
			}

			const days = Math.floor( diff / ( 1000 * 60 * 60 * 24 ) );
			const hours = Math.floor( ( diff % ( 1000 * 60 * 60 * 24 ) ) / ( 1000 * 60 * 60 ) );
			const minutes = Math.floor( ( diff % ( 1000 * 60 * 60 ) ) / ( 1000 * 60 ) );
			const seconds = Math.floor( ( diff % ( 1000 * 60 ) ) / 1000 );

			setTimeLeft( { days, hours, minutes, seconds, expired: false } );
		};

		updateTimer();
		const interval = setInterval( updateTimer, 1000 );
		return () => clearInterval( interval );
	}, [ targetDate, timezoneBasis, siteOffset ] );

	const blockProps = useBlockProps( {
		id: anchor || undefined,
		className: [
			'gravisain-countdown',
			`layout-${ layout || 'boxes' }`,
			currentAlignment ? `align-${ currentAlignment }` : '',
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
	} );

	const formatNum = ( num ) => ( num < 10 ? `0${ num }` : num );

	return (
		<>
			<Inspector { ...props } />
			<div { ...blockProps }>
				{ timeLeft.expired && expiryAction === 'message' ? (
					<div className="gravisain-countdown-expired-msg">{ expiryMessage }</div>
				) : (
					<div className="gravisain-countdown-items">
						{ showDays && (
							<div className="gravisain-countdown-item">
								<span className="gravisain-cd-number">{ formatNum( timeLeft.days ) }</span>
								<span className="gravisain-cd-label">{ labelDays }</span>
							</div>
						) }
						{ showHours && (
							<div className="gravisain-countdown-item">
								<span className="gravisain-cd-number">{ formatNum( timeLeft.hours ) }</span>
								<span className="gravisain-cd-label">{ labelHours }</span>
							</div>
						) }
						{ showMinutes && (
							<div className="gravisain-countdown-item">
								<span className="gravisain-cd-number">{ formatNum( timeLeft.minutes ) }</span>
								<span className="gravisain-cd-label">{ labelMinutes }</span>
							</div>
						) }
						{ showSeconds && (
							<div className="gravisain-countdown-item">
								<span className="gravisain-cd-number">{ formatNum( timeLeft.seconds ) }</span>
								<span className="gravisain-cd-label">{ labelSeconds }</span>
							</div>
						) }
					</div>
				) }
			</div>
		</>
	);
}
