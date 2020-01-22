/** @jsx h */

/**
 * External dependencies
 */
import { h } from 'preact';
import { useEffect } from 'preact/hooks';
import { __ } from '@wordpress/i18n';

const closeOnEscapeKey = callback => event => {
	event.key === 'Escape' && callback();
};

const Overlay = ( { children, closeColor, closeOverlay, colorTheme, isVisible, opacity } ) => {
	useEffect( () => {
		window.addEventListener( 'keydown', closeOnEscapeKey( closeOverlay ) );
		return () => {
			// Cleanup after event
			window.removeEventListener( 'keydown', closeOnEscapeKey( closeOverlay ) );
		};
	}, [] );

	return (
		<div
			className={ [
				'jetpack-instant-search__overlay',
				`jetpack-instant-search__overlay--${ colorTheme }`,
				isVisible ? '' : 'is-hidden',
			].join( ' ' ) }
			style={ { opacity: opacity / 100 } }
		>
			<button
				className="jetpack-instant-search__overlay-close"
				onClick={ closeOverlay }
				style={ { background: closeColor } }
			>
				{ __( 'Close', 'jetpack' ) }
			</button>
			{ children }
		</div>
	);
};

export default Overlay;
