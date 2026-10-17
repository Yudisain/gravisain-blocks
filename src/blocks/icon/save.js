import { useBlockProps } from '@wordpress/block-editor';
import { ICONS, getIconMarkup } from '../../controls/icons';
import parseCustomCSS from '../../controls/parseCustomCSS';

export default function save( { attributes } ) {
	const {
		icon,
		size,
		sizeTablet,
		sizeMobile,
		color,
		hoverColor,
		backgroundColor,
		padding,
		borderRadius,
		link,
		linkTarget,
		alignment,
		alignmentTablet,
		alignmentMobile,
		anchor,
		customClassName,
		customCSS,
	} = attributes;

	const blockProps = useBlockProps.save( {
		id: anchor || undefined,
		className: [
			'gravisain-icon',
			alignment ? `align-${ alignment }` : '',
			alignmentTablet ? `align-tablet-${ alignmentTablet }` : '',
			alignmentMobile ? `align-mobile-${ alignmentMobile }` : '',
			customClassName || '',
		].filter( Boolean ).join( ' ' ),
		style: {
			'--gravisain-icon-size': `${ size }px`,
			'--gravisain-icon-size-tablet': sizeTablet ? `${ sizeTablet }px` : undefined,
			'--gravisain-icon-size-mobile': sizeMobile ? `${ sizeMobile }px` : undefined,
			'--gravisain-icon-color': color || '#4f46e5',
			'--gravisain-icon-hover-color': hoverColor || color || '#4f46e5',
			'--gravisain-icon-bg': backgroundColor || 'transparent',
			...parseCustomCSS( customCSS ),
		},
	} );

	const iconData = getIconMarkup( icon, 'star' );
	const isImg = iconData && iconData.type === 'image';
	const iconSvg = iconData && iconData.type === 'svg' ? iconData.content : ( ICONS[ icon ] || ICONS.star );

	const iconContent = (
		<span
			className="gravisain-icon-inner"
			style={ {
				padding: padding ? `${ padding }px` : undefined,
				borderRadius: borderRadius ? `${ borderRadius }px` : undefined,
			} }
			dangerouslySetInnerHTML={ ! isImg ? { __html: iconSvg } : undefined }
		>
			{ isImg && (
				<img src={ iconData.src } alt="" style={ { width: '100%', height: '100%', objectFit: 'contain' } } />
			) }
		</span>
	);

	return (
		<div { ...blockProps }>
			{ link ? (
				<a href={ link } target={ linkTarget } rel={ linkTarget === '_blank' ? 'noopener noreferrer' : undefined } className="gravisain-icon-link">
					{ iconContent }
				</a>
			) : (
				iconContent
			) }
		</div>
	);
}
