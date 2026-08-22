import { useBlockProps } from '@wordpress/block-editor';
import { ICONS } from '../../controls/icons';
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

	const iconSvg = icon && ICONS[ icon ] ? ICONS[ icon ] : ICONS.star;

	const iconContent = (
		<span
			className="gravisain-icon-inner"
			style={ {
				padding: padding ? `${ padding }px` : undefined,
				borderRadius: borderRadius ? `${ borderRadius }px` : undefined,
			} }
			dangerouslySetInnerHTML={ { __html: iconSvg } }
		/>
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
