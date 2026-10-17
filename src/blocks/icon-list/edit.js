import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, BlockControls, AlignmentToolbar } from '@wordpress/block-editor';
import { Button, Tooltip } from '@wordpress/components';
import { useState, useEffect, useRef } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import Inspector from './components/Inspector';
import { getIconMarkup } from '../../controls/icons';
import useGoogleFont from '../../controls/useGoogleFont';
import parseCustomCSS from '../../controls/parseCustomCSS';
import './editor.scss';

const cleanFontFamily = ( fam ) => {
	if ( ! fam || fam === 'inherit' || fam === 'default' ) return undefined;
	if ( fam.includes( ',' ) ) return fam;
	return `'${ fam }', sans-serif`;
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

const TrashIcon = () => (
	<svg
		width="12"
		height="12"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2.2"
		strokeLinecap="round"
		strokeLinejoin="round"
		style={ { display: 'block' } }
	>
		<polyline points="3 6 5 6 21 6" />
		<path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
		<line x1="10" y1="11" x2="10" y2="17" />
		<line x1="14" y1="11" x2="14" y2="17" />
	</svg>
);

const EditIcon = () => (
	<svg
		width="12"
		height="12"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2.2"
		strokeLinecap="round"
		strokeLinejoin="round"
		style={ { display: 'block' } }
	>
		<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
		<path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
	</svg>
);

export default function Edit( props ) {
	const { attributes, setAttributes } = props;
	const {
		items = [],
		layout,
		alignment = 'left',
		alignmentTablet = '',
		alignmentMobile = '',
		itemGap = 12,
		defaultIcon = 'check',
		iconSize = 20,
		iconColor = '#10b981',
		iconBackground = '',
		iconPadding = 0,
		iconRadius = 0,
		textColor,
		fontFamily,
		fontWeight,
		fontStyle = 'normal',
		fontSize = 16,
		fontSizeTablet,
		fontSizeMobile,
		lineHeight,
		lineHeightTablet,
		lineHeightMobile,
		letterSpacing,
		letterSpacingTablet,
		letterSpacingMobile,
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

	const getSpacing = ( spacing, side ) => {
		if ( spacing === undefined || spacing === null || spacing === '' ) return undefined;
		if ( typeof spacing === 'string' || typeof spacing === 'number' ) {
			return typeof spacing === 'number' ? `${ spacing }px` : spacing;
		}
		const val = spacing[ side ];
		if ( typeof val === 'number' ) return `${ val }px`;
		return val || undefined;
	};

	const getActiveSpacing = ( side ) => {
		if ( device === 'mobile' ) {
			const mob = getSpacing( marginMobile, side );
			if ( mob !== undefined ) return mob;
			const tab = getSpacing( marginTablet, side );
			if ( tab !== undefined ) return tab;
			return getSpacing( margin, side );
		}
		if ( device === 'tablet' ) {
			const tab = getSpacing( marginTablet, side );
			if ( tab !== undefined ) return tab;
			return getSpacing( margin, side );
		}
		return getSpacing( margin, side );
	};

	const getActivePadding = ( side ) => {
		if ( device === 'mobile' ) {
			const mob = getSpacing( paddingMobile, side );
			if ( mob !== undefined ) return mob;
			const tab = getSpacing( paddingTablet, side );
			if ( tab !== undefined ) return tab;
			return getSpacing( padding, side );
		}
		if ( device === 'tablet' ) {
			const tab = getSpacing( paddingTablet, side );
			if ( tab !== undefined ) return tab;
			return getSpacing( padding, side );
		}
		return getSpacing( padding, side );
	};

	const activeMarginTop = getActiveSpacing( 'top' );
	const activeMarginBottom = getActiveSpacing( 'bottom' );
	const activeMarginLeft = getActiveSpacing( 'left' );
	const activeMarginRight = getActiveSpacing( 'right' );

	const activePaddingTop = getActivePadding( 'top' );
	const activePaddingBottom = getActivePadding( 'bottom' );
	const activePaddingLeft = getActivePadding( 'left' );
	const activePaddingRight = getActivePadding( 'right' );

	const blockRef = useRef( null );

	useEffect( () => {
		if ( ! blockRef.current ) return;
		const el = blockRef.current;
		const wrapper = el.closest( '.wp-block' ) || el;

		const applyProp = ( node, prop, val ) => {
			if ( val !== undefined && val !== null && val !== '' ) {
				const finalVal = typeof val === 'number' ? `${ val }px` : ( ! isNaN( val ) && String( val ).trim() !== '' ? `${ val }px` : String( val ) );
				node.style.setProperty( prop, finalVal, 'important' );
			} else {
				node.style.removeProperty( prop );
			}
		};

		[ el, wrapper ].forEach( ( node ) => {
			applyProp( node, 'padding-top', activePaddingTop );
			applyProp( node, 'padding-bottom', activePaddingBottom );
			applyProp( node, 'padding-left', activePaddingLeft );
			applyProp( node, 'padding-right', activePaddingRight );

			applyProp( node, 'margin-top', activeMarginTop );
			applyProp( node, 'margin-block-start', activeMarginTop );
			applyProp( node, 'margin-bottom', activeMarginBottom );
			applyProp( node, 'margin-block-end', activeMarginBottom );
			applyProp( node, 'margin-left', activeMarginLeft );
			applyProp( node, 'margin-right', activeMarginRight );
		} );
	}, [ activeMarginTop, activeMarginBottom, activeMarginLeft, activeMarginRight, activePaddingTop, activePaddingBottom, activePaddingLeft, activePaddingRight ] );

	const [ selectedItemIndex, setSelectedItemIndex ] = useState( 0 );

	const updateItem = ( index, field, val ) => {
		const newItems = [ ...items ];
		if ( ! newItems[ index ] ) return;
		newItems[ index ] = { ...newItems[ index ], [ field ]: val };
		setAttributes( { items: newItems } );
	};

	const addItem = () => {
		const newId = items.length > 0 ? Math.max( ...items.map( ( i ) => i.id || 0 ) ) + 1 : 1;
		setAttributes( {
			items: [
				...items,
				{
					id: newId,
					text: __( 'New list item', 'gravisain' ),
					icon: defaultIcon || 'check',
					color: '',
					background: '',
				},
			],
		} );
		setSelectedItemIndex( items.length );
	};

	const removeItem = ( index ) => {
		const newItems = items.filter( ( _, idx ) => idx !== index );
		setAttributes( { items: newItems } );
		setSelectedItemIndex( Math.max( 0, index - 1 ) );
	};

	const activeAlignment =
		device === 'mobile'
			? ( alignmentMobile || alignmentTablet || alignment || 'left' )
			: device === 'tablet'
			? ( alignmentTablet || alignment || 'left' )
			: ( alignment || 'left' );

	const getFlexAlign = ( align ) => {
		if ( align === 'center' ) return 'center';
		if ( align === 'right' ) return 'flex-end';
		return 'flex-start';
	};

	const activeFontSize =
		device === 'mobile'
			? ( fontSizeMobile !== undefined ? fontSizeMobile : ( fontSizeTablet !== undefined ? fontSizeTablet : fontSize ) )
			: device === 'tablet'
			? ( fontSizeTablet !== undefined ? fontSizeTablet : fontSize )
			: fontSize;

	const activeLineHeight =
		device === 'mobile'
			? ( lineHeightMobile || lineHeightTablet || lineHeight )
			: device === 'tablet'
			? ( lineHeightTablet || lineHeight )
			: lineHeight;

	const activeLetterSpacing =
		device === 'mobile'
			? ( letterSpacingMobile || letterSpacingTablet || letterSpacing )
			: device === 'tablet'
			? ( letterSpacingTablet || letterSpacing )
			: letterSpacing;

	const blockProps = useBlockProps( {
		id: anchor || undefined,
		className: [
			'gravisain-icon-list',
			`layout-${ layout || 'vertical' }`,
			`align-${ alignment || 'left' }`,
			alignmentTablet ? `align-tablet-${ alignmentTablet }` : '',
			alignmentMobile ? `align-mobile-${ alignmentMobile }` : '',
			customClassName || '',
		].filter( Boolean ).join( ' ' ),
		style: {
			'--gravisain-list-gap': `${ itemGap }px`,
			'--gravisain-list-icon-size': `${ iconSize }px`,
			'--gravisain-list-icon-color': iconColor || '#10b981',
			'--gravisain-list-icon-bg': iconBackground || 'transparent',
			'--gravisain-list-icon-padding': `${ iconPadding || 0 }px`,
			'--gravisain-list-icon-radius': `${ iconRadius || 0 }px`,
			'--gravisain-list-font-family': cleanFontFamily( fontFamily ),
			'--gravisain-list-font-weight': fontWeight || undefined,
			'--gravisain-list-font-style': fontStyle && fontStyle !== 'normal' ? fontStyle : undefined,
			'--gravisain-list-font-size': activeFontSize ? `${ activeFontSize }px` : undefined,
			'--gravisain-list-line-height': getTypographyVar( activeLineHeight, false ),
			'--gravisain-list-letter-spacing': getTypographyVar( activeLetterSpacing, true ),
			'--gravisain-list-font-size-tablet': getTypographyVar( fontSizeTablet, true ),
			'--gravisain-list-font-size-mobile': getTypographyVar( fontSizeMobile, true ),
			'--gravisain-list-line-height-tablet': getTypographyVar( lineHeightTablet, false ),
			'--gravisain-list-line-height-mobile': getTypographyVar( lineHeightMobile, false ),
			'--gravisain-list-letter-spacing-tablet': getTypographyVar( letterSpacingTablet, true ),
			'--gravisain-list-letter-spacing-mobile': getTypographyVar( letterSpacingMobile, true ),
			'--gravisain-list-justify': getFlexAlign( activeAlignment ),
			'--gravisain-list-align': getFlexAlign( activeAlignment ),
			'--gravisain-list-text-align': activeAlignment,
			'--gravisain-list-justify-tablet': alignmentTablet ? getFlexAlign( alignmentTablet ) : undefined,
			'--gravisain-list-align-tablet': alignmentTablet ? getFlexAlign( alignmentTablet ) : undefined,
			'--gravisain-list-justify-mobile': alignmentMobile ? getFlexAlign( alignmentMobile ) : undefined,
			'--gravisain-list-align-mobile': alignmentMobile ? getFlexAlign( alignmentMobile ) : undefined,
			'--gravisain-icon-list-padding-top': getSpacing( padding, 'top' ),
			'--gravisain-icon-list-padding-right': getSpacing( padding, 'right' ),
			'--gravisain-icon-list-padding-bottom': getSpacing( padding, 'bottom' ),
			'--gravisain-icon-list-padding-left': getSpacing( padding, 'left' ),
			'--gravisain-icon-list-margin-top': getSpacing( margin, 'top' ),
			'--gravisain-icon-list-margin-right': getSpacing( margin, 'right' ),
			'--gravisain-icon-list-margin-bottom': getSpacing( margin, 'bottom' ),
			'--gravisain-icon-list-margin-left': getSpacing( margin, 'left' ),
			'--gravisain-icon-list-padding-top-tablet': getSpacing( paddingTablet, 'top' ),
			'--gravisain-icon-list-padding-right-tablet': getSpacing( paddingTablet, 'right' ),
			'--gravisain-icon-list-padding-bottom-tablet': getSpacing( paddingTablet, 'bottom' ),
			'--gravisain-icon-list-padding-left-tablet': getSpacing( paddingTablet, 'left' ),
			'--gravisain-icon-list-margin-top-tablet': getSpacing( marginTablet, 'top' ),
			'--gravisain-icon-list-margin-right-tablet': getSpacing( marginTablet, 'right' ),
			'--gravisain-icon-list-margin-bottom-tablet': getSpacing( marginTablet, 'bottom' ),
			'--gravisain-icon-list-margin-left-tablet': getSpacing( marginTablet, 'left' ),
			'--gravisain-icon-list-padding-top-mobile': getSpacing( paddingMobile, 'top' ),
			'--gravisain-icon-list-padding-right-mobile': getSpacing( paddingMobile, 'right' ),
			'--gravisain-icon-list-padding-bottom-mobile': getSpacing( paddingMobile, 'bottom' ),
			'--gravisain-icon-list-padding-left-mobile': getSpacing( paddingMobile, 'left' ),
			'--gravisain-icon-list-margin-top-mobile': getSpacing( marginMobile, 'top' ),
			'--gravisain-icon-list-margin-right-mobile': getSpacing( marginMobile, 'right' ),
			'--gravisain-icon-list-margin-bottom-mobile': getSpacing( marginMobile, 'bottom' ),
			'--gravisain-icon-list-margin-left-mobile': getSpacing( marginMobile, 'left' ),
			marginTop: activeMarginTop,
			marginBottom: activeMarginBottom,
			marginLeft: activeMarginLeft,
			marginRight: activeMarginRight,
			paddingTop: activePaddingTop,
			paddingBottom: activePaddingBottom,
			paddingLeft: activePaddingLeft,
			paddingRight: activePaddingRight,
			color: textColor || undefined,
			...parseCustomCSS( customCSS ),
		},
	} );

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
				selectedItemIndex={ selectedItemIndex }
				setSelectedItemIndex={ setSelectedItemIndex }
			/>
			<div ref={ blockRef } { ...blockProps }>
				<ul className="gravisain-icon-list-items">
					{ items.map( ( item, index ) => {
						const activeIcon = item.icon || defaultIcon || 'check';
						const iconData = getIconMarkup( activeIcon, defaultIcon || 'check' );
						const isSelected = selectedItemIndex === index;

						const itemBg = item.background || ( iconBackground ? iconBackground : undefined );
						const itemColor = item.color || ( iconColor ? iconColor : '#10b981' );

						return (
							<li
								key={ item.id || index }
								className={ `gravisain-icon-list-item ${ isSelected ? 'is-selected-item' : '' }` }
								onClick={ () => setSelectedItemIndex( index ) }
							>
								<span
									className="gravisain-list-icon"
									style={ {
										color: itemColor,
										background: itemBg,
										padding: iconPadding ? `${ iconPadding }px` : undefined,
										borderRadius: iconRadius ? `${ iconRadius }px` : undefined,
										cursor: 'pointer',
									} }
									title={ __( 'Click to edit this icon in settings', 'gravisain' ) }
								>
									{ iconData && iconData.type === 'image' ? (
										<img src={ iconData.src } alt="" />
									) : iconData && iconData.type === 'svg' ? (
										<span dangerouslySetInnerHTML={ { __html: iconData.content } } style={ { width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' } } />
									) : (
										<span className="dashicons dashicons-yes" />
									) }
								</span>

								<RichText
									tagName="span"
									className="gravisain-list-text"
									value={ item.text }
									onChange={ ( val ) => updateItem( index, 'text', val ) }
									placeholder={ __( 'List item text...', 'gravisain' ) }
								/>

								<div className="gravisain-item-actions">
									<Tooltip text={ __( 'Edit item settings', 'gravisain' ) }>
										<Button
											className="gravisain-action-btn gravisain-edit-item-btn"
											isSmall
											icon={ <EditIcon /> }
											onClick={ ( e ) => {
												e.stopPropagation();
												setSelectedItemIndex( index );
											} }
											aria-label={ __( 'Edit item settings', 'gravisain' ) }
										/>
									</Tooltip>
									{ items.length > 1 && (
										<Tooltip text={ __( 'Remove item', 'gravisain' ) }>
											<Button
												className="gravisain-action-btn gravisain-remove-item-btn"
												isSmall
												isDestructive
												icon={ <TrashIcon /> }
												onClick={ ( e ) => {
													e.stopPropagation();
													removeItem( index );
												} }
												aria-label={ __( 'Remove item', 'gravisain' ) }
											/>
										</Tooltip>
									) }
								</div>
							</li>
						);
					} ) }
				</ul>

				<div className="gravisain-icon-list-add">
					<Button variant="secondary" onClick={ addItem } icon="plus">
						{ __( 'Add List Item', 'gravisain' ) }
					</Button>
				</div>
			</div>
		</>
	);
}
