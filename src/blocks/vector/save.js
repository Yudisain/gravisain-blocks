import { useBlockProps } from '@wordpress/block-editor';
import { RawHTML } from '@wordpress/element';

export default function save( { attributes } ) {
	const { svgCode, maxWidth, fillColor, strokeColor } = attributes;

	const blockProps = useBlockProps.save( {
		className: 'gravisain-vector-wrapper',
		style: {
			'--gravisain-vector-max-width': `${maxWidth}px`,
			'--gravisain-vector-fill': fillColor,
			'--gravisain-vector-stroke': strokeColor,
		}
	} );

	if ( ! svgCode ) {
		return null;
	}

	return (
		<div { ...blockProps }>
			<div className="gravisain-vector-inner">
				<RawHTML>{ svgCode }</RawHTML>
			</div>
		</div>
	);
}
