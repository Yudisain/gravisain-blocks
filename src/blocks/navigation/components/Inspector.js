import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl, TabPanel, RangeControl, TextControl } from '@wordpress/components';

export default function Inspector( { attributes, setAttributes } ) {
	const { 
		layout, alignment, 
		linkColor, linkHoverColor, linkHoverBackground, 
		fontSize, fontWeight, itemSpacing 
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
							<PanelBody title={ __( 'Layout Settings', 'gravisain-blocks' ) } initialOpen={ true }>
								<SelectControl
									label={ __( 'Layout', 'gravisain-blocks' ) }
									value={ layout }
									options={ [
										{ label: __( 'Horizontal', 'gravisain-blocks' ), value: 'horizontal' },
										{ label: __( 'Vertical', 'gravisain-blocks' ), value: 'vertical' },
									] }
									onChange={ ( value ) => setAttributes( { layout: value } ) }
								/>
								<SelectControl
									label={ __( 'Alignment', 'gravisain-blocks' ) }
									value={ alignment }
									options={ [
										{ label: __( 'Left', 'gravisain-blocks' ), value: 'left' },
										{ label: __( 'Center', 'gravisain-blocks' ), value: 'center' },
										{ label: __( 'Right', 'gravisain-blocks' ), value: 'right' },
										{ label: __( 'Space Between', 'gravisain-blocks' ), value: 'space-between' },
									] }
									onChange={ ( value ) => setAttributes( { alignment: value } ) }
								/>
								<RangeControl
									label={ __( 'Item Spacing', 'gravisain-blocks' ) }
									value={ itemSpacing }
									onChange={ ( value ) => setAttributes( { itemSpacing: value } ) }
									min={ 0 }
									max={ 100 }
								/>
							</PanelBody>
						) }

						{ tab.name === 'style' && (
							<PanelBody title={ __( 'Typography & Colors', 'gravisain-blocks' ) } initialOpen={ true }>
								<RangeControl
									label={ __( 'Font Size (px)', 'gravisain-blocks' ) }
									value={ fontSize }
									onChange={ ( value ) => setAttributes( { fontSize: value } ) }
									min={ 10 }
									max={ 100 }
								/>
								<SelectControl
									label={ __( 'Font Weight', 'gravisain-blocks' ) }
									value={ fontWeight }
									options={ [
										{ label: '400 (Regular)', value: '400' },
										{ label: '500 (Medium)', value: '500' },
										{ label: '600 (Semi Bold)', value: '600' },
										{ label: '700 (Bold)', value: '700' },
										{ label: '800 (Extra Bold)', value: '800' },
									] }
									onChange={ ( value ) => setAttributes( { fontWeight: value } ) }
								/>
								<TextControl
									label={ __( 'Link Color', 'gravisain-blocks' ) }
									value={ linkColor }
									onChange={ ( value ) => setAttributes( { linkColor: value } ) }
								/>
								<TextControl
									label={ __( 'Hover Color', 'gravisain-blocks' ) }
									value={ linkHoverColor }
									onChange={ ( value ) => setAttributes( { linkHoverColor: value } ) }
								/>
								<TextControl
									label={ __( 'Hover Background', 'gravisain-blocks' ) }
									value={ linkHoverBackground }
									onChange={ ( value ) => setAttributes( { linkHoverBackground: value } ) }
								/>
							</PanelBody>
						) }
					</div>
				) }
			</TabPanel>
		</InspectorControls>
	);
}
