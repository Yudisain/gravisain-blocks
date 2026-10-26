import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { TabPanel } from '@wordpress/components';
import LayoutPanel from './InspectorTabs/LayoutPanel';
import BackgroundPanel from './InspectorTabs/BackgroundPanel';
import MediaPanel from './InspectorTabs/MediaPanel';
import TypographyPanel from './InspectorTabs/TypographyPanel';
import SpacingPanel from './InspectorTabs/SpacingPanel';
import ButtonsPanel from './InspectorTabs/ButtonsPanel';
import AdvancedPanel from './InspectorTabs/AdvancedPanel';

export default function Inspector({ attributes, setAttributes }) {
	return (
		<InspectorControls>
			<TabPanel
				className="gravisain-inspector-tabs"
				activeClass="active-tab"
				tabs={[
					{
						name: 'general',
						title: __('General', 'gravisain-blocks'),
						className: 'gravisain-tab-general',
					},
					{
						name: 'style',
						title: __('Style', 'gravisain-blocks'),
						className: 'gravisain-tab-style',
					},
					{
						name: 'advanced',
						title: __('Advanced', 'gravisain-blocks'),
						className: 'gravisain-tab-advanced',
					},
				]}
			>
				{(tab) => (
					<div className="gravisain-tab-content">
						{tab.name === 'general' && (
							<>
								<LayoutPanel attributes={attributes} setAttributes={setAttributes} />
								<BackgroundPanel attributes={attributes} setAttributes={setAttributes} />
								<MediaPanel attributes={attributes} setAttributes={setAttributes} />
							</>
						)}

						{tab.name === 'style' && (
							<>
								<SpacingPanel attributes={attributes} setAttributes={setAttributes} />
								<TypographyPanel attributes={attributes} setAttributes={setAttributes} />
								<ButtonsPanel attributes={attributes} setAttributes={setAttributes} />
							</>
						)}

						{tab.name === 'advanced' && (
							<AdvancedPanel attributes={attributes} setAttributes={setAttributes} />
						)}
					</div>
				)}
			</TabPanel>
		</InspectorControls>
	);
}
