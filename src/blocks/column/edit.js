import { useEffect, useRef } from '@wordpress/element';
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import ColumnInspector from './components/ColumnInspector';
import ColumnResizer from './components/ColumnResizer';
import SpacingVisualizer from '../row-layout/components/SpacingVisualizer';
import parseCustomCSS from '../../controls/parseCustomCSS';
import './editor.scss';

const getSpacing = ( spacing, side ) => {
	if ( spacing === undefined || spacing === null || spacing === '' ) return undefined;
	if ( typeof spacing === 'string' || typeof spacing === 'number' ) {
		return typeof spacing === 'number' ? `${spacing}px` : spacing;
	}
	const val = spacing[ side ];
	if ( typeof val === 'number' ) return `${val}px`;
	return val || undefined;
};

export default function Edit( props ) {
	const { attributes, setAttributes, clientId, isSelected } = props;
	const {
		width,
		widthTablet,
		widthMobile,
		verticalAlignment,
		backgroundColor,
		textColor,
		backgroundImage,
		padding,
		paddingTablet,
		paddingMobile,
		margin,
		marginTablet,
		marginMobile,
		borderWidth,
		borderColor,
		borderStyle,
		borderRadius,
		anchor,
		customClassName,
		customCSS,
	} = attributes;

	const ref = useRef();

	const previewDeviceType = useSelect( ( select ) => {
		const editorDevice = select( 'core/editor' )?.getDeviceType?.();
		const postDevice = select( 'core/edit-post' )?.__experimentalGetPreviewDeviceType?.();
		const siteDevice = select( 'core/edit-site' )?.__experimentalGetPreviewDeviceType?.();
		return editorDevice || postDevice || siteDevice || 'Desktop';
	}, [] );

	const currentWidth = previewDeviceType === 'Tablet' && widthTablet
		? widthTablet
		: previewDeviceType === 'Mobile' && widthMobile
		? widthMobile
		: width;

	// Gutenberg wraps each block in .block-editor-block-list__block which is the actual
	// flex item. We must apply flex-basis to THAT wrapper, not to our own element.
	useEffect( () => {
		if ( ! ref.current ) return;
		const blockWrapper = ref.current.closest( '.block-editor-block-list__block' );
		if ( blockWrapper ) {
			if ( currentWidth ) {
				blockWrapper.style.flexBasis = `calc(${ currentWidth } - var(--gravisain-gap-compensation, 0px) - 0.1px)`;
				blockWrapper.style.flexGrow = '0';
				blockWrapper.style.flexShrink = '0';
				blockWrapper.style.maxWidth = 'none';
				blockWrapper.style.boxSizing = 'border-box';
			} else {
				blockWrapper.style.flexBasis = '';
				blockWrapper.style.flexGrow = '1';
				blockWrapper.style.flexShrink = '1';
				blockWrapper.style.maxWidth = '';
				blockWrapper.style.boxSizing = '';
			}
		}
	}, [ currentWidth ] );

	const blockProps = useBlockProps( {
		id: anchor || undefined,
		className: [
			'gravisain-column',
			verticalAlignment ? `is-vertically-aligned-${ verticalAlignment }` : '',
			customClassName || '',
		].filter( Boolean ).join( ' ' ),
		style: {
			backgroundColor: backgroundColor || undefined,
			color: textColor || undefined,
			backgroundImage: backgroundImage ? `url(${ backgroundImage })` : undefined,
			backgroundSize: backgroundImage ? 'cover' : undefined,
			backgroundPosition: backgroundImage ? 'center' : undefined,

			// Desktop Spacing
			'--gravisain-col-pt': getSpacing( padding, 'top' ),
			'--gravisain-col-pr': getSpacing( padding, 'right' ),
			'--gravisain-col-pb': getSpacing( padding, 'bottom' ),
			'--gravisain-col-pl': getSpacing( padding, 'left' ),
			'--gravisain-col-mt': getSpacing( margin, 'top' ),
			'--gravisain-col-mr': getSpacing( margin, 'right' ),
			'--gravisain-col-mb': getSpacing( margin, 'bottom' ),
			'--gravisain-col-ml': getSpacing( margin, 'left' ),

			// Tablet Spacing Variables
			'--gravisain-col-pt-tablet': getSpacing( paddingTablet, 'top' ),
			'--gravisain-col-pr-tablet': getSpacing( paddingTablet, 'right' ),
			'--gravisain-col-pb-tablet': getSpacing( paddingTablet, 'bottom' ),
			'--gravisain-col-pl-tablet': getSpacing( paddingTablet, 'left' ),
			'--gravisain-col-mt-tablet': getSpacing( marginTablet, 'top' ),
			'--gravisain-col-mr-tablet': getSpacing( marginTablet, 'right' ),
			'--gravisain-col-mb-tablet': getSpacing( marginTablet, 'bottom' ),
			'--gravisain-col-ml-tablet': getSpacing( marginTablet, 'left' ),

			// Mobile Spacing Variables
			'--gravisain-col-pt-mobile': getSpacing( paddingMobile, 'top' ),
			'--gravisain-col-pr-mobile': getSpacing( paddingMobile, 'right' ),
			'--gravisain-col-pb-mobile': getSpacing( paddingMobile, 'bottom' ),
			'--gravisain-col-pl-mobile': getSpacing( paddingMobile, 'left' ),
			'--gravisain-col-mt-mobile': getSpacing( marginMobile, 'top' ),
			'--gravisain-col-mr-mobile': getSpacing( marginMobile, 'right' ),
			'--gravisain-col-mb-mobile': getSpacing( marginMobile, 'bottom' ),
			'--gravisain-col-ml-mobile': getSpacing( marginMobile, 'left' ),

			borderWidth: borderWidth ? `${ borderWidth }px` : undefined,
			borderColor: borderColor || undefined,
			borderStyle: borderWidth ? borderStyle : undefined,
			borderRadius: borderRadius ? `${ borderRadius }px` : undefined,
			...parseCustomCSS( customCSS ),
		},
		ref,
	} );

	const innerBlocksProps = useInnerBlocksProps(
		{ className: 'gravisain-column-inner' },
		{
			templateLock: false,
			// Allow default appender behavior so they can click to add blocks easily
		}
	);

	return (
		<>
			<ColumnInspector { ...props } />
			<div { ...blockProps }>
				<SpacingVisualizer
					attributes={ attributes }
					setAttributes={ setAttributes }
					isSelected={ isSelected }
					blockRef={ ref }
					prefix="col"
				/>
				<div { ...innerBlocksProps } />
				<ColumnResizer clientId={ clientId } />
			</div>
		</>
	);
}
