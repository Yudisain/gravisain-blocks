import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, BlockControls, AlignmentToolbar } from '@wordpress/block-editor';
import { useState, useEffect } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import Inspector from './components/Inspector';
import useGoogleFont from '../../controls/useGoogleFont';
import parseCustomCSS from '../../controls/parseCustomCSS';
import './editor.scss';

const cleanFontFamily = ( fam ) => {
	if ( ! fam || fam === 'inherit' || fam === 'default' ) return undefined;
	if ( fam.includes( ',' ) ) return fam;
	return `'${ fam }', sans-serif`;
};

const getSpacing = ( spacing, side ) => {
	if ( spacing === undefined || spacing === null || spacing === '' ) return undefined;
	if ( typeof spacing === 'string' || typeof spacing === 'number' ) {
		return typeof spacing === 'number' ? `${ spacing }px` : spacing;
	}
	const val = spacing[ side ];
	if ( typeof val === 'number' ) return `${ val }px`;
	return val || undefined;
};

const getTypographyVar = ( val, isSpacing = false ) => {
	if ( val === undefined || val === null || val === '' ) return undefined;
	if ( typeof val === 'number' ) return isSpacing ? `${ val }px` : String( val );
	if ( typeof val === 'string' ) {
		if ( isSpacing && ! isNaN( val ) ) return `${ val }px`;
		return val;
	}
	return val;
};

export default function Edit( props ) {
	const { attributes, setAttributes } = props;
	const {
		text = '',
		showDot = true,
		dotColor = '#10b981',
		dotPulse = true,
		dotPulseSpeed = 1.8,
		dotSize = 8,
		link = '',
		alignment = 'left',
		alignmentTablet = '',
		alignmentMobile = '',
		fontFamily = '',
		fontSize = 13,
		fontSizeTablet,
		fontSizeMobile,
		fontWeight = '600',
		fontStyle = 'normal',
		lineHeight = '1.4',
		letterSpacing = '0px',
		textColor = '#1e293b',
		backgroundColor = '#ffffff',
		borderWidth = 1,
		borderColor = 'rgba(226, 232, 240, 0.9)',
		borderStyle = 'solid',
		borderRadius = 9999,
		hasShadow = true,
		padding,
		paddingTablet,
		paddingMobile,
		margin,
		marginTablet,
		marginMobile,
		anchor,
		customClassName,
		customCSS,
	} = attributes;

	useGoogleFont( fontFamily );

	const [ device, setDevice ] = useState( 'desktop' );

	const previewDeviceType = useSelect( ( select ) => {
		const editorDevice = select( 'core/editor' )?.getDeviceType?.();
		const postDevice = select( 'core/edit-post' )?.__experimentalGetPreviewDeviceType?.();
		const siteDevice = select( 'core/edit-site' )?.__experimentalGetPreviewDeviceType?.();
		return editorDevice || postDevice || siteDevice || 'Desktop';
	}, [] );

	useEffect( () => {
		if ( previewDeviceType === 'Tablet' && device !== 'tablet' ) {
			setDevice( 'tablet' );
		} else if ( previewDeviceType === 'Mobile' && device !== 'mobile' ) {
			setDevice( 'mobile' );
		} else if ( previewDeviceType === 'Desktop' && device !== 'desktop' ) {
			setDevice( 'desktop' );
		}
	}, [ previewDeviceType ] );

	const activeAlignment =
		device === 'mobile'
			? ( alignmentMobile || alignmentTablet || alignment || 'left' )
			: device === 'tablet'
			? ( alignmentTablet || alignment || 'left' )
			: ( alignment || 'left' );

	const activeFontSize =
		device === 'mobile'
			? ( fontSizeMobile !== undefined ? fontSizeMobile : ( fontSizeTablet !== undefined ? fontSizeTablet : fontSize ) )
			: device === 'tablet'
			? ( fontSizeTablet !== undefined ? fontSizeTablet : fontSize )
			: fontSize;

	const getFlexJustify = ( align ) => {
		if ( align === 'center' ) return 'center';
		if ( align === 'right' ) return 'flex-end';
		return 'flex-start';
	};

	const activeMarginTop =
		device === 'mobile'
			? ( getSpacing( marginMobile, 'top' ) || getSpacing( marginTablet, 'top' ) || getSpacing( margin, 'top' ) )
			: device === 'tablet'
			? ( getSpacing( marginTablet, 'top' ) || getSpacing( margin, 'top' ) )
			: getSpacing( margin, 'top' );

	const activeMarginRight =
		device === 'mobile'
			? ( getSpacing( marginMobile, 'right' ) || getSpacing( marginTablet, 'right' ) || getSpacing( margin, 'right' ) )
			: device === 'tablet'
			? ( getSpacing( marginTablet, 'right' ) || getSpacing( margin, 'right' ) )
			: getSpacing( margin, 'right' );

	const activeMarginBottom =
		device === 'mobile'
			? ( getSpacing( marginMobile, 'bottom' ) || getSpacing( marginTablet, 'bottom' ) || getSpacing( margin, 'bottom' ) )
			: device === 'tablet'
			? ( getSpacing( marginTablet, 'bottom' ) || getSpacing( margin, 'bottom' ) )
			: getSpacing( margin, 'bottom' );

	const activeMarginLeft =
		device === 'mobile'
			? ( getSpacing( marginMobile, 'left' ) || getSpacing( marginTablet, 'left' ) || getSpacing( margin, 'left' ) )
			: device === 'tablet'
			? ( getSpacing( marginTablet, 'left' ) || getSpacing( margin, 'left' ) )
			: getSpacing( margin, 'left' );

	const activePaddingTop =
		device === 'mobile'
			? ( getSpacing( paddingMobile, 'top' ) || getSpacing( paddingTablet, 'top' ) || getSpacing( padding, 'top' ) || '6px' )
			: device === 'tablet'
			? ( getSpacing( paddingTablet, 'top' ) || getSpacing( padding, 'top' ) || '6px' )
			: ( getSpacing( padding, 'top' ) || '6px' );

	const activePaddingRight =
		device === 'mobile'
			? ( getSpacing( paddingMobile, 'right' ) || getSpacing( paddingTablet, 'right' ) || getSpacing( padding, 'right' ) || '16px' )
			: device === 'tablet'
			? ( getSpacing( paddingTablet, 'right' ) || getSpacing( padding, 'right' ) || '16px' )
			: ( getSpacing( padding, 'right' ) || '16px' );

	const activePaddingBottom =
		device === 'mobile'
			? ( getSpacing( paddingMobile, 'bottom' ) || getSpacing( paddingTablet, 'bottom' ) || getSpacing( padding, 'bottom' ) || '6px' )
			: device === 'tablet'
			? ( getSpacing( paddingTablet, 'bottom' ) || getSpacing( padding, 'bottom' ) || '6px' )
			: ( getSpacing( padding, 'bottom' ) || '6px' );

	const activePaddingLeft =
		device === 'mobile'
			? ( getSpacing( paddingMobile, 'left' ) || getSpacing( paddingTablet, 'left' ) || getSpacing( padding, 'left' ) || '12px' )
			: device === 'tablet'
			? ( getSpacing( paddingTablet, 'left' ) || getSpacing( padding, 'left' ) || '12px' )
			: ( getSpacing( padding, 'left' ) || '12px' );

	const blockProps = useBlockProps( {
		id: anchor || undefined,
		className: [
			'gravisain-badge-wrapper',
			`align-${ alignment || 'left' }`,
			alignmentTablet ? `align-tablet-${ alignmentTablet }` : '',
			alignmentMobile ? `align-mobile-${ alignmentMobile }` : '',
			customClassName || '',
		].filter( Boolean ).join( ' ' ),
		style: {
			display: 'flex',
			width: '100%',
			justifyContent: getFlexJustify( activeAlignment ),
			'--gravisain-badge-justify': getFlexJustify( activeAlignment ),
			'--gravisain-badge-justify-tablet': alignmentTablet ? getFlexJustify( alignmentTablet ) : undefined,
			'--gravisain-badge-justify-mobile': alignmentMobile ? getFlexJustify( alignmentMobile ) : undefined,
			'--gravisain-badge-mt': getSpacing( margin, 'top' ),
			'--gravisain-badge-mr': getSpacing( margin, 'right' ),
			'--gravisain-badge-mb': getSpacing( margin, 'bottom' ),
			'--gravisain-badge-ml': getSpacing( margin, 'left' ),
			'--gravisain-badge-mt-tablet': getSpacing( marginTablet, 'top' ),
			'--gravisain-badge-mr-tablet': getSpacing( marginTablet, 'right' ),
			'--gravisain-badge-mb-tablet': getSpacing( marginTablet, 'bottom' ),
			'--gravisain-badge-ml-tablet': getSpacing( marginTablet, 'left' ),
			'--gravisain-badge-mt-mobile': getSpacing( marginMobile, 'top' ),
			'--gravisain-badge-mr-mobile': getSpacing( marginMobile, 'right' ),
			'--gravisain-badge-mb-mobile': getSpacing( marginMobile, 'bottom' ),
			'--gravisain-badge-ml-mobile': getSpacing( marginMobile, 'left' ),
			marginTop: activeMarginTop,
			marginRight: activeMarginRight,
			marginBottom: activeMarginBottom,
			marginLeft: activeMarginLeft,
			...parseCustomCSS( customCSS ),
		},
	} );

	const pillStyle = {
		fontFamily: cleanFontFamily( fontFamily ),
		fontSize: activeFontSize ? `${ activeFontSize }px` : undefined,
		fontWeight: fontWeight || '600',
		fontStyle: fontStyle !== 'normal' ? fontStyle : undefined,
		lineHeight: lineHeight || '1.4',
		letterSpacing: getTypographyVar( letterSpacing, true ),
		color: textColor || '#1e293b',
		backgroundColor: backgroundColor || '#ffffff',
		borderWidth: borderWidth ? `${ borderWidth }px` : 0,
		borderStyle: borderWidth ? borderStyle : 'none',
		borderColor: borderWidth ? borderColor : 'transparent',
		borderRadius: `${ borderRadius !== undefined ? borderRadius : 9999 }px`,
		boxShadow: hasShadow
			? '0 1px 3px 0 rgba(0, 0, 0, 0.06), 0 1px 2px -1px rgba(0, 0, 0, 0.04)'
			: 'none',
		paddingTop: activePaddingTop,
		paddingRight: activePaddingRight,
		paddingBottom: activePaddingBottom,
		paddingLeft: activePaddingLeft,
		'--gravisain-badge-pt-tablet': getSpacing( paddingTablet, 'top' ),
		'--gravisain-badge-pr-tablet': getSpacing( paddingTablet, 'right' ),
		'--gravisain-badge-pb-tablet': getSpacing( paddingTablet, 'bottom' ),
		'--gravisain-badge-pl-tablet': getSpacing( paddingTablet, 'left' ),
		'--gravisain-badge-pt-mobile': getSpacing( paddingMobile, 'top' ),
		'--gravisain-badge-pr-mobile': getSpacing( paddingMobile, 'right' ),
		'--gravisain-badge-pb-mobile': getSpacing( paddingMobile, 'bottom' ),
		'--gravisain-badge-pl-mobile': getSpacing( paddingMobile, 'left' ),
		'--gravisain-badge-fs-tablet': getTypographyVar( fontSizeTablet, true ),
		'--gravisain-badge-fs-mobile': getTypographyVar( fontSizeMobile, true ),
		'--badge-dot-color': dotColor || '#10b981',
		'--badge-dot-size': `${ dotSize || 8 }px`,
		'--badge-dot-speed': `${ dotPulseSpeed || 1.8 }s`,
	};

	return (
		<>
			<BlockControls>
				<AlignmentToolbar
					value={ alignment }
					onChange={ ( val ) => setAttributes( { alignment: val || 'left' } ) }
				/>
			</BlockControls>
			<Inspector
				{ ...props }
				device={ device }
				setDevice={ setDevice }
				onDeviceChange={ setDevice }
			/>
			<div { ...blockProps }>
				<div className={ `gravisain-badge-pill ${ hasShadow ? 'has-shadow' : '' }` } style={ pillStyle }>
					{ showDot && (
						<span className={ `gravisain-badge-dot-wrapper ${ dotPulse ? 'is-pulsing' : '' }` }>
							{ dotPulse && <span className="gravisain-badge-dot-ping" /> }
							<span className="gravisain-badge-dot" />
						</span>
					) }
					<RichText
						tagName="span"
						className="gravisain-badge-text"
						value={ text }
						onChange={ ( val ) => setAttributes( { text: val } ) }
						placeholder={ __( 'Badge text...', 'gravisain' ) }
						allowedFormats={ [ 'core/bold', 'core/italic', 'core/text-color' ] }
					/>
				</div>
			</div>
		</>
	);
}
