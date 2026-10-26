import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, RangeControl, SelectControl, TextControl, TextareaControl, TabPanel } from '@wordpress/components';
import ColorControl from '../../../controls/ColorControl';
import ResponsiveTabControl from '../../../controls/ResponsiveTabControl';

export default function Inspector( { attributes, setAttributes } ) {
	const {
		startNumber,
		endNumber,
		prefix,
		suffix,
		duration,
		decimalPlaces,
		numberFontSize,
		titleFontSize,
		numberColor,
		titleColor,
		alignment,
		alignmentTablet,
		alignmentMobile,
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
					{ name: 'general', title: __( 'General', 'gravisain-blocks' ), className: 'gravisain-tab-general' },
					{ name: 'style', title: __( 'Style', 'gravisain-blocks' ), className: 'gravisain-tab-style' },
					{ name: 'advanced', title: __( 'Advanced', 'gravisain-blocks' ), className: 'gravisain-tab-advanced' },
				] }
			>
				{ ( tab ) => (
					<div className="gravisain-tab-content">
						{ tab.name === 'general' && (
							<PanelBody title={ __( 'Counter Value & Animation', 'gravisain-blocks' ) } initialOpen={ true }>
								<TextControl
									label={ __( 'Start Number', 'gravisain-blocks' ) }
									type="number"
									value={ startNumber }
									onChange={ ( val ) => setAttributes( { startNumber: parseFloat( val ) || 0 } ) }
								/>
								<TextControl
									label={ __( 'End Number (Target)', 'gravisain-blocks' ) }
									type="number"
									value={ endNumber }
									onChange={ ( val ) => setAttributes( { endNumber: parseFloat( val ) || 0 } ) }
								/>
								<TextControl
									label={ __( 'Number Prefix', 'gravisain-blocks' ) }
									value={ prefix }
									onChange={ ( val ) => setAttributes( { prefix: val } ) }
									placeholder="$ or #"
								/>
								<TextControl
									label={ __( 'Number Suffix', 'gravisain-blocks' ) }
									value={ suffix }
									onChange={ ( val ) => setAttributes( { suffix: val } ) }
									placeholder="+ or %"
								/>
								<RangeControl
									label={ __( 'Animation Duration (seconds)', 'gravisain-blocks' ) }
									value={ duration }
									onChange={ ( val ) => setAttributes( { duration: val } ) }
									min={ 0.5 }
									max={ 10 }
									step={ 0.5 }
								/>
								<RangeControl
									label={ __( 'Decimal Places', 'gravisain-blocks' ) }
									value={ decimalPlaces }
									onChange={ ( val ) => setAttributes( { decimalPlaces: val } ) }
									min={ 0 }
									max={ 4 }
								/>

								<ResponsiveTabControl>
									{ ( device ) => {
										if ( device === 'tablet' ) {
											return (
												<SelectControl
													label={ __( 'Tablet Alignment', 'gravisain-blocks' ) }
													value={ alignmentTablet }
													options={ [
														{ label: __( 'Inherit', 'gravisain-blocks' ), value: '' },
														{ label: __( 'Left', 'gravisain-blocks' ), value: 'left' },
														{ label: __( 'Center', 'gravisain-blocks' ), value: 'center' },
														{ label: __( 'Right', 'gravisain-blocks' ), value: 'right' },
													] }
													onChange={ ( val ) => setAttributes( { alignmentTablet: val } ) }
												/>
											);
										}
										if ( device === 'mobile' ) {
											return (
												<SelectControl
													label={ __( 'Mobile Alignment', 'gravisain-blocks' ) }
													value={ alignmentMobile }
													options={ [
														{ label: __( 'Inherit', 'gravisain-blocks' ), value: '' },
														{ label: __( 'Left', 'gravisain-blocks' ), value: 'left' },
														{ label: __( 'Center', 'gravisain-blocks' ), value: 'center' },
														{ label: __( 'Right', 'gravisain-blocks' ), value: 'right' },
													] }
													onChange={ ( val ) => setAttributes( { alignmentMobile: val } ) }
												/>
											);
										}
										return (
											<SelectControl
												label={ __( 'Desktop Alignment', 'gravisain-blocks' ) }
												value={ alignment }
												options={ [
													{ label: __( 'Left', 'gravisain-blocks' ), value: 'left' },
													{ label: __( 'Center', 'gravisain-blocks' ), value: 'center' },
													{ label: __( 'Right', 'gravisain-blocks' ), value: 'right' },
												] }
												onChange={ ( val ) => setAttributes( { alignment: val } ) }
											/>
										);
									} }
								</ResponsiveTabControl>
							</PanelBody>
						) }

						{ tab.name === 'style' && (
							<PanelBody title={ __( 'Typography & Colors', 'gravisain-blocks' ) } initialOpen={ true }>
								<RangeControl
									label={ __( 'Number Font Size (px)', 'gravisain-blocks' ) }
									value={ numberFontSize }
									onChange={ ( val ) => setAttributes( { numberFontSize: val } ) }
									min={ 16 }
									max={ 100 }
								/>
								<RangeControl
									label={ __( 'Title Font Size (px)', 'gravisain-blocks' ) }
									value={ titleFontSize }
									onChange={ ( val ) => setAttributes( { titleFontSize: val } ) }
									min={ 12 }
									max={ 48 }
								/>
								<ColorControl
									label={ __( 'Number Color', 'gravisain-blocks' ) }
									value={ numberColor }
									onChange={ ( val ) => setAttributes( { numberColor: val } ) }
									disableGradient={ true }
								/>
								<ColorControl
									label={ __( 'Title Text Color', 'gravisain-blocks' ) }
									value={ titleColor }
									onChange={ ( val ) => setAttributes( { titleColor: val } ) }
									disableGradient={ true }
								/>
							</PanelBody>
						) }

						{ tab.name === 'advanced' && (
							<PanelBody title={ __( 'Advanced Settings', 'gravisain-blocks' ) } initialOpen={ true }>
								<TextControl
									label={ __( 'HTML Anchor', 'gravisain-blocks' ) }
									help={ __( 'Enter a word or two — without spaces — to make a unique web address just for this block, called an "anchor". Then, you\'ll be able to link directly to this section of your page.', 'gravisain-blocks' ) }
									value={ anchor }
									onChange={ ( val ) => setAttributes( { anchor: val } ) }
								/>
								<TextControl
									label={ __( 'Additional CSS class(es)', 'gravisain-blocks' ) }
									help={ __( 'Separate multiple classes with spaces.', 'gravisain-blocks' ) }
									value={ customClassName }
									onChange={ ( val ) => setAttributes( { customClassName: val } ) }
								/>
								<TextareaControl
									label={ __( 'Additional CSS', 'gravisain-blocks' ) }
									help={ __( 'Add your own CSS to customize the appearance of this block. You do not need to include a CSS selector, just add the property and value, e.g. color: red;.', 'gravisain-blocks' ) }
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
