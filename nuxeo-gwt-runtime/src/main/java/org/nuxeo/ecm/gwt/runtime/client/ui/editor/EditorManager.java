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

package org.nuxeo.ecm.gwt.runtime.client.ui.editor;

import org.nuxeo.ecm.gwt.runtime.client.ui.View;

/**
 * @author <a href="mailto:bs@nuxeo.com">Bogdan Stefanescu</a>
 *
 */
public interface EditorManager {

    EditorSite openEditor(Object input);

    EditorSite openEditor(Object input, boolean newView);

    EditorSite getActiveEditor();

    void closeEditor(String id);

    void closeAll();

    Editor[] getRegisteredEditors();

    View[] getOpenedEditors();

    void addEditor(Editor editor);

    void removeEditor(Editor editor);

}
