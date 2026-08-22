import { useBlockProps, RichText } from '@wordpress/block-editor';
import parseCustomCSS from '../../controls/parseCustomCSS';

export default function save( { attributes } ) {
	const {
		startNumber,
		endNumber,
		prefix,
		suffix,
		title,
		duration,
		decimalPlaces,
		numberFontSize,
		titleFontSize,
		numberColor,
		titleColor,
		alignment,
		alignmentTablet,
		alignmentMobile,
		anchor,
		customClassName,
		customCSS,
	} = attributes;

	const formattedStartNumber = Number( startNumber ).toFixed( decimalPlaces || 0 );

	const blockProps = useBlockProps.save( {
		id: anchor || undefined,
		className: [
			'gravisain-count-up',
			alignment ? `align-${ alignment }` : '',
			alignmentTablet ? `align-tablet-${ alignmentTablet }` : '',
			alignmentMobile ? `align-mobile-${ alignmentMobile }` : '',
			customClassName || '',
		].filter( Boolean ).join( ' ' ),
		style: {
			'--gravisain-cu-number-size': `${ numberFontSize }px`,
			'--gravisain-cu-title-size': `${ titleFontSize }px`,
			'--gravisain-cu-number-color': numberColor || '#007cba',
			'--gravisain-cu-title-color': titleColor || '#666666',
			...parseCustomCSS( customCSS ),
		},
		'data-start': startNumber,
		'data-end': endNumber,
		'data-duration': duration,
		'data-decimals': decimalPlaces || 0,
	} );

	return (
		<div { ...blockProps }>
			<div className="gravisain-count-up-number">
				<span className="gravisain-prefix">{ prefix }</span>
				<span className="gravisain-value">{ formattedStartNumber }</span>
				<span className="gravisain-suffix">{ suffix }</span>
			</div>
			{ ! RichText.isEmpty( title ) && (
				<RichText.Content tagName="div" className="gravisain-count-up-title" value={ title } />
			) }
		</div>
	);
}
