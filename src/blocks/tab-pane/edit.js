import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import './editor.scss';

export default function Edit( props ) {
	const { clientId, context } = props;

	const tabIndex = useSelect( ( select ) => {
		const { getBlockOrder, getBlockRootClientId } = select( 'core/block-editor' );
		const parentId = getBlockRootClientId( clientId );
		if ( ! parentId ) return 0;
		const siblings = getBlockOrder( parentId );
		return siblings.indexOf( clientId );
	}, [ clientId ] );

	const activeTab = context[ 'gravisain/activeTab' ] !== undefined ? context[ 'gravisain/activeTab' ] : 0;
	const isActive = activeTab === tabIndex;

	const blockProps = useBlockProps( {
		className: `gravisain-tab-pane ${ isActive ? 'is-active' : '' }`,
		style: {
			display: isActive ? 'block' : 'none',
		},
	} );

	return (
		<div { ...blockProps }>
			<InnerBlocks
				template={ [ [ 'core/paragraph', { placeholder: 'Add tab content here...' } ] ] }
				templateLock={ false }
			/>
		</div>
	);
}
