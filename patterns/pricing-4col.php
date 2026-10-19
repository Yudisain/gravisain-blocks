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
	'title'         => __( '4-Column Tiered Pricing Table', 'gravisain-blocks' ),
	'categories'    => [ 'gravisain-pricing', 'gravisain-sections' ],
	'viewportWidth' => 1200,
	'description'   => __( 'Modern 4-column pricing cards for tiered subscription plans.', 'gravisain-blocks' ),
	'content'       => '<!-- wp:group {"align":"full","style":{"spacing":{"padding":{"top":"60px","bottom":"80px","left":"24px","right":"24px"}}},"layout":{"type":"constrained","contentSize":"1200px"}} -->
<div class="wp-block-group alignfull" style="padding-top:60px;padding-right:24px;padding-bottom:80px;padding-left:24px">
	<!-- wp:paragraph {"align":"center","style":{"typography":{"fontSize":"12px","fontWeight":"700","textTransform":"uppercase"}},"color":"primary"} -->
	<p class="has-text-align-center has-primary-color has-text-color" style="font-size:12px;font-weight:700;text-transform:uppercase">★ ' . esc_html__( 'PRICING PLANS', 'gravisain-blocks' ) . '</p>
	<!-- /wp:paragraph -->

	<!-- wp:heading {"textAlign":"center","style":{"typography":{"fontSize":"2.25rem","fontWeight":"800"}}} -->
	<h2 class="wp-block-heading has-text-align-center" style="font-size:2.25rem;font-weight:800">' . esc_html__( 'Simple, Transparent Pricing', 'gravisain-blocks' ) . '</h2>
	<!-- /wp:heading -->

	<!-- wp:paragraph {"align":"center","style":{"typography":{"fontSize":"1.125rem"},"spacing":{"margin":{"bottom":"48px"}}}} -->
	<p class="has-text-align-center" style="margin-bottom:48px;font-size:1.125rem">' . esc_html__( 'Choose the plan that fits your business needs.', 'gravisain-blocks' ) . '</p>
	<!-- /wp:paragraph -->

	<!-- wp:columns {"align":"wide","style":{"spacing":{"blockGap":{"top":"24px","left":"24px"}}}} -->
	<div class="wp-block-columns alignwide">
		<!-- wp:column {"style":{"spacing":{"padding":{"top":"32px","right":"20px","bottom":"32px","left":"20px"}},"border":{"radius":"12px","width":"1px","color":"#e2e8f0"}},"backgroundColor":"base"} -->
		<div class="wp-block-column has-border-color has-base-background-color has-background" style="border-color:#e2e8f0;border-width:1px;border-radius:12px;padding-top:32px;padding-right:20px;padding-bottom:32px;padding-left:20px">
			<!-- wp:paragraph {"style":{"typography":{"fontSize":"11px","fontWeight":"700"}}} -->
			<p style="font-size:11px;font-weight:700"><span style="background:#eef2ff;color:#4338ca;border:1px solid #e0e7ff;padding:3px 8px;border-radius:6px;font-family:monospace;white-space:nowrap;display:inline-block">Basic</span></p>
			<!-- /wp:paragraph -->

			<!-- wp:heading {"level":3,"style":{"typography":{"fontSize":"1.3rem","fontWeight":"700"}}} -->
			<h3 class="wp-block-heading" style="font-size:1.3rem;font-weight:700">' . esc_html__( 'Starter', 'gravisain-blocks' ) . '</h3>
			<!-- /wp:heading -->

			<!-- wp:paragraph {"style":{"typography":{"fontSize":"0.875rem"}}} -->
			<p style="font-size:0.875rem">' . esc_html__( 'Essential tools to build and launch your personal website.', 'gravisain-blocks' ) . '</p>
			<!-- /wp:paragraph -->

			<!-- wp:paragraph {"style":{"typography":{"fontSize":"2.25rem","fontWeight":"800"},"spacing":{"margin":{"top":"12px","bottom":"16px"}}}} -->
			<p style="margin-top:12px;margin-bottom:16px;font-size:2.25rem;font-weight:800">$29<span style="font-size:1rem;font-weight:500;color:#64748b">/yr</span></p>
			<!-- /wp:paragraph -->

			<!-- wp:paragraph {"style":{"typography":{"fontSize":"0.875rem"}}} -->
			<p style="font-size:0.875rem">✓ ' . esc_html__( '1 Website License', 'gravisain-blocks' ) . '<br>✓ ' . esc_html__( 'Standard Block Library', 'gravisain-blocks' ) . '<br>✓ ' . esc_html__( 'Community Support', 'gravisain-blocks' ) . '</p>
			<!-- /wp:paragraph -->

			<!-- wp:buttons {"style":{"spacing":{"margin":{"top":"24px"}}}} -->
			<div class="wp-block-buttons" style="margin-top:24px">
				<!-- wp:button {"width":100,"style":{"border":{"radius":"8px"}},"className":"is-style-outline"} -->
				<div class="wp-block-button has-custom-width wp-block-button__width-100 is-style-outline"><a href="#" class="wp-block-button__link wp-element-button" style="border-radius:8px">' . esc_html__( 'Get Started', 'gravisain-blocks' ) . '</a></div>
				<!-- /wp:button -->
			</div>
			<!-- /wp:buttons -->
		</div>
		<!-- /wp:column -->

		<!-- wp:column {"style":{"spacing":{"padding":{"top":"32px","right":"20px","bottom":"32px","left":"20px"}},"border":{"radius":"12px","width":"1px","color":"#e2e8f0"}},"backgroundColor":"base"} -->
		<div class="wp-block-column has-border-color has-base-background-color has-background" style="border-color:#e2e8f0;border-width:1px;border-radius:12px;padding-top:32px;padding-right:20px;padding-bottom:32px;padding-left:20px">
			<!-- wp:paragraph {"style":{"typography":{"fontSize":"11px","fontWeight":"700"}}} -->
			<p style="font-size:11px;font-weight:700"><span style="background:#eef2ff;color:#4338ca;border:1px solid #e0e7ff;padding:3px 8px;border-radius:6px;font-family:monospace;white-space:nowrap;display:inline-block">Standard</span></p>
			<!-- /wp:paragraph -->

			<!-- wp:heading {"level":3,"style":{"typography":{"fontSize":"1.3rem","fontWeight":"700"}}} -->
			<h3 class="wp-block-heading" style="font-size:1.3rem;font-weight:700">' . esc_html__( 'Growth', 'gravisain-blocks' ) . '</h3>
			<!-- /wp:heading -->

			<!-- wp:paragraph {"style":{"typography":{"fontSize":"0.875rem"}}} -->
			<p style="font-size:0.875rem">' . esc_html__( 'Ideal for growing businesses needing responsive layouts.', 'gravisain-blocks' ) . '</p>
			<!-- /wp:paragraph -->

			<!-- wp:paragraph {"style":{"typography":{"fontSize":"2.25rem","fontWeight":"800"},"spacing":{"margin":{"top":"12px","bottom":"16px"}}}} -->
			<p style="margin-top:12px;margin-bottom:16px;font-size:2.25rem;font-weight:800">$59<span style="font-size:1rem;font-weight:500;color:#64748b">/yr</span></p>
			<!-- /wp:paragraph -->

			<!-- wp:paragraph {"style":{"typography":{"fontSize":"0.875rem"}}} -->
			<p style="font-size:0.875rem">✓ ' . esc_html__( 'Up to 3 Websites', 'gravisain-blocks' ) . '<br>✓ ' . esc_html__( 'All Block Patterns', 'gravisain-blocks' ) . '<br>✓ ' . esc_html__( 'Email Support', 'gravisain-blocks' ) . '</p>
			<!-- /wp:paragraph -->

			<!-- wp:buttons {"style":{"spacing":{"margin":{"top":"24px"}}}} -->
			<div class="wp-block-buttons" style="margin-top:24px">
				<!-- wp:button {"backgroundColor":"primary","textColor":"base","width":100,"style":{"border":{"radius":"8px"},"typography":{"fontWeight":"700"}}} -->
				<div class="wp-block-button has-custom-width wp-block-button__width-100"><a href="#" class="wp-block-button__link has-base-color has-primary-background-color has-text-color has-background wp-element-button" style="border-radius:8px;font-weight:700">' . esc_html__( 'Choose Growth', 'gravisain-blocks' ) . '</a></div>
				<!-- /wp:button -->
			</div>
			<!-- /wp:buttons -->
		</div>
		<!-- /wp:column -->

		<!-- wp:column {"style":{"spacing":{"padding":{"top":"32px","right":"20px","bottom":"32px","left":"20px"}},"border":{"radius":"12px","width":"2px","color":"#4f46e5"}},"backgroundColor":"base"} -->
		<div class="wp-block-column has-border-color has-base-background-color has-background" style="border-color:#4f46e5;border-width:2px;border-radius:12px;padding-top:32px;padding-right:20px;padding-bottom:32px;padding-left:20px">
			<!-- wp:paragraph {"style":{"typography":{"fontSize":"11px","fontWeight":"700"}}} -->
			<p style="font-size:11px;font-weight:700"><span style="background:#ecfdf5;color:#047857;border:1px solid #a7f3d0;padding:3px 8px;border-radius:6px;font-family:monospace;white-space:nowrap;display:inline-block">★ Most Popular</span></p>
			<!-- /wp:paragraph -->

			<!-- wp:heading {"level":3,"style":{"typography":{"fontSize":"1.3rem","fontWeight":"700"}}} -->
			<h3 class="wp-block-heading" style="font-size:1.3rem;font-weight:700">' . esc_html__( 'Professional', 'gravisain-blocks' ) . '</h3>
			<!-- /wp:heading -->

			<!-- wp:paragraph {"style":{"typography":{"fontSize":"0.875rem"}}} -->
			<p style="font-size:0.875rem">' . esc_html__( 'Full design toolkit for freelancers and modern digital creators.', 'gravisain-blocks' ) . '</p>
			<!-- /wp:paragraph -->

			<!-- wp:paragraph {"style":{"typography":{"fontSize":"2.25rem","fontWeight":"800"},"spacing":{"margin":{"top":"12px","bottom":"16px"}}}} -->
			<p style="margin-top:12px;margin-bottom:16px;font-size:2.25rem;font-weight:800">$99<span style="font-size:1rem;font-weight:500;color:#64748b">/yr</span></p>
			<!-- /wp:paragraph -->

			<!-- wp:paragraph {"style":{"typography":{"fontSize":"0.875rem"}}} -->
			<p style="font-size:0.875rem">✓ ' . esc_html__( 'Up to 10 Websites', 'gravisain-blocks' ) . '<br>✓ ' . esc_html__( 'All Block Patterns & Templates', 'gravisain-blocks' ) . '<br>✓ ' . esc_html__( 'Priority Support', 'gravisain-blocks' ) . '</p>
			<!-- /wp:paragraph -->

			<!-- wp:buttons {"style":{"spacing":{"margin":{"top":"24px"}}}} -->
			<div class="wp-block-buttons" style="margin-top:24px">
				<!-- wp:button {"backgroundColor":"primary","textColor":"base","width":100,"style":{"border":{"radius":"8px"},"typography":{"fontWeight":"700"}}} -->
				<div class="wp-block-button has-custom-width wp-block-button__width-100"><a href="#" class="wp-block-button__link has-base-color has-primary-background-color has-text-color has-background wp-element-button" style="border-radius:8px;font-weight:700">' . esc_html__( 'Choose Pro', 'gravisain-blocks' ) . '</a></div>
				<!-- /wp:button -->
			</div>
			<!-- /wp:buttons -->
		</div>
		<!-- /wp:column -->

		<!-- wp:column {"style":{"spacing":{"padding":{"top":"32px","right":"20px","bottom":"32px","left":"20px"}},"border":{"radius":"12px","width":"1px","color":"#e2e8f0"}},"backgroundColor":"base"} -->
		<div class="wp-block-column has-border-color has-base-background-color has-background" style="border-color:#e2e8f0;border-width:1px;border-radius:12px;padding-top:32px;padding-right:20px;padding-bottom:32px;padding-left:20px">
			<!-- wp:paragraph {"style":{"typography":{"fontSize":"11px","fontWeight":"700"}}} -->
			<p style="font-size:11px;font-weight:700"><span style="background:#eef2ff;color:#4338ca;border:1px solid #e0e7ff;padding:3px 8px;border-radius:6px;font-family:monospace;white-space:nowrap;display:inline-block">Scale</span></p>
			<!-- /wp:paragraph -->

			<!-- wp:heading {"level":3,"style":{"typography":{"fontSize":"1.3rem","fontWeight":"700"}}} -->
			<h3 class="wp-block-heading" style="font-size:1.3rem;font-weight:700">' . esc_html__( 'Enterprise', 'gravisain-blocks' ) . '</h3>
			<!-- /wp:heading -->

			<!-- wp:paragraph {"style":{"typography":{"fontSize":"0.875rem"}}} -->
			<p style="font-size:0.875rem">' . esc_html__( 'Complete solution with unlimited websites and dedicated assistance.', 'gravisain-blocks' ) . '</p>
			<!-- /wp:paragraph -->

			<!-- wp:paragraph {"style":{"typography":{"fontSize":"2.25rem","fontWeight":"800"},"spacing":{"margin":{"top":"12px","bottom":"16px"}}}} -->
			<p style="margin-top:12px;margin-bottom:16px;font-size:2.25rem;font-weight:800">$199<span style="font-size:1rem;font-weight:500;color:#64748b">/yr</span></p>
			<!-- /wp:paragraph -->

			<!-- wp:paragraph {"style":{"typography":{"fontSize":"0.875rem"}}} -->
			<p style="font-size:0.875rem">✓ ' . esc_html__( 'Unlimited Websites', 'gravisain-blocks' ) . '<br>✓ ' . esc_html__( 'All Premium Patterns', 'gravisain-blocks' ) . '<br>✓ ' . esc_html__( 'VIP Dedicated Support', 'gravisain-blocks' ) . '</p>
			<!-- /wp:paragraph -->

			<!-- wp:buttons {"style":{"spacing":{"margin":{"top":"24px"}}}} -->
			<div class="wp-block-buttons" style="margin-top:24px">
				<!-- wp:button {"width":100,"style":{"border":{"radius":"8px"}},"className":"is-style-outline"} -->
				<div class="wp-block-button has-custom-width wp-block-button__width-100 is-style-outline"><a href="#" class="wp-block-button__link wp-element-button" style="border-radius:8px">' . esc_html__( 'Contact Us', 'gravisain-blocks' ) . '</a></div>
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
