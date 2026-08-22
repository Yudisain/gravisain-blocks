<?php
/**
 * Pattern: 3-Column Feature Grid
 *
 * @package Gravisain\Blocks
 */

return [
	'slug'        => 'gravisain-blocks/feature-grid-3col',
	'title'       => __( '3-Column Feature Grid with Cards', 'gravisain-blocks' ),
	'categories'  => [ 'gravisain-sections' ],
	'description' => __( 'A clean 3-column grid highlighting key product features or agency benefits.', 'gravisain-blocks' ),
	'content'     => '<!-- wp:group {"align":"full","style":{"spacing":{"padding":{"top":"var:preset|spacing|70","bottom":"var:preset|spacing|70","left":"var:preset|spacing|40","right":"var:preset|spacing|40"}}},"layout":{"type":"constrained","contentSize":"1160px"}} -->
<div class="wp-block-group alignfull" style="padding-top:var(--wp--preset--spacing--70);padding-right:var(--wp--preset--spacing--40);padding-bottom:var(--wp--preset--spacing--70);padding-left:var(--wp--preset--spacing--40)">
	<!-- wp:heading {"textAlign":"center","style":{"typography":{"fontSize":"2.25rem","fontWeight":"700"}}} -->
	<h2 class="wp-block-heading has-text-align-center" style="font-size:2.25rem;font-weight:700">' . esc_html__( 'Engineered For Speed & Scale', 'gravisain-blocks' ) . '</h2>
	<!-- /wp:heading -->

	<!-- wp:paragraph {"align":"center","style":{"typography":{"fontSize":"1.125rem"},"spacing":{"margin":{"bottom":"48px"}}}} -->
	<p class="has-text-align-center" style="margin-bottom:48px;font-size:1.125rem">' . esc_html__( 'Discover what makes Gravisain the ultimate choice for high-performance websites.', 'gravisain-blocks' ) . '</p>
	<!-- /wp:paragraph -->

	<!-- wp:columns {"align":"wide","style":{"spacing":{"blockGap":{"top":"32px","left":"32px"}}}} -->
	<div class="wp-block-columns alignwide">
		<!-- wp:column {"style":{"spacing":{"padding":{"top":"32px","right":"32px","bottom":"32px","left":"32px"}},"border":{"radius":"8px","width":"1px","color":"#e2e8f0"}}} -->
		<div class="wp-block-column has-border-color" style="border-color:#e2e8f0;border-width:1px;border-radius:8px;padding-top:32px;padding-right:32px;padding-bottom:32px;padding-left:32px">
			<!-- wp:heading {"level":3,"style":{"typography":{"fontSize":"1.35rem","fontWeight":"700"}}} -->
			<h3 class="wp-block-heading" style="font-size:1.35rem;font-weight:700">⚡ ' . esc_html__( 'Blazing Performance', 'gravisain-blocks' ) . '</h3>
			<!-- /wp:heading -->
			<!-- wp:paragraph {"style":{"typography":{"fontSize":"0.95rem","lineHeight":"1.6"}}} -->
			<p style="font-size:0.95rem;line-height:1.6">' . esc_html__( 'Zero bloat, zero jQuery dependency, and conditional asset loading guarantee Google PageSpeed scores of 95–100.', 'gravisain-blocks' ) . '</p>
			<!-- /wp:paragraph -->
		</div>
		<!-- /wp:column -->

		<!-- wp:column {"style":{"spacing":{"padding":{"top":"32px","right":"32px","bottom":"32px","left":"32px"}},"border":{"radius":"8px","width":"1px","color":"#e2e8f0"}}} -->
		<div class="wp-block-column has-border-color" style="border-color:#e2e8f0;border-width:1px;border-radius:8px;padding-top:32px;padding-right:32px;padding-bottom:32px;padding-left:32px">
			<!-- wp:heading {"level":3,"style":{"typography":{"fontSize":"1.35rem","fontWeight":"700"}}} -->
			<h3 class="wp-block-heading" style="font-size:1.35rem;font-weight:700">🎨 ' . esc_html__( 'Visual Header & Footer', 'gravisain-blocks' ) . '</h3>
			<!-- /wp:heading -->
			<!-- wp:paragraph {"style":{"typography":{"fontSize":"0.95rem","lineHeight":"1.6"}}} -->
			<p style="font-size:0.95rem;line-height:1.6">' . esc_html__( 'Build custom 3-row headers and footers with real-time drag-and-drop live preview inside the WordPress Customizer.', 'gravisain-blocks' ) . '</p>
			<!-- /wp:paragraph -->
		</div>
		<!-- /wp:column -->

		<!-- wp:column {"style":{"spacing":{"padding":{"top":"32px","right":"32px","bottom":"32px","left":"32px"}},"border":{"radius":"8px","width":"1px","color":"#e2e8f0"}}} -->
		<div class="wp-block-column has-border-color" style="border-color:#e2e8f0;border-width:1px;border-radius:8px;padding-top:32px;padding-right:32px;padding-bottom:32px;padding-left:32px">
			<!-- wp:heading {"level":3,"style":{"typography":{"fontSize":"1.35rem","fontWeight":"700"}}} -->
			<h3 class="wp-block-heading" style="font-size:1.35rem;font-weight:700">🛡️ ' . esc_html__( 'Enterprise Grade Security', 'gravisain-blocks' ) . '</h3>
			<!-- /wp:heading -->
			<!-- wp:paragraph {"style":{"typography":{"fontSize":"0.95rem","lineHeight":"1.6"}}} -->
			<p style="font-size:0.95rem;line-height:1.6">' . esc_html__( 'Strict sanitization, rate-limited AJAX, SQLi/XSS prevention, and GDPR-compliant local Google Font downloading.', 'gravisain-blocks' ) . '</p>
			<!-- /wp:paragraph -->
		</div>
		<!-- /wp:column -->
	</div>
	<!-- /wp:columns -->
</div>
<!-- /wp:group -->',
];
