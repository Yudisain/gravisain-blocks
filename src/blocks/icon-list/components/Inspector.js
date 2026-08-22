import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, RangeControl, SelectControl, TextControl, TextareaControl, TabPanel, Button } from '@wordpress/components';
import ColorControl from '../../../controls/ColorControl';
import IconPickerControl from '../../../controls/IconPickerControl';

export default function Inspector( { attributes, setAttributes } ) {
	const {
		items,
		layout,
		itemGap,
		iconSize,
		iconColor,
		textColor,
		fontSize,
		anchor,
		customClassName,
		customCSS,
	} = attributes;

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

								<PanelBody title={ __( 'Global Default Icon', 'gravisain' ) } initialOpen={ false }>
									<IconPickerControl
										label={ __( 'Apply Icon to All Items', 'gravisain' ) }
										value={ '' }
										onChange={ ( val ) => {
											if ( ! val ) return;
											const newItems = items.map( ( item ) => ( { ...item, icon: val } ) );
											setAttributes( { items: newItems } );
										} }
									/>
								</PanelBody>
							</>
						) }

						{ tab.name === 'style' && (
							<PanelBody title={ __( 'Colors', 'gravisain' ) } initialOpen={ true }>
								<ColorControl
									label={ __( 'Default Icon Color', 'gravisain' ) }
									value={ iconColor }
									onChange={ ( val ) => setAttributes( { iconColor: val } ) }
									disableGradient={ true }
								/>
								<ColorControl
									label={ __( 'Text Color', 'gravisain' ) }
									value={ textColor }
									onChange={ ( val ) => setAttributes( { textColor: val } ) }
								/>
							</PanelBody>
						) }

						{ tab.name === 'advanced' && (
							<PanelBody title={ __( 'Advanced Settings', 'gravisain' ) } initialOpen={ true }>
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
						) }
					</div>
				) }
			</TabPanel>
		</InspectorControls>
	);
}
