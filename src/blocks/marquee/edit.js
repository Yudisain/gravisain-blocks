import { __ } from '@wordpress/i18n';
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import Inspector from './components/Inspector';
import parseCustomCSS from '../../controls/parseCustomCSS';
import './editor.scss';

export default function Edit( props ) {
	const { attributes, setAttributes } = props;
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

	const blockProps = useBlockProps( {
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
		<>
			<Inspector { ...props } />

			<div { ...blockProps }>
				<div className="gravisain-marquee-editor-badge">
					<span>{ __( '⚡ Marquee Track (Editing Mode)', 'gravisain' ) }</span>
				</div>
				<div className="gravisain-marquee-editor-track">
					<InnerBlocks
						orientation="horizontal"
						templateLock={ false }
						placeholder={ __( 'Add items (logos, images, headings, icons) to scroll...', 'gravisain' ) }
					/>
				</div>
			</div>
		</>
	);
}
