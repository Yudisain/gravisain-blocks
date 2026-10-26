import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { PanelBody, Button, ButtonGroup, SelectControl, RangeControl } from '@wordpress/components';
import ColorControl from '../../../../controls/ColorControl';
import SpacingControl from '../../../../controls/SpacingControl';
import TypographyControl from '../../../../controls/TypographyControl';
import ResponsiveTabControl from '../../../../controls/ResponsiveTabControl';

export default function ButtonsPanel({ attributes, setAttributes }) {
	const [activeButtonTab, setActiveButtonTab] = useState('primary');

	const getResponsiveAttr = (baseName, currentDevice) => {
		if (currentDevice === 'desktop') return attributes[baseName] || {};
		if (currentDevice === 'tablet') return attributes[`${baseName}Tablet`] || {};
		if (currentDevice === 'mobile') return attributes[`${baseName}Mobile`] || {};
		return {};
	};

	const setResponsiveAttr = (baseName, val, currentDevice) => {
		if (currentDevice === 'desktop') setAttributes({ [baseName]: val });
		if (currentDevice === 'tablet') setAttributes({ [`${baseName}Tablet`]: val });
		if (currentDevice === 'mobile') setAttributes({ [`${baseName}Mobile`]: val });
	};

	return (
		<PanelBody title={__('Buttons', 'gravisain-blocks')} initialOpen={false}>
			<div style={{ marginBottom: '15px' }}>
				<ButtonGroup style={{ display: 'flex', width: '100%' }}>
					<Button 
						variant={activeButtonTab === 'primary' ? 'primary' : 'secondary'}
						onClick={() => setActiveButtonTab('primary')}
						style={{ flex: 1, justifyContent: 'center' }}
					>
						{__('Primary', 'gravisain-blocks')}
					</Button>
					<Button 
						variant={activeButtonTab === 'secondary' ? 'primary' : 'secondary'}
						onClick={() => setActiveButtonTab('secondary')}
						style={{ flex: 1, justifyContent: 'center' }}
					>
						{__('Secondary', 'gravisain-blocks')}
					</Button>
				</ButtonGroup>
			</div>

			<div className="gravisain-button-tab-content">
				{activeButtonTab === 'primary' && (
					<>
						<SelectControl
							label={__('Primary Button Style', 'gravisain-blocks')}
							value={attributes.primaryButton?.style || 'primary'}
							options={[
								{ label: __('Solid', 'gravisain-blocks'), value: 'primary' },
								{ label: __('Outline', 'gravisain-blocks'), value: 'outline' },
								{ label: __('Link', 'gravisain-blocks'), value: 'link' },
							]}
							onChange={(val) => setAttributes({ primaryButton: { ...attributes.primaryButton, style: val } })}
						/>
						<ColorControl
							label={__('Text Color', 'gravisain-blocks')}
							value={attributes.primaryButton?.color || ''}
							onChange={(val) => setAttributes({ primaryButton: { ...attributes.primaryButton, color: val } })}
						/>
						<ColorControl
							label={__('Background Color', 'gravisain-blocks')}
							value={attributes.primaryButton?.backgroundColor || ''}
							onChange={(val) => setAttributes({ primaryButton: { ...attributes.primaryButton, backgroundColor: val } })}
						/>
						<RangeControl
							label={__('Border Radius (px)', 'gravisain-blocks')}
							value={attributes.primaryButton?.borderRadius || 0}
							onChange={(val) => setAttributes({ primaryButton: { ...attributes.primaryButton, borderRadius: val } })}
							min={0}
							max={100}
							allowReset
						/>
						<SpacingControl
							label={__('Padding', 'gravisain-blocks')}
							value={attributes.primaryButton?.padding || {}}
							onChange={(val) => setAttributes({ primaryButton: { ...attributes.primaryButton, padding: val } })}
						/>
						<ResponsiveTabControl>
							{(currentDevice) => (
								<TypographyControl
									label={__('Typography', 'gravisain-blocks')}
									value={getResponsiveAttr('primaryButtonTypography', currentDevice)}
									onChange={(val) => setResponsiveAttr('primaryButtonTypography', val, currentDevice)}
								/>
							)}
						</ResponsiveTabControl>
					</>
				)}
				{activeButtonTab === 'secondary' && (
					<>
						<SelectControl
							label={__('Secondary Button Style', 'gravisain-blocks')}
							value={attributes.secondaryButton?.style || 'outline'}
							options={[
								{ label: __('Solid', 'gravisain-blocks'), value: 'primary' },
								{ label: __('Outline', 'gravisain-blocks'), value: 'outline' },
								{ label: __('Link', 'gravisain-blocks'), value: 'link' },
							]}
							onChange={(val) => setAttributes({ secondaryButton: { ...attributes.secondaryButton, style: val } })}
						/>
						<ColorControl
							label={__('Text Color', 'gravisain-blocks')}
							value={attributes.secondaryButton?.color || ''}
							onChange={(val) => setAttributes({ secondaryButton: { ...attributes.secondaryButton, color: val } })}
						/>
						<ColorControl
							label={__('Background Color', 'gravisain-blocks')}
							value={attributes.secondaryButton?.backgroundColor || ''}
							onChange={(val) => setAttributes({ secondaryButton: { ...attributes.secondaryButton, backgroundColor: val } })}
						/>
						<RangeControl
							label={__('Border Radius (px)', 'gravisain-blocks')}
							value={attributes.secondaryButton?.borderRadius || 0}
							onChange={(val) => setAttributes({ secondaryButton: { ...attributes.secondaryButton, borderRadius: val } })}
							min={0}
							max={100}
							allowReset
						/>
						<SpacingControl
							label={__('Padding', 'gravisain-blocks')}
							value={attributes.secondaryButton?.padding || {}}
							onChange={(val) => setAttributes({ secondaryButton: { ...attributes.secondaryButton, padding: val } })}
						/>
						<ResponsiveTabControl>
							{(currentDevice) => (
								<TypographyControl
									label={__('Typography', 'gravisain-blocks')}
									value={getResponsiveAttr('secondaryButtonTypography', currentDevice)}
									onChange={(val) => setResponsiveAttr('secondaryButtonTypography', val, currentDevice)}
								/>
							)}
						</ResponsiveTabControl>
					</>
				)}
			</div>
		</PanelBody>
	);
}
