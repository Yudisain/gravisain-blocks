import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, SelectControl, ToggleControl, TabPanel } from '@wordpress/components';

export default function Inspector( { attributes, setAttributes } ) {
	const { 
		formActionUrl, showNameField, showPhoneField, showSubjectField, 
		submitButtonText, buttonAlign, buttonColor, buttonTextColor, fieldStyle
	} = attributes;

	return (
		<InspectorControls>
			<TabPanel
				className="gravisain-inspector-tabs"
				activeClass="active-tab"
				tabs={ [
					{ name: 'general', title: __( 'General', 'gravisain-blocks' ), className: 'gravisain-tab-general' },
					{ name: 'style', title: __( 'Style', 'gravisain-blocks' ), className: 'gravisain-tab-style' }
				] }
			>
				{ ( tab ) => (
					<div className="gravisain-tab-content">
						{ tab.name === 'general' && (
							<PanelBody title={ __( 'Form Settings', 'gravisain-blocks' ) } initialOpen={ true }>
								<TextControl
									label={ __( 'Action URL (Webhook/Endpoint)', 'gravisain-blocks' ) }
									value={ formActionUrl }
									onChange={ ( value ) => setAttributes( { formActionUrl: value } ) }
									help={ __( 'Leave blank to use default WordPress handling if integrated.', 'gravisain-blocks' ) }
								/>
								
								<h4 className="gravisain-panel-heading">{ __( 'Form Fields', 'gravisain-blocks' ) }</h4>
								<ToggleControl
									label={ __( 'Show Name Field', 'gravisain-blocks' ) }
									checked={ showNameField }
									onChange={ ( value ) => setAttributes( { showNameField: value } ) }
								/>
								<ToggleControl
									label={ __( 'Show Phone Field', 'gravisain-blocks' ) }
									checked={ showPhoneField }
									onChange={ ( value ) => setAttributes( { showPhoneField: value } ) }
								/>
								<ToggleControl
									label={ __( 'Show Subject Field', 'gravisain-blocks' ) }
									checked={ showSubjectField }
									onChange={ ( value ) => setAttributes( { showSubjectField: value } ) }
								/>

								<h4 className="gravisain-panel-heading">{ __( 'Submit Button', 'gravisain-blocks' ) }</h4>
								<TextControl
									label={ __( 'Button Text', 'gravisain-blocks' ) }
									value={ submitButtonText }
									onChange={ ( value ) => setAttributes( { submitButtonText: value } ) }
								/>
								<SelectControl
									label={ __( 'Button Alignment', 'gravisain-blocks' ) }
									value={ buttonAlign }
									options={ [
										{ label: __( 'Left', 'gravisain-blocks' ), value: 'left' },
										{ label: __( 'Center', 'gravisain-blocks' ), value: 'center' },
										{ label: __( 'Right', 'gravisain-blocks' ), value: 'right' },
										{ label: __( 'Full Width', 'gravisain-blocks' ), value: 'full' },
									] }
									onChange={ ( value ) => setAttributes( { buttonAlign: value } ) }
								/>
							</PanelBody>
						) }

						{ tab.name === 'style' && (
							<PanelBody title={ __( 'Form Style', 'gravisain-blocks' ) } initialOpen={ true }>
								<SelectControl
									label={ __( 'Field Style', 'gravisain-blocks' ) }
									value={ fieldStyle }
									options={ [
										{ label: __( 'Outline', 'gravisain-blocks' ), value: 'outline' },
										{ label: __( 'Underline', 'gravisain-blocks' ), value: 'underline' },
										{ label: __( 'Solid Background', 'gravisain-blocks' ), value: 'solid' },
									] }
									onChange={ ( value ) => setAttributes( { fieldStyle: value } ) }
								/>
								<TextControl
									label={ __( 'Button Background Color', 'gravisain-blocks' ) }
									value={ buttonColor }
									onChange={ ( value ) => setAttributes( { buttonColor: value } ) }
								/>
								<TextControl
									label={ __( 'Button Text Color', 'gravisain-blocks' ) }
									value={ buttonTextColor }
									onChange={ ( value ) => setAttributes( { buttonTextColor: value } ) }
								/>
							</PanelBody>
						) }
					</div>
				) }
			</TabPanel>
		</InspectorControls>
	);
}
