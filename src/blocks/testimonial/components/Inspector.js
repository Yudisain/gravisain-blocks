import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	SelectControl,
	RangeControl,
	ToggleControl,
	TabPanel,
	FocalPointPicker,
} from '@wordpress/components';
import ColorControl from '../../../controls/ColorControl';

export default function Inspector( { attributes, setAttributes } ) {
	const {
		rating,
		showRating,
		showAvatar,
		avatarUrl,
		avatarFocalPoint,
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
								<PanelBody title={ __( 'Rating & Quote Mark', 'gravisain-blocks' ) }>
									<ToggleControl
										label={ __( 'Show Star Rating', 'gravisain-blocks' ) }
										checked={ showRating }
										onChange={ ( val ) => setAttributes( { showRating: val } ) }
									/>
									{ showRating && (
										<RangeControl
											label={ __( 'Rating Stars (1-5)', 'gravisain-blocks' ) }
											value={ rating }
											onChange={ ( val ) => setAttributes( { rating: val } ) }
											min={ 1 }
											max={ 5 }
										/>
									) }
									<ToggleControl
										label={ __( 'Show Background Quote Mark Symbol', 'gravisain-blocks' ) }
										checked={ showQuoteMark }
										onChange={ ( val ) => setAttributes( { showQuoteMark: val } ) }
									/>
								</PanelBody>

								<PanelBody title={ __( 'Author & Avatar Layout', 'gravisain-blocks' ) }>
									<ToggleControl
										label={ __( 'Show Author Avatar Image', 'gravisain-blocks' ) }
										checked={ showAvatar }
										onChange={ ( val ) => setAttributes( { showAvatar: val } ) }
									/>
									{ showAvatar && (
										<>
											<SelectControl
												label={ __( 'Avatar Layout Position', 'gravisain-blocks' ) }
												value={ avatarLayout }
												options={ [
													{ label: __( 'Left of Author Details', 'gravisain-blocks' ), value: 'left' },
													{ label: __( 'Top / Stacked Above Details', 'gravisain-blocks' ), value: 'top' },
													{ label: __( 'Right of Author Details', 'gravisain-blocks' ), value: 'right' },
												] }
												onChange={ ( val ) => setAttributes( { avatarLayout: val } ) }
											/>
											<SelectControl
												label={ __( 'Avatar Shape', 'gravisain-blocks' ) }
												value={ avatarShape }
												options={ [
													{ label: __( 'Circle', 'gravisain-blocks' ), value: 'circle' },
													{ label: __( 'Rounded Rectangle', 'gravisain-blocks' ), value: 'rounded' },
													{ label: __( 'Square', 'gravisain-blocks' ), value: 'square' },
												] }
												onChange={ ( val ) => setAttributes( { avatarShape: val } ) }
											/>
											{ avatarUrl && (
												<div style={ { marginTop: '16px' } }>
													<FocalPointPicker
														label={ __( 'Avatar Focal Point', 'gravisain-blocks' ) }
														url={ avatarUrl }
														value={ avatarFocalPoint || { x: 0.5, y: 0.5 } }
														onChange={ ( val ) => setAttributes( { avatarFocalPoint: val } ) }
													/>
												</div>
											) }
										</>
									) }
								</PanelBody>
							</>
						);
					}

					if ( tab.name === 'style' ) {
						return (
							<>
								<PanelBody title={ __( 'Text Alignment', 'gravisain-blocks' ) }>
									<SelectControl
										label={ __( 'Alignment', 'gravisain-blocks' ) }
										value={ textAlign }
										options={ [
											{ label: __( 'Left', 'gravisain-blocks' ), value: 'left' },
											{ label: __( 'Center', 'gravisain-blocks' ), value: 'center' },
											{ label: __( 'Right', 'gravisain-blocks' ), value: 'right' },
										] }
										onChange={ ( val ) => setAttributes( { textAlign: val } ) }
									/>
								</PanelBody>

								<PanelBody title={ __( 'Quote & Rating Styling', 'gravisain-blocks' ) }>
									{ showRating && (
										<div style={ { marginBottom: 16 } }>
											<p style={ { marginBottom: 8, fontWeight: 600 } }>
												{ __( 'Rating Stars Color', 'gravisain-blocks' ) }
											</p>
											<ColorControl
												value={ ratingColor }
												onChange={ ( color ) => setAttributes( { ratingColor: color || '#fbbf24' } ) }
											/>
										</div>
									) }

									<RangeControl
										label={ __( 'Quote Font Size (px)', 'gravisain-blocks' ) }
										value={ quoteFontSize }
										onChange={ ( val ) => setAttributes( { quoteFontSize: val } ) }
										min={ 14 }
										max={ 36 }
									/>
									<div style={ { marginBottom: 16 } }>
										<p style={ { marginBottom: 8, fontWeight: 600 } }>
											{ __( 'Quote Text Color', 'gravisain-blocks' ) }
										</p>
										<ColorControl
											value={ quoteColor }
											onChange={ ( color ) => setAttributes( { quoteColor: color || '#334155' } ) }
										/>
									</div>

									{ showQuoteMark && (
										<div style={ { marginBottom: 16 } }>
											<p style={ { marginBottom: 8, fontWeight: 600 } }>
												{ __( 'Background Quote Mark Color', 'gravisain-blocks' ) }
											</p>
											<ColorControl
												value={ quoteMarkColor }
												onChange={ ( color ) => setAttributes( { quoteMarkColor: color || 'rgba(79, 70, 229, 0.1)' } ) }
											/>
										</div>
									) }
								</PanelBody>

								<PanelBody title={ __( 'Author & Avatar Styling', 'gravisain-blocks' ) }>
									{ showAvatar && (
										<RangeControl
											label={ __( 'Avatar Size (px)', 'gravisain-blocks' ) }
											value={ avatarSize }
											onChange={ ( val ) => setAttributes( { avatarSize: val } ) }
											min={ 32 }
											max={ 120 }
										/>
									) }
									<RangeControl
										label={ __( 'Author Name Font Size (px)', 'gravisain-blocks' ) }
										value={ authorFontSize }
										onChange={ ( val ) => setAttributes( { authorFontSize: val } ) }
										min={ 12 }
										max={ 28 }
									/>
									<div style={ { marginBottom: 16 } }>
										<p style={ { marginBottom: 8, fontWeight: 600 } }>
											{ __( 'Author Name Color', 'gravisain-blocks' ) }
										</p>
										<ColorControl
											value={ authorColor }
											onChange={ ( color ) => setAttributes( { authorColor: color || '#0f172a' } ) }
										/>
									</div>

									<RangeControl
										label={ __( 'Author Role Font Size (px)', 'gravisain-blocks' ) }
										value={ roleFontSize }
										onChange={ ( val ) => setAttributes( { roleFontSize: val } ) }
										min={ 10 }
										max={ 22 }
									/>
									<div style={ { marginBottom: 16 } }>
										<p style={ { marginBottom: 8, fontWeight: 600 } }>
											{ __( 'Author Role Color', 'gravisain-blocks' ) }
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
							<PanelBody title={ __( 'Card Background, Border & Spacing', 'gravisain-blocks' ) }>
								<ToggleControl
									label={ __( 'Enable Card Shadow', 'gravisain-blocks' ) }
									checked={ boxShadow }
									onChange={ ( val ) => setAttributes( { boxShadow: val } ) }
								/>
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
										onChange={ ( color ) => setAttributes( { cardBorderColor: color || 'rgba(0, 0, 0, 0.08)' } ) }
									/>
								</div>
								<RangeControl
									label={ __( 'Border Width (px)', 'gravisain-blocks' ) }
									value={ cardBorderWidth }
									onChange={ ( val ) => setAttributes( { cardBorderWidth: val } ) }
									min={ 0 }
									max={ 10 }
								/>
								<RangeControl
									label={ __( 'Border Radius (px)', 'gravisain-blocks' ) }
									value={ cardBorderRadius }
									onChange={ ( val ) => setAttributes( { cardBorderRadius: val } ) }
									min={ 0 }
									max={ 50 }
								/>
								<RangeControl
									label={ __( 'Padding Top (px)', 'gravisain-blocks' ) }
									value={ cardPaddingTop }
									onChange={ ( val ) => setAttributes( { cardPaddingTop: val } ) }
									min={ 0 }
									max={ 120 }
								/>
								<RangeControl
									label={ __( 'Padding Bottom (px)', 'gravisain-blocks' ) }
									value={ cardPaddingBottom }
									onChange={ ( val ) => setAttributes( { cardPaddingBottom: val } ) }
									min={ 0 }
									max={ 120 }
								/>
								<RangeControl
									label={ __( 'Padding Left (px)', 'gravisain-blocks' ) }
									value={ cardPaddingLeft }
									onChange={ ( val ) => setAttributes( { cardPaddingLeft: val } ) }
									min={ 0 }
									max={ 120 }
								/>
								<RangeControl
									label={ __( 'Padding Right (px)', 'gravisain-blocks' ) }
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
