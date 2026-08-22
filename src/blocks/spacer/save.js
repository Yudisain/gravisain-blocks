import { useBlockProps } from '@wordpress/block-editor';
import parseCustomCSS from '../../controls/parseCustomCSS';

export default function save( { attributes } ) {
	const {
		height,
		heightTablet,
		heightMobile,
		showDivider,
		dividerStyle,
		dividerColor,
		dividerWidth,
		dividerHeight,
		anchor,
		customClassName,
		customCSS,
	} = attributes;

	const blockProps = useBlockProps.save( {
		id: anchor || undefined,
		className: [
			'gravisain-spacer',
			showDivider ? 'has-divider' : '',
			customClassName || '',
		].filter( Boolean ).join( ' ' ),
		style: {
			height: `${ height }px`,
			'--gravisain-spacer-height-tablet': `${ heightTablet }px`,
			'--gravisain-spacer-height-mobile': `${ heightMobile }px`,
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			...parseCustomCSS( customCSS ),
		},
	} );

	return (
		<div { ...blockProps }>
			{ showDivider && (
				<div
					className="gravisain-spacer-divider-line"
					style={ {
						width: `${ dividerWidth }%`,
						borderTop: `${ dividerHeight }px ${ dividerStyle } ${ dividerColor }`,
					} }
				/>
			) }
		</div>
	);
}
