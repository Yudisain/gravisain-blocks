import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import Inspector from './components/Inspector';
import './editor.scss';

const ALLOWED_BLOCKS = [ 'gravisain/feature-card' ];
const TEMPLATE = [
	[ 'gravisain/feature-card', {} ],
	[ 'gravisain/feature-card', {} ],
	[ 'gravisain/feature-card', {} ],
];

export default function Edit( props ) {
	const { attributes } = props;
	const {
		columns,
		columnsTablet,
		columnsMobile,
		columnGap,
		rowGap,
		marginTop,
		marginBottom,
		paddingTop,
		paddingBottom,
		paddingLeft,
		paddingRight,
	} = attributes;

	const blockProps = useBlockProps( {
		className: `gravisain-features-grid has-${ columns || 3 }-columns`,
		style: {
			'--grid-cols': columns ?? 3,
			'--grid-cols-tab': columnsTablet ?? 2,
			'--grid-cols-mob': columnsMobile ?? 1,
			'--col-gap': `${ columnGap ?? 32 }px`,
			'--row-gap': `${ rowGap ?? 32 }px`,
			'--mt': `${ marginTop ?? 32 }px`,
			'--mb': `${ marginBottom ?? 32 }px`,
			'--pt': `${ paddingTop ?? 0 }px`,
			'--pb': `${ paddingBottom ?? 0 }px`,
			'--pl': `${ paddingLeft ?? 0 }px`,
			'--pr': `${ paddingRight ?? 0 }px`,
		},
	} );

	return (
		<>
			<Inspector { ...props } />
			<div { ...blockProps }>
				<InnerBlocks
					allowedBlocks={ ALLOWED_BLOCKS }
					template={ TEMPLATE }
					orientation="horizontal"
				/>
			</div>
		</>
	);
}
