import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import Inspector from './components/Inspector';
import parseCustomCSS from '../../controls/parseCustomCSS';
import './editor.scss';

export default function Edit( props ) {
	const { attributes, setAttributes } = props;
	const {
		title,
		allowedHeaders = [ false, true, true, true, false, false ],
		listStyle,
		collapsible,
		containerBackgroundColor,
		titleColor,
		linkColor,
		borderColor,
		borderRadius,
		contentPadding,
		anchor,
		customClassName,
		customCSS,
	} = attributes;

	const headings = useSelect( ( select ) => {
		const blocks = select( 'core/block-editor' ).getBlocks();
		const extracted = [];

		const scanBlocks = ( blockList ) => {
			blockList.forEach( ( block ) => {
				if ( block.name === 'core/heading' ) {
					const level = block.attributes.level || 2;
					if ( allowedHeaders[ level - 1 ] ) {
						extracted.push( {
							clientId: block.clientId,
							level,
							content: block.attributes.content || __( '(Empty Heading)', 'gravisain' ),
						} );
					}
				}
				if ( block.innerBlocks && block.innerBlocks.length > 0 ) {
					scanBlocks( block.innerBlocks );
				}
			} );
		};

		scanBlocks( blocks );
		return extracted;
	}, [ allowedHeaders ] );

	const blockProps = useBlockProps( {
		id: anchor || undefined,
		className: [
			'gravisain-table-of-contents',
			`list-style-${ listStyle || 'ul' }`,
			customClassName || '',
		].filter( Boolean ).join( ' ' ),
		style: {
			'--gravisain-toc-bg': containerBackgroundColor || '#f8fafc',
			'--gravisain-toc-title-color': titleColor || '#1a202c',
			'--gravisain-toc-link-color': linkColor || '#007cba',
			'--gravisain-toc-border-color': borderColor || '#e2e8f0',
			'--gravisain-toc-radius': `${ borderRadius }px`,
			'--gravisain-toc-padding': `${ contentPadding }px`,
			...parseCustomCSS( customCSS ),
		},
	} );

	const ListTag = listStyle === 'ol' ? 'ol' : 'ul';

	return (
		<>
			<Inspector { ...props } />
			<nav { ...blockProps }>
				<div className="gravisain-toc-header">
					<RichText
						tagName="h4"
						className="gravisain-toc-title"
						value={ title }
						onChange={ ( val ) => setAttributes( { title: val } ) }
						placeholder={ __( 'Table of Contents...', 'gravisain' ) }
					/>
					{ collapsible && (
						<span className="gravisain-toc-toggle dashicons dashicons-arrow-up-alt2" />
					) }
				</div>

				<div className="gravisain-toc-content">
					{ headings.length === 0 ? (
						<p className="gravisain-toc-empty">
							{ __( 'Add heading blocks (H2, H3, H4) to generate a table of contents.', 'gravisain' ) }
						</p>
					) : (
						<ListTag className="gravisain-toc-list">
							{ headings.map( ( h, index ) => (
								<li key={ index } className={ `gravisain-toc-item level-${ h.level }` }>
									<span dangerouslySetInnerHTML={ { __html: h.content } } />
								</li>
							) ) }
						</ListTag>
					) }
				</div>
			</nav>
		</>
	);
}
