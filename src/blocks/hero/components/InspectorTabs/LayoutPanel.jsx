import { __ } from '@wordpress/i18n';
import { PanelBody, SelectControl, RangeControl } from '@wordpress/components';
import ResponsiveAlignmentControl from '../../../../controls/ResponsiveAlignmentControl';

export default function LayoutPanel({ attributes, setAttributes }) {
	const { layout, innerContainerMaxWidth, textAlign, textAlignTablet, textAlignMobile } = attributes;
	const defaultAlign = layout === '1-column' ? 'center' : 'left';

	return (
		<PanelBody title={__('Layout Settings', 'gravisain')} initialOpen={true}>
			<SelectControl
				label={__('Layout Style', 'gravisain')}
				value={layout}
				options={[
					{ label: __('1 Column (Center)', 'gravisain'), value: '1-column' },
					{ label: __('2 Column', 'gravisain'), value: '2-column' },
					{ label: __('Reverse (Image Left)', 'gravisain'), value: 'reverse' },
					{ label: __('Full Width', 'gravisain'), value: 'full-width' },
				]}
				onChange={(val) => setAttributes({ layout: val })}
			/>
			<ResponsiveAlignmentControl
				textAlign={textAlign}
				textAlignTablet={textAlignTablet}
				textAlignMobile={textAlignMobile}
				defaultAlign={defaultAlign}
				onChangeDesktop={(val) => setAttributes({ textAlign: val })}
				onChangeTablet={(val) => setAttributes({ textAlignTablet: val })}
				onChangeMobile={(val) => setAttributes({ textAlignMobile: val })}
			/>
			<RangeControl
				label={__('Inner Container Max Width (px)', 'gravisain')}
				help={__('Set to 0 to inherit theme container width.', 'gravisain')}
				value={innerContainerMaxWidth ? parseInt(innerContainerMaxWidth) : 0}
				onChange={(val) => setAttributes({ innerContainerMaxWidth: val > 0 ? `${val}px` : '' })}
				min={0}
				max={1800}
				step={10}
				allowReset
			/>
		</PanelBody>
	);
}
