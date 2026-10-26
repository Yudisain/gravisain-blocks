import { __ } from '@wordpress/i18n';
import { PanelBody, Button, RangeControl, FocalPointPicker } from '@wordpress/components';
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import ColorControl from '../../../../controls/ColorControl';

export default function BackgroundPanel({ attributes, setAttributes }) {
	const { background = {}, overlay = {} } = attributes;

	return (
		<PanelBody title={__('Background & Overlay', 'gravisain-blocks')} initialOpen={false}>
			<ColorControl
				label={__('Background Color', 'gravisain-blocks')}
				value={background.color}
				onChange={(color) => setAttributes({ background: { ...background, color } })}
			/>
			
			<div style={{ marginBottom: 20 }}>
				<p style={{ marginBottom: 12, fontWeight: 600 }}>{__('Background Image', 'gravisain-blocks')}</p>
				<MediaUploadCheck>
					<MediaUpload
						onSelect={(mediaObj) =>
							setAttributes({ background: { ...background, image: mediaObj.url } })
						}
						allowedTypes={['image']}
						render={({ open }) => (
							<div style={{ display: 'flex', gap: '8px', marginBottom: background.image ? '16px' : '0' }}>
								<Button variant="secondary" onClick={open} style={{ flex: 1, justifyContent: 'center' }}>
									{background.image ? __('Replace Image', 'gravisain-blocks') : __('Select Image', 'gravisain-blocks')}
								</Button>
								{background.image && (
									<Button
										variant="secondary"
										isDestructive
										onClick={() => setAttributes({ background: { ...background, image: '', focalPoint: { x: 0.5, y: 0.5 } } })}
									>
										{__('Remove', 'gravisain-blocks')}
									</Button>
								)}
							</div>
						)}
					/>
				</MediaUploadCheck>
				{background.image && (
					<div className="gravisain-focal-point-wrapper" style={{ marginTop: 12 }}>
						<FocalPointPicker
							label={__('Focal Point (Background Position)', 'gravisain-blocks')}
							url={background.image}
							value={background.focalPoint || { x: 0.5, y: 0.5 }}
							onChange={(focalPoint) =>
								setAttributes({ background: { ...background, focalPoint } })
							}
						/>
					</div>
				)}
			</div>

			<ColorControl
				label={__('Overlay Color', 'gravisain-blocks')}
				value={overlay.color}
				onChange={(color) => setAttributes({ overlay: { ...overlay, color } })}
			/>
			<RangeControl
				label={__('Overlay Opacity', 'gravisain-blocks')}
				value={overlay.opacity ? overlay.opacity * 100 : 50}
				onChange={(val) => setAttributes({ overlay: { ...overlay, opacity: val / 100 } })}
				min={0}
				max={100}
			/>
		</PanelBody>
	);
}
