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
					{ name: 'general', title: __( 'General', 'gravisain' ), className: 'gravisain-tab-general' },
					{ name: 'style', title: __( 'Style', 'gravisain' ), className: 'gravisain-tab-style' },
					{ name: 'advanced', title: __( 'Advanced', 'gravisain' ), className: 'gravisain-tab-advanced' },
				] }
			>
				{ ( tab ) => (
					<div className="gravisain-tab-content">
						{ tab.name === 'general' && (
							<PanelBody title={ __( 'Location & Map Settings', 'gravisain' ) } initialOpen={ true }>
								<TextControl
									label={ __( 'Address or Place Name', 'gravisain' ) }
									value={ location }
									onChange={ ( val ) => setAttributes( { location: val } ) }
									placeholder="e.g. Monas, Jakarta"
									help={ __( 'Enter any physical address, city, landmark, or coordinates.', 'gravisain' ) }
								/>
								<RangeControl
									label={ __( 'Zoom Level', 'gravisain' ) }
									value={ zoom }
									onChange={ ( val ) => setAttributes( { zoom: val } ) }
									min={ 1 }
									max={ 20 }
								/>
								<SelectControl
									label={ __( 'Map View Type', 'gravisain' ) }
									value={ mapType }
									options={ [
										{ label: __( 'Roadmap (Standard)', 'gravisain' ), value: 'm' },
										{ label: __( 'Satellite', 'gravisain' ), value: 'k' },
										{ label: __( 'Terrain', 'gravisain' ), value: 'p' },
									] }
									onChange={ ( val ) => setAttributes( { mapType: val } ) }
								/>
								<RangeControl
									label={ __( 'Map Height (px)', 'gravisain' ) }
									value={ height }
									onChange={ ( val ) => setAttributes( { height: val } ) }
									min={ 150 }
									max={ 800 }
									step={ 10 }
								/>
							</PanelBody>
						) }

						{ tab.name === 'style' && (
							<PanelBody title={ __( 'Borders & Shadow', 'gravisain' ) } initialOpen={ true }>
								<RangeControl
									label={ __( 'Border Radius (px)', 'gravisain' ) }
									value={ borderRadius }
									onChange={ ( val ) => setAttributes( { borderRadius: val } ) }
									min={ 0 }
									max={ 50 }
								/>
								<RangeControl
									label={ __( 'Border Width (px)', 'gravisain' ) }
									value={ borderWidth }
									onChange={ ( val ) => setAttributes( { borderWidth: val } ) }
									min={ 0 }
									max={ 10 }
								/>
								<ColorControl
									label={ __( 'Border Color', 'gravisain' ) }
									value={ borderColor }
									onChange={ ( val ) => setAttributes( { borderColor: val } ) }
									disableGradient={ true }
								/>
								<SelectControl
									label={ __( 'Box Shadow', 'gravisain' ) }
									value={ boxShadow }
									options={ [
										{ label: __( 'None', 'gravisain' ), value: 'none' },
										{ label: __( 'Small', 'gravisain' ), value: '0 2px 4px rgba(0,0,0,0.1)' },
										{ label: __( 'Medium', 'gravisain' ), value: '0 4px 12px rgba(0,0,0,0.15)' },
										{ label: __( 'Large', 'gravisain' ), value: '0 8px 24px rgba(0,0,0,0.2)' },
									] }
									onChange={ ( val ) => setAttributes( { boxShadow: val } ) }
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
