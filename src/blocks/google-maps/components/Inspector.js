import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, RangeControl, SelectControl, TextControl, TextareaControl, TabPanel } from '@wordpress/components';
import ColorControl from '../../../controls/ColorControl';

export default function Inspector( { attributes, setAttributes } ) {
	const {
		location,
		zoom,
		height,
		mapType,
		borderRadius,
		borderWidth,
		borderColor,
		boxShadow,
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
							<PanelBody title={ __( 'Location & Map Settings', 'gravisain-blocks' ) } initialOpen={ true }>
								<TextControl
									label={ __( 'Address or Place Name', 'gravisain-blocks' ) }
									value={ location }
									onChange={ ( val ) => setAttributes( { location: val } ) }
									placeholder="e.g. Monas, Jakarta"
									help={ __( 'Enter any physical address, city, landmark, or coordinates.', 'gravisain-blocks' ) }
								/>
								<RangeControl
									label={ __( 'Zoom Level', 'gravisain-blocks' ) }
									value={ zoom }
									onChange={ ( val ) => setAttributes( { zoom: val } ) }
									min={ 1 }
									max={ 20 }
								/>
								<SelectControl
									label={ __( 'Map View Type', 'gravisain-blocks' ) }
									value={ mapType }
									options={ [
										{ label: __( 'Roadmap (Standard)', 'gravisain-blocks' ), value: 'm' },
										{ label: __( 'Satellite', 'gravisain-blocks' ), value: 'k' },
										{ label: __( 'Terrain', 'gravisain-blocks' ), value: 'p' },
									] }
									onChange={ ( val ) => setAttributes( { mapType: val } ) }
								/>
								<RangeControl
									label={ __( 'Map Height (px)', 'gravisain-blocks' ) }
									value={ height }
									onChange={ ( val ) => setAttributes( { height: val } ) }
									min={ 150 }
									max={ 800 }
									step={ 10 }
								/>
							</PanelBody>
						) }

						{ tab.name === 'style' && (
							<PanelBody title={ __( 'Borders & Shadow', 'gravisain-blocks' ) } initialOpen={ true }>
								<RangeControl
									label={ __( 'Border Radius (px)', 'gravisain-blocks' ) }
									value={ borderRadius }
									onChange={ ( val ) => setAttributes( { borderRadius: val } ) }
									min={ 0 }
									max={ 50 }
								/>
								<RangeControl
									label={ __( 'Border Width (px)', 'gravisain-blocks' ) }
									value={ borderWidth }
									onChange={ ( val ) => setAttributes( { borderWidth: val } ) }
									min={ 0 }
									max={ 10 }
								/>
								<ColorControl
									label={ __( 'Border Color', 'gravisain-blocks' ) }
									value={ borderColor }
									onChange={ ( val ) => setAttributes( { borderColor: val } ) }
									disableGradient={ true }
								/>
								<SelectControl
									label={ __( 'Box Shadow', 'gravisain-blocks' ) }
									value={ boxShadow }
									options={ [
										{ label: __( 'None', 'gravisain-blocks' ), value: 'none' },
										{ label: __( 'Small', 'gravisain-blocks' ), value: '0 2px 4px rgba(0,0,0,0.1)' },
										{ label: __( 'Medium', 'gravisain-blocks' ), value: '0 4px 12px rgba(0,0,0,0.15)' },
										{ label: __( 'Large', 'gravisain-blocks' ), value: '0 8px 24px rgba(0,0,0,0.2)' },
									] }
									onChange={ ( val ) => setAttributes( { boxShadow: val } ) }
								/>
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
