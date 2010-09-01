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

package org.nuxeo.ecm.gwt.runtime.client.http;

import com.google.gwt.http.client.Request;
import com.google.gwt.http.client.RequestBuilder;
import com.google.gwt.http.client.RequestCallback;
import com.google.gwt.http.client.RequestException;
import com.google.gwt.http.client.URL;
import com.google.gwt.http.client.RequestBuilder.Method;
import com.google.gwt.json.client.JSONValue;

/**
 * @author <a href="mailto:bs@nuxeo.com">Bogdan Stefanescu</a>
 */
public class HttpRequest {

    protected RequestBuilder builder;

    public HttpRequest(Method method, String url) {
        builder = new RequestBuilder(method, URL.encode(url));
    }

    public RequestBuilder getBuilder() {
        return builder;
    }

    /**
     * @see com.google.gwt.http.client.RequestBuilder#getCallback()
     */
    public RequestCallback getCallback() {
        return builder.getCallback();
    }

    /**
     * @see com.google.gwt.http.client.RequestBuilder#getHeader(java.lang.String)
     */
    public String getHeader(String header) {
        return builder.getHeader(header);
    }

    /**
     * @see com.google.gwt.http.client.RequestBuilder#getHTTPMethod()
     */
    public String getHTTPMethod() {
        return builder.getHTTPMethod();
    }

    /**
     * @see com.google.gwt.http.client.RequestBuilder#getPassword()
     */
    public String getPassword() {
        return builder.getPassword();
    }

    /**
     * @see com.google.gwt.http.client.RequestBuilder#getRequestData()
     */
    public String getRequestData() {
        return builder.getRequestData();
    }

    /**
     * @see com.google.gwt.http.client.RequestBuilder#getTimeoutMillis()
     */
    public int getTimeoutMillis() {
        return builder.getTimeoutMillis();
    }

    /**
     * @see com.google.gwt.http.client.RequestBuilder#getUrl()
     */
    public String getUrl() {
        return builder.getUrl();
    }

    /**
     * @see com.google.gwt.http.client.RequestBuilder#getUser()
     */
    public String getUser() {
        return builder.getUser();
    }

    /**
     * @see com.google.gwt.http.client.RequestBuilder#send()
     */
    public Request send() throws RequestException {
        return builder.send();
    }

    /**
     * @see com.google.gwt.http.client.RequestBuilder#sendRequest(java.lang.String, com.google.gwt.http.client.RequestCallback)
     */
    public Request sendRequest(String requestData, RequestCallback callback)
            throws RequestException {
        return builder.sendRequest(requestData, callback);
    }

    /**
     * @see com.google.gwt.http.client.RequestBuilder#setCallback(com.google.gwt.http.client.RequestCallback)
     */
    public HttpRequest setCallback(RequestCallback callback) {
        builder.setCallback(callback);
        return this;
    }

    /**
     * @see com.google.gwt.http.client.RequestBuilder#setHeader(java.lang.String, java.lang.String)
     */
    public HttpRequest setHeader(String header, String value) {
        builder.setHeader(header, value);
        return this;
    }

    /**
     * @see com.google.gwt.http.client.RequestBuilder#setPassword(java.lang.String)
     */
    public HttpRequest setPassword(String password) {
        builder.setPassword(password);
        return this;
    }

    /**
     * @see com.google.gwt.http.client.RequestBuilder#setRequestData(java.lang.String)
     */
    public HttpRequest setRequestData(String requestData) {
        builder.setRequestData(requestData);
        return this;
    }

    public HttpRequest setRequestData(JSONValue value) {
        builder.setRequestData(value.toString());
        return this;
    }

    /**
     * @see com.google.gwt.http.client.RequestBuilder#setTimeoutMillis(int)
     */
    public HttpRequest setTimeoutMillis(int timeoutMillis) {
        builder.setTimeoutMillis(timeoutMillis);
        return this;
    }

    /**
     * @see com.google.gwt.http.client.RequestBuilder#setUser(java.lang.String)
     */
    public HttpRequest setUser(String user) {
        builder.setUser(user);
        return this;
    }

}
