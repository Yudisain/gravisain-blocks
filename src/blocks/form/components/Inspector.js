import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, RangeControl, ToggleControl, TextControl, TextareaControl, TabPanel } from '@wordpress/components';
import ColorControl from '../../../controls/ColorControl';

export default function Inspector( { attributes, setAttributes } ) {
	const {
		showName,
		showEmail,
		showSubject,
		showMessage,
		submitButtonText,
		recipientEmail,
		successMessage,
		inputBackgroundColor,
		inputBorderColor,
		inputTextColor,
		inputBorderRadius,
		inputPadding,
		buttonColor,
		buttonTextColor,
		buttonBorderRadius,
		buttonFullWidth,
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
								<PanelBody title={ __( 'Form Fields', 'gravisain-blocks' ) } initialOpen={ true }>
									<ToggleControl label={ __( 'Show Name Field', 'gravisain-blocks' ) } checked={ showName } onChange={ ( val ) => setAttributes( { showName: val } ) } />
									<ToggleControl label={ __( 'Show Email Field', 'gravisain-blocks' ) } checked={ showEmail } onChange={ ( val ) => setAttributes( { showEmail: val } ) } />
									<ToggleControl label={ __( 'Show Subject Field', 'gravisain-blocks' ) } checked={ showSubject } onChange={ ( val ) => setAttributes( { showSubject: val } ) } />
									<ToggleControl label={ __( 'Show Message Field', 'gravisain-blocks' ) } checked={ showMessage } onChange={ ( val ) => setAttributes( { showMessage: val } ) } />
								</PanelBody>

								<PanelBody title={ __( 'Submission Settings', 'gravisain-blocks' ) } initialOpen={ false }>
									<TextControl
										label={ __( 'Submit Button Text', 'gravisain-blocks' ) }
										value={ submitButtonText }
										onChange={ ( val ) => setAttributes( { submitButtonText: val } ) }
									/>
									<TextControl
										label={ __( 'Recipient Email Address', 'gravisain-blocks' ) }
										help={ __( 'Leave blank to use WordPress site Admin Email.', 'gravisain-blocks' ) }
										value={ recipientEmail }
										onChange={ ( val ) => setAttributes( { recipientEmail: val } ) }
										placeholder="admin@yoursite.com"
									/>
									<TextareaControl
										label={ __( 'Success Message', 'gravisain-blocks' ) }
										value={ successMessage }
										onChange={ ( val ) => setAttributes( { successMessage: val } ) }
										rows={ 3 }
									/>
								</PanelBody>
							</>
						) }

						{ tab.name === 'style' && (
							<>
								<PanelBody title={ __( 'Input Fields Style', 'gravisain-blocks' ) } initialOpen={ true }>
									<ColorControl
										label={ __( 'Input Background Color', 'gravisain-blocks' ) }
										value={ inputBackgroundColor }
										onChange={ ( val ) => setAttributes( { inputBackgroundColor: val } ) }
									/>
									<ColorControl
										label={ __( 'Input Text Color', 'gravisain-blocks' ) }
										value={ inputTextColor }
										onChange={ ( val ) => setAttributes( { inputTextColor: val } ) }
										disableGradient={ true }
									/>
									<ColorControl
										label={ __( 'Input Border Color', 'gravisain-blocks' ) }
										value={ inputBorderColor }
										onChange={ ( val ) => setAttributes( { inputBorderColor: val } ) }
										disableGradient={ true }
									/>
									<RangeControl
										label={ __( 'Border Radius (px)', 'gravisain-blocks' ) }
										value={ inputBorderRadius }
										onChange={ ( val ) => setAttributes( { inputBorderRadius: val } ) }
										min={ 0 }
										max={ 30 }
									/>
									<RangeControl
										label={ __( 'Field Padding (px)', 'gravisain-blocks' ) }
										value={ inputPadding }
										onChange={ ( val ) => setAttributes( { inputPadding: val } ) }
										min={ 6 }
										max={ 24 }
									/>
								</PanelBody>

								<PanelBody title={ __( 'Submit Button Style', 'gravisain-blocks' ) } initialOpen={ false }>
									<ColorControl
										label={ __( 'Button Background Color', 'gravisain-blocks' ) }
										value={ buttonColor }
										onChange={ ( val ) => setAttributes( { buttonColor: val } ) }
									/>
									<ColorControl
										label={ __( 'Button Text Color', 'gravisain-blocks' ) }
										value={ buttonTextColor }
										onChange={ ( val ) => setAttributes( { buttonTextColor: val } ) }
										disableGradient={ true }
									/>
									<RangeControl
										label={ __( 'Button Border Radius (px)', 'gravisain-blocks' ) }
										value={ buttonBorderRadius }
										onChange={ ( val ) => setAttributes( { buttonBorderRadius: val } ) }
										min={ 0 }
										max={ 30 }
									/>
									<ToggleControl
										label={ __( 'Full Width Button', 'gravisain-blocks' ) }
										checked={ buttonFullWidth }
										onChange={ ( val ) => setAttributes( { buttonFullWidth: val } ) }
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
