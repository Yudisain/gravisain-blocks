import { __ } from '@wordpress/i18n';
import { PanelBody, SelectControl, RangeControl } from '@wordpress/components';
import ResponsiveAlignmentControl from '../../../../controls/ResponsiveAlignmentControl';

export default function LayoutPanel({ attributes, setAttributes }) {
	const { layout, innerContainerMaxWidth, textAlign, textAlignTablet, textAlignMobile } = attributes;
	const defaultAlign = layout === '1-column' ? 'center' : 'left';

	return (
		<PanelBody title={__('Layout Settings', 'gravisain-blocks')} initialOpen={true}>
			<SelectControl
				label={__('Layout Style', 'gravisain-blocks')}
				value={layout}
				options={[
					{ label: __('1 Column (Center)', 'gravisain-blocks'), value: '1-column' },
					{ label: __('2 Column', 'gravisain-blocks'), value: '2-column' },
					{ label: __('Reverse (Image Left)', 'gravisain-blocks'), value: 'reverse' },
					{ label: __('Full Width', 'gravisain-blocks'), value: 'full-width' },
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
				label={__('Inner Container Max Width (px)', 'gravisain-blocks')}
				help={__('Set to 0 to inherit theme container width.', 'gravisain-blocks')}
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
