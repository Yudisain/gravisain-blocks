import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, RangeControl, SelectControl, TextControl, TextareaControl, TabPanel } from '@wordpress/components';
import ColorControl from '../../../controls/ColorControl';

export default function Inspector( { attributes, setAttributes } ) {
	const {
		triggerType,
		triggerText,
		modalTitle,
		modalWidth,
		buttonColor,
		buttonTextColor,
		modalBackgroundColor,
		overlayColor,
		closeButtonColor,
		borderRadius,
		contentPadding,
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
							<PanelBody title={ __( 'Trigger & Modal Dimensions', 'gravisain' ) } initialOpen={ true }>
								<SelectControl
									label={ __( 'Trigger Type', 'gravisain' ) }
									value={ triggerType }
									options={ [
										{ label: __( 'Button', 'gravisain' ), value: 'button' },
										{ label: __( 'Text Link', 'gravisain' ), value: 'text' },
									] }
									onChange={ ( val ) => setAttributes( { triggerType: val } ) }
								/>
								<TextControl
									label={ __( 'Trigger Text', 'gravisain' ) }
									value={ triggerText }
									onChange={ ( val ) => setAttributes( { triggerText: val } ) }
								/>
								<TextControl
									label={ __( 'Modal Header Title', 'gravisain' ) }
									value={ modalTitle }
									onChange={ ( val ) => setAttributes( { modalTitle: val } ) }
								/>
								<RangeControl
									label={ __( 'Modal Max Width (px)', 'gravisain' ) }
									value={ modalWidth }
									onChange={ ( val ) => setAttributes( { modalWidth: val } ) }
									min={ 300 }
									max={ 1200 }
									step={ 20 }
								/>
							</PanelBody>
						) }

						{ tab.name === 'style' && (
							<>
								<PanelBody title={ __( 'Trigger Colors', 'gravisain' ) } initialOpen={ true }>
									<ColorControl
										label={ __( 'Button Background Color', 'gravisain' ) }
										value={ buttonColor }
										onChange={ ( val ) => setAttributes( { buttonColor: val } ) }
									/>
									<ColorControl
										label={ __( 'Button Text Color', 'gravisain' ) }
										value={ buttonTextColor }
										onChange={ ( val ) => setAttributes( { buttonTextColor: val } ) }
										disableGradient={ true }
									/>
								</PanelBody>

								<PanelBody title={ __( 'Modal Colors & Radius', 'gravisain' ) } initialOpen={ false }>
									<ColorControl
										label={ __( 'Modal Box Background', 'gravisain' ) }
										value={ modalBackgroundColor }
										onChange={ ( val ) => setAttributes( { modalBackgroundColor: val } ) }
									/>
									<ColorControl
										label={ __( 'Backdrop Overlay Color', 'gravisain' ) }
										value={ overlayColor }
										onChange={ ( val ) => setAttributes( { overlayColor: val } ) }
									/>
									<ColorControl
										label={ __( 'Close Button Color', 'gravisain' ) }
										value={ closeButtonColor }
										onChange={ ( val ) => setAttributes( { closeButtonColor: val } ) }
										disableGradient={ true }
									/>
									<RangeControl
										label={ __( 'Border Radius (px)', 'gravisain' ) }
										value={ borderRadius }
										onChange={ ( val ) => setAttributes( { borderRadius: val } ) }
										min={ 0 }
										max={ 40 }
									/>
									<RangeControl
										label={ __( 'Content Padding (px)', 'gravisain' ) }
										value={ contentPadding }
										onChange={ ( val ) => setAttributes( { contentPadding: val } ) }
										min={ 10 }
										max={ 60 }
									/>
								</PanelBody>
							</>
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
