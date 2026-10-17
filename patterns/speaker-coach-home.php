<?php
/**
 * Pattern: Keynote Speaker & Executive Coach - Complete Homepage Template
 *
 * @package Gravisain\Blocks
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use Gravisain\Blocks\PatternRegistry;

$gravisain_blocks_speaker_content = PatternRegistry::get_template_content( 'speaker-coach' );
if ( empty( $gravisain_blocks_speaker_content ) ) {
	return [];
}

return [
	'slug'        => 'gravisain-blocks/speaker-coach-home',
	'title'       => __( 'Keynote Speaker & Executive Coach — Full Homepage', 'gravisain-blocks' ),
	'categories'  => [ 'gravisain-templates', 'gravisain-heroes', 'gravisain-sections' ],
	'description' => __( 'A bold, personal branding and booking homepage for authors, coaches, and keynote speakers built 100% with Gravisain blocks.', 'gravisain-blocks' ),
	'content'     => $gravisain_blocks_speaker_content,
];
