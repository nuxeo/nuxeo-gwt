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

 

// SOAPUploadItem depends on MultiUploadItem, which requires ListGrid (not part of the forms module)
if (isc.ListGrid) {



//> @class SOAPUploadItem
// @visibility internal
//<
isc.ClassFactory.defineClass("SOAPUploadItem", "DialogUploadItem");
isc.SOAPUploadItem.addProperties({
    dataSource: "sessionFiles"
});

}