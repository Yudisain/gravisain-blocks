import { useBlockProps } from '@wordpress/block-editor';
import Inspector from './components/Inspector';
import parseCustomCSS from '../../controls/parseCustomCSS';
import './editor.scss';

export default function Edit( props ) {
	const { attributes } = props;
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

	const blockProps = useBlockProps( {
		id: anchor || undefined,
		className: [ 'gravisain-google-maps', customClassName || '' ].filter( Boolean ).join( ' ' ),
		style: {
			'--gravisain-maps-height': `${ height || 400 }px`,
			'--gravisain-maps-radius': `${ borderRadius !== undefined ? borderRadius : 8 }px`,
			'--gravisain-maps-border-width': `${ borderWidth !== undefined ? borderWidth : 0 }px`,
			'--gravisain-maps-border-color': borderColor || '#e2e8f0',
			'--gravisain-maps-shadow': boxShadow !== 'none' ? boxShadow : undefined,
			border: 'none',
			outline: 'none',
			boxShadow: 'none',
			background: 'transparent',
			padding: 0,
			...parseCustomCSS( customCSS ),
		},
	} );

	return (
		<>
			<Inspector { ...props } />
			<div { ...blockProps }>
				<div className="gravisain-maps-wrapper" style={ { height: `${ height || 400 }px`, isolation: 'isolate', transform: 'translateZ(0)' } }>
					<iframe
						title={ `Google Map showing ${ location }` }
						src={ mapUrl }
						width="100%"
						height="100%"
						style={ { border: 'none', display: 'block', outline: 'none', boxShadow: 'none', pointerEvents: 'none' } }
						allowFullScreen=""
						loading="lazy"
						referrerPolicy="no-referrer-when-downgrade"
						scrolling="no"
						frameBorder="0"
					/>
				</div>
			</div>
		</>
	);
}
