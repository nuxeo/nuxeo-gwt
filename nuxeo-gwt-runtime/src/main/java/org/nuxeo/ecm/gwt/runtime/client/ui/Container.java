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

package org.nuxeo.ecm.gwt.runtime.client.ui;

/**
 * Used to bridge view managers with underlying widget implementation.
 *
 * @author <a href="mailto:bs@nuxeo.com">Bogdan Stefanescu</a>
 */
public interface Container extends Drawable {

    void setSiteEventHandler(SiteEventHandler handler);
    SiteEventHandler getSiteEventHandler();

    Object createHandle(Site site);
    void closeSite(Site site);
    void enableSite(Site site);
    void disableSite(Site site);
    void activateSite(Site site);
    void deactivateSite(Site site);
    Object getActiveSiteHandle();

    /**
     * Updates the title and icon and show the site if not yet visible.
     */
    void updateSiteTitle(Site site);
    void updateSiteIcon(Site site);
    void installWidget(Site site);
    void closeAll();
    void clear(); // remove all views

    boolean isSiteActive(Site site);
    boolean isSiteEnabled(Site site);

}
