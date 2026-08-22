import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import Inspector from './components/Inspector';
import './editor.scss';

export default function Edit( { attributes, setAttributes } ) {
	const { 
		placeholder, showButton, buttonText, buttonPosition,
		inputBackgroundColor, inputTextColor, buttonBackgroundColor, buttonTextColor,
		borderRadius
	} = attributes;

	const blockProps = useBlockProps( {
		className: `gravisain-search-wrapper pos-${buttonPosition}`,
		style: {
			'--gravisain-search-input-bg': inputBackgroundColor,
			'--gravisain-search-input-color': inputTextColor,
			'--gravisain-search-btn-bg': buttonBackgroundColor,
			'--gravisain-search-btn-color': buttonTextColor,
			'--gravisain-search-radius': `${borderRadius}px`,
		}
	} );

	return (
		<>
			<Inspector attributes={ attributes } setAttributes={ setAttributes } />
			<div { ...blockProps }>
				<form className="gravisain-search-form" onSubmit={ ( e ) => e.preventDefault() }>
					<input 
						type="search" 
						className="gravisain-search-input" 
						placeholder={ placeholder } 
						readOnly
					/>
					{ showButton && (
						<button type="button" className="gravisain-search-submit">
							{ buttonPosition === 'inside' ? (
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
									<path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
								</svg>
							) : (
								buttonText
							) }
						</button>
					) }
				</form>
			</div>
		</>
	);
}
