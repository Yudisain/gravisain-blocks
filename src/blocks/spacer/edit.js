import { useBlockProps } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import Inspector from './components/Inspector';
import parseCustomCSS from '../../controls/parseCustomCSS';
import './editor.scss';

export default function Edit( props ) {
	const { attributes, setAttributes } = props;
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

	const previewDeviceType = useSelect( ( select ) => {
		const editorDevice = select( 'core/editor' )?.getDeviceType?.();
		const postDevice = select( 'core/edit-post' )?.__experimentalGetPreviewDeviceType?.();
		const siteDevice = select( 'core/edit-site' )?.__experimentalGetPreviewDeviceType?.();
		return editorDevice || postDevice || siteDevice || 'Desktop';
	}, [] );

	const currentHeight = previewDeviceType === 'Tablet' && heightTablet !== undefined
		? heightTablet
		: previewDeviceType === 'Mobile' && heightMobile !== undefined
		? heightMobile
		: height;

	const blockProps = useBlockProps( {
		id: anchor || undefined,
		className: [
			'gravisain-spacer',
			showDivider ? 'has-divider' : '',
			customClassName || '',
		].filter( Boolean ).join( ' ' ),
		style: {
			height: `${ currentHeight }px`,
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			...parseCustomCSS( customCSS ),
		},
	} );

	return (
		<>
			<Inspector { ...props } />
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
		</>
	);
}
