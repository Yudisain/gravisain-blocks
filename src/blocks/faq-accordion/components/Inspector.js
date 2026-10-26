import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, RangeControl, ToggleControl, SelectControl, TabPanel } from '@wordpress/components';
import ColorControl from '../../../controls/ColorControl';

export default function Inspector( { attributes, setAttributes } ) {
	const {
		itemGap,
		maxWidth,
		allowMultipleOpen,
		iconType,
		iconColorNormal,
		iconColorActive,
		iconSize,
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
						title: __( 'General', 'gravisain-blocks' ),
						className: 'gravisain-tab-general',
					},
					{
						name: 'style',
						title: __( 'Style', 'gravisain-blocks' ),
						className: 'gravisain-tab-style',
					},
					{
						name: 'advanced',
						title: __( 'Advanced', 'gravisain-blocks' ),
						className: 'gravisain-tab-advanced',
					},
				] }
			>
				{ ( tab ) => {
					if ( tab.name === 'general' ) {
						return (
							<>
								<PanelBody title={ __( 'Container Settings', 'gravisain-blocks' ) }>
									<RangeControl
										label={ __( 'Max Width (px)', 'gravisain-blocks' ) }
										value={ maxWidth }
										onChange={ ( value ) => setAttributes( { maxWidth: value } ) }
										min={ 400 }
										max={ 1400 }
										step={ 20 }
									/>
									<ToggleControl
										label={ __( 'Allow Multiple Open Items', 'gravisain-blocks' ) }
										checked={ allowMultipleOpen }
										onChange={ ( value ) => setAttributes( { allowMultipleOpen: value } ) }
										help={ __( 'If disabled, opening one FAQ item will close others on the frontend.', 'gravisain-blocks' ) }
									/>
								</PanelBody>

								<PanelBody title={ __( 'Accordion Icon (Global Default)', 'gravisain-blocks' ) }>
									<SelectControl
										label={ __( 'Default Icon Type', 'gravisain-blocks' ) }
										value={ iconType }
										options={ [
											{ label: __( 'Arrow Down / Up', 'gravisain-blocks' ), value: 'arrow-down-alt2' },
											{ label: __( 'Chevron Down / Up', 'gravisain-blocks' ), value: 'arrow-down' },
											{ label: __( 'Plus / Minus (+ / -)', 'gravisain-blocks' ), value: 'plus' },
											{ label: __( 'None (No Icon)', 'gravisain-blocks' ), value: 'none' },
										] }
										onChange={ ( value ) => setAttributes( { iconType: value } ) }
										help={ __( 'This icon will apply to all FAQ Items inside unless overridden individually.', 'gravisain-blocks' ) }
									/>
								</PanelBody>
							</>
						);
					}

					if ( tab.name === 'style' ) {
						return (
							<>
								<PanelBody title={ __( 'Item Spacing', 'gravisain-blocks' ) }>
									<RangeControl
										label={ __( 'Item Gap (Vertical distance between items in px)', 'gravisain-blocks' ) }
										value={ itemGap }
										onChange={ ( value ) => setAttributes( { itemGap: value } ) }
										min={ 0 }
										max={ 80 }
									/>
								</PanelBody>

								<PanelBody title={ __( 'Global Icon Styling', 'gravisain-blocks' ) }>
									<RangeControl
										label={ __( 'Icon Size (px)', 'gravisain-blocks' ) }
										value={ iconSize ?? 24 }
										onChange={ ( value ) => setAttributes( { iconSize: value } ) }
										min={ 14 }
										max={ 48 }
									/>
									<ColorControl
										label={ __( 'Global Icon Color (Normal)', 'gravisain-blocks' ) }
										value={ iconColorNormal }
										onChange={ ( value ) => setAttributes( { iconColorNormal: value } ) }
										disableGradient={ true }
									/>
									<ColorControl
										label={ __( 'Global Icon Color (Active / Open)', 'gravisain-blocks' ) }
										value={ iconColorActive }
										onChange={ ( value ) => setAttributes( { iconColorActive: value } ) }
										disableGradient={ true }
									/>
								</PanelBody>
							</>
						);
					}

					if ( tab.name === 'advanced' ) {
						return (
							<PanelBody title={ __( 'Container Margin & Padding', 'gravisain-blocks' ) }>
								<RangeControl
									label={ __( 'Margin Top (px)', 'gravisain-blocks' ) }
									value={ marginTop }
									onChange={ ( value ) => setAttributes( { marginTop: value } ) }
									min={ 0 }
									max={ 120 }
								/>
								<RangeControl
									label={ __( 'Margin Bottom (px)', 'gravisain-blocks' ) }
									value={ marginBottom }
									onChange={ ( value ) => setAttributes( { marginBottom: value } ) }
									min={ 0 }
									max={ 120 }
								/>
								<RangeControl
									label={ __( 'Padding Top (px)', 'gravisain-blocks' ) }
									value={ paddingTop }
									onChange={ ( value ) => setAttributes( { paddingTop: value } ) }
									min={ 0 }
									max={ 120 }
								/>
								<RangeControl
									label={ __( 'Padding Bottom (px)', 'gravisain-blocks' ) }
									value={ paddingBottom }
									onChange={ ( value ) => setAttributes( { paddingBottom: value } ) }
									min={ 0 }
									max={ 120 }
								/>
								<RangeControl
									label={ __( 'Padding Left (px)', 'gravisain-blocks' ) }
									value={ paddingLeft }
									onChange={ ( value ) => setAttributes( { paddingLeft: value } ) }
									min={ 0 }
									max={ 120 }
								/>
								<RangeControl
									label={ __( 'Padding Right (px)', 'gravisain-blocks' ) }
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
