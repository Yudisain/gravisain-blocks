import { __ } from '@wordpress/i18n';

export const INFOBOX_PRESETS = [
	{
		id: 'top-center',
		label: __( 'Top Center', 'gravisain-blocks' ),
		values: {
			textAlign: 'center',
			iconRadius: 10,
		},
		svg: (
			<svg viewBox="0 0 80 68" fill="none" xmlns="http://www.w3.org/2000/svg">
				<rect x="6" y="4" width="68" height="60" rx="4" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1.2" />
				<rect x="33" y="10" width="14" height="14" rx="2" fill="#ffffff" stroke="#94a3b8" strokeWidth="1" />
				<path d="M36 21l2.5-3 2 2.5 2.5-3.5 3 4h-10z" fill="#64748b" />
				<rect x="24" y="29" width="32" height="3.5" rx="1.75" fill="#334155" />
				<rect x="16" y="37" width="48" height="2" rx="1" fill="#64748b" />
				<rect x="20" y="42" width="40" height="2" rx="1" fill="#64748b" />
				<rect x="22" y="47" width="36" height="2" rx="1" fill="#64748b" />
				<rect x="30" y="54" width="20" height="2" rx="1" fill="#475569" />
			</svg>
		),
	},
	{
		id: 'top-center-circle',
		label: __( 'Center Circle', 'gravisain-blocks' ),
		values: {
			textAlign: 'center',
			iconRadius: 999,
		},
		svg: (
			<svg viewBox="0 0 80 68" fill="none" xmlns="http://www.w3.org/2000/svg">
				<rect x="6" y="4" width="68" height="60" rx="4" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.2" />
				<circle cx="40" cy="17" r="9" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1" />
				<rect x="35" y="12" width="10" height="10" rx="1.5" fill="#ffffff" />
				<path d="M37 20l2-2.5 1.5 2 2-2.5 2.5 3h-8z" fill="#64748b" />
				<rect x="24" y="31" width="32" height="3.5" rx="1.75" fill="#334155" />
				<rect x="16" y="39" width="48" height="2" rx="1" fill="#64748b" />
				<rect x="20" y="44" width="40" height="2" rx="1" fill="#64748b" />
				<rect x="22" y="49" width="36" height="2" rx="1" fill="#64748b" />
				<rect x="30" y="55" width="20" height="2" rx="1" fill="#475569" />
			</svg>
		),
	},
	{
		id: 'top-left',
		label: __( 'Top Left', 'gravisain-blocks' ),
		values: {
			textAlign: 'left',
			iconRadius: 10,
		},
		svg: (
			<svg viewBox="0 0 80 68" fill="none" xmlns="http://www.w3.org/2000/svg">
				<rect x="6" y="4" width="68" height="60" rx="4" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.2" />
				<rect x="12" y="10" width="14" height="14" rx="2" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1" />
				<path d="M14 21l2.5-3 2 2.5 2.5-3.5 3 4h-10z" fill="#64748b" />
				<rect x="12" y="30" width="34" height="3.5" rx="1.75" fill="#334155" />
				<rect x="12" y="38" width="56" height="2" rx="1" fill="#64748b" />
				<rect x="12" y="43" width="50" height="2" rx="1" fill="#64748b" />
				<rect x="12" y="48" width="42" height="2" rx="1" fill="#64748b" />
			</svg>
		),
	},
	{
		id: 'left-horizontal',
		label: __( 'Left Inline', 'gravisain-blocks' ),
		values: {
			textAlign: 'left',
			iconRadius: 10,
		},
		svg: (
			<svg viewBox="0 0 80 68" fill="none" xmlns="http://www.w3.org/2000/svg">
				<rect x="4" y="14" width="72" height="40" rx="4" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.2" />
				<rect x="10" y="21" width="16" height="16" rx="2" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1" />
				<path d="M13 33l2.5-3 2 2.5 2.5-3.5 3 4h-10z" fill="#64748b" />
				<rect x="32" y="22" width="28" height="3.5" rx="1.75" fill="#334155" />
				<rect x="32" y="30" width="38" height="2" rx="1" fill="#64748b" />
				<rect x="32" y="35" width="32" height="2" rx="1" fill="#64748b" />
			</svg>
		),
	},
	{
		id: 'overlap-center',
		label: __( 'Overlap Center', 'gravisain-blocks' ),
		values: {
			textAlign: 'center',
			iconRadius: 999,
		},
		svg: (
			<svg viewBox="0 0 80 68" fill="none" xmlns="http://www.w3.org/2000/svg">
				<rect x="6" y="17" width="68" height="47" rx="4" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.2" />
				<circle cx="40" cy="17" r="10" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.2" />
				<circle cx="40" cy="17" r="8" fill="#f1f5f9" />
				<rect x="35" y="12" width="10" height="10" rx="1" fill="#ffffff" stroke="#94a3b8" strokeWidth="0.8" />
				<path d="M37 20l2-2.5 1.5 2 2-2.5 2.5 3h-8z" fill="#64748b" />
				<rect x="24" y="33" width="32" height="3.5" rx="1.75" fill="#334155" />
				<rect x="16" y="41" width="48" height="2" rx="1" fill="#64748b" />
				<rect x="20" y="46" width="40" height="2" rx="1" fill="#64748b" />
				<rect x="30" y="53" width="20" height="2" rx="1" fill="#475569" />
			</svg>
		),
	},
	{
		id: 'overlap-left',
		label: __( 'Overlap Left', 'gravisain-blocks' ),
		values: {
			textAlign: 'left',
			iconRadius: 10,
		},
		svg: (
			<svg viewBox="0 0 80 68" fill="none" xmlns="http://www.w3.org/2000/svg">
				<rect x="6" y="17" width="68" height="47" rx="4" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.2" />
				<rect x="14" y="8" width="16" height="16" rx="3" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.2" />
				<rect x="16" y="10" width="12" height="12" rx="2" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="0.8" />
				<path d="M18 20l2-2.5 1.5 2 2-2.5 2.5 3h-8z" fill="#64748b" />
				<rect x="14" y="32" width="32" height="3.5" rx="1.75" fill="#334155" />
				<rect x="14" y="40" width="54" height="2" rx="1" fill="#64748b" />
				<rect x="14" y="45" width="46" height="2" rx="1" fill="#64748b" />
				<rect x="14" y="52" width="24" height="2" rx="1" fill="#475569" />
			</svg>
		),
	},
];

export default function LayoutPresets( { layoutPreset, textAlign, onSelectPreset } ) {
	const currentActive = layoutPreset || ( textAlign === 'center' ? 'top-center' : 'top-left' );

	return (
		<div className="gravisain-infobox-presets-wrapper">
			<style>{`
				.gravisain-infobox-presets-wrapper {
					margin: 8px 0 16px !important;
					width: 100% !important;
				}
				.gravisain-infobox-presets-grid {
					display: grid !important;
					grid-template-columns: repeat(3, 1fr) !important;
					gap: 8px !important;
					width: 100% !important;
					box-sizing: border-box !important;
				}
				.gravisain-infobox-preset-card {
					all: unset !important;
					display: flex !important;
					flex-direction: column !important;
					align-items: center !important;
					justify-content: flex-start !important;
					padding: 6px 4px 6px !important;
					background: #ffffff !important;
					border: 1.5px solid #e2e8f0 !important;
					border-radius: 8px !important;
					cursor: pointer !important;
					box-sizing: border-box !important;
					width: 100% !important;
					transition: all 0.15s ease-in-out !important;
					text-align: center !important;
					user-select: none !important;
				}
				.gravisain-infobox-preset-card:hover {
					border-color: #94a3b8 !important;
					background: #f8fafc !important;
					transform: translateY(-2px) !important;
					box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.08) !important;
				}
				.gravisain-infobox-preset-card.is-active {
					border-color: #2563eb !important;
					background: #eff6ff !important;
					box-shadow: 0 0 0 1.5px #2563eb !important;
				}
				.gravisain-infobox-preset-preview {
					width: 100% !important;
					height: 44px !important;
					display: flex !important;
					align-items: center !important;
					justify-content: center !important;
					pointer-events: none !important;
				}
				.gravisain-infobox-preset-preview svg {
					width: 100% !important;
					height: 100% !important;
					max-height: 42px !important;
					display: block !important;
					pointer-events: none !important;
				}
				.gravisain-infobox-preset-name {
					display: block !important;
					margin-top: 4px !important;
					font-size: 10.5px !important;
					font-weight: 500 !important;
					color: #475569 !important;
					line-height: 1.2 !important;
					white-space: nowrap !important;
					overflow: hidden !important;
					text-overflow: ellipsis !important;
					max-width: 100% !important;
					pointer-events: none !important;
				}
				.gravisain-infobox-preset-card.is-active .gravisain-infobox-preset-name {
					color: #1d4ed8 !important;
					font-weight: 700 !important;
				}
			`}</style>
			<div className="gravisain-infobox-presets-grid">
				{ INFOBOX_PRESETS.map( ( preset ) => {
					const isActive = currentActive === preset.id;
					return (
						<button
							type="button"
							key={ preset.id }
							className={ `gravisain-infobox-preset-card ${ isActive ? 'is-active' : '' }` }
							onClick={ ( e ) => {
								e.preventDefault();
								e.stopPropagation();
								onSelectPreset( preset );
							} }
							title={ preset.label }
							style={ {
								border: isActive ? '2px solid #2563eb' : '1.5px solid #e2e8f0',
								backgroundColor: isActive ? '#eff6ff' : '#ffffff',
								boxShadow: isActive ? '0 0 0 1.5px #2563eb' : 'none',
							} }
						>
							<div className="gravisain-infobox-preset-preview">
								{ preset.svg }
							</div>
							<span
								className="gravisain-infobox-preset-name"
								style={ {
									color: isActive ? '#1d4ed8' : '#475569',
									fontWeight: isActive ? 700 : 500,
								} }
							>
								{ preset.label }
							</span>
						</button>
					);
				} ) }
			</div>
		</div>
	);
}
