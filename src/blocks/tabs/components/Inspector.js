import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, RangeControl, SelectControl, TextControl, TextareaControl, TabPanel } from '@wordpress/components';
import ColorControl from '../../../controls/ColorControl';

export default function Inspector( { attributes, setAttributes } ) {
	const {
		layout,
		tabAlignment,
		headerBackgroundColor,
		activeTabColor,
		activeTabTextColor,
		tabTextColor,
		contentBackgroundColor,
		contentPadding,
		borderRadius,
		borderWidth,
		borderColor,
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
							<PanelBody title={ __( 'Tabs Layout & Spacing', 'gravisain' ) } initialOpen={ true }>
								<SelectControl
									label={ __( 'Header Layout', 'gravisain' ) }
									value={ layout }
									options={ [
										{ label: __( 'Horizontal Tabs', 'gravisain' ), value: 'horizontal' },
										{ label: __( 'Vertical Tabs', 'gravisain' ), value: 'vertical' },
									] }
									onChange={ ( val ) => {
										const newAttrs = { layout: val };
										if ( val === 'vertical' && ( tabAlignment === 'left' || ! tabAlignment ) ) {
											newAttrs.tabAlignment = 'top';
										} else if ( val === 'vertical' && tabAlignment === 'right' ) {
											newAttrs.tabAlignment = 'bottom';
										} else if ( val === 'horizontal' && ( tabAlignment === 'top' || ! tabAlignment ) ) {
											newAttrs.tabAlignment = 'left';
										} else if ( val === 'horizontal' && tabAlignment === 'bottom' ) {
											newAttrs.tabAlignment = 'right';
										}
										setAttributes( newAttrs );
									} }
								/>
								<SelectControl
									label={ __( 'Tab Header Alignment', 'gravisain' ) }
									value={
										layout === 'vertical'
											? ( tabAlignment === 'left' ? 'top' : tabAlignment === 'right' ? 'bottom' : tabAlignment || 'top' )
											: ( tabAlignment === 'top' ? 'left' : tabAlignment === 'bottom' ? 'right' : tabAlignment || 'left' )
									}
									options={
										layout === 'vertical'
											? [
												{ label: __( 'Top', 'gravisain' ), value: 'top' },
												{ label: __( 'Center', 'gravisain' ), value: 'center' },
												{ label: __( 'Bottom', 'gravisain' ), value: 'bottom' },
											]
											: [
												{ label: __( 'Left', 'gravisain' ), value: 'left' },
												{ label: __( 'Center', 'gravisain' ), value: 'center' },
												{ label: __( 'Right', 'gravisain' ), value: 'right' },
											]
									}
									onChange={ ( val ) => setAttributes( { tabAlignment: val } ) }
								/>
								<RangeControl
									label={ __( 'Content Padding (px)', 'gravisain' ) }
									value={ contentPadding }
									onChange={ ( val ) => setAttributes( { contentPadding: val } ) }
									min={ 0 }
									max={ 80 }
								/>
								<RangeControl
									label={ __( 'Border Radius (px)', 'gravisain' ) }
									value={ borderRadius }
									onChange={ ( val ) => setAttributes( { borderRadius: val } ) }
									min={ 0 }
									max={ 40 }
								/>
								<RangeControl
									label={ __( 'Border Width (px)', 'gravisain' ) }
									value={ borderWidth }
									onChange={ ( val ) => setAttributes( { borderWidth: val } ) }
									min={ 0 }
									max={ 10 }
								/>
							</PanelBody>
						) }

						{ tab.name === 'style' && (
							<PanelBody title={ __( 'Colors', 'gravisain' ) } initialOpen={ true }>
								<ColorControl
									label={ __( 'Header Background', 'gravisain' ) }
									value={ headerBackgroundColor }
									onChange={ ( val ) => setAttributes( { headerBackgroundColor: val } ) }
								/>
								<ColorControl
									label={ __( 'Active Tab Background', 'gravisain' ) }
									value={ activeTabColor }
									onChange={ ( val ) => setAttributes( { activeTabColor: val } ) }
									disableGradient={ true }
								/>
								<ColorControl
									label={ __( 'Active Tab Text Color', 'gravisain' ) }
									value={ activeTabTextColor }
									onChange={ ( val ) => setAttributes( { activeTabTextColor: val } ) }
									disableGradient={ true }
								/>
								<ColorControl
									label={ __( 'Inactive Tab Text Color', 'gravisain' ) }
									value={ tabTextColor }
									onChange={ ( val ) => setAttributes( { tabTextColor: val } ) }
									disableGradient={ true }
								/>
								<ColorControl
									label={ __( 'Content Area Background', 'gravisain' ) }
									value={ contentBackgroundColor }
									onChange={ ( val ) => setAttributes( { contentBackgroundColor: val } ) }
								/>
								<ColorControl
									label={ __( 'Border Color', 'gravisain' ) }
									value={ borderColor }
									onChange={ ( val ) => setAttributes( { borderColor: val } ) }
									disableGradient={ true }
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
