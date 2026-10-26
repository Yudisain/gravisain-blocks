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

const CloseIcon = () => (
	<svg
		width="12"
		height="12"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2.5"
		strokeLinecap="round"
		strokeLinejoin="round"
		style={ { display: 'block' } }
	>
		<line x1="18" y1="6" x2="6" y2="18" />
		<line x1="6" y1="6" x2="18" y2="18" />
	</svg>
);

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

	const effectiveAlignment = layout === 'vertical'
		? ( tabAlignment === 'bottom' || tabAlignment === 'right' ? 'bottom' : tabAlignment === 'center' ? 'center' : 'top' )
		: ( tabAlignment === 'right' || tabAlignment === 'bottom' ? 'right' : tabAlignment === 'center' ? 'center' : 'left' );

	const isVertical = layout === 'vertical';
	const headerJustifyContent = isVertical
		? ( effectiveAlignment === 'center' ? 'center' : effectiveAlignment === 'bottom' ? 'flex-end' : 'flex-start' )
		: undefined;
	const navJustifyContent = ! isVertical
		? ( effectiveAlignment === 'center' ? 'center' : effectiveAlignment === 'right' ? 'flex-end' : 'flex-start' )
		: undefined;

	const blockProps = useBlockProps( {
		id: anchor || undefined,
		className: [
			'gravisain-tabs',
			`layout-${ layout || 'horizontal' }`,
			`align-${ effectiveAlignment }`,
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
			...( isVertical ? { display: 'flex', flexDirection: 'row', alignItems: 'stretch', minHeight: '260px' } : {} ),
			...parseCustomCSS( customCSS ),
		},
	} );

	return (
		<>
			<Inspector { ...props } />
			<div { ...blockProps }>
				<div
					className="gravisain-tabs-header"
					style={
						isVertical
							? {
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'stretch',
								justifyContent: headerJustifyContent,
								minWidth: '200px',
								flexShrink: 0,
								alignSelf: 'stretch',
							}
							: undefined
					}
				>
					<div
						className="gravisain-tabs-nav"
						style={
							! isVertical
								? {
									display: 'flex',
									flexDirection: 'row',
									flexWrap: 'wrap',
									flex: '1 1 0%',
									justifyContent: navJustifyContent,
									minHeight: 0,
									width: '100%',
								}
								: {
									display: 'flex',
									flexDirection: 'column',
									width: '100%',
								}
						}
					>
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
										placeholder={ __( 'Tab Title...', 'gravisain-blocks' ) }
									/>
									{ childBlocks.length > 1 && (
										<Tooltip text={ __( 'Remove Tab', 'gravisain-blocks' ) }>
											<Button
												className="gravisain-remove-tab"
												isSmall
												icon={ <CloseIcon /> }
												onClick={ ( e ) => {
													e.stopPropagation();
													removeTab( block.clientId, index );
												} }
												aria-label={ __( 'Remove Tab', 'gravisain-blocks' ) }
											/>
										</Tooltip>
									) }
								</div>
							);
						} ) }
					</div>

					<Button variant="secondary" className="gravisain-add-tab-btn" onClick={ addNewTab } icon="plus">
						{ __( 'Add Tab', 'gravisain-blocks' ) }
					</Button>
				</div>

				<div
					className="gravisain-tabs-content-area"
					style={ isVertical ? { flex: '1 1 auto', minWidth: 0, alignSelf: 'stretch' } : undefined }
				>
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
