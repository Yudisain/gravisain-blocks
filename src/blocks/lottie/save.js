import { useBlockProps } from '@wordpress/block-editor';
import parseCustomCSS from '../../controls/parseCustomCSS';

export default function save( { attributes } ) {
	const {
		url,
		trigger,
		loop,
		speed,
		width,
		height,
		alignment,
		alignmentTablet,
		alignmentMobile,
		anchor,
		customClassName,
		customCSS,
	} = attributes;

	if ( ! url ) return null;

	const blockProps = useBlockProps.save( {
		id: anchor || undefined,
		className: [
			'gravisain-lottie',
			alignment ? `align-${ alignment }` : '',
			alignmentTablet ? `align-tablet-${ alignmentTablet }` : '',
			alignmentMobile ? `align-mobile-${ alignmentMobile }` : '',
			customClassName || '',
		].filter( Boolean ).join( ' ' ),
		style: {
			'--gravisain-lottie-width': `${ width }px`,
			'--gravisain-lottie-height': `${ height }px`,
			...parseCustomCSS( customCSS ),
		},
		'data-url': url,
		'data-trigger': trigger || 'autoplay',
		'data-loop': loop ? 'true' : 'false',
		'data-speed': speed || 1,
	} );

	return (
		<div { ...blockProps }>
			<div className="gravisain-lottie-container" style={ { width: `${ width }px`, height: `${ height }px` } } />
		</div>
	);
}
