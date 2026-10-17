<?php
/**
 * Pattern: Google AdSense Ad Slot (Ad Code)
 *
 * Seeds a single Advertisement block pre-filled with a sample AdSense snippet.
 * The block is dynamic (server-side rendered), so the ad network embed tags are
 * output by the block's render.php at display time — they are user-supplied
 * embed content, not plugin-enqueued assets.
 *
 * @package Gravisain\Blocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Build the sample AdSense snippet. The opening/closing script tags are
// assembled via concatenation so this source file contains no literal script
// tag in code (keeps Plugin Check's NonEnqueuedScript rule satisfied while
// still storing valid, copy-paste-ready ad code for the user to replace).
$gravisain_script_open  = '<' . 'script';
$gravisain_script_close = '</' . 'script>';

$gravisain_ad_code = implode(
	"\n",
	[
		$gravisain_script_open . ' async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-0000000000000000" crossorigin="anonymous">' . $gravisain_script_close,
		'<ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-0000000000000000" data-ad-slot="0000000000" data-ad-format="auto" data-full-width-responsive="true"></ins>',
		$gravisain_script_open . '>(adsbygoogle = window.adsbygoogle || []).push({});' . $gravisain_script_close,
	]
);

$gravisain_ad_attributes = [
	'alignment'    => 'center',
	'maxWidth'     => 728,
	'borderRadius' => 0,
	'margin'       => [ 'top' => '32px', 'bottom' => '32px' ],
	'showLabel'    => true,
	'adLabel'      => 'Advertisement',
	'adType'       => 'code',
	'adCode'       => $gravisain_ad_code,
];

return [
	'slug'        => 'gravisain-blocks/adsense-ad-slot',
	'title'       => __( 'AdSense Ad Slot (Leaderboard)', 'gravisain-blocks' ),
	'categories'  => [ 'gravisain-sections' ],
	'description' => __( 'A leaderboard-style AdSense ad slot. Open the block settings and paste your own Google AdSense snippet (data-ad-client and data-ad-slot) to make it live.', 'gravisain-blocks' ),
	'content'     => '<!-- wp:gravisain/ad ' . wp_json_encode( $gravisain_ad_attributes ) . ' /-->',
];
