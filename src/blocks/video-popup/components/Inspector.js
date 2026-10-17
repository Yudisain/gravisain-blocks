import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, SelectControl, RangeControl, TabPanel, FocalPointPicker } from '@wordpress/components';

export default function Inspector( { attributes, setAttributes } ) {
	const { videoUrl, videoType, thumbnailUrl, thumbnailFocalPoint, playIconStyle, playIconColor, overlayColor, aspectRatio, borderRadius } = attributes;

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
							<PanelBody title={ __( 'Video Settings', 'gravisain-blocks' ) } initialOpen={ true }>
								<SelectControl
									label={ __( 'Video Type', 'gravisain-blocks' ) }
									value={ videoType }
									options={ [
										{ label: __( 'YouTube', 'gravisain-blocks' ), value: 'youtube' },
										{ label: __( 'Vimeo', 'gravisain-blocks' ), value: 'vimeo' },
										{ label: __( 'Self Hosted (MP4)', 'gravisain-blocks' ), value: 'mp4' },
									] }
									onChange={ ( value ) => setAttributes( { videoType: value } ) }
								/>
								<TextControl
									label={ __( 'Video URL', 'gravisain-blocks' ) }
									value={ videoUrl }
									onChange={ ( value ) => setAttributes( { videoUrl: value } ) }
									help={ __( 'Enter the full URL to the video.', 'gravisain-blocks' ) }
								/>
								<SelectControl
									label={ __( 'Aspect Ratio', 'gravisain-blocks' ) }
									value={ aspectRatio }
									options={ [
										{ label: '16:9', value: '16/9' },
										{ label: '4:3', value: '4/3' },
										{ label: '1:1', value: '1/1' },
										{ label: '21:9', value: '21/9' },
									] }
									onChange={ ( value ) => setAttributes( { aspectRatio: value } ) }
								/>
								{ thumbnailUrl && (
									<div style={ { marginTop: '16px' } }>
										<FocalPointPicker
											label={ __( 'Thumbnail Focal Point', 'gravisain-blocks' ) }
											url={ thumbnailUrl }
											value={ thumbnailFocalPoint || { x: 0.5, y: 0.5 } }
											onChange={ ( val ) => setAttributes( { thumbnailFocalPoint: val } ) }
										/>
									</div>
								) }
							</PanelBody>
						) }

						{ tab.name === 'style' && (
							<PanelBody title={ __( 'Style Settings', 'gravisain-blocks' ) } initialOpen={ true }>
								<SelectControl
									label={ __( 'Play Icon Style', 'gravisain-blocks' ) }
									value={ playIconStyle }
									options={ [
										{ label: __( 'Solid', 'gravisain-blocks' ), value: 'solid' },
										{ label: __( 'Outline', 'gravisain-blocks' ), value: 'outline' },
										{ label: __( 'Simple', 'gravisain-blocks' ), value: 'simple' },
									] }
									onChange={ ( value ) => setAttributes( { playIconStyle: value } ) }
								/>
								<TextControl
									label={ __( 'Play Icon Color (HEX)', 'gravisain-blocks' ) }
									value={ playIconColor }
									onChange={ ( value ) => setAttributes( { playIconColor: value } ) }
								/>
								<TextControl
									label={ __( 'Overlay Color (RGBA/HEX)', 'gravisain-blocks' ) }
									value={ overlayColor }
									onChange={ ( value ) => setAttributes( { overlayColor: value } ) }
								/>
								<RangeControl
									label={ __( 'Border Radius', 'gravisain-blocks' ) }
									value={ borderRadius }
									onChange={ ( value ) => setAttributes( { borderRadius: value } ) }
									min={ 0 }
									max={ 100 }
								/>
							</PanelBody>
						) }
					</div>
				) }
			</TabPanel>
		</InspectorControls>
	);
}
