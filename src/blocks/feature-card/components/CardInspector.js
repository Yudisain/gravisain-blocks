import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	SelectControl,
	TextControl,
	RangeControl,
	TabPanel,
} from '@wordpress/components';
import ColorControl from '../../../controls/ColorControl';
import IconPickerControl from '../../../controls/IconPickerControl';

export default function CardInspector( { attributes, setAttributes } ) {
	const {
		icon,
		iconSymbol,
		iconPosition,
		textAlign,
		iconSize,
		iconBoxSize,
		iconRadius,
		iconColor,
		iconBackgroundColor,
		titleFontSize,
		titleColor,
		descriptionFontSize,
		descriptionColor,
		cardBackgroundColor,
		cardBorderColor,
		cardBorderWidth,
		cardBorderRadius,
		cardPaddingTop,
		cardPaddingBottom,
		cardPaddingLeft,
		cardPaddingRight,
		hoverEffect,
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
							<>
								<PanelBody title={ __( 'Icon & Layout Settings', 'gravisain' ) }>
									<IconPickerControl
										label={ __( 'Icon', 'gravisain' ) }
										value={ icon }
										onChange={ ( value ) => setAttributes( { icon: value } ) }
									/>
									<SelectControl
										label={ __( 'Icon Position Layout', 'gravisain' ) }
										value={ iconPosition }
										options={ [
											{ label: __( 'Top (Stacked)', 'gravisain' ), value: 'top' },
											{ label: __( 'Left (Side-by-side)', 'gravisain' ), value: 'left' },
											{ label: __( 'Right (Side-by-side)', 'gravisain' ), value: 'right' },
										] }
										onChange={ ( value ) => setAttributes( { iconPosition: value } ) }
									/>
									<SelectControl
										label={ __( 'Text Alignment', 'gravisain' ) }
										value={ textAlign }
										options={ [
											{ label: __( 'Left', 'gravisain' ), value: 'left' },
											{ label: __( 'Center', 'gravisain' ), value: 'center' },
											{ label: __( 'Right', 'gravisain' ), value: 'right' },
										] }
										onChange={ ( value ) => setAttributes( { textAlign: value } ) }
									/>
								</PanelBody>

								<PanelBody title={ __( 'Hover Animation', 'gravisain' ) }>
									<SelectControl
										label={ __( 'Card Hover Effect', 'gravisain' ) }
										value={ hoverEffect }
										options={ [
											{ label: __( 'Lift Up (Shadow Boost)', 'gravisain' ), value: 'lift' },
											{ label: __( 'Scale Up Slightly', 'gravisain' ), value: 'scale' },
											{ label: __( 'Border Glow', 'gravisain' ), value: 'border-glow' },
											{ label: __( 'None', 'gravisain' ), value: 'none' },
										] }
										onChange={ ( value ) => setAttributes( { hoverEffect: value } ) }
									/>
								</PanelBody>
							</>
						);
					}

					if ( tab.name === 'style' ) {
						return (
							<>
								<PanelBody title={ __( 'Icon Box Styling', 'gravisain' ) }>
									<RangeControl
										label={ __( 'Icon Font Size (px)', 'gravisain' ) }
										value={ iconSize }
										onChange={ ( value ) => setAttributes( { iconSize: value } ) }
										min={ 16 }
										max={ 64 }
									/>
									<RangeControl
										label={ __( 'Icon Box Wrapper Size (px)', 'gravisain' ) }
										value={ iconBoxSize }
										onChange={ ( value ) => setAttributes( { iconBoxSize: value } ) }
										min={ 32 }
										max={ 120 }
									/>
									<RangeControl
										label={ __( 'Icon Box Border Radius (px)', 'gravisain' ) }
										value={ iconRadius }
										onChange={ ( value ) => setAttributes( { iconRadius: value } ) }
										min={ 0 }
										max={ 999 }
									/>
									<div style={ { marginBottom: 16 } }>
										<p style={ { marginBottom: 8, fontWeight: 600 } }>
											{ __( 'Icon Color', 'gravisain' ) }
										</p>
										<ColorControl
											value={ iconColor }
											onChange={ ( color ) => setAttributes( { iconColor: color || '#4f46e5' } ) }
										/>
									</div>
									<div style={ { marginBottom: 16 } }>
										<p style={ { marginBottom: 8, fontWeight: 600 } }>
											{ __( 'Icon Background Color', 'gravisain' ) }
										</p>
										<ColorControl
											value={ iconBackgroundColor }
											onChange={ ( color ) => setAttributes( { iconBackgroundColor: color || 'rgba(79, 70, 229, 0.1)' } ) }
										/>
									</div>
								</PanelBody>

								<PanelBody title={ __( 'Typography & Colors', 'gravisain' ) }>
									<RangeControl
										label={ __( 'Title Font Size (px)', 'gravisain' ) }
										value={ titleFontSize }
										onChange={ ( value ) => setAttributes( { titleFontSize: value } ) }
										min={ 14 }
										max={ 36 }
									/>
									<div style={ { marginBottom: 16 } }>
										<p style={ { marginBottom: 8, fontWeight: 600 } }>
											{ __( 'Title Color', 'gravisain' ) }
										</p>
										<ColorControl
											value={ titleColor }
											onChange={ ( color ) => setAttributes( { titleColor: color || '#111827' } ) }
										/>
									</div>

									<RangeControl
										label={ __( 'Description Font Size (px)', 'gravisain' ) }
										value={ descriptionFontSize }
										onChange={ ( value ) => setAttributes( { descriptionFontSize: value } ) }
										min={ 12 }
										max={ 24 }
									/>
									<div style={ { marginBottom: 16 } }>
										<p style={ { marginBottom: 8, fontWeight: 600 } }>
											{ __( 'Description Color', 'gravisain' ) }
										</p>
										<ColorControl
											value={ descriptionColor }
											onChange={ ( color ) => setAttributes( { descriptionColor: color || '#4b5563' } ) }
										/>
									</div>
								</PanelBody>
							</>
						);
					}

					if ( tab.name === 'advanced' ) {
						return (
							<PanelBody title={ __( 'Card Background, Border & Spacing', 'gravisain' ) }>
								<div style={ { marginBottom: 16 } }>
									<p style={ { marginBottom: 8, fontWeight: 600 } }>
										{ __( 'Card Background Color', 'gravisain' ) }
									</p>
									<ColorControl
										value={ cardBackgroundColor }
										onChange={ ( color ) => setAttributes( { cardBackgroundColor: color || '#ffffff' } ) }
									/>
								</div>
								<div style={ { marginBottom: 16 } }>
									<p style={ { marginBottom: 8, fontWeight: 600 } }>
										{ __( 'Card Border Color', 'gravisain' ) }
									</p>
									<ColorControl
										value={ cardBorderColor }
										onChange={ ( color ) => setAttributes( { cardBorderColor: color || '#f3f4f6' } ) }
									/>
								</div>
								<RangeControl
									label={ __( 'Border Width (px)', 'gravisain' ) }
									value={ cardBorderWidth }
									onChange={ ( value ) => setAttributes( { cardBorderWidth: value } ) }
									min={ 0 }
									max={ 10 }
								/>
								<RangeControl
									label={ __( 'Border Radius (px)', 'gravisain' ) }
									value={ cardBorderRadius }
									onChange={ ( value ) => setAttributes( { cardBorderRadius: value } ) }
									min={ 0 }
									max={ 60 }
								/>
								<RangeControl
									label={ __( 'Padding Top (px)', 'gravisain' ) }
									value={ cardPaddingTop }
									onChange={ ( value ) => setAttributes( { cardPaddingTop: value } ) }
									min={ 0 }
									max={ 100 }
								/>
								<RangeControl
									label={ __( 'Padding Bottom (px)', 'gravisain' ) }
									value={ cardPaddingBottom }
									onChange={ ( value ) => setAttributes( { cardPaddingBottom: value } ) }
									min={ 0 }
									max={ 100 }
								/>
								<RangeControl
									label={ __( 'Padding Left (px)', 'gravisain' ) }
									value={ cardPaddingLeft }
									onChange={ ( value ) => setAttributes( { cardPaddingLeft: value } ) }
									min={ 0 }
									max={ 100 }
								/>
								<RangeControl
									label={ __( 'Padding Right (px)', 'gravisain' ) }
									value={ cardPaddingRight }
									onChange={ ( value ) => setAttributes( { cardPaddingRight: value } ) }
									min={ 0 }
									max={ 100 }
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
