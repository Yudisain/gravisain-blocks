import { useBlockProps } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { mediaUrl, mediaAlt, maxWidth } = attributes;

	if ( ! mediaUrl ) {
		return null;
	}

	const blockProps = useBlockProps.save( {
		className: 'gravisain-vector-wrapper',
		style: {
			'--gravisain-vector-max-width': maxWidth ? `${ maxWidth }px` : undefined,
		},
	} );

	return (
		<div { ...blockProps }>
			<div className="gravisain-vector-inner">
				<img
					src={ mediaUrl }
					alt={ mediaAlt || '' }
					className="gravisain-vector-image"
					loading="lazy"
					decoding="async"
				/>
			</div>
		</div>
	);
}
