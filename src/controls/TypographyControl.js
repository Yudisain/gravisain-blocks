import { __ } from '@wordpress/i18n';
import { BaseControl, SelectControl, RangeControl } from '@wordpress/components';
import googleFonts from './google-fonts.json';

const fontOptions = [
	{ label: __('Inherit', 'gravisain'), value: '' },
	...Object.keys(googleFonts).map(fontName => ({
		label: fontName,
		value: fontName
	}))
];

export default function TypographyControl({ label, value = {}, onChange }) {
	const { fontFamily, fontSize, fontWeight, lineHeight, letterSpacing } = value;

	const handleChange = (key, newValue) => {
		onChange({ ...value, [key]: newValue });
	};

	const parseNumber = (val) => {
		if (typeof val === 'number') return val;
		if (typeof val === 'string' && val !== '') return parseFloat(val);
		return undefined;
	};

	return (
		<BaseControl label={label} className="gravisain-typography-control">
			<div style={{ paddingLeft: '10px', borderLeft: '2px solid #e2e4e7', marginBottom: '15px' }}>
				<SelectControl
					label={__('Font Family', 'gravisain')}
					value={fontFamily || ''}
					options={fontOptions}
					onChange={(val) => handleChange('fontFamily', val)}
				/>
				
				<div style={{ marginTop: '10px' }}>
					<RangeControl
						label={__('Size (px)', 'gravisain')}
						value={parseNumber(fontSize)}
						onChange={(val) => handleChange('fontSize', val)}
						min={8}
						max={120}
						allowReset
					/>
				</div>
				
				<div style={{ marginTop: '10px' }}>
					<SelectControl
						label={__('Weight', 'gravisain')}
						value={fontWeight || ''}
						options={[
							{ label: __('Inherit', 'gravisain'), value: '' },
							{ label: 'Normal', value: 'normal' },
							{ label: 'Bold', value: 'bold' },
							{ label: '100', value: '100' },
							{ label: '200', value: '200' },
							{ label: '300', value: '300' },
							{ label: '400', value: '400' },
							{ label: '500', value: '500' },
							{ label: '600', value: '600' },
							{ label: '700', value: '700' },
							{ label: '800', value: '800' },
							{ label: '900', value: '900' },
						]}
						onChange={(val) => handleChange('fontWeight', val)}
					/>
				</div>

				<div style={{ marginTop: '10px' }}>
					<RangeControl
						label={__('Line Height', 'gravisain')}
						value={parseNumber(lineHeight)}
						onChange={(val) => handleChange('lineHeight', val)}
						min={0.5}
						max={3}
						step={0.1}
						allowReset
					/>
				</div>
				<div style={{ marginTop: '10px' }}>
					<RangeControl
						label={__('Letter Spacing (px)', 'gravisain')}
						value={parseNumber(letterSpacing)}
						onChange={(val) => handleChange('letterSpacing', val)}
						min={-5}
						max={15}
						step={0.1}
						allowReset
					/>
				</div>
			</div>
		</BaseControl>
	);
}
