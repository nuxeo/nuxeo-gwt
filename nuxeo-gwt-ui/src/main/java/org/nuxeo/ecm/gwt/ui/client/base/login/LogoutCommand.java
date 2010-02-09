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

package org.nuxeo.ecm.gwt.ui.client.base.login;

import com.google.gwt.core.client.GWT;
import org.nuxeo.ecm.gwt.runtime.client.http.HttpResponse;
import org.nuxeo.ecm.gwt.runtime.client.http.ServerException;
import org.nuxeo.ecm.gwt.runtime.client.ui.HttpCommand;

import com.google.gwt.user.client.Cookies;
import com.google.gwt.user.client.Window;

/**
 * @author <a href="mailto:bs@nuxeo.com">Bogdan Stefanescu</a>
 *
 */
public class LogoutCommand extends HttpCommand {

    public LogoutCommand() {
    }

    @Override
    protected void doExecute() throws Throwable {
        post(GWT.getHostPageBaseURL() + "/@@login").send();
        Cookies.removeCookie("JSESSIONID");
    }

    @Override
    public void onSuccess(HttpResponse response) {
        Window.Location.reload();
    }


    @Override
    public void onFailure(Throwable cause) {
        if (cause instanceof ServerException) {
            if ( ((ServerException)cause).getResponse().getStatusCode() == 404) {
                Window.Location.reload();
                return; // logout success
            }
        }
        super.onFailure(cause);
    }
}
