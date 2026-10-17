import { __ } from '@wordpress/i18n';
import { PanelBody } from '@wordpress/components';
import SpacingControl from '../../../../controls/SpacingControl';
import ResponsiveTabControl from '../../../../controls/ResponsiveTabControl';

export default function SpacingPanel({ attributes, setAttributes }) {
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
		<PanelBody title={__('Spacing & Margin', 'gravisain')} initialOpen={false}>
			<ResponsiveTabControl>
				{(currentDevice) => (
					<>
						<SpacingControl
							label={__('Padding', 'gravisain')}
							value={getResponsiveAttr('padding', currentDevice)}
							onChange={(val) => setResponsiveAttr('padding', val, currentDevice)}
						/>
						<SpacingControl
							label={__('Margin', 'gravisain')}
							value={getResponsiveAttr('margin', currentDevice)}
							onChange={(val) => setResponsiveAttr('margin', val, currentDevice)}
							allowNegative={true}
						/>
					</>
				)}
			</ResponsiveTabControl>
		</PanelBody>
	);
}
