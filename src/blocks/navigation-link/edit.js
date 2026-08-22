import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText, InspectorControls, URLInput } from '@wordpress/block-editor';
import { PanelBody, ToggleControl } from '@wordpress/components';
import './editor.scss';

export default function Edit( { attributes, setAttributes } ) {
	const { label, url, opensInNewTab } = attributes;
	const blockProps = useBlockProps( {
		className: 'gravisain-nav-link-item'
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Link Settings', 'gravisain-blocks' ) }>
					<div className="gravisain-nav-url-input">
						<label>{ __( 'URL', 'gravisain-blocks' ) }</label>
						<URLInput
							value={ url }
							onChange={ ( value ) => setAttributes( { url: value } ) }
						/>
					</div>
					<ToggleControl
						label={ __( 'Open in new tab', 'gravisain-blocks' ) }
						checked={ opensInNewTab }
						onChange={ ( value ) => setAttributes( { opensInNewTab: value } ) }
					/>
				</PanelBody>
			</InspectorControls>
			<div { ...blockProps }>
				<RichText
					tagName="span"
					className="gravisain-nav-link-label"
					value={ label }
					onChange={ ( value ) => setAttributes( { label: value } ) }
					placeholder={ __( 'Add Link...', 'gravisain-blocks' ) }
					allowedFormats={ [ 'core/bold', 'core/italic' ] }
				/>
			</div>
		</>
	);
}
