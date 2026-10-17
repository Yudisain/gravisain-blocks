import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import parseCustomCSS from '../../controls/parseCustomCSS';

export default function save( { attributes } ) {
	const {
		speed,
		direction,
		gap,
		pauseOnHover,
		fadeMask,
		minHeight,
		imageHeight,
		backgroundColor,
		borderRadius,
		padding,
		margin,
		anchor,
		customClassName,
		customCSS,
	} = attributes;

	const blockProps = useBlockProps.save( {
		id: anchor || undefined,
		className: [
			'gravisain-marquee-block',
			fadeMask ? 'has-fade-mask' : '',
			customClassName || '',
		].filter( Boolean ).join( ' ' ),
		style: {
			'--gravisain-marquee-speed': `${ speed }s`,
			'--gravisain-marquee-gap': `${ gap }px`,
			'--gravisain-marquee-min-height': typeof minHeight === 'number' ? `${ minHeight }px` : undefined,
			'--gravisain-marquee-image-height': Number( imageHeight ) > 0 ? `${ imageHeight }px` : undefined,
			backgroundColor: backgroundColor || undefined,
			borderRadius: borderRadius ? `${ borderRadius }px` : undefined,
			paddingTop: padding?.top,
			paddingRight: padding?.right,
			paddingBottom: padding?.bottom,
			paddingLeft: padding?.left,
			marginTop: margin?.top,
			marginRight: margin?.right,
			marginBottom: margin?.bottom,
			marginLeft: margin?.left,
			...parseCustomCSS( customCSS ),
		},
		'data-direction': direction,
		'data-pause-on-hover': pauseOnHover ? 'true' : 'false',
	} );

	return (
		<div { ...blockProps }>
			<div className="gravisain-marquee-track">
				<InnerBlocks.Content />
			</div>
		</div>
	);
}
