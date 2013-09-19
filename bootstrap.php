<?php
/*
Plugin Name: Tagregator
Plugin URI:  http://wordpress.org/plugins/tagregator
Description: Aggregates hashtagged content from multiple social media sites into a single stream.
Version:     0.1
Author:      WordCamp.org
Author URI:  http://wordcamp.org
*/

if ( $_SERVER['SCRIPT_FILENAME'] == __FILE__ )
	die( 'Access denied.' );

define( 'TGGR_NAME',                 'Tagregator' );
define( 'TGGR_REQUIRED_PHP_VERSION', '5.3' ); // because of get_called_class()
define( 'TGGR_REQUIRED_WP_VERSION',  '3.5' ); // because of HOUR_IN_SECONDS

/**
 * Checks if the system requirements are met
 * @return bool True if system requirements are met, false if not
 */
function tggr_requirements_met() {
	global $wp_version;

	if ( version_compare( PHP_VERSION, TGGR_REQUIRED_PHP_VERSION, '<' ) ) {
		return false;
	}

	if ( version_compare( $wp_version, TGGR_REQUIRED_WP_VERSION, '<' ) ) {
		return false;
	}

	return true;
}

/**
 * Prints an error that the system requirements weren't met.
 */
function tggr_requirements_error() {
	global $wp_version;

	require_once( dirname( __FILE__ ) . '/views/requirements-error.php' );
}

/*
 * Check requirements and load main class
 * The main program needs to be in a separate file that only gets loaded if the plugin requirements are met. Otherwise older PHP installations could crash when trying to parse it.
 */
if ( tggr_requirements_met() ) {
	require_once( dirname( __FILE__ ) . '/classes/tggr-module.php' );
	require_once( dirname( __FILE__ ) . '/classes/tagregator.php' );

	if ( class_exists( 'Tagregator' ) ) {
		$GLOBALS['tggr'] = Tagregator::get_instance();
		register_activation_hook(   __FILE__, array( $GLOBALS['tggr'], 'activate' ) );
		register_deactivation_hook( __FILE__, array( $GLOBALS['tggr'], 'deactivate' ) );
	}
} else {
	add_action( 'admin_notices', 'tggr_requirements_error' );
}