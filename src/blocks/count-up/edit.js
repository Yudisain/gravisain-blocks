import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import Inspector from './components/Inspector';
import parseCustomCSS from '../../controls/parseCustomCSS';
import './editor.scss';

export default function Edit( props ) {
	const { attributes, setAttributes } = props;
	const {
		endNumber,
		prefix,
		suffix,
		title,
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

	const formattedEndNumber = Number( endNumber ).toFixed( decimalPlaces || 0 );

	const blockProps = useBlockProps( {
		id: anchor || undefined,
		className: [
			'gravisain-count-up',
			currentAlignment ? `align-${ currentAlignment }` : '',
			customClassName || '',
		].filter( Boolean ).join( ' ' ),
		style: {
			'--gravisain-cu-number-size': `${ numberFontSize }px`,
			'--gravisain-cu-title-size': `${ titleFontSize }px`,
			'--gravisain-cu-number-color': numberColor || '#007cba',
			'--gravisain-cu-title-color': titleColor || '#666666',
			...parseCustomCSS( customCSS ),
		},
	} );

	return (
		<>
			<Inspector { ...props } />
			<div { ...blockProps }>
				<div className="gravisain-count-up-number">
					<span className="gravisain-prefix">{ prefix }</span>
					<span className="gravisain-value">{ formattedEndNumber }</span>
					<span className="gravisain-suffix">{ suffix }</span>
				</div>
				<RichText
					tagName="div"
					className="gravisain-count-up-title"
					value={ title }
					onChange={ ( val ) => setAttributes( { title: val } ) }
					placeholder={ __( 'Metric Title...', 'gravisain-blocks' ) }
				/>
			</div>
		</>
	);
}
