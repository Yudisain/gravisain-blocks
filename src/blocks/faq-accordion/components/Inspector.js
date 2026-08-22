import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, RangeControl, ToggleControl, TabPanel } from '@wordpress/components';

export default function Inspector( { attributes, setAttributes } ) {
	const {
		itemGap,
		maxWidth,
		allowMultipleOpen,
		marginTop,
		marginBottom,
		paddingTop,
		paddingBottom,
		paddingLeft,
		paddingRight,
	} = attributes;

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
						name: 'style',
						title: __( 'Style', 'gravisain' ),
						className: 'gravisain-tab-style',
					},
					{
						name: 'advanced',
						title: __( 'Advanced', 'gravisain' ),
						className: 'gravisain-tab-advanced',
					},
				] }
			>
				{ ( tab ) => {
					if ( tab.name === 'general' ) {
						return (
							<PanelBody title={ __( 'Container Settings', 'gravisain' ) }>
								<RangeControl
									label={ __( 'Max Width (px)', 'gravisain' ) }
									value={ maxWidth }
									onChange={ ( value ) => setAttributes( { maxWidth: value } ) }
									min={ 400 }
									max={ 1400 }
									step={ 20 }
								/>
								<ToggleControl
									label={ __( 'Allow Multiple Open Items', 'gravisain' ) }
									checked={ allowMultipleOpen }
									onChange={ ( value ) => setAttributes( { allowMultipleOpen: value } ) }
									help={ __( 'If disabled, opening one FAQ item will close others on the frontend.', 'gravisain' ) }
								/>
							</PanelBody>
						);
					}

					if ( tab.name === 'style' ) {
						return (
							<PanelBody title={ __( 'Item Spacing', 'gravisain' ) }>
								<RangeControl
									label={ __( 'Item Gap (Vertical distance between items in px)', 'gravisain' ) }
									value={ itemGap }
									onChange={ ( value ) => setAttributes( { itemGap: value } ) }
									min={ 0 }
									max={ 80 }
								/>
							</PanelBody>
						);
					}

					if ( tab.name === 'advanced' ) {
						return (
							<PanelBody title={ __( 'Container Margin & Padding', 'gravisain' ) }>
								<RangeControl
									label={ __( 'Margin Top (px)', 'gravisain' ) }
									value={ marginTop }
									onChange={ ( value ) => setAttributes( { marginTop: value } ) }
									min={ 0 }
									max={ 120 }
								/>
								<RangeControl
									label={ __( 'Margin Bottom (px)', 'gravisain' ) }
									value={ marginBottom }
									onChange={ ( value ) => setAttributes( { marginBottom: value } ) }
									min={ 0 }
									max={ 120 }
								/>
								<RangeControl
									label={ __( 'Padding Top (px)', 'gravisain' ) }
									value={ paddingTop }
									onChange={ ( value ) => setAttributes( { paddingTop: value } ) }
									min={ 0 }
									max={ 120 }
								/>
								<RangeControl
									label={ __( 'Padding Bottom (px)', 'gravisain' ) }
									value={ paddingBottom }
									onChange={ ( value ) => setAttributes( { paddingBottom: value } ) }
									min={ 0 }
									max={ 120 }
								/>
								<RangeControl
									label={ __( 'Padding Left (px)', 'gravisain' ) }
									value={ paddingLeft }
									onChange={ ( value ) => setAttributes( { paddingLeft: value } ) }
									min={ 0 }
									max={ 120 }
								/>
								<RangeControl
									label={ __( 'Padding Right (px)', 'gravisain' ) }
									value={ paddingRight }
									onChange={ ( value ) => setAttributes( { paddingRight: value } ) }
									min={ 0 }
									max={ 120 }
								/>
							</PanelBody>
						);
					}

					return null;
				} }
			</TabPanel>
		</InspectorControls>
	);
}
