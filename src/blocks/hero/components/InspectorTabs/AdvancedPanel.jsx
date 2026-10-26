import { __ } from '@wordpress/i18n';
import { PanelBody, TextControl, TextareaControl } from '@wordpress/components';

export default function AdvancedPanel({ attributes, setAttributes }) {
	const { anchor, customClassName, customCSS } = attributes;

	return (
		<PanelBody title={__('Advanced Settings', 'gravisain-blocks')} initialOpen={false}>
			<TextControl
				label={__('HTML Anchor', 'gravisain-blocks')}
				help={__(
					'Enter a word or two — without spaces — to make a unique web address just for this block, called an "anchor". Then, you\'ll be able to link directly to this section of your page.',
					'gravisain-blocks'
				)}
				value={anchor}
				onChange={(val) => setAttributes({ anchor: val })}
			/>
			<TextControl
				label={__('Additional CSS class(es)', 'gravisain-blocks')}
				help={__('Separate multiple classes with spaces.', 'gravisain-blocks')}
				value={customClassName}
				onChange={(val) => setAttributes({ customClassName: val })}
			/>
			<TextareaControl
				label={__('Additional CSS', 'gravisain-blocks')}
				help={__(
					'Add your own CSS to customize the appearance of this block. You do not need to include a CSS selector, just add the property and value, e.g. color: red;.',
					'gravisain-blocks'
				)}
				value={customCSS}
				onChange={(val) => setAttributes({ customCSS: val })}
				rows={4}
			/>
		</PanelBody>
	);
}
