import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import { RawHTML } from '@wordpress/element';
import Inspector from './components/Inspector';
import './editor.scss';

export default function Edit( { attributes, setAttributes } ) {
	const { svgCode, maxWidth, fillColor, strokeColor } = attributes;

	const blockProps = useBlockProps( {
		className: 'gravisain-vector-wrapper',
		style: {
			'--gravisain-vector-max-width': `${maxWidth}px`,
			'--gravisain-vector-fill': fillColor,
			'--gravisain-vector-stroke': strokeColor,
		}
	} );

	return (
		<>
			<Inspector attributes={ attributes } setAttributes={ setAttributes } />
			<div { ...blockProps }>
				{ svgCode ? (
					<div className="gravisain-vector-inner">
						<RawHTML>{ svgCode }</RawHTML>
					</div>
				) : (
					<div className="gravisain-vector-placeholder">
						<span>{ __( 'Gravisain Vector Block', 'gravisain-blocks' ) }</span>
						<p>{ __( 'Paste your SVG code in the block settings.', 'gravisain-blocks' ) }</p>
					</div>
				) }
			</div>
		</>
	);
}
