import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	SelectControl,
	RangeControl,
	ToggleControl,
	TabPanel,
} from '@wordpress/components';
import ColorControl from '../../../controls/ColorControl';

export default function ItemInspector( { attributes, setAttributes } ) {
	const {
		isOpen,
		iconType,
		headerPaddingTop,
		headerPaddingBottom,
		headerPaddingLeft,
		headerPaddingRight,
		contentPaddingTop,
		contentPaddingBottom,
		contentPaddingLeft,
		contentPaddingRight,
		questionFontSize,
		questionColorNormal,
		questionColorActive,
		headerBgNormal,
		headerBgActive,
		iconColorNormal,
		iconColorActive,
		iconSize,
		contentBg,
		borderColorNormal,
		borderColorActive,
		borderWidth,
		borderRadius,
		boxShadow,
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
							<PanelBody title={ __( 'FAQ State & Icon', 'gravisain' ) }>
								<ToggleControl
									label={ __( 'Open by default', 'gravisain' ) }
									checked={ isOpen }
									onChange={ ( value ) => setAttributes( { isOpen: value } ) }
								/>
								<SelectControl
									label={ __( 'Accordion Icon Type', 'gravisain' ) }
									value={ iconType || 'inherit' }
									options={ [
										{ label: __( 'Inherit from Accordion (Default)', 'gravisain' ), value: 'inherit' },
										{ label: __( 'Arrow Down / Up', 'gravisain' ), value: 'arrow-down-alt2' },
										{ label: __( 'Chevron Down / Up', 'gravisain' ), value: 'arrow-down' },
										{ label: __( 'Plus / Minus (+ / -)', 'gravisain' ), value: 'plus' },
										{ label: __( 'None (No Icon)', 'gravisain' ), value: 'none' },
									] }
									onChange={ ( value ) => setAttributes( { iconType: value } ) }
									help={ __( 'Leave as "Inherit" to follow the global icon chosen on the parent FAQ Accordion container.', 'gravisain' ) }
								/>
							</PanelBody>
						);
					}

					if ( tab.name === 'style' ) {
						return (
							<>
								<PanelBody title={ __( 'Question Header Styling', 'gravisain' ) }>
									<RangeControl
										label={ __( 'Question Font Size (px)', 'gravisain' ) }
										value={ questionFontSize }
										onChange={ ( value ) => setAttributes( { questionFontSize: value } ) }
										min={ 14 }
										max={ 32 }
									/>
									<div style={ { marginBottom: 16 } }>
										<p style={ { marginBottom: 8, fontWeight: 600 } }>
											{ __( 'Question Color (Closed / Normal)', 'gravisain' ) }
										</p>
										<ColorControl
											value={ questionColorNormal }
											onChange={ ( color ) => setAttributes( { questionColorNormal: color || '#1e293b' } ) }
										/>
									</div>
									<div style={ { marginBottom: 16 } }>
										<p style={ { marginBottom: 8, fontWeight: 600 } }>
											{ __( 'Question Color (Open / Active)', 'gravisain' ) }
										</p>
										<ColorControl
											value={ questionColorActive }
											onChange={ ( color ) => setAttributes( { questionColorActive: color || '#4f46e5' } ) }
										/>
									</div>
									<div style={ { marginBottom: 16 } }>
										<p style={ { marginBottom: 8, fontWeight: 600 } }>
											{ __( 'Header Background (Closed)', 'gravisain' ) }
										</p>
										<ColorControl
											value={ headerBgNormal }
											onChange={ ( color ) => setAttributes( { headerBgNormal: color || '#ffffff' } ) }
										/>
									</div>
									<div style={ { marginBottom: 16 } }>
										<p style={ { marginBottom: 8, fontWeight: 600 } }>
											{ __( 'Header Background (Open)', 'gravisain' ) }
										</p>
										<ColorControl
											value={ headerBgActive }
											onChange={ ( color ) => setAttributes( { headerBgActive: color || '#f8fafc' } ) }
										/>
									</div>
								</PanelBody>

								<PanelBody title={ __( 'Toggle Icon & Answer Styling', 'gravisain' ) }>
									<RangeControl
										label={ __( 'Icon Size (px)', 'gravisain' ) }
										value={ iconSize }
										onChange={ ( value ) => setAttributes( { iconSize: value } ) }
										min={ 14 }
										max={ 48 }
										allowReset={ true }
										help={ __( 'Leave empty or click reset to inherit Global Icon Size from Accordion.', 'gravisain' ) }
									/>
									<div style={ { marginBottom: 16 } }>
										<p style={ { marginBottom: 8, fontWeight: 600 } }>
											{ __( 'Icon Color (Closed)', 'gravisain' ) }
										</p>
										<ColorControl
											value={ iconColorNormal }
											onChange={ ( color ) => setAttributes( { iconColorNormal: color } ) }
											disableGradient={ true }
										/>
									</div>
									<div style={ { marginBottom: 16 } }>
										<p style={ { marginBottom: 8, fontWeight: 600 } }>
											{ __( 'Icon Color (Open)', 'gravisain' ) }
										</p>
										<ColorControl
											value={ iconColorActive }
											onChange={ ( color ) => setAttributes( { iconColorActive: color } ) }
											disableGradient={ true }
										/>
									</div>
									<div style={ { marginBottom: 16 } }>
										<p style={ { marginBottom: 8, fontWeight: 600 } }>
											{ __( 'Answer Content Background', 'gravisain' ) }
										</p>
										<ColorControl
											value={ contentBg }
											onChange={ ( color ) => setAttributes( { contentBg: color || '#ffffff' } ) }
										/>
									</div>
								</PanelBody>
							</>
						);
					}

					if ( tab.name === 'advanced' ) {
						return (
							<>
								<PanelBody title={ __( 'Card Border & Shadow', 'gravisain' ) }>
									<ToggleControl
										label={ __( 'Enable Card Shadow (Open state)', 'gravisain' ) }
										checked={ boxShadow }
										onChange={ ( value ) => setAttributes( { boxShadow: value } ) }
									/>
									<div style={ { marginBottom: 16 } }>
										<p style={ { marginBottom: 8, fontWeight: 600 } }>
											{ __( 'Border Color (Closed)', 'gravisain' ) }
										</p>
										<ColorControl
											value={ borderColorNormal }
											onChange={ ( color ) => setAttributes( { borderColorNormal: color || '#e2e8f0' } ) }
										/>
									</div>
									<div style={ { marginBottom: 16 } }>
										<p style={ { marginBottom: 8, fontWeight: 600 } }>
											{ __( 'Border Color (Open)', 'gravisain' ) }
										</p>
										<ColorControl
											value={ borderColorActive }
											onChange={ ( color ) => setAttributes( { borderColorActive: color || '#4f46e5' } ) }
										/>
									</div>
									<RangeControl
										label={ __( 'Border Width (px)', 'gravisain' ) }
										value={ borderWidth }
										onChange={ ( value ) => setAttributes( { borderWidth: value } ) }
										min={ 0 }
										max={ 6 }
									/>
									<RangeControl
										label={ __( 'Border Radius (px)', 'gravisain' ) }
										value={ borderRadius }
										onChange={ ( value ) => setAttributes( { borderRadius: value } ) }
										min={ 0 }
										max={ 40 }
									/>
								</PanelBody>

								<PanelBody title={ __( 'Custom Padding', 'gravisain' ) }>
									<p style={ { fontWeight: 600, marginBottom: 8 } }>
										{ __( 'Header Padding', 'gravisain' ) }
									</p>
									<RangeControl
										label={ __( 'Header Padding Top (px)', 'gravisain' ) }
										value={ headerPaddingTop }
										onChange={ ( value ) => setAttributes( { headerPaddingTop: value } ) }
										min={ 0 }
										max={ 80 }
									/>
									<RangeControl
										label={ __( 'Header Padding Bottom (px)', 'gravisain' ) }
										value={ headerPaddingBottom }
										onChange={ ( value ) => setAttributes( { headerPaddingBottom: value } ) }
										min={ 0 }
										max={ 80 }
									/>
									<RangeControl
										label={ __( 'Header Padding Left (px)', 'gravisain' ) }
										value={ headerPaddingLeft }
										onChange={ ( value ) => setAttributes( { headerPaddingLeft: value } ) }
										min={ 0 }
										max={ 80 }
									/>
									<RangeControl
										label={ __( 'Header Padding Right (px)', 'gravisain' ) }
										value={ headerPaddingRight }
										onChange={ ( value ) => setAttributes( { headerPaddingRight: value } ) }
										min={ 0 }
										max={ 80 }
									/>

									<p style={ { fontWeight: 600, margin: '16px 0 8px 0' } }>
										{ __( 'Answer Content Padding', 'gravisain' ) }
									</p>
									<RangeControl
										label={ __( 'Content Padding Top (px)', 'gravisain' ) }
										value={ contentPaddingTop }
										onChange={ ( value ) => setAttributes( { contentPaddingTop: value } ) }
										min={ 0 }
										max={ 80 }
									/>
									<RangeControl
										label={ __( 'Content Padding Bottom (px)', 'gravisain' ) }
										value={ contentPaddingBottom }
										onChange={ ( value ) => setAttributes( { contentPaddingBottom: value } ) }
										min={ 0 }
										max={ 80 }
									/>
									<RangeControl
										label={ __( 'Content Padding Left (px)', 'gravisain' ) }
										value={ contentPaddingLeft }
										onChange={ ( value ) => setAttributes( { contentPaddingLeft: value } ) }
										min={ 0 }
										max={ 80 }
									/>
									<RangeControl
										label={ __( 'Content Padding Right (px)', 'gravisain' ) }
										value={ contentPaddingRight }
										onChange={ ( value ) => setAttributes( { contentPaddingRight: value } ) }
										min={ 0 }
										max={ 80 }
									/>
								</PanelBody>
							</>
						);
					}

					return null;
				} }
			</TabPanel>
		</InspectorControls>
	);
}
