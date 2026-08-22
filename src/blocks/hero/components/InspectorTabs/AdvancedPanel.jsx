import { __ } from '@wordpress/i18n';
import { PanelBody, TextControl, TextareaControl } from '@wordpress/components';

export default function AdvancedPanel({ attributes, setAttributes }) {
	const { anchor, customClassName, customCSS } = attributes;

	return (
		<PanelBody title={__('Advanced Settings', 'gravisain')} initialOpen={false}>
			<TextControl
				label={__('HTML Anchor', 'gravisain')}
				help={__(
					'Enter a word or two — without spaces — to make a unique web address just for this block, called an "anchor". Then, you\'ll be able to link directly to this section of your page.',
					'gravisain'
				)}
				value={anchor}
				onChange={(val) => setAttributes({ anchor: val })}
			/>
			<TextControl
				label={__('Additional CSS class(es)', 'gravisain')}
				help={__('Separate multiple classes with spaces.', 'gravisain')}
				value={customClassName}
				onChange={(val) => setAttributes({ customClassName: val })}
			/>
			<TextareaControl
				label={__('Additional CSS', 'gravisain')}
				help={__(
					'Add your own CSS to customize the appearance of this block. You do not need to include a CSS selector, just add the property and value, e.g. color: red;.',
					'gravisain'
				)}
				value={customCSS}
				onChange={(val) => setAttributes({ customCSS: val })}
				rows={4}
			/>
		</PanelBody>
	);
}
