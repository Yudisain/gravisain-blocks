import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import metadata from './block.json';

const v1 = {
	attributes: metadata.attributes,
	save( { attributes } ) {
		const {
			itemGap,
			maxWidth,
			allowMultipleOpen,
			marginTop,
			marginBottom,
			paddingTop,
			paddingBottom,
			paddingLeft,
			paddingRight,
		} = attributes;

		const blockProps = useBlockProps.save( {
			className: 'gravisain-faq-accordion',
			'data-allow-multiple': allowMultipleOpen ? 'true' : 'false',
			style: {
				'--faq-gap': `${ itemGap ?? 16 }px`,
				'--faq-max-width': `${ maxWidth ?? 800 }px`,
				'--faq-mt': `${ marginTop ?? 32 }px`,
				'--faq-mb': `${ marginBottom ?? 32 }px`,
				'--faq-pt': `${ paddingTop ?? 0 }px`,
				'--faq-pb': `${ paddingBottom ?? 0 }px`,
				'--faq-pl': `${ paddingLeft ?? 0 }px`,
				'--faq-pr': `${ paddingRight ?? 0 }px`,
			},
		} );

		return (
			<div { ...blockProps }>
				<InnerBlocks.Content />
			</div>
		);
	},
};

export default [ v1 ];
