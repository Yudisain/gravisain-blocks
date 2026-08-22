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
					{ name: 'general', title: __( 'General', 'gravisain' ), className: 'gravisain-tab-general' },
					{ name: 'style', title: __( 'Style', 'gravisain' ), className: 'gravisain-tab-style' },
					{ name: 'advanced', title: __( 'Advanced', 'gravisain' ), className: 'gravisain-tab-advanced' },
				] }
			>
				{ ( tab ) => (
					<div className="gravisain-tab-content">
						{ tab.name === 'general' && (
							<PanelBody title={ __( 'Counter Value & Animation', 'gravisain' ) } initialOpen={ true }>
								<TextControl
									label={ __( 'Start Number', 'gravisain' ) }
									type="number"
									value={ startNumber }
									onChange={ ( val ) => setAttributes( { startNumber: parseFloat( val ) || 0 } ) }
								/>
								<TextControl
									label={ __( 'End Number (Target)', 'gravisain' ) }
									type="number"
									value={ endNumber }
									onChange={ ( val ) => setAttributes( { endNumber: parseFloat( val ) || 0 } ) }
								/>
								<TextControl
									label={ __( 'Number Prefix', 'gravisain' ) }
									value={ prefix }
									onChange={ ( val ) => setAttributes( { prefix: val } ) }
									placeholder="$ or #"
								/>
								<TextControl
									label={ __( 'Number Suffix', 'gravisain' ) }
									value={ suffix }
									onChange={ ( val ) => setAttributes( { suffix: val } ) }
									placeholder="+ or %"
								/>
								<RangeControl
									label={ __( 'Animation Duration (seconds)', 'gravisain' ) }
									value={ duration }
									onChange={ ( val ) => setAttributes( { duration: val } ) }
									min={ 0.5 }
									max={ 10 }
									step={ 0.5 }
								/>
								<RangeControl
									label={ __( 'Decimal Places', 'gravisain' ) }
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
													label={ __( 'Tablet Alignment', 'gravisain' ) }
													value={ alignmentTablet }
													options={ [
														{ label: __( 'Inherit', 'gravisain' ), value: '' },
														{ label: __( 'Left', 'gravisain' ), value: 'left' },
														{ label: __( 'Center', 'gravisain' ), value: 'center' },
														{ label: __( 'Right', 'gravisain' ), value: 'right' },
													] }
													onChange={ ( val ) => setAttributes( { alignmentTablet: val } ) }
												/>
											);
										}
										if ( device === 'mobile' ) {
											return (
												<SelectControl
													label={ __( 'Mobile Alignment', 'gravisain' ) }
													value={ alignmentMobile }
													options={ [
														{ label: __( 'Inherit', 'gravisain' ), value: '' },
														{ label: __( 'Left', 'gravisain' ), value: 'left' },
														{ label: __( 'Center', 'gravisain' ), value: 'center' },
														{ label: __( 'Right', 'gravisain' ), value: 'right' },
													] }
													onChange={ ( val ) => setAttributes( { alignmentMobile: val } ) }
												/>
											);
										}
										return (
											<SelectControl
												label={ __( 'Desktop Alignment', 'gravisain' ) }
												value={ alignment }
												options={ [
													{ label: __( 'Left', 'gravisain' ), value: 'left' },
													{ label: __( 'Center', 'gravisain' ), value: 'center' },
													{ label: __( 'Right', 'gravisain' ), value: 'right' },
												] }
												onChange={ ( val ) => setAttributes( { alignment: val } ) }
											/>
										);
									} }
								</ResponsiveTabControl>
							</PanelBody>
						) }

						{ tab.name === 'style' && (
							<PanelBody title={ __( 'Typography & Colors', 'gravisain' ) } initialOpen={ true }>
								<RangeControl
									label={ __( 'Number Font Size (px)', 'gravisain' ) }
									value={ numberFontSize }
									onChange={ ( val ) => setAttributes( { numberFontSize: val } ) }
									min={ 16 }
									max={ 100 }
								/>
								<RangeControl
									label={ __( 'Title Font Size (px)', 'gravisain' ) }
									value={ titleFontSize }
									onChange={ ( val ) => setAttributes( { titleFontSize: val } ) }
									min={ 12 }
									max={ 48 }
								/>
								<ColorControl
									label={ __( 'Number Color', 'gravisain' ) }
									value={ numberColor }
									onChange={ ( val ) => setAttributes( { numberColor: val } ) }
									disableGradient={ true }
								/>
								<ColorControl
									label={ __( 'Title Text Color', 'gravisain' ) }
									value={ titleColor }
									onChange={ ( val ) => setAttributes( { titleColor: val } ) }
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
