import { useBlockProps } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import Inspector from './components/Inspector';
import { ICONS } from '../../controls/icons';
import parseCustomCSS from '../../controls/parseCustomCSS';
import './editor.scss';

export default function Edit( props ) {
	const { attributes, setAttributes } = props;
	const {
		icon,
		size,
		sizeTablet,
		sizeMobile,
		color,
		backgroundColor,
		padding,
		borderRadius,
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

	const currentSize = previewDeviceType === 'Tablet' && sizeTablet
		? sizeTablet
		: previewDeviceType === 'Mobile' && sizeMobile
		? sizeMobile
		: size;

	const currentAlignment = previewDeviceType === 'Tablet' && alignmentTablet
		? alignmentTablet
		: previewDeviceType === 'Mobile' && alignmentMobile
		? alignmentMobile
		: alignment;

	const blockProps = useBlockProps( {
		id: anchor || undefined,
		className: [
			'gravisain-icon',
			currentAlignment ? `align-${ currentAlignment }` : '',
			customClassName || '',
		].filter( Boolean ).join( ' ' ),
		style: {
			display: 'flex',
			justifyContent: currentAlignment === 'left' ? 'flex-start' : currentAlignment === 'right' ? 'flex-end' : 'center',
			...parseCustomCSS( customCSS ),
		},
	} );

	const iconSvg = icon && ICONS[ icon ] ? ICONS[ icon ] : ICONS.star;

	return (
		<>
			<Inspector { ...props } />
			<div { ...blockProps }>
				<span
					className="gravisain-icon-inner"
					style={ {
						width: `${ currentSize }px`,
						height: `${ currentSize }px`,
						color: color || '#4f46e5',
						backgroundColor: backgroundColor || 'transparent',
						padding: padding ? `${ padding }px` : undefined,
						borderRadius: borderRadius ? `${ borderRadius }px` : undefined,
						display: 'inline-flex',
						alignItems: 'center',
						justifyContent: 'center',
						transition: 'all 0.2s ease',
					} }
					dangerouslySetInnerHTML={ { __html: iconSvg } }
				/>
			</div>
		</>
	);
}
