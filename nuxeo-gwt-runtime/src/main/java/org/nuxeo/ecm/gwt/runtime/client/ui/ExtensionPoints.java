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
 * @author <a href="mailto:bs@nuxeo.com">Bogdan Stefanescu</a>
 *
 */
public interface ExtensionPoints {

    final static String LEFT_AREA_XP = "LEFT_AREA";
    final static String RIGHT_AREA_XP = "RIGHT_AREA";
    final static String CONTENT_AREA_XP = "CONTENT_AREA";
    final static String HEADER_AREA_XP = "HEADER_AREA";
    final static String FOOTER_AREA_XP = "FOOTER_AREA";

    final static String VIEWS_XP = "VIEWS";
    final static String EDITORS_XP = "EDITORS";
    final static String DEFAULT_EDITOR_XP = "DEFAULT_EDITOR";
    final static String EDITOR_PAGES_XP = "EDITOR_PAGES";

}
