/*
 * Isomorphic SmartClient
 * Version 7.0beta2 (2008-11-15)
 * Copyright(c) 1998-2007 Isomorphic Software, Inc. All rights reserved.
 * "SmartClient" is a trademark of Isomorphic Software, Inc.
 *
 * licensing@smartclient.com
 *
 * http://smartclient.com/license
 */
//
// Math helpers
//
isc.Math = {
    random : function (a,b) {
        if (b==null) {
            return Math.round(Math.random()*a)
        } else {
            return Math.round(Math.random()*(b-a))+a
        }
    }
}
