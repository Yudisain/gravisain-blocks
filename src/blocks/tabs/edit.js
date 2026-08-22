import { __ } from '@wordpress/i18n';
import { useEffect } from '@wordpress/element';
import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';
import { useSelect, useDispatch } from '@wordpress/data';
import { Button, Tooltip } from '@wordpress/components';
import { createBlock } from '@wordpress/blocks';
import Inspector from './components/Inspector';
import parseCustomCSS from '../../controls/parseCustomCSS';
import './editor.scss';

const ALLOWED_BLOCKS = [ 'gravisain/tab-pane' ];
const TEMPLATE = [
	[ 'gravisain/tab-pane', { title: 'First Tab' } ],
	[ 'gravisain/tab-pane', { title: 'Second Tab' } ],
];

export default function Edit( props ) {
	const { attributes, setAttributes, clientId } = props;
	const {
		tabTitles = [],
		activeTab = 0,
		layout,
		tabAlignment,
		headerBackgroundColor,
		activeTabColor,
		activeTabTextColor,
		tabTextColor,
		contentBackgroundColor,
		contentPadding,
		borderRadius,
		borderWidth,
		borderColor,
		anchor,
		customClassName,
		customCSS,
	} = attributes;

	const { updateBlockAttributes, insertBlock, removeBlock } = useDispatch( 'core/block-editor' );

	const childBlocks = useSelect( ( select ) => {
		return select( 'core/block-editor' ).getBlocks( clientId );
	}, [ clientId ] );

	// Keep tabTitles attribute in sync with childBlocks so save.js knows exact titles
	useEffect( () => {
		if ( ! childBlocks || childBlocks.length === 0 ) return;
		const currentTitles = childBlocks.map( ( block, idx ) => ( {
			title: block.attributes?.title || `Tab ${ idx + 1 }`,
		} ) );
		// Compare to avoid infinite re-renders
		if ( JSON.stringify( currentTitles ) !== JSON.stringify( tabTitles ) ) {
			setAttributes( { tabTitles: currentTitles } );
		}
	}, [ childBlocks, tabTitles ] );

	const updateTabTitle = ( childId, index, newTitle ) => {
		updateBlockAttributes( childId, { title: newTitle } );
		const updatedTitles = [ ...tabTitles ];
		updatedTitles[ index ] = { title: newTitle };
		setAttributes( { tabTitles: updatedTitles } );
	};

	const addNewTab = () => {
		const newIndex = childBlocks.length;
		const newTitle = `Tab ${ newIndex + 1 }`;
		const newPane = createBlock( 'gravisain/tab-pane', { title: newTitle } );
		insertBlock( newPane, newIndex, clientId );
		setAttributes( { activeTab: newIndex } );
	};

	const removeTab = ( childId, index ) => {
		if ( childBlocks.length <= 1 ) return;
		removeBlock( childId );
		if ( activeTab >= index && activeTab > 0 ) {
			setAttributes( { activeTab: activeTab - 1 } );
		}
	};

	const blockProps = useBlockProps( {
		id: anchor || undefined,
		className: [
			'gravisain-tabs',
			`layout-${ layout || 'horizontal' }`,
			`align-${ tabAlignment || 'left' }`,
			customClassName || '',
		].filter( Boolean ).join( ' ' ),
		style: {
			'--gravisain-tabs-header-bg': headerBackgroundColor || '#f8fafc',
			'--gravisain-tabs-active-bg': activeTabColor || '#007cba',
			'--gravisain-tabs-active-color': activeTabTextColor || '#ffffff',
			'--gravisain-tabs-color': tabTextColor || '#333333',
			'--gravisain-tabs-content-bg': contentBackgroundColor || '#ffffff',
			'--gravisain-tabs-padding': `${ contentPadding }px`,
			'--gravisain-tabs-radius': `${ borderRadius }px`,
			'--gravisain-tabs-border-width': `${ borderWidth }px`,
			'--gravisain-tabs-border-color': borderColor || '#e2e8f0',
			...parseCustomCSS( customCSS ),
		},
	} );

	return (
		<>
			<Inspector { ...props } />
			<div { ...blockProps }>
				<div className="gravisain-tabs-header">
					<div className="gravisain-tabs-nav">
						{ childBlocks.map( ( block, index ) => {
							const isActive = activeTab === index;
							return (
								<div
									key={ block.clientId }
									className={ `gravisain-tab-button ${ isActive ? 'is-active' : '' }` }
									onClick={ () => setAttributes( { activeTab: index } ) }
								>
									<RichText
										tagName="span"
										className="gravisain-tab-button-title"
										value={ block.attributes.title || `Tab ${ index + 1 }` }
										onChange={ ( val ) => updateTabTitle( block.clientId, index, val ) }
										placeholder={ __( 'Tab Title...', 'gravisain' ) }
									/>
									{ childBlocks.length > 1 && (
										<Tooltip text={ __( 'Remove Tab', 'gravisain' ) }>
											<Button
												className="gravisain-remove-tab"
												isSmall
												icon="no-alt"
												onClick={ ( e ) => {
													e.stopPropagation();
													removeTab( block.clientId, index );
												} }
											/>
										</Tooltip>
									) }
								</div>
							);
						} ) }
					</div>

					<Button variant="secondary" className="gravisain-add-tab-btn" onClick={ addNewTab } icon="plus">
						{ __( 'Add Tab', 'gravisain' ) }
					</Button>
				</div>

				<div className="gravisain-tabs-content-area">
					<InnerBlocks
						allowedBlocks={ ALLOWED_BLOCKS }
						template={ TEMPLATE }
						templateLock={ false }
					/>
				</div>
			</div>
		</>
	);
}
