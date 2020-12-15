/** @jsx h */

/**
 * External dependencies
 */
import { h } from 'preact';
import { createPortal } from 'preact/compat';
import SearchFilters from './search-filters';
import WidgetAreaContainer from './widget-area-container';

/**
 * Internal dependencies
 */
import JetpackColophon from './jetpack-colophon';
import './search-sidebar.scss';

const SearchSidebar = props => {
	const hasFiltersSelectedOutsideOverlay = props.widgetsOutsideOverlay.filters?.length > 0;
	return (
		<div className="jetpack-instant-search__sidebar">
			<SearchFilters
				filters={ props.filters }
				loading={ props.isLoading }
				locale={ props.locale }
				postTypes={ props.postTypes }
				results={ props.response }
				showClearFiltersButton={ hasFiltersSelectedOutsideOverlay }
				widgets={ props.widgetsOutsideOverlay }
			/>
			<WidgetAreaContainer />
			{ props.widgets.map( ( widget, index ) => {
				// Creates portals to elements moved into the WidgetAreaContainer.
				return createPortal(
					<div
						id={ `${ widget.widget_id }-portaled-wrapper` }
						className="jetpack-instant-search__portaled-wrapper"
					>
						<SearchFilters
							filters={ props.filters }
							loading={ props.isLoading }
							locale={ props.locale }
							postTypes={ props.postTypes }
							results={ props.response }
							showClearFiltersButton={ ! hasFiltersSelectedOutsideOverlay && index === 0 }
							widget={ widget }
						/>
					</div>,
					document.getElementById( `${ widget.widget_id }-wrapper` )
				);
			} ) }
			{ props.showPoweredBy && <JetpackColophon locale={ props.locale } /> }
		</div>
	);
};
export default SearchSidebar;
