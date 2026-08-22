import { useBlockProps } from '@wordpress/block-editor';
import parseCustomCSS from '../../controls/parseCustomCSS';

export default function save( { attributes } ) {
	const {
		location,
		zoom,
		height,
		mapType,
		borderRadius,
		borderWidth,
		borderColor,
		boxShadow,
		anchor,
		customClassName,
		customCSS,
	} = attributes;

	const mapUrl = `https://maps.google.com/maps?q=${ encodeURIComponent( location || 'Jakarta' ) }&t=${ mapType || 'm' }&z=${ zoom || 14 }&ie=UTF8&iwloc=&output=embed`;

	const blockProps = useBlockProps.save( {
		id: anchor || undefined,
		className: [ 'gravisain-google-maps', customClassName || '' ].filter( Boolean ).join( ' ' ),
		style: {
			'--gravisain-maps-height': `${ height || 400 }px`,
			'--gravisain-maps-radius': `${ borderRadius !== undefined ? borderRadius : 8 }px`,
			'--gravisain-maps-border-width': `${ borderWidth !== undefined ? borderWidth : 0 }px`,
			'--gravisain-maps-border-color': borderColor || '#e2e8f0',
			'--gravisain-maps-shadow': boxShadow !== 'none' ? boxShadow : undefined,
			...parseCustomCSS( customCSS ),
		},
	} );

	return (
		<div { ...blockProps }>
			<div className="gravisain-maps-wrapper" style={ { height: `${ height }px`, isolation: 'isolate', transform: 'translateZ(0)' } }>
				<iframe
					title={ `Google Map showing ${ location }` }
					src={ mapUrl }
					width="100%"
					height="100%"
					style={ { border: 0, display: 'block' } }
					allowFullScreen=""
					loading="lazy"
					referrerPolicy="no-referrer-when-downgrade"
					scrolling="no"
					frameBorder="0"
				/>
			</div>
		</div>
	);
}
