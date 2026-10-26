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
								<PanelBody title={ __( 'Icon & Layout Settings', 'gravisain-blocks' ) }>
									<IconPickerControl
										label={ __( 'Icon', 'gravisain-blocks' ) }
										value={ icon }
										onChange={ ( value ) => setAttributes( { icon: value, iconSymbol: value } ) }
									/>
									<SelectControl
										label={ __( 'Icon Position Layout', 'gravisain-blocks' ) }
										value={ iconPosition }
										options={ [
											{ label: __( 'Top (Stacked)', 'gravisain-blocks' ), value: 'top' },
											{ label: __( 'Left (Side-by-side)', 'gravisain-blocks' ), value: 'left' },
											{ label: __( 'Right (Side-by-side)', 'gravisain-blocks' ), value: 'right' },
										] }
										onChange={ ( value ) => setAttributes( { iconPosition: value } ) }
									/>
									<SelectControl
										label={ __( 'Text Alignment', 'gravisain-blocks' ) }
										value={ textAlign }
										options={ [
											{ label: __( 'Left', 'gravisain-blocks' ), value: 'left' },
											{ label: __( 'Center', 'gravisain-blocks' ), value: 'center' },
											{ label: __( 'Right', 'gravisain-blocks' ), value: 'right' },
										] }
										onChange={ ( value ) => setAttributes( { textAlign: value } ) }
									/>
								</PanelBody>

								<PanelBody title={ __( 'Hover Animation', 'gravisain-blocks' ) }>
									<SelectControl
										label={ __( 'Card Hover Effect', 'gravisain-blocks' ) }
										value={ hoverEffect }
										options={ [
											{ label: __( 'Lift Up (Shadow Boost)', 'gravisain-blocks' ), value: 'lift' },
											{ label: __( 'Scale Up Slightly', 'gravisain-blocks' ), value: 'scale' },
											{ label: __( 'Border Glow', 'gravisain-blocks' ), value: 'border-glow' },
											{ label: __( 'None', 'gravisain-blocks' ), value: 'none' },
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
								<PanelBody title={ __( 'Icon Box Styling', 'gravisain-blocks' ) }>
									<RangeControl
										label={ __( 'Icon Font Size (px)', 'gravisain-blocks' ) }
										value={ iconSize }
										onChange={ ( value ) => setAttributes( { iconSize: value } ) }
										min={ 16 }
										max={ 64 }
									/>
									<RangeControl
										label={ __( 'Icon Box Wrapper Size (px)', 'gravisain-blocks' ) }
										value={ iconBoxSize }
										onChange={ ( value ) => setAttributes( { iconBoxSize: value } ) }
										min={ 32 }
										max={ 120 }
									/>
									<RangeControl
										label={ __( 'Icon Box Border Radius (px)', 'gravisain-blocks' ) }
										value={ iconRadius }
										onChange={ ( value ) => setAttributes( { iconRadius: value } ) }
										min={ 0 }
										max={ 999 }
									/>
									<div style={ { marginBottom: 16 } }>
										<p style={ { marginBottom: 8, fontWeight: 600 } }>
											{ __( 'Icon Color', 'gravisain-blocks' ) }
										</p>
										<ColorControl
											value={ iconColor }
											onChange={ ( color ) => setAttributes( { iconColor: color || '#4f46e5' } ) }
										/>
									</div>
									<div style={ { marginBottom: 16 } }>
										<p style={ { marginBottom: 8, fontWeight: 600 } }>
											{ __( 'Icon Background Color', 'gravisain-blocks' ) }
										</p>
										<ColorControl
											value={ iconBackgroundColor }
											onChange={ ( color ) => setAttributes( { iconBackgroundColor: color || 'rgba(79, 70, 229, 0.1)' } ) }
										/>
									</div>
								</PanelBody>

								<PanelBody title={ __( 'Typography & Colors', 'gravisain-blocks' ) }>
									<RangeControl
										label={ __( 'Title Font Size (px)', 'gravisain-blocks' ) }
										value={ titleFontSize }
										onChange={ ( value ) => setAttributes( { titleFontSize: value } ) }
										min={ 14 }
										max={ 36 }
									/>
									<div style={ { marginBottom: 16 } }>
										<p style={ { marginBottom: 8, fontWeight: 600 } }>
											{ __( 'Title Color', 'gravisain-blocks' ) }
										</p>
										<ColorControl
											value={ titleColor }
											onChange={ ( color ) => setAttributes( { titleColor: color || '#111827' } ) }
										/>
									</div>

									<RangeControl
										label={ __( 'Description Font Size (px)', 'gravisain-blocks' ) }
										value={ descriptionFontSize }
										onChange={ ( value ) => setAttributes( { descriptionFontSize: value } ) }
										min={ 12 }
										max={ 24 }
									/>
									<div style={ { marginBottom: 16 } }>
										<p style={ { marginBottom: 8, fontWeight: 600 } }>
											{ __( 'Description Color', 'gravisain-blocks' ) }
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
							<PanelBody title={ __( 'Card Background, Border & Spacing', 'gravisain-blocks' ) }>
								<div style={ { marginBottom: 16 } }>
									<p style={ { marginBottom: 8, fontWeight: 600 } }>
										{ __( 'Card Background Color', 'gravisain-blocks' ) }
									</p>
									<ColorControl
										value={ cardBackgroundColor }
										onChange={ ( color ) => setAttributes( { cardBackgroundColor: color || '#ffffff' } ) }
									/>
								</div>
								<div style={ { marginBottom: 16 } }>
									<p style={ { marginBottom: 8, fontWeight: 600 } }>
										{ __( 'Card Border Color', 'gravisain-blocks' ) }
									</p>
									<ColorControl
										value={ cardBorderColor }
										onChange={ ( color ) => setAttributes( { cardBorderColor: color || '#f3f4f6' } ) }
									/>
								</div>
								<RangeControl
									label={ __( 'Border Width (px)', 'gravisain-blocks' ) }
									value={ cardBorderWidth }
									onChange={ ( value ) => setAttributes( { cardBorderWidth: value } ) }
									min={ 0 }
									max={ 10 }
								/>
								<RangeControl
									label={ __( 'Border Radius (px)', 'gravisain-blocks' ) }
									value={ cardBorderRadius }
									onChange={ ( value ) => setAttributes( { cardBorderRadius: value } ) }
									min={ 0 }
									max={ 60 }
								/>
								<RangeControl
									label={ __( 'Padding Top (px)', 'gravisain-blocks' ) }
									value={ cardPaddingTop }
									onChange={ ( value ) => setAttributes( { cardPaddingTop: value } ) }
									min={ 0 }
									max={ 100 }
								/>
								<RangeControl
									label={ __( 'Padding Bottom (px)', 'gravisain-blocks' ) }
									value={ cardPaddingBottom }
									onChange={ ( value ) => setAttributes( { cardPaddingBottom: value } ) }
									min={ 0 }
									max={ 100 }
								/>
								<RangeControl
									label={ __( 'Padding Left (px)', 'gravisain-blocks' ) }
									value={ cardPaddingLeft }
									onChange={ ( value ) => setAttributes( { cardPaddingLeft: value } ) }
									min={ 0 }
									max={ 100 }
								/>
								<RangeControl
									label={ __( 'Padding Right (px)', 'gravisain-blocks' ) }
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
