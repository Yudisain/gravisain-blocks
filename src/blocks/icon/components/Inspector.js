import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, RangeControl, SelectControl, TextControl, TextareaControl, TabPanel } from '@wordpress/components';
import IconPickerControl from '../../../controls/IconPickerControl';
import ColorControl from '../../../controls/ColorControl';
import ResponsiveTabControl from '../../../controls/ResponsiveTabControl';

export default function Inspector( { attributes, setAttributes } ) {
	const {
		icon,
		size,
		sizeTablet,
		sizeMobile,
		color,
		hoverColor,
		backgroundColor,
		padding,
		borderRadius,
		link,
		linkTarget,
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
							<>
								<PanelBody title={ __( 'Icon & Alignment', 'gravisain-blocks' ) } initialOpen={ true }>
									<IconPickerControl
										label={ __( 'Select Icon', 'gravisain-blocks' ) }
										value={ icon }
										onChange={ ( val ) => setAttributes( { icon: val } ) }
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

								<PanelBody title={ __( 'Link Settings', 'gravisain-blocks' ) } initialOpen={ false }>
									<TextControl
										label={ __( 'URL', 'gravisain-blocks' ) }
										value={ link }
										onChange={ ( val ) => setAttributes( { link: val } ) }
										placeholder="https://"
									/>
									<SelectControl
										label={ __( 'Link Target', 'gravisain-blocks' ) }
										value={ linkTarget }
										options={ [
											{ label: __( 'Same Window', 'gravisain-blocks' ), value: '_self' },
											{ label: __( 'New Tab', 'gravisain-blocks' ), value: '_blank' },
										] }
										onChange={ ( val ) => setAttributes( { linkTarget: val } ) }
									/>
								</PanelBody>
							</>
						) }

						{ tab.name === 'style' && (
							<>
								<PanelBody title={ __( 'Size & Spacing', 'gravisain-blocks' ) } initialOpen={ true }>
									<ResponsiveTabControl>
										{ ( device ) => {
											if ( device === 'tablet' ) {
												return (
													<RangeControl
														label={ __( 'Tablet Icon Size (px)', 'gravisain-blocks' ) }
														value={ sizeTablet }
														onChange={ ( val ) => setAttributes( { sizeTablet: val } ) }
														min={ 12 }
														max={ 200 }
													/>
												);
											}
											if ( device === 'mobile' ) {
												return (
													<RangeControl
														label={ __( 'Mobile Icon Size (px)', 'gravisain-blocks' ) }
														value={ sizeMobile }
														onChange={ ( val ) => setAttributes( { sizeMobile: val } ) }
														min={ 12 }
														max={ 200 }
													/>
												);
											}
											return (
												<RangeControl
													label={ __( 'Desktop Icon Size (px)', 'gravisain-blocks' ) }
													value={ size }
													onChange={ ( val ) => setAttributes( { size: val } ) }
													min={ 12 }
													max={ 200 }
												/>
											);
										} }
									</ResponsiveTabControl>

									<RangeControl
										label={ __( 'Background Padding (px)', 'gravisain-blocks' ) }
										value={ padding }
										onChange={ ( val ) => setAttributes( { padding: val } ) }
										min={ 0 }
										max={ 60 }
									/>
									<RangeControl
										label={ __( 'Border Radius (px)', 'gravisain-blocks' ) }
										value={ borderRadius }
										onChange={ ( val ) => setAttributes( { borderRadius: val } ) }
										min={ 0 }
										max={ 100 }
									/>
								</PanelBody>

								<PanelBody title={ __( 'Colors', 'gravisain-blocks' ) } initialOpen={ false }>
									<ColorControl
										label={ __( 'Icon Color', 'gravisain-blocks' ) }
										value={ color }
										onChange={ ( val ) => setAttributes( { color: val } ) }
										disableGradient={ true }
									/>
									<ColorControl
										label={ __( 'Hover Icon Color', 'gravisain-blocks' ) }
										value={ hoverColor }
										onChange={ ( val ) => setAttributes( { hoverColor: val } ) }
										disableGradient={ true }
									/>
									<ColorControl
										label={ __( 'Background Color', 'gravisain-blocks' ) }
										value={ backgroundColor }
										onChange={ ( val ) => setAttributes( { backgroundColor: val } ) }
									/>
								</PanelBody>
							</>
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
