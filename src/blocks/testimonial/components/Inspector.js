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

export default function Inspector( { attributes, setAttributes } ) {
	const {
		rating,
		showRating,
		showAvatar,
		avatarLayout,
		avatarShape,
		showQuoteMark,
		textAlign,
		ratingColor,
		quoteColor,
		quoteFontSize,
		authorColor,
		authorFontSize,
		roleColor,
		roleFontSize,
		avatarSize,
		quoteMarkColor,
		cardBackgroundColor,
		cardBorderColor,
		cardBorderWidth,
		cardBorderRadius,
		cardPaddingTop,
		cardPaddingBottom,
		cardPaddingLeft,
		cardPaddingRight,
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
							<>
								<PanelBody title={ __( 'Rating & Quote Mark', 'gravisain' ) }>
									<ToggleControl
										label={ __( 'Show Star Rating', 'gravisain' ) }
										checked={ showRating }
										onChange={ ( val ) => setAttributes( { showRating: val } ) }
									/>
									{ showRating && (
										<RangeControl
											label={ __( 'Rating Stars (1-5)', 'gravisain' ) }
											value={ rating }
											onChange={ ( val ) => setAttributes( { rating: val } ) }
											min={ 1 }
											max={ 5 }
										/>
									) }
									<ToggleControl
										label={ __( 'Show Background Quote Mark Symbol', 'gravisain' ) }
										checked={ showQuoteMark }
										onChange={ ( val ) => setAttributes( { showQuoteMark: val } ) }
									/>
								</PanelBody>

								<PanelBody title={ __( 'Author & Avatar Layout', 'gravisain' ) }>
									<ToggleControl
										label={ __( 'Show Author Avatar Image', 'gravisain' ) }
										checked={ showAvatar }
										onChange={ ( val ) => setAttributes( { showAvatar: val } ) }
									/>
									{ showAvatar && (
										<>
											<SelectControl
												label={ __( 'Avatar Layout Position', 'gravisain' ) }
												value={ avatarLayout }
												options={ [
													{ label: __( 'Left of Author Details', 'gravisain' ), value: 'left' },
													{ label: __( 'Top / Stacked Above Details', 'gravisain' ), value: 'top' },
													{ label: __( 'Right of Author Details', 'gravisain' ), value: 'right' },
												] }
												onChange={ ( val ) => setAttributes( { avatarLayout: val } ) }
											/>
											<SelectControl
												label={ __( 'Avatar Shape', 'gravisain' ) }
												value={ avatarShape }
												options={ [
													{ label: __( 'Circle', 'gravisain' ), value: 'circle' },
													{ label: __( 'Rounded Rectangle', 'gravisain' ), value: 'rounded' },
													{ label: __( 'Square', 'gravisain' ), value: 'square' },
												] }
												onChange={ ( val ) => setAttributes( { avatarShape: val } ) }
											/>
										</>
									) }
								</PanelBody>
							</>
						);
					}

					if ( tab.name === 'style' ) {
						return (
							<>
								<PanelBody title={ __( 'Text Alignment', 'gravisain' ) }>
									<SelectControl
										label={ __( 'Alignment', 'gravisain' ) }
										value={ textAlign }
										options={ [
											{ label: __( 'Left', 'gravisain' ), value: 'left' },
											{ label: __( 'Center', 'gravisain' ), value: 'center' },
											{ label: __( 'Right', 'gravisain' ), value: 'right' },
										] }
										onChange={ ( val ) => setAttributes( { textAlign: val } ) }
									/>
								</PanelBody>

								<PanelBody title={ __( 'Quote & Rating Styling', 'gravisain' ) }>
									{ showRating && (
										<div style={ { marginBottom: 16 } }>
											<p style={ { marginBottom: 8, fontWeight: 600 } }>
												{ __( 'Rating Stars Color', 'gravisain' ) }
											</p>
											<ColorControl
												value={ ratingColor }
												onChange={ ( color ) => setAttributes( { ratingColor: color || '#fbbf24' } ) }
											/>
										</div>
									) }

									<RangeControl
										label={ __( 'Quote Font Size (px)', 'gravisain' ) }
										value={ quoteFontSize }
										onChange={ ( val ) => setAttributes( { quoteFontSize: val } ) }
										min={ 14 }
										max={ 36 }
									/>
									<div style={ { marginBottom: 16 } }>
										<p style={ { marginBottom: 8, fontWeight: 600 } }>
											{ __( 'Quote Text Color', 'gravisain' ) }
										</p>
										<ColorControl
											value={ quoteColor }
											onChange={ ( color ) => setAttributes( { quoteColor: color || '#334155' } ) }
										/>
									</div>

									{ showQuoteMark && (
										<div style={ { marginBottom: 16 } }>
											<p style={ { marginBottom: 8, fontWeight: 600 } }>
												{ __( 'Background Quote Mark Color', 'gravisain' ) }
											</p>
											<ColorControl
												value={ quoteMarkColor }
												onChange={ ( color ) => setAttributes( { quoteMarkColor: color || 'rgba(79, 70, 229, 0.1)' } ) }
											/>
										</div>
									) }
								</PanelBody>

								<PanelBody title={ __( 'Author & Avatar Styling', 'gravisain' ) }>
									{ showAvatar && (
										<RangeControl
											label={ __( 'Avatar Size (px)', 'gravisain' ) }
											value={ avatarSize }
											onChange={ ( val ) => setAttributes( { avatarSize: val } ) }
											min={ 32 }
											max={ 120 }
										/>
									) }
									<RangeControl
										label={ __( 'Author Name Font Size (px)', 'gravisain' ) }
										value={ authorFontSize }
										onChange={ ( val ) => setAttributes( { authorFontSize: val } ) }
										min={ 12 }
										max={ 28 }
									/>
									<div style={ { marginBottom: 16 } }>
										<p style={ { marginBottom: 8, fontWeight: 600 } }>
											{ __( 'Author Name Color', 'gravisain' ) }
										</p>
										<ColorControl
											value={ authorColor }
											onChange={ ( color ) => setAttributes( { authorColor: color || '#0f172a' } ) }
										/>
									</div>

									<RangeControl
										label={ __( 'Author Role Font Size (px)', 'gravisain' ) }
										value={ roleFontSize }
										onChange={ ( val ) => setAttributes( { roleFontSize: val } ) }
										min={ 10 }
										max={ 22 }
									/>
									<div style={ { marginBottom: 16 } }>
										<p style={ { marginBottom: 8, fontWeight: 600 } }>
											{ __( 'Author Role Color', 'gravisain' ) }
										</p>
										<ColorControl
											value={ roleColor }
											onChange={ ( color ) => setAttributes( { roleColor: color || '#64748b' } ) }
										/>
									</div>
								</PanelBody>
							</>
						);
					}

					if ( tab.name === 'advanced' ) {
						return (
							<PanelBody title={ __( 'Card Background, Border & Spacing', 'gravisain' ) }>
								<ToggleControl
									label={ __( 'Enable Card Shadow', 'gravisain' ) }
									checked={ boxShadow }
									onChange={ ( val ) => setAttributes( { boxShadow: val } ) }
								/>
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
										onChange={ ( color ) => setAttributes( { cardBorderColor: color || 'rgba(0, 0, 0, 0.08)' } ) }
									/>
								</div>
								<RangeControl
									label={ __( 'Border Width (px)', 'gravisain' ) }
									value={ cardBorderWidth }
									onChange={ ( val ) => setAttributes( { cardBorderWidth: val } ) }
									min={ 0 }
									max={ 10 }
								/>
								<RangeControl
									label={ __( 'Border Radius (px)', 'gravisain' ) }
									value={ cardBorderRadius }
									onChange={ ( val ) => setAttributes( { cardBorderRadius: val } ) }
									min={ 0 }
									max={ 50 }
								/>
								<RangeControl
									label={ __( 'Padding Top (px)', 'gravisain' ) }
									value={ cardPaddingTop }
									onChange={ ( val ) => setAttributes( { cardPaddingTop: val } ) }
									min={ 0 }
									max={ 120 }
								/>
								<RangeControl
									label={ __( 'Padding Bottom (px)', 'gravisain' ) }
									value={ cardPaddingBottom }
									onChange={ ( val ) => setAttributes( { cardPaddingBottom: val } ) }
									min={ 0 }
									max={ 120 }
								/>
								<RangeControl
									label={ __( 'Padding Left (px)', 'gravisain' ) }
									value={ cardPaddingLeft }
									onChange={ ( val ) => setAttributes( { cardPaddingLeft: val } ) }
									min={ 0 }
									max={ 120 }
								/>
								<RangeControl
									label={ __( 'Padding Right (px)', 'gravisain' ) }
									value={ cardPaddingRight }
									onChange={ ( val ) => setAttributes( { cardPaddingRight: val } ) }
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
