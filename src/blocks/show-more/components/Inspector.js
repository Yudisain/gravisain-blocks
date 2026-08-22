import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, RangeControl, TextControl, ToggleControl, SelectControl, TabPanel } from '@wordpress/components';

export default function Inspector( { attributes, setAttributes } ) {
	const { previewHeight, showMoreText, showLessText, enableShowLess, buttonAlign, fadeColor } = attributes;

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
							<PanelBody title={ __( 'Settings', 'gravisain-blocks' ) } initialOpen={ true }>
								<RangeControl
									label={ __( 'Preview Height (px)', 'gravisain-blocks' ) }
									value={ previewHeight }
									onChange={ ( value ) => setAttributes( { previewHeight: value } ) }
									min={ 50 }
									max={ 1000 }
								/>
								<TextControl
									label={ __( 'Show More Text', 'gravisain-blocks' ) }
									value={ showMoreText }
									onChange={ ( value ) => setAttributes( { showMoreText: value } ) }
								/>
								<ToggleControl
									label={ __( 'Enable Show Less', 'gravisain-blocks' ) }
									checked={ enableShowLess }
									onChange={ ( value ) => setAttributes( { enableShowLess: value } ) }
								/>
								{ enableShowLess && (
									<TextControl
										label={ __( 'Show Less Text', 'gravisain-blocks' ) }
										value={ showLessText }
										onChange={ ( value ) => setAttributes( { showLessText: value } ) }
									/>
								) }
								<SelectControl
									label={ __( 'Button Alignment', 'gravisain-blocks' ) }
									value={ buttonAlign }
									options={ [
										{ label: __( 'Left', 'gravisain-blocks' ), value: 'left' },
										{ label: __( 'Center', 'gravisain-blocks' ), value: 'center' },
										{ label: __( 'Right', 'gravisain-blocks' ), value: 'right' },
									] }
									onChange={ ( value ) => setAttributes( { buttonAlign: value } ) }
								/>
							</PanelBody>
						) }
						
						{ tab.name === 'style' && (
							<PanelBody title={ __( 'Style', 'gravisain-blocks' ) } initialOpen={ true }>
								<TextControl
									label={ __( 'Fade Color (HEX/RGBA)', 'gravisain-blocks' ) }
									value={ fadeColor }
									onChange={ ( value ) => setAttributes( { fadeColor: value } ) }
									help={ __( 'Match this to the background color of your section.', 'gravisain-blocks' ) }
								/>
							</PanelBody>
						) }
					</div>
				) }
			</TabPanel>
		</InspectorControls>
	);
}
