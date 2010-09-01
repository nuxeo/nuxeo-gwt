/*
 * (C) Copyright 2006-2008 Nuxeo SAS (http://nuxeo.com/) and contributors.
 *
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the GNU Lesser General Public License
 * (LGPL) version 2.1 which accompanies this distribution, and is available at
 * http://www.gnu.org/licenses/lgpl.html
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * Lesser General Public License for more details.
 *
 * Contributors:
 *     bstefanescu
 *
 * $Id$
 */

package org.nuxeo.ecm.gwt.runtime.client.ui.view;

import org.nuxeo.ecm.gwt.runtime.client.ui.Container;
import org.nuxeo.ecm.gwt.runtime.client.ui.View;

/**
 * @author <a href="mailto:bs@nuxeo.com">Bogdan Stefanescu</a>
 */
public interface ViewManager {

    /**
     * Sets the site manager to be used by this view manager.
     */
    void setContainer(Container mgr);

    /**
     * The site manager used by this view.
     *
     * @return the site manager
     */
    Container getContainer();

    /**
     * Opens the given view. The managed views are refreshed depending on the input so that
     * you may expect that some views becomes hidden or restored after an open operation.
     *
     * @param input (may be null)
     */
    void open(Object input);

    /**
     * Shows a view given its registration ID.
     * If view is already visible, do nothing.
     */
    void showView(String id);

    /**
     * Hides a view given its registration ID.
     * If view is already hidden, do nothing.
     * This method may not apply for deck style containers (e.g. multi-page views) which are showing only one view
     * at a time. In this case calling showView() on another view will hide the active view.
     * For other container types, it does nothing.
     */
    void hideView(String id);

    /**
     * Activates a view given its ID. This will make visible the view content
     * (similar to expand for stack views or select for deck views).
     */
    void activateView(String id);

    /**
     * Deactivates a view given its ID. This will hide the content of the view
     * (similar to collapse for stack views or deselect for deck views).
     */
    void deactivateView(String id);

    /**
     * Gets the current view. This method applies only for deck style containers
     * (e.g. that are showing only one view at a time). For other container type
     * it does nothing.
     *
     * @return the active view or null if none.
     */
    View getActiveView();

    /**
     * Registers a view under an id.
     *
     * @param id the view id
     * @param view the view to register
     */
    void addView(String id, View view);

    /**
     * Removes a registered view.
     *
     * @param view the view to remove
     */
    void removeView(View view);

    /**
     * Gets all registered views.
     *
     * @return all registered views or an empty array if none.
     */
    View[] getViews();

    /**
     * Gets the number of the view in that manager.
     */
    int getViewsCount();

    /**
     * Gets a view given its registration ID.
     */
    View getView(String id);

}
