import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl, TabPanel, RangeControl, TextControl, TextareaControl } from '@wordpress/components';

export default function ButtonsInspector( { attributes, setAttributes } ) {
	const { layout, justifyContent, gap, anchor, customClassName, customCSS } = attributes;

	return (
		<InspectorControls>
			<TabPanel
				className="gravisain-inspector-tabs"
				activeClass="active-tab"
				tabs={ [
					{
						name: 'general',
						title: __( 'General', 'gravisain' ),
						className: 'gravisain-tab-general',
					},
					{
						name: 'advanced',
						title: __( 'Advanced', 'gravisain' ),
						className: 'gravisain-tab-advanced',
					}
				] }
			>
				{ ( tab ) => (
					<div className="gravisain-tab-content">
						{ tab.name === 'general' && (
							<PanelBody title={ __( 'Buttons Layout', 'gravisain' ) } initialOpen={ true }>
								<SelectControl
									label={ __( 'Layout', 'gravisain' ) }
									value={ layout }
									options={ [
										{ label: __( 'Horizontal', 'gravisain' ), value: 'horizontal' },
										{ label: __( 'Vertical', 'gravisain' ), value: 'vertical' },
									] }
									onChange={ ( val ) => setAttributes( { layout: val } ) }
								/>
								
								{ layout === 'horizontal' && (
									<SelectControl
										label={ __( 'Justify Content', 'gravisain' ) }
										value={ justifyContent }
										options={ [
											{ label: __( 'Start', 'gravisain' ), value: 'flex-start' },
											{ label: __( 'Center', 'gravisain' ), value: 'center' },
											{ label: __( 'End', 'gravisain' ), value: 'flex-end' },
											{ label: __( 'Space Between', 'gravisain' ), value: 'space-between' },
										] }
										onChange={ ( val ) => setAttributes( { justifyContent: val } ) }
									/>
								) }

								<RangeControl
									label={ __( 'Gap (px)', 'gravisain' ) }
									value={ gap }
									onChange={ ( val ) => setAttributes( { gap: val } ) }
									min={ 0 }
									max={ 100 }
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
