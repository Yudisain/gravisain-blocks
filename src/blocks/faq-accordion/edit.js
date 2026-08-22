import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import Inspector from './components/Inspector';
import './editor.scss';

const ALLOWED_BLOCKS = [ 'gravisain/faq-item' ];
const TEMPLATE = [
	[ 'gravisain/faq-item', { question: 'What makes Gravisain Theme special?' } ],
	[ 'gravisain/faq-item', { question: 'Is it compatible with Gutenberg FSE?' } ],
	[ 'gravisain/faq-item', { question: 'How fast is the performance?' } ],
];

export default function Edit( props ) {
	const { attributes } = props;
	const {
		itemGap,
		maxWidth,
		marginTop,
		marginBottom,
		paddingTop,
		paddingBottom,
		paddingLeft,
		paddingRight,
	} = attributes;

	const blockProps = useBlockProps( {
		className: 'gravisain-faq-accordion',
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
		<>
			<Inspector { ...props } />
			<div { ...blockProps }>
				<InnerBlocks
					allowedBlocks={ ALLOWED_BLOCKS }
					template={ TEMPLATE }
				/>
			</div>
		</>
	);
}
