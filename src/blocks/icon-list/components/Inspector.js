import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, RangeControl, SelectControl, TextControl, TextareaControl, TabPanel, Button } from '@wordpress/components';
import ColorControl from '../../../controls/ColorControl';
import IconPickerControl from '../../../controls/IconPickerControl';
import SpacingControl from '../../../controls/SpacingControl';
import ResponsiveTabControl from '../../../controls/ResponsiveTabControl';
import ResponsiveAlignmentControl from '../../../controls/ResponsiveAlignmentControl';
import TypographyControl from '../../../controls/TypographyControl';

export default function Inspector( {
	attributes,
	setAttributes,
	selectedItemIndex = 0,
	setSelectedItemIndex,
	device,
	setDevice,
	onDeviceChange,
} ) {
	const getResponsiveAttr = ( attrName, currentDevice ) => {
		if ( currentDevice === 'tablet' ) {
			return attributes[ `${ attrName }Tablet` ];
		}
		if ( currentDevice === 'mobile' ) {
			return attributes[ `${ attrName }Mobile` ];
		}
		return attributes[ attrName ];
	};

	const setResponsiveAttr = ( attrName, val, currentDevice ) => {
		if ( currentDevice === 'tablet' ) {
			setAttributes( { [ `${ attrName }Tablet` ]: val } );
		} else if ( currentDevice === 'mobile' ) {
			setAttributes( { [ `${ attrName }Mobile` ]: val } );
		} else {
			setAttributes( { [ attrName ]: val } );
		}
	};
	const {
		items = [],
		layout,
		alignment = 'left',
		alignmentTablet = '',
		alignmentMobile = '',
		itemGap,
		defaultIcon = 'check',
		iconSize,
		iconColor,
		iconBackground,
		iconPadding = 0,
		iconRadius = 0,
		textColor,
		fontFamily,
		fontWeight,
		fontStyle,
		fontSize,
		fontSizeTablet,
		fontSizeMobile,
		lineHeight,
		lineHeightTablet,
		lineHeightMobile,
		letterSpacing,
		letterSpacingTablet,
		letterSpacingMobile,
		anchor,
		customClassName,
		customCSS,
	} = attributes;

	const safeIndex = selectedItemIndex >= 0 && selectedItemIndex < items.length ? selectedItemIndex : 0;
	const currentItem = items[ safeIndex ] || null;

	const updateItem = ( index, field, val ) => {
		const newItems = [ ...items ];
		if ( ! newItems[ index ] ) return;
		newItems[ index ] = { ...newItems[ index ], [ field ]: val };
		setAttributes( { items: newItems } );
	};

	const applyDefaultIconToAll = () => {
		const newItems = items.map( ( item ) => ( { ...item, icon: defaultIcon || 'check' } ) );
		setAttributes( { items: newItems } );
	};

	const resetCurrentItem = () => {
		if ( ! currentItem ) return;
		updateItem( safeIndex, 'icon', '' );
		updateItem( safeIndex, 'color', '' );
		updateItem( safeIndex, 'background', '' );
	};

	const removeItem = ( index ) => {
		const newItems = items.filter( ( _, idx ) => idx !== index );
		setAttributes( { items: newItems } );
		if ( setSelectedItemIndex ) {
			setSelectedItemIndex( Math.max( 0, index - 1 ) );
		}
	};

	const addItem = () => {
		const newId = items.length > 0 ? Math.max( ...items.map( ( i ) => i.id || 0 ) ) + 1 : 1;
		const newItem = {
			id: newId,
			text: __( 'New list item', 'gravisain' ),
			icon: defaultIcon || 'check',
			color: '',
			background: '',
		};
		setAttributes( { items: [ ...items, newItem ] } );
		if ( setSelectedItemIndex ) {
			setSelectedItemIndex( items.length );
		}
	};

	return (
		<InspectorControls>
			<TabPanel
				className="gravisain-inspector-tabs"
				activeClass="active-tab"
				tabs={ [
					{ name: 'general', title: __( 'General', 'gravisain' ), className: 'gravisain-tab-general' },
					{ name: 'style', title: __( 'Style', 'gravisain' ), className: 'gravisain-tab-style' },
					{ name: 'advanced', title: __( 'Advanced', 'gravisain' ), className: 'gravisain-tab-advanced' },
				] }
			>
				{ ( tab ) => (
					<div className="gravisain-tab-content">
						{ tab.name === 'general' && (
							<>
								<PanelBody title={ __( 'Layout & Sizing', 'gravisain' ) } initialOpen={ true }>
									<SelectControl
										label={ __( 'List Layout', 'gravisain' ) }
										value={ layout }
										options={ [
											{ label: __( 'Vertical Stack', 'gravisain' ), value: 'vertical' },
											{ label: __( 'Horizontal Inline', 'gravisain' ), value: 'horizontal' },
										] }
										onChange={ ( val ) => setAttributes( { layout: val } ) }
									/>
									<ResponsiveAlignmentControl
										device={ device }
										setDevice={ setDevice }
										onDeviceChange={ onDeviceChange }
										textAlign={ alignment }
										textAlignTablet={ alignmentTablet }
										textAlignMobile={ alignmentMobile }
										onChangeDesktop={ ( val ) => setAttributes( { alignment: val } ) }
										onChangeTablet={ ( val ) => setAttributes( { alignmentTablet: val } ) }
										onChangeMobile={ ( val ) => setAttributes( { alignmentMobile: val } ) }
										label={ __( 'Alignment', 'gravisain' ) }
									/>
									<RangeControl
										label={ __( 'Item Spacing (px)', 'gravisain' ) }
										value={ itemGap }
										onChange={ ( val ) => setAttributes( { itemGap: val } ) }
										min={ 0 }
										max={ 60 }
									/>
									<RangeControl
										label={ __( 'Default Icon Size (px)', 'gravisain' ) }
										value={ iconSize }
										onChange={ ( val ) => setAttributes( { iconSize: val } ) }
										min={ 12 }
										max={ 80 }
									/>
									<RangeControl
										label={ __( 'Text Font Size (px)', 'gravisain' ) }
										value={ fontSize }
										onChange={ ( val ) => setAttributes( { fontSize: val } ) }
										min={ 12 }
										max={ 60 }
									/>
								</PanelBody>

								{ /* GLOBAL DEFAULT ICON */ }
								<PanelBody title={ __( 'Global Default Icon', 'gravisain' ) } initialOpen={ false }>
									<IconPickerControl
										label={ __( 'Default Icon', 'gravisain' ) }
										value={ defaultIcon || 'check' }
										onChange={ ( val ) => setAttributes( { defaultIcon: val || 'check' } ) }
										help={ __( 'Applied to all items by default unless overridden.', 'gravisain' ) }
									/>
									<Button
										variant="secondary"
										isSmall
										onClick={ applyDefaultIconToAll }
										style={ { width: '100%', justifyContent: 'center', marginTop: '4px' } }
									>
										{ __( 'Apply Icon to All Existing Items', 'gravisain' ) }
									</Button>
								</PanelBody>

								{ /* INDIVIDUAL ITEM SETTINGS */ }
								<PanelBody title={ __( 'Individual Item Settings', 'gravisain' ) } initialOpen={ true }>
									{ items.length > 0 ? (
										<>
											<SelectControl
												label={ __( 'Select Item to Edit', 'gravisain' ) }
												value={ safeIndex }
												options={ items.map( ( itm, idx ) => ( {
													label: `${ idx + 1 }. ${ ( itm.text || __( 'Empty Item', 'gravisain' ) ).replace( /(<([^>]+)>)/gi, '' ).substring( 0, 24 ) }${ ( itm.text || '' ).length > 24 ? '...' : '' }`,
													value: idx,
												} ) ) }
												onChange={ ( val ) => setSelectedItemIndex && setSelectedItemIndex( parseInt( val, 10 ) ) }
											/>

											{ currentItem && (
												<div
													style={ {
														background: '#f8fafc',
														border: '1px solid #e2e8f0',
														borderRadius: '8px',
														padding: '12px',
														marginTop: '10px',
														marginBottom: '16px',
													} }
												>
													<div style={ { fontWeight: 600, fontSize: '13px', color: '#1e293b', marginBottom: '10px' } }>
														{ __( 'Custom Settings for Item', 'gravisain' ) } #{ safeIndex + 1 }
													</div>

													<TextControl
														label={ __( 'Item Text', 'gravisain' ) }
														value={ currentItem.text }
														onChange={ ( val ) => updateItem( safeIndex, 'text', val ) }
													/>

													<IconPickerControl
														label={ __( 'Item Icon Override', 'gravisain' ) }
														value={ currentItem.icon || defaultIcon || 'check' }
														onChange={ ( val ) => updateItem( safeIndex, 'icon', val ) }
														help={ __( 'Choose a custom icon specifically for this list item.', 'gravisain' ) }
													/>

													<ColorControl
														label={ __( 'Item Icon Color Override', 'gravisain' ) }
														value={ currentItem.color }
														onChange={ ( val ) => updateItem( safeIndex, 'color', val ) }
														help={ __( 'Overrides the global icon color for this item (supports solid & gradient).', 'gravisain' ) }
													/>

													<ColorControl
														label={ __( 'Item Icon Background Override', 'gravisain' ) }
														value={ currentItem.background }
														onChange={ ( val ) => updateItem( safeIndex, 'background', val ) }
														help={ __( 'Overrides the global icon background for this item (supports solid & gradient).', 'gravisain' ) }
													/>

													<div style={ { display: 'flex', gap: '8px', marginTop: '12px', paddingTop: '10px', borderTop: '1px solid #e2e8f0' } }>
														<Button
															variant="tertiary"
															isSmall
															onClick={ resetCurrentItem }
															style={ { fontSize: '11px' } }
														>
															{ __( 'Reset to Defaults', 'gravisain' ) }
														</Button>

														{ items.length > 1 && (
															<Button
																variant="secondary"
																isDestructive
																isSmall
																onClick={ () => removeItem( safeIndex ) }
																style={ { marginLeft: 'auto', fontSize: '11px' } }
															>
																{ __( 'Delete Item', 'gravisain' ) }
															</Button>
														) }
													</div>
												</div>
											) }
										</>
									) : (
										<p style={ { color: '#64748b', fontSize: '12px', margin: '8px 0' } }>
											{ __( 'No list items yet.', 'gravisain' ) }
										</p>
									) }

									<Button
										variant="secondary"
										icon="plus"
										onClick={ addItem }
										style={ { width: '100%', justifyContent: 'center', marginTop: '6px' } }
									>
										{ __( 'Add List Item', 'gravisain' ) }
									</Button>
								</PanelBody>
							</>
						) }

						{ tab.name === 'style' && (
							<>
								<PanelBody title={ __( 'Icon Styling (Global)', 'gravisain' ) } initialOpen={ true }>
									<ColorControl
										label={ __( 'Default Icon Color', 'gravisain' ) }
										value={ iconColor }
										onChange={ ( val ) => setAttributes( { iconColor: val } ) }
										help={ __( 'Choose solid color or gradient for icons.', 'gravisain' ) }
									/>
									<ColorControl
										label={ __( 'Default Icon Background', 'gravisain' ) }
										value={ iconBackground }
										onChange={ ( val ) => setAttributes( { iconBackground: val } ) }
										help={ __( 'Optional solid color or gradient background behind icons.', 'gravisain' ) }
									/>
									<RangeControl
										label={ __( 'Icon Background Padding (px)', 'gravisain' ) }
										value={ iconPadding }
										onChange={ ( val ) => setAttributes( { iconPadding: val } ) }
										min={ 0 }
										max={ 40 }
										help={ __( 'Adds spacing inside the icon background badge.', 'gravisain' ) }
									/>
									<RangeControl
										label={ __( 'Icon Border Radius (px)', 'gravisain' ) }
										value={ iconRadius }
										onChange={ ( val ) => setAttributes( { iconRadius: val } ) }
										min={ 0 }
										max={ 100 }
										help={ __( 'Set to 9999 for full circular badges.', 'gravisain' ) }
									/>
								</PanelBody>

								<PanelBody title={ __( 'Text Styling & Typography', 'gravisain' ) } initialOpen={ true }>
									<ColorControl
										label={ __( 'Text Color', 'gravisain' ) }
										value={ textColor }
										onChange={ ( val ) => setAttributes( { textColor: val } ) }
									/>
									<div style={ { marginTop: '16px' } }>
										<ResponsiveTabControl activeDevice={ device } onChangeDevice={ onDeviceChange }>
											{ ( currentDevice ) => (
												<TypographyControl
													label={ __( 'Typography', 'gravisain' ) }
													value={ {
														fontFamily,
														fontSize: getResponsiveAttr( 'fontSize', currentDevice ),
														fontWeight,
														fontStyle,
														lineHeight: getResponsiveAttr( 'lineHeight', currentDevice ),
														letterSpacing: getResponsiveAttr( 'letterSpacing', currentDevice ),
													} }
													onChange={ ( newVal ) => {
														if ( newVal.fontFamily !== fontFamily ) {
															setAttributes( { fontFamily: newVal.fontFamily } );
														}
														if ( newVal.fontWeight !== fontWeight ) {
															setAttributes( { fontWeight: newVal.fontWeight } );
														}
														if ( newVal.fontStyle !== fontStyle ) {
															setAttributes( { fontStyle: newVal.fontStyle } );
														}
														setResponsiveAttr( 'fontSize', newVal.fontSize !== undefined ? Number( newVal.fontSize ) : undefined, currentDevice );
														setResponsiveAttr( 'lineHeight', newVal.lineHeight !== undefined ? String( newVal.lineHeight ) : undefined, currentDevice );
														setResponsiveAttr( 'letterSpacing', newVal.letterSpacing !== undefined ? ( typeof newVal.letterSpacing === 'number' ? `${ newVal.letterSpacing }px` : newVal.letterSpacing ) : undefined, currentDevice );
													} }
												/>
											) }
										</ResponsiveTabControl>
									</div>
								</PanelBody>
							</>
						) }

						{ tab.name === 'advanced' && (
							<>
								<PanelBody title={ __( 'Spacing & Margin Controls', 'gravisain' ) } initialOpen={ true }>
									<ResponsiveTabControl>
										{ ( currentDevice ) => (
											<>
												<SpacingControl
													label={ __( 'Padding', 'gravisain' ) }
													value={ getResponsiveAttr( 'padding', currentDevice ) }
													onChange={ ( val ) => setResponsiveAttr( 'padding', val, currentDevice ) }
												/>
												<SpacingControl
													label={ __( 'Margin', 'gravisain' ) }
													value={ getResponsiveAttr( 'margin', currentDevice ) }
													onChange={ ( val ) => setResponsiveAttr( 'margin', val, currentDevice ) }
												/>
											</>
										) }
									</ResponsiveTabControl>
								</PanelBody>

								<PanelBody title={ __( 'Advanced Settings', 'gravisain' ) } initialOpen={ false }>
									<TextControl
										label={ __( 'HTML Anchor', 'gravisain' ) }
										help={ __( 'Enter a word or two — without spaces — to make a unique web address just for this block, called an "anchor". Then, you\'ll be able to link directly to this section of your page.', 'gravisain' ) }
										value={ anchor }
										onChange={ ( val ) => setAttributes( { anchor: val } ) }
									/>
									<TextControl
										label={ __( 'Additional CSS class(es)', 'gravisain' ) }
										help={ __( 'Separate multiple classes with spaces.', 'gravisain' ) }
										value={ customClassName }
										onChange={ ( val ) => setAttributes( { customClassName: val } ) }
									/>
									<TextareaControl
										label={ __( 'Additional CSS', 'gravisain' ) }
										help={ __( 'Add your own CSS to customize the appearance of this block. You do not need to include a CSS selector, just add the property and value, e.g. color: red;.', 'gravisain' ) }
										value={ customCSS }
										onChange={ ( val ) => setAttributes( { customCSS: val } ) }
										rows={ 4 }
									/>
								</PanelBody>
							</>
						) }
					</div>
				) }
			</TabPanel>
		</InspectorControls>
	);
}
