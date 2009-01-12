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

package org.nuxeo.ecm.gwt.app.base.client.ui.editor;

import java.util.ArrayList;
import java.util.List;

import org.nuxeo.ecm.gwt.runtime.client.Extensible;
import org.nuxeo.ecm.gwt.runtime.client.model.Document;
import org.nuxeo.ecm.gwt.runtime.client.ui.ExtensionPoints;
import org.nuxeo.ecm.gwt.runtime.client.ui.View;
import org.nuxeo.ecm.gwt.runtime.client.ui.editor.Editor;
import org.nuxeo.ecm.gwt.runtime.client.ui.editor.EditorPage;

/**
 * @author <a href="mailto:bs@nuxeo.com">Bogdan Stefanescu</a>
 *
 */
public class DocumentEditor implements Editor, Extensible {

    protected List<EditorPage> pageViews = new ArrayList<EditorPage>();

    public boolean acceptInput(Object input) {
        return input instanceof Document;
    }

    public View getView() {
        MultiPageDocView mpview = new MultiPageDocView();
        for (EditorPage page : pageViews) {
            mpview.addPage(page.getName(), page.getView());
        }
        return mpview;
    }

    public void registerExtension(String target, Object extension) {
        if (ExtensionPoints.EDITOR_PAGES_XP.equals(target)) {
            pageViews.add((EditorPage)extension);
        }
    }

}
