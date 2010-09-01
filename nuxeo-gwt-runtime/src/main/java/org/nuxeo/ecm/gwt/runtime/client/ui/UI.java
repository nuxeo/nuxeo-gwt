/*
 * (C) Copyright 2006-2009 Nuxeo SA (http://nuxeo.com/) and contributors.
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
 *     Nuxeo
 */

package org.nuxeo.ecm.gwt.runtime.client.ui;

import org.nuxeo.ecm.gwt.runtime.client.Framework;
import org.nuxeo.ecm.gwt.runtime.client.model.Context;
import org.nuxeo.ecm.gwt.runtime.client.model.Document;

import com.google.gwt.user.client.History;
import com.google.gwt.user.client.Window;

/**
 * @author <a href="mailto:bs@nuxeo.com">Bogdan Stefanescu</a>
 */
public class UI {

    protected static Context ctx = new Context();
    protected static ProgressTimer progressTimer = new ProgressTimer();

    public static Context getContext() {
        return ctx;
    }

    public static void openInEditor(Object input) {
        ((UIApplication) Framework.getApplication()).openInEditor(input);
    }

    public static View getView(String name) {
        return ((UIApplication) Framework.getApplication()).getView(name);
    }

    public static View getActiveEditor() {
        return ((UIApplication) Framework.getApplication()).getActiveEditor();
    }

    public static void showView(String name) {
        ((UIApplication) Framework.getApplication()).showView(name);
    }

    public static void showError(Throwable t) {
        Window.alert("Error: " + t.getMessage());
    }

    public static void showBusy() {
        progressTimer.start(100);
    }

    public static void hideBusy() {
        progressTimer.cancel();
    }

    public static void openDocument(String ref) {
        History.newItem("doc_" + ref);
    }


    public static void openDocumentInActiveEditor(Document doc) {
        History.newItem("doc_" + doc.getId(), false);
        View view = getActiveEditor();
        if (view != null) {
            view.setInput(doc);
        }
    }

}
