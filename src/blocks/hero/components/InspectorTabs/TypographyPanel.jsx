import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import ColorControl from '../../../../controls/ColorControl';
import TypographyControl from '../../../../controls/TypographyControl';
import ResponsiveTabControl from '../../../../controls/ResponsiveTabControl';

export default function TypographyPanel({ attributes, setAttributes }) {
	const {
		titleColor,
		titleTypography = {},
		titleTypographyTablet = {},
		titleTypographyMobile = {},
		eyebrowColor,
		eyebrowTypography = {},
		eyebrowTypographyTablet = {},
		eyebrowTypographyMobile = {},
		descriptionColor,
		descriptionTypography = {},
		descriptionTypographyTablet = {},
		descriptionTypographyMobile = {},
	} = attributes;

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
		<PanelBody title={__('Typography', 'gravisain')} initialOpen={false}>
			<div style={{ marginBottom: 24 }}>
				<p style={{ marginBottom: 8, fontWeight: 600 }}>{__('Title Typography', 'gravisain')}</p>
				<ColorControl
					label={__('Title Color', 'gravisain')}
					value={titleColor}
					onChange={(val) => setAttributes({ titleColor: val })}
					disableGradient={true}
				/>
				<ResponsiveTabControl>
					{(currentDevice) => (
						<TypographyControl
							label={__('Typography', 'gravisain')}
							value={getResponsiveAttr('titleTypography', currentDevice)}
							onChange={(val) => setResponsiveAttr('titleTypography', val, currentDevice)}
						/>
					)}
				</ResponsiveTabControl>
			</div>

			<div style={{ marginBottom: 24, paddingTop: 16, borderTop: '1px solid #e0e0e0' }}>
				<p style={{ marginBottom: 8, fontWeight: 600 }}>{__('Eyebrow Typography', 'gravisain')}</p>
				<ColorControl
					label={__('Eyebrow Color', 'gravisain')}
					value={eyebrowColor}
					onChange={(val) => setAttributes({ eyebrowColor: val })}
					disableGradient={true}
				/>
				<ResponsiveTabControl>
					{(currentDevice) => (
						<TypographyControl
							label={__('Typography', 'gravisain')}
							value={getResponsiveAttr('eyebrowTypography', currentDevice)}
							onChange={(val) => setResponsiveAttr('eyebrowTypography', val, currentDevice)}
						/>
					)}
				</ResponsiveTabControl>
			</div>

			<div style={{ paddingTop: 16, borderTop: '1px solid #e0e0e0' }}>
				<p style={{ marginBottom: 8, fontWeight: 600 }}>{__('Description Typography', 'gravisain')}</p>
				<ColorControl
					label={__('Description Color', 'gravisain')}
					value={descriptionColor}
					onChange={(val) => setAttributes({ descriptionColor: val })}
					disableGradient={true}
				/>
				<ResponsiveTabControl>
					{(currentDevice) => (
						<TypographyControl
							label={__('Typography', 'gravisain')}
							value={getResponsiveAttr('descriptionTypography', currentDevice)}
							onChange={(val) => setResponsiveAttr('descriptionTypography', val, currentDevice)}
						/>
					)}
				</ResponsiveTabControl>
			</div>
		</PanelBody>
	);
}
