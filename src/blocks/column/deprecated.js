import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import parseCustomCSS from '../../controls/parseCustomCSS';
import metadata from './block.json';

const v1 = {
	attributes: metadata.attributes,
	save( { attributes } ) {
		const {
			width,
			backgroundColor,
			textColor,
			padding,
			margin,
			borderRadius,
			borderStyle,
			borderWidth,
			borderColor,
			boxShadow,
			backgroundImage,
			verticalAlign,
			textAlign,
			hideOnDesktop,
			hideOnTablet,
			hideOnMobile,
			anchor,
			customClassName,
			customCSS,
		} = attributes;

		const blockProps = useBlockProps.save( {
			id: anchor || undefined,
			className: [
				'gravisain-column',
				verticalAlign ? `is-vertically-aligned-${ verticalAlign }` : '',
				textAlign ? `has-text-align-${ textAlign }` : '',
				hideOnDesktop ? 'gravisain-hide-desktop' : '',
				hideOnTablet ? 'gravisain-hide-tablet' : '',
				hideOnMobile ? 'gravisain-hide-mobile' : '',
				customClassName || '',
			].filter( Boolean ).join( ' ' ),
			style: {
				flexBasis: width ? `calc(${ width } - var(--gravisain-gap-compensation, 0px) - 0.1px)` : undefined,
				flexGrow: width ? 0 : 1,
				flexShrink: 0,
				backgroundColor: backgroundColor || undefined,
				color: textColor || undefined,
				backgroundImage: backgroundImage ? `url(${ backgroundImage })` : undefined,
				backgroundSize: backgroundImage ? 'cover' : undefined,
				backgroundPosition: backgroundImage ? 'center' : undefined,
				paddingTop: padding?.top || undefined,
				paddingRight: padding?.right || undefined,
				paddingBottom: padding?.bottom || undefined,
				paddingLeft: padding?.left || undefined,
				marginTop: margin?.top || undefined,
				marginRight: margin?.right || undefined,
				marginBottom: margin?.bottom || undefined,
				marginLeft: margin?.left || undefined,
				borderRadius: borderRadius ? `${ borderRadius }px` : undefined,
				borderStyle: borderStyle !== 'none' ? borderStyle : undefined,
				borderWidth: borderStyle !== 'none' && borderWidth ? `${ borderWidth }px` : undefined,
				borderColor: borderStyle !== 'none' && borderColor ? borderColor : undefined,
				boxShadow: boxShadow !== 'none' ? boxShadow : undefined,
				...parseCustomCSS( customCSS ),
			},
		} );

		return (
			<div { ...blockProps }>
				<InnerBlocks.Content />
			</div>
		);
	},
};

export default [ v1 ];
