import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextareaControl, TextControl, RangeControl } from '@wordpress/components';

export default function Inspector( { attributes, setAttributes } ) {
	const { svgCode, maxWidth, fillColor, strokeColor } = attributes;

	return (
		<InspectorControls>
			<PanelBody title={ __( 'Vector Settings', 'gravisain-blocks' ) } initialOpen={ true }>
				<TextareaControl
					label={ __( 'SVG Code', 'gravisain-blocks' ) }
					value={ svgCode }
					onChange={ ( value ) => setAttributes( { svgCode: value } ) }
					help={ __( 'Paste raw SVG code here.', 'gravisain-blocks' ) }
					rows={ 6 }
				/>
				<RangeControl
					label={ __( 'Max Width (px)', 'gravisain-blocks' ) }
					value={ maxWidth }
					onChange={ ( value ) => setAttributes( { maxWidth: value } ) }
					min={ 10 }
					max={ 2000 }
				/>
			</PanelBody>

			<PanelBody title={ __( 'Colors', 'gravisain-blocks' ) } initialOpen={ true }>
				<TextControl
					label={ __( 'Fill Color', 'gravisain-blocks' ) }
					value={ fillColor }
					onChange={ ( value ) => setAttributes( { fillColor: value } ) }
					help={ __( 'Use "currentColor" to inherit text color, or a specific hex like #ff0000', 'gravisain-blocks' ) }
				/>
				<TextControl
					label={ __( 'Stroke Color', 'gravisain-blocks' ) }
					value={ strokeColor }
					onChange={ ( value ) => setAttributes( { strokeColor: value } ) }
					help={ __( 'Default is "none"', 'gravisain-blocks' ) }
				/>
			</PanelBody>
		</InspectorControls>
	);
}
