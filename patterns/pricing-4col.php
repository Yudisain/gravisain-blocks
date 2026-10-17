<?php
/**
 * Pattern: 4-Column Pricing Cards
 *
 * @package Gravisain\Blocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

return [
	'slug'          => 'gravisain-blocks/pricing-4col',
	'title'         => __( '4-Column Pricing Table (Software Ecosystem)', 'gravisain-blocks' ),
	'categories'    => [ 'gravisain-pricing', 'gravisain-sections' ],
	'viewportWidth' => 1200,
	'description'   => __( 'Modern 4-column pricing cards for Gravisain theme and plugins.', 'gravisain-blocks' ),
	'content'       => '<!-- wp:group {"align":"full","style":{"spacing":{"padding":{"top":"60px","bottom":"80px","left":"24px","right":"24px"}}},"layout":{"type":"constrained","contentSize":"1200px"}} -->
<div class="wp-block-group alignfull" style="padding-top:60px;padding-right:24px;padding-bottom:80px;padding-left:24px">
	<!-- wp:paragraph {"align":"center","style":{"typography":{"fontSize":"12px","fontWeight":"700","textTransform":"uppercase"}},"color":"primary"} -->
	<p class="has-text-align-center has-primary-color has-text-color" style="font-size:12px;font-weight:700;text-transform:uppercase">★ ' . esc_html__( 'OFFICIAL SOFTWARE', 'gravisain-blocks' ) . '</p>
	<!-- /wp:paragraph -->

	<!-- wp:heading {"textAlign":"center","style":{"typography":{"fontSize":"2.25rem","fontWeight":"800"}}} -->
	<h2 class="wp-block-heading has-text-align-center" style="font-size:2.25rem;font-weight:800">' . esc_html__( 'Gravisain Themes & Plugins', 'gravisain-blocks' ) . '</h2>
	<!-- /wp:heading -->

	<!-- wp:paragraph {"align":"center","style":{"typography":{"fontSize":"1.125rem"},"spacing":{"margin":{"bottom":"48px"}}}} -->
	<p class="has-text-align-center" style="margin-bottom:48px;font-size:1.125rem">' . esc_html__( 'Select the product you need and get instant access to premium features.', 'gravisain-blocks' ) . '</p>
	<!-- /wp:paragraph -->

	<!-- wp:columns {"align":"wide","style":{"spacing":{"blockGap":{"top":"24px","left":"24px"}}}} -->
	<div class="wp-block-columns alignwide">
		<!-- wp:column {"style":{"spacing":{"padding":{"top":"32px","right":"20px","bottom":"32px","left":"20px"}},"border":{"radius":"12px","width":"1px","color":"#e2e8f0"}},"backgroundColor":"base"} -->
		<div class="wp-block-column has-border-color has-base-background-color has-background" style="border-color:#e2e8f0;border-width:1px;border-radius:12px;padding-top:32px;padding-right:20px;padding-bottom:32px;padding-left:20px">
			<!-- wp:paragraph {"style":{"typography":{"fontSize":"11px","fontWeight":"700"}}} -->
			<p style="font-size:11px;font-weight:700"><span style="background:#eef2ff;color:#4338ca;border:1px solid #e0e7ff;padding:3px 8px;border-radius:6px;font-family:monospace;white-space:nowrap;display:inline-block">v1.0.0</span> <span style="background:#ecfdf5;color:#047857;border:1px solid #a7f3d0;padding:3px 8px;border-radius:6px;margin-left:6px;white-space:nowrap;display:inline-block">3-Day Trial</span></p>
			<!-- /wp:paragraph -->

			<!-- wp:heading {"level":3,"style":{"typography":{"fontSize":"1.3rem","fontWeight":"700"}}} -->
			<h3 class="wp-block-heading" style="font-size:1.3rem;font-weight:700">' . esc_html__( 'Gravisain Theme', 'gravisain-blocks' ) . '</h3>
			<!-- /wp:heading -->

			<!-- wp:paragraph {"style":{"typography":{"fontSize":"0.875rem"}}} -->
			<p style="font-size:0.875rem">' . esc_html__( 'Premium software package fully integrated with Gravisain ecosystem.', 'gravisain-blocks' ) . '</p>
			<!-- /wp:paragraph -->

			<!-- wp:paragraph {"style":{"typography":{"fontSize":"2.25rem","fontWeight":"800"},"spacing":{"margin":{"top":"12px","bottom":"16px"}}}} -->
			<p style="margin-top:12px;margin-bottom:16px;font-size:2.25rem;font-weight:800">$49<span style="font-size:1rem;font-weight:500;color:#64748b">/yr</span></p>
			<!-- /wp:paragraph -->

			<!-- wp:paragraph {"style":{"typography":{"fontSize":"0.875rem"}}} -->
			<p style="font-size:0.875rem">✓ ' . esc_html__( 'Direct 1-click WordPress updates', 'gravisain-blocks' ) . '<br>✓ ' . esc_html__( 'Customer Portal ZIP downloads', 'gravisain-blocks' ) . '<br>✓ ' . esc_html__( 'Self-serve domain transfer', 'gravisain-blocks' ) . '</p>
			<!-- /wp:paragraph -->

			<!-- wp:buttons {"style":{"spacing":{"margin":{"top":"24px"}}}} -->
			<div class="wp-block-buttons" style="margin-top:24px">
				<!-- wp:button {"backgroundColor":"primary","textColor":"base","width":100,"style":{"border":{"radius":"8px"},"typography":{"fontWeight":"700"}}} -->
				<div class="wp-block-button has-custom-width wp-block-button__width-100"><a href="https://ls.undagital.com/buy/gravisain-theme" class="wp-block-button__link has-base-color has-primary-background-color has-text-color has-background wp-element-button" style="border-radius:8px;font-weight:700">' . esc_html__( 'Purchase License →', 'gravisain-blocks' ) . '</a></div>
				<!-- /wp:button -->
			</div>
			<!-- /wp:buttons -->

			<!-- wp:buttons {"style":{"spacing":{"margin":{"top":"8px"}}}} -->
			<div class="wp-block-buttons" style="margin-top:8px">
				<!-- wp:button {"width":100,"style":{"border":{"radius":"8px"}},"className":"is-style-outline"} -->
				<div class="wp-block-button has-custom-width wp-block-button__width-100 is-style-outline"><a href="https://ls.undagital.com/buy/gravisain-theme?plan=trial" class="wp-block-button__link wp-element-button" style="border-radius:8px">' . esc_html__( '🎁 Start 3-Day Free Trial', 'gravisain-blocks' ) . '</a></div>
				<!-- /wp:button -->
			</div>
			<!-- /wp:buttons -->
		</div>
		<!-- /wp:column -->

		<!-- wp:column {"style":{"spacing":{"padding":{"top":"32px","right":"20px","bottom":"32px","left":"20px"}},"border":{"radius":"12px","width":"1px","color":"#e2e8f0"}},"backgroundColor":"base"} -->
		<div class="wp-block-column has-border-color has-base-background-color has-background" style="border-color:#e2e8f0;border-width:1px;border-radius:12px;padding-top:32px;padding-right:20px;padding-bottom:32px;padding-left:20px">
			<!-- wp:paragraph {"style":{"typography":{"fontSize":"11px","fontWeight":"700"}}} -->
			<p style="font-size:11px;font-weight:700"><span style="background:#eef2ff;color:#4338ca;border:1px solid #e0e7ff;padding:3px 8px;border-radius:6px;font-family:monospace;white-space:nowrap;display:inline-block">v1.0.0</span> <span style="background:#ecfdf5;color:#047857;border:1px solid #a7f3d0;padding:3px 8px;border-radius:6px;margin-left:6px;white-space:nowrap;display:inline-block">3-Day Trial</span></p>
			<!-- /wp:paragraph -->

			<!-- wp:heading {"level":3,"style":{"typography":{"fontSize":"1.3rem","fontWeight":"700"}}} -->
			<h3 class="wp-block-heading" style="font-size:1.3rem;font-weight:700">' . esc_html__( 'Gravisain Blocks', 'gravisain-blocks' ) . '</h3>
			<!-- /wp:heading -->

			<!-- wp:paragraph {"style":{"typography":{"fontSize":"0.875rem"}}} -->
			<p style="font-size:0.875rem">' . esc_html__( 'Premium software package fully integrated with Gravisain ecosystem.', 'gravisain-blocks' ) . '</p>
			<!-- /wp:paragraph -->

			<!-- wp:paragraph {"style":{"typography":{"fontSize":"2.25rem","fontWeight":"800"},"spacing":{"margin":{"top":"12px","bottom":"16px"}}}} -->
			<p style="margin-top:12px;margin-bottom:16px;font-size:2.25rem;font-weight:800">$49<span style="font-size:1rem;font-weight:500;color:#64748b">/yr</span></p>
			<!-- /wp:paragraph -->

			<!-- wp:paragraph {"style":{"typography":{"fontSize":"0.875rem"}}} -->
			<p style="font-size:0.875rem">✓ ' . esc_html__( 'Direct 1-click WordPress updates', 'gravisain-blocks' ) . '<br>✓ ' . esc_html__( 'Customer Portal ZIP downloads', 'gravisain-blocks' ) . '<br>✓ ' . esc_html__( 'Self-serve domain transfer', 'gravisain-blocks' ) . '</p>
			<!-- /wp:paragraph -->

			<!-- wp:buttons {"style":{"spacing":{"margin":{"top":"24px"}}}} -->
			<div class="wp-block-buttons" style="margin-top:24px">
				<!-- wp:button {"backgroundColor":"primary","textColor":"base","width":100,"style":{"border":{"radius":"8px"},"typography":{"fontWeight":"700"}}} -->
				<div class="wp-block-button has-custom-width wp-block-button__width-100"><a href="https://ls.undagital.com/buy/gravisain-blocks" class="wp-block-button__link has-base-color has-primary-background-color has-text-color has-background wp-element-button" style="border-radius:8px;font-weight:700">' . esc_html__( 'Purchase License →', 'gravisain-blocks' ) . '</a></div>
				<!-- /wp:button -->
			</div>
			<!-- /wp:buttons -->

			<!-- wp:buttons {"style":{"spacing":{"margin":{"top":"8px"}}}} -->
			<div class="wp-block-buttons" style="margin-top:8px">
				<!-- wp:button {"width":100,"style":{"border":{"radius":"8px"}},"className":"is-style-outline"} -->
				<div class="wp-block-button has-custom-width wp-block-button__width-100 is-style-outline"><a href="https://ls.undagital.com/buy/gravisain-blocks?plan=trial" class="wp-block-button__link wp-element-button" style="border-radius:8px">' . esc_html__( '🎁 Start 3-Day Free Trial', 'gravisain-blocks' ) . '</a></div>
				<!-- /wp:button -->
			</div>
			<!-- /wp:buttons -->
		</div>
		<!-- /wp:column -->

		<!-- wp:column {"style":{"spacing":{"padding":{"top":"32px","right":"20px","bottom":"32px","left":"20px"}},"border":{"radius":"12px","width":"1px","color":"#e2e8f0"}},"backgroundColor":"base"} -->
		<div class="wp-block-column has-border-color has-base-background-color has-background" style="border-color:#e2e8f0;border-width:1px;border-radius:12px;padding-top:32px;padding-right:20px;padding-bottom:32px;padding-left:20px">
			<!-- wp:paragraph {"style":{"typography":{"fontSize":"11px","fontWeight":"700"}}} -->
			<p style="font-size:11px;font-weight:700"><span style="background:#eef2ff;color:#4338ca;border:1px solid #e0e7ff;padding:3px 8px;border-radius:6px;font-family:monospace;white-space:nowrap;display:inline-block">v1.0.0</span> <span style="background:#ecfdf5;color:#047857;border:1px solid #a7f3d0;padding:3px 8px;border-radius:6px;margin-left:6px;white-space:nowrap;display:inline-block">3-Day Trial</span></p>
			<!-- /wp:paragraph -->

			<!-- wp:heading {"level":3,"style":{"typography":{"fontSize":"1.3rem","fontWeight":"700"}}} -->
			<h3 class="wp-block-heading" style="font-size:1.3rem;font-weight:700">' . esc_html__( 'Gravisain Studio', 'gravisain-blocks' ) . '</h3>
			<!-- /wp:heading -->

			<!-- wp:paragraph {"style":{"typography":{"fontSize":"0.875rem"}}} -->
			<p style="font-size:0.875rem">' . esc_html__( 'Premium software package fully integrated with Gravisain ecosystem.', 'gravisain-blocks' ) . '</p>
			<!-- /wp:paragraph -->

			<!-- wp:paragraph {"style":{"typography":{"fontSize":"2.25rem","fontWeight":"800"},"spacing":{"margin":{"top":"12px","bottom":"16px"}}}} -->
			<p style="margin-top:12px;margin-bottom:16px;font-size:2.25rem;font-weight:800">$49<span style="font-size:1rem;font-weight:500;color:#64748b">/yr</span></p>
			<!-- /wp:paragraph -->

			<!-- wp:paragraph {"style":{"typography":{"fontSize":"0.875rem"}}} -->
			<p style="font-size:0.875rem">✓ ' . esc_html__( 'Direct 1-click WordPress updates', 'gravisain-blocks' ) . '<br>✓ ' . esc_html__( 'Customer Portal ZIP downloads', 'gravisain-blocks' ) . '<br>✓ ' . esc_html__( 'Self-serve domain transfer', 'gravisain-blocks' ) . '</p>
			<!-- /wp:paragraph -->

			<!-- wp:buttons {"style":{"spacing":{"margin":{"top":"24px"}}}} -->
			<div class="wp-block-buttons" style="margin-top:24px">
				<!-- wp:button {"backgroundColor":"primary","textColor":"base","width":100,"style":{"border":{"radius":"8px"},"typography":{"fontWeight":"700"}}} -->
				<div class="wp-block-button has-custom-width wp-block-button__width-100"><a href="https://ls.undagital.com/buy/gravisain-studio" class="wp-block-button__link has-base-color has-primary-background-color has-text-color has-background wp-element-button" style="border-radius:8px;font-weight:700">' . esc_html__( 'Purchase License →', 'gravisain-blocks' ) . '</a></div>
				<!-- /wp:button -->
			</div>
			<!-- /wp:buttons -->

			<!-- wp:buttons {"style":{"spacing":{"margin":{"top":"8px"}}}} -->
			<div class="wp-block-buttons" style="margin-top:8px">
				<!-- wp:button {"width":100,"style":{"border":{"radius":"8px"}},"className":"is-style-outline"} -->
				<div class="wp-block-button has-custom-width wp-block-button__width-100 is-style-outline"><a href="https://ls.undagital.com/buy/gravisain-studio?plan=trial" class="wp-block-button__link wp-element-button" style="border-radius:8px">' . esc_html__( '🎁 Start 3-Day Free Trial', 'gravisain-blocks' ) . '</a></div>
				<!-- /wp:button -->
			</div>
			<!-- /wp:buttons -->
		</div>
		<!-- /wp:column -->

		<!-- wp:column {"style":{"spacing":{"padding":{"top":"32px","right":"20px","bottom":"32px","left":"20px"}},"border":{"radius":"12px","width":"1px","color":"#e2e8f0"}},"backgroundColor":"base"} -->
		<div class="wp-block-column has-border-color has-base-background-color has-background" style="border-color:#e2e8f0;border-width:1px;border-radius:12px;padding-top:32px;padding-right:20px;padding-bottom:32px;padding-left:20px">
			<!-- wp:paragraph {"style":{"typography":{"fontSize":"11px","fontWeight":"700"}}} -->
			<p style="font-size:11px;font-weight:700"><span style="background:#eef2ff;color:#4338ca;border:1px solid #e0e7ff;padding:3px 8px;border-radius:6px;font-family:monospace;white-space:nowrap;display:inline-block">v1.0.1</span> <span style="background:#ecfdf5;color:#047857;border:1px solid #a7f3d0;padding:3px 8px;border-radius:6px;margin-left:6px;white-space:nowrap;display:inline-block">Free Core</span></p>
			<!-- /wp:paragraph -->

			<!-- wp:heading {"level":3,"style":{"typography":{"fontSize":"1.3rem","fontWeight":"700"}}} -->
			<h3 class="wp-block-heading" style="font-size:1.3rem;font-weight:700">' . esc_html__( 'Gravisain Orders', 'gravisain-blocks' ) . '</h3>
			<!-- /wp:heading -->

			<!-- wp:paragraph {"style":{"typography":{"fontSize":"0.875rem"}}} -->
			<p style="font-size:0.875rem">' . esc_html__( 'Premium software package fully integrated with Gravisain ecosystem.', 'gravisain-blocks' ) . '</p>
			<!-- /wp:paragraph -->

			<!-- wp:paragraph {"style":{"typography":{"fontSize":"2.25rem","fontWeight":"800"},"spacing":{"margin":{"top":"12px","bottom":"16px"}}}} -->
			<p style="margin-top:12px;margin-bottom:16px;font-size:2.25rem;font-weight:800">$0<span style="font-size:1rem;font-weight:500;color:#64748b">/forever</span></p>
			<!-- /wp:paragraph -->

			<!-- wp:paragraph {"style":{"typography":{"fontSize":"0.875rem"}}} -->
			<p style="font-size:0.875rem">✓ ' . esc_html__( 'Direct 1-click WordPress updates', 'gravisain-blocks' ) . '<br>✓ ' . esc_html__( 'Customer Portal ZIP downloads', 'gravisain-blocks' ) . '<br>✓ ' . esc_html__( 'Self-serve domain transfer', 'gravisain-blocks' ) . '</p>
			<!-- /wp:paragraph -->

			<!-- wp:buttons {"style":{"spacing":{"margin":{"top":"24px"}}}} -->
			<div class="wp-block-buttons" style="margin-top:24px">
				<!-- wp:button {"backgroundColor":"primary","textColor":"base","width":100,"style":{"border":{"radius":"8px"},"typography":{"fontWeight":"700"}}} -->
				<div class="wp-block-button has-custom-width wp-block-button__width-100"><a href="https://ls.undagital.com/buy/gravisain-orders" class="wp-block-button__link has-base-color has-primary-background-color has-text-color has-background wp-element-button" style="border-radius:8px;font-weight:700">' . esc_html__( 'Purchase License →', 'gravisain-blocks' ) . '</a></div>
				<!-- /wp:button -->
			</div>
			<!-- /wp:buttons -->

			<!-- wp:buttons {"style":{"spacing":{"margin":{"top":"8px"}}}} -->
			<div class="wp-block-buttons" style="margin-top:8px">
				<!-- wp:button {"width":100,"style":{"border":{"radius":"8px"}},"className":"is-style-outline"} -->
				<div class="wp-block-button has-custom-width wp-block-button__width-100 is-style-outline"><a href="https://ls.undagital.com/buy/gravisain-orders?plan=trial" class="wp-block-button__link wp-element-button" style="border-radius:8px">' . esc_html__( '🎁 Start 3-Day Free Trial', 'gravisain-blocks' ) . '</a></div>
				<!-- /wp:button -->
			</div>
			<!-- /wp:buttons -->
		</div>
		<!-- /wp:column -->
	</div>
	<!-- /wp:columns -->
</div>
<!-- /wp:group -->',
];
