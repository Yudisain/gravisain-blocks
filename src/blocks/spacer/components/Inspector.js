import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, RangeControl, ToggleControl, SelectControl, TextControl, TextareaControl, TabPanel } from '@wordpress/components';
import ColorControl from '../../../controls/ColorControl';
import ResponsiveTabControl from '../../../controls/ResponsiveTabControl';

export default function Inspector( { attributes, setAttributes } ) {
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

	return (
		<InspectorControls>
			<TabPanel
				className="gravisain-inspector-tabs"
				activeClass="active-tab"
				tabs={ [
					{
						name: 'general',
						title: __( 'General', 'gravisain-blocks' ),
						className: 'gravisain-tab-general',
					},
					{
						name: 'style',
						title: __( 'Style', 'gravisain-blocks' ),
						className: 'gravisain-tab-style',
					},
					{
						name: 'advanced',
						title: __( 'Advanced', 'gravisain-blocks' ),
						className: 'gravisain-tab-advanced',
					},
				] }
			>
				{ ( tab ) => (
					<div className="gravisain-tab-content">
						{ tab.name === 'general' && (
							<PanelBody title={ __( 'Height Settings', 'gravisain-blocks' ) } initialOpen={ true }>
								<ResponsiveTabControl>
									{ ( device ) => {
										if ( device === 'tablet' ) {
											return (
												<RangeControl
													label={ __( 'Tablet Height (px)', 'gravisain-blocks' ) }
													value={ heightTablet }
													onChange={ ( val ) => setAttributes( { heightTablet: val } ) }
													min={ 0 }
													max={ 500 }
												/>
											);
										}
										if ( device === 'mobile' ) {
											return (
												<RangeControl
													label={ __( 'Mobile Height (px)', 'gravisain-blocks' ) }
													value={ heightMobile }
													onChange={ ( val ) => setAttributes( { heightMobile: val } ) }
													min={ 0 }
													max={ 500 }
												/>
											);
										}
										return (
											<RangeControl
												label={ __( 'Desktop Height (px)', 'gravisain-blocks' ) }
												value={ height }
												onChange={ ( val ) => setAttributes( { height: val } ) }
												min={ 0 }
												max={ 500 }
											/>
										);
									} }
								</ResponsiveTabControl>
							</PanelBody>
						) }

						{ tab.name === 'style' && (
							<PanelBody title={ __( 'Divider Line', 'gravisain-blocks' ) } initialOpen={ true }>
								<ToggleControl
									label={ __( 'Show Divider Line', 'gravisain-blocks' ) }
									checked={ showDivider }
									onChange={ ( val ) => setAttributes( { showDivider: val } ) }
								/>
								{ showDivider && (
									<>
										<RangeControl
											label={ __( 'Divider Width (%)', 'gravisain-blocks' ) }
											value={ dividerWidth }
											onChange={ ( val ) => setAttributes( { dividerWidth: val } ) }
											min={ 10 }
											max={ 100 }
										/>
										<RangeControl
											label={ __( 'Divider Thickness (px)', 'gravisain-blocks' ) }
											value={ dividerHeight }
											onChange={ ( val ) => setAttributes( { dividerHeight: val } ) }
											min={ 1 }
											max={ 20 }
										/>
										<SelectControl
											label={ __( 'Divider Style', 'gravisain-blocks' ) }
											value={ dividerStyle }
											options={ [
												{ label: __( 'Solid', 'gravisain-blocks' ), value: 'solid' },
												{ label: __( 'Dashed', 'gravisain-blocks' ), value: 'dashed' },
												{ label: __( 'Dotted', 'gravisain-blocks' ), value: 'dotted' },
											] }
											onChange={ ( val ) => setAttributes( { dividerStyle: val } ) }
										/>
										<ColorControl
											label={ __( 'Divider Color', 'gravisain-blocks' ) }
											value={ dividerColor }
											onChange={ ( val ) => setAttributes( { dividerColor: val } ) }
											disableGradient={ true }
										/>
									</>
								) }
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
