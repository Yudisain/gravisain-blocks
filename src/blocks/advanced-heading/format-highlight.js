import { __ } from '@wordpress/i18n';
import { registerFormatType, toggleFormat } from '@wordpress/rich-text';
import { RichTextToolbarButton } from '@wordpress/block-editor';

const name = 'gravisain/highlight';
const title = __( 'Highlight Text', 'gravisain' );

const HighlightIcon = (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
	>
		<path d="M12 20h9" />
		<path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
		<path d="M15 5l4 4" />
	</svg>
);

registerFormatType( name, {
	title,
	tagName: 'mark',
	className: 'gravisain-highlight',
	edit: ( { isActive, value, onChange } ) => {
		const onToggle = () => {
			onChange(
				toggleFormat( value, {
					type: name,
				} )
			);
		};

		return (
			<RichTextToolbarButton
				icon={ HighlightIcon }
				title={ title }
				onClick={ onToggle }
				isActive={ isActive }
			/>
		);
	},
} );
