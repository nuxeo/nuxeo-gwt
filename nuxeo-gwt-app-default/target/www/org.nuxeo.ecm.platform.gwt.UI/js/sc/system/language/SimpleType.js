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

 





isc.builtinTypes =
{
    // basic types
    text:{validators:{type:"isString", typeCastValidator:true}},
    "boolean":{validators:{type:"isBoolean", typeCastValidator:true}},
    integer:{validators:{type:"isInteger", typeCastValidator:true},
        normalDisplayFormatter : function (value, field) {
           if (isc.isA.Number(value)) return value.toFormattedString();
           return value;
        },
        getGroupValue : function(value, record, field, fieldName, grid) {
           var g = field.groupGranularity;
           return g ? Math.ceil(value / g) : value;
        },
        getGroupTitle : function(value, record, field, fieldName, grid) {
           // if the field is an integer and groupGranularity is set,
           // form the granularity string
           var g = field.groupGranularity;
           return g ? ((value - 1) * g) + " - " + (value * g) : value;
        }
    },
    "float":{validators:{type:"isFloat", typeCastValidator:true},
        normalDisplayFormatter : function (value, field) {
           if (isc.isA.Number(value)) return value.toFormattedString();
           return value;
        },
        getGroupValue : function(value, record, field, fieldName, grid) {
           // the field is a float and groupPrecision is set as positive integer
           field.groupPrecision = parseInt(field.groupPrecision);
           if (field.groupPrecision < 0) field.groupPrecision = field.groupPrecision * -1;
           var p = field.groupPrecision ? Math.pow(10, field.groupPrecision) : null;
           return p ? Math.floor(value * p) / p : value;
        },
        getGroupTitle : function(value, record, field, fieldName, grid) {
           // the field is a float type and groupPrecision is set
           // the return title should be appended with a *
           return field.groupPrecision ? value+"*" : value;
        }
    },
    date:{validators:{type:"isDate", typeCastValidator:true},
        normalDisplayFormatter : function (value, field) {
           if (isc.isA.Date(value)) return value.toNormalDate();
           return value;
        },
        groupingModes : {
            day:"by Day",
            week:"by Week",
            month:"by Month",
            quarter:"by Quarter",
            year:"by Year",
            dayOfMonth:"by Day of Month"
        },
        defaultGroupingMode : "day", //default grouping mode
        groupingMode : this.defaultGroupingMode,
        getGroupValue : function(value, record, field, fieldName, grid) {
           var returnValue=value;
           // if groupingMode is undefined, pick it up here from defaultGroupingMode
           var groupingMode = field.groupingMode =
                (field.groupingMode || field._simpleType.defaultGroupingMode || null);
           // the field is a date and groupingModes is set
           if (isc.isA.Date(value) && groupingMode) {
               // check all possible values in the form {identified : return string}
               // { week:"by week", month:"by month", year:"by year" }
               // { dayOfWeek:"by day of week", dayOfMonth:"by day of month" }
               // { timezoneHours:"by Timezone hours", timezoneMinutes:"by Timezone Minutes" }
               // { timezoneSeconds:"by Timezone Seconds" }
               // { default: { day:"by day" }
               switch (groupingMode) {
                   case "year":
                       returnValue = value.getFullYear();
                   break;
                   case "quarter":
                       returnValue = Math.floor(value.getMonth() / 3) + 1;
                   break;
                   case "month":
                       returnValue = value.getMonth();
                   break;
                   case "week":
                       returnValue = value.getWeek();
                   break;
                   case "day":
                   case "dayOfWeek":
                       returnValue = value.getDay();
                   break;
                   case "dayOfMonth":
                       returnValue = value.getDate();
                   break;
                   case "timezoneHours":
                       returnValue = value.getTimezoneOffset()/60;
                   break;
                   case "timezoneMinutes":
                       returnValue = value.getTimezoneOffset();
                   break;
                   case "timezoneSeconds":
                       returnValue = value.getTimezoneOffset()*60;
                   break;
               }
           }
           return returnValue;
        },
        getGroupTitle : function(value, record, field, fieldName, grid) {
           var returnValue=value;
           // if groupingMode is undefined, pick it up here from defaultGroupingMode
           var groupingMode = field.groupingMode =
                (field.groupingMode || field._simpleType.defaultGroupingMode || null);
           // the field is a date and groupingModes is set

           if (groupingMode && value != "-none-") {
               // check all possible values in the form {identified : return string}
               // { week:"by week", month:"by month", year:"by year" }
               // { dayOfWeek:"by day of week", dayOfMonth:"by day of month" }
               // { timezoneHours:"by Timezone hours", timezoneMinutes:"by Timezone Minutes" }
               // { timezoneSeconds:"by Timezone Seconds" }
               // { default: { day:"by day" }
               switch (groupingMode) {
                   case "month":
                       returnValue = Date.getShortMonthNames()[value];
                   break;
                   case "quarter":
                       returnValue = "Q" + value;
                   break;
                   case "week":
                       returnValue = "Week #" + value;
                   break;
                   case "day":
                   case "dayOfWeek":
                       returnValue = Date.getShortDayNames()[value];
                   break;
                   case "dayOfMonth":
                       returnValue = value;
                   break;
                   case "timezoneHours":
                       returnValue = "GMT+" + value;
                   break;
                   case "timezoneMinutes":
                       returnValue = "GMT+" + value + " minutes";
                   break;
                   case "timezoneSeconds":
                       returnValue = "GMT+" + value + " seconds";
                   break;
               }
           }
           return returnValue;
        }
    },
    time:{validators:{type:"isTime", typeCastValidator:true},
        normalDisplayFormatter : function (value, field) {
           if (isc.isA.Date(value)) return isc.Time.toTime(value);
           return value;
        },
        groupingModes : {
            hours:"by Hours",
            minutes:"by Minutes",
            seconds:"by Seconds",
            miliseconds:"by Miliseconds"
        },
        defaultGroupingMode : "hours", //default grouping mode
        groupingMode : this.defaultGroupingMode,
        getGroupValue : function(value, record, field, fieldName, grid) {
           var returnValue=value;
           // if groupingMode is undefined, pick it up here from defaultGroupingMode
           var groupingMode = field.groupingMode =
                (field.groupingMode || field._simpleType.defaultGroupingMode || null);
           // the field is a date and groupingModes is set
           if (isc.isA.Date(value) && groupingMode) {
               // check all possible values in the form {identified : return string}
               // { hours:"by Hours", minutes:"by Minutes", seconds:"by Seconds" }
               // { miliseconds:"by Miliseconds", }
               // { default: { hours:"by hours" }
               switch (groupingMode) {
                   case "hours":
                       returnValue = value.getHours();
                   break;
                   case "minutes":
                       returnValue = value.getMinutes();
                   break;
                   case "seconds":
                       returnValue = value.getSeconds();
                   break;
                   case "miliseconds":
                       returnValue = value.getMilliseconds();
                   break;
               }
           }
           return returnValue;
        },
        getGroupTitle : function(value, record, field, fieldName, grid) {
           var returnValue=value;
           var groupingMode = field.groupingMode || field._simpleType.defaultGroupingMode || null;
           // the field is a date and groupingModes is set
           if (groupingMode && value != "-none-") {
               // check all possible values in the form {identified : return string}
               // { hours:"by Hours", minutes:"by Minutes", seconds:"by Seconds" }
               // { miliseconds:"by Miliseconds", }
               // { default: { hours:"by hours" }
               switch (groupingMode) {
                   case "hours":
                   case "minutes":
                   case "seconds":
                   case "miliseconds":
                       returnValue = value;
                   break;
               }
           }
           return returnValue;
        }
    },

    // synonyms of basic types.  NOTE: must inheritFrom rather than duplicate base type
    // definitions, so that the equivalent of "instanceof" checks will detect them as
    // being of the same base type
    string:{inheritsFrom:"text"}, // XML Schema
    "int":{inheritsFrom:"integer"}, // XML Schema
    "long":{inheritsFrom:"integer"},
    number:{inheritsFrom:"integer"},
    decimal:{inheritsFrom:"float"}, // XML Schema
    "double":{inheritsFrom:"float"}, // XML Schema
    dateTime:{inheritsFrom:"date"}, // XML Schema
    datetime:{inheritsFrom:"date"},


    // derived types
    positiveInteger:{
        inheritsFrom:"integer",
        validators:{type:"integerRange", min:0}
    },
    integerPercent:{
        inheritsFrom:"integer",
        validators:{type:"integerRange", min:0, max:100}
    },
    percent:{inheritsFrom:"integerPercent"},
    sequence:{inheritsFrom:"integer"},
    "enum":{validators:"isOneOf"},
    "intEnum":{inheritsFrom:"integer",validators:"isOneOf"},
    regexp:{inheritsFrom:"text", validators:"isRegexp"},
    identifier:{inheritsFrom:"text", validators:"isIdentifier"},
    URL:{inheritsFrom:"text"},
    image:{inheritsFrom:"text"},
    HTML:{inheritsFrom:"text"},
    measure:{validators:"isMeasure"},
    integerOrAuto:{validators:"integerOrAuto"},
    expression:{inheritsFrom:"text"},
    method:{inheritsFrom:"text"},
    "function":{inheritsFrom:"text"},
    alignEnum:{
        inheritsFrom:"enum",
        valueMap:{left:"left", center:"center", right:"right"}
    },
    valignEnum:{
        inheritsFrom:"enum",
        valueMap:{top:"top", bottom:"bottom", center:"center"}
    },
    sideEnum:{
        inheritsFrom:"enum",
        valueMap:{left:"left", right:"right", top:"top", bottom:"bottom"}
    },
    color:{inheritsFrom:"string", validators:"isColor"}
    
};

(function () { 
    
    for (var typeName in isc.builtinTypes) {
        isc.builtinTypes[typeName].name = typeName;
    }
})();



//> @class SimpleType
// An atomic type such as a string or number, that is generally stored, displayed and
// manipulated as a single value.
// <P>
// SimpleTypes can be created at any time, and subsequently referred to as a 
// +link{dataSourceField.type,field type} in +link{DataSource,DataSources} and
// +link{DataBoundComponent,DataBoundComponents}.  This allows you to define
// +link{simpleType.validators,validation}, +link{simpleType.normalDisplayFormatter,formatting}
// and +link{simpleType.editorType,editing} behaviors for a type to be reused across all
// +link{DataBoundComponent,DataBoundComponents}.
// <P>
// Note that the term "simpleType" is used in the same sense as in
// +externalLink{XML Schema,http://www.w3.org/TR/xmlschema-0/}, and
// +link{XMLTools.loadXMLSchema()} will create new SimpleType definitions.
// <P>
// An +explorerExample{customSimpleType,example} is here.
//
// @treeLocation Client Reference/Data Binding
// @visibility external
// @example customSimpleType
//<

isc.defineClass("SimpleType").addClassMethods({

    //> @attr simpleType.name (identifier : null : IR)
    // Name of the type, used to refer to the type from +link{DataSourceField.name,field.name}.
    // @visibility external
    //<

    //> @attr simpleType.inheritsFrom (identifier : null : IR)
    // Name of another SimpleType from which this type should inherit.
    // <P>
    // Validators, if any, will be combined.  All other SimpleType properties default to the
    // inherited type's value.
    //
    // @visibility external
    // @example customSimpleType
    //<

    //> @attr simpleType.validators (Array of Validator : null : IR)
    // Validators to apply to value of this type.
    //
    // @group validation
    // @visibility external
    //<
    
    //> @attr simpleType.valueMap (ValueMap : null : IR)
    // List of legal values for this type, like +link{DataSourceField.valueMap}.
    //
    // @group dataType
    // @visibility external
    //<

    //> @attr simpleType.editorType (FormItem ClassName : null : IR)
    // Classname of the FormItem that should be the default for editing values of this type (eg
    // "SelectItem").
    // <P>
    // You can create a simple custom FormItem by adding default +link{FormItem.icons} that
    // launch custom value picking dialogs (an example is in the <i>QuickStart
    // Guide</i>, Chapter 9, <i>Extending SmartClient</i>).  By setting simpleType.editorType
    // to the name of your custom FormItem, forms will automatically use the custom FormItem,
    // as will grids performing +link{listGrid.canEdit,inline editing}.
    //
    // @visibility external
    //<

    //> @method simpleType.shortDisplayFormatter() 
    // Formatter for values of this type when compact display is required, for example, in a
    // +link{ListGrid} or +link{TreeGrid}.
    // <P>
    // When this formatter is called, the SimpleType object is available as "this".  
    // <P>
    // A formatter can make itself configurable on a per-component or per-field basis by
    // checking properties on the component or field.  For example, a formatter for account IDs
    // may want to omit a prefix in views where it is redundant, and could check a flag
    // listGridField.omitAccountIdPrefix for this purpose.
    //
    // @param value (any) value to be formatted
    // @param [field] (Field) field descriptor from the component calling the formatter, if
    //                      applicable.  Depending on the calling component, this could be a
    //                      +link{ListGridField}, +link{TreeGridField}, etc
    // @param [component] (DataBoundComponent) component calling this formatter, if applicable
    // @param [record] (Object) Full record, if applicable
    //
    // @visibility external
    //< 

    //> @method simpleType.normalDisplayFormatter() 
    // Normal formatter for values of this type used in a +link{StaticTextItem} or
    // +link{DetailViewer}.
    // <P>
    // When this formatter is called, the SimpleType object is available as "this".  
    // <P>
    // A formatter can make itself configurable on a per-component or per-field basis by
    // checking properties on the component or field.  For example, a formatter for account IDs
    // may want to omit a prefix in views where it is redundant, and could check a flag
    // detailViewer.omitAccountIdPrefix for this purpose.
    //
    // @param value (any) value to be formatted
    // @param [field] (Field) field descriptor from the component calling the formatter, if
    //                      applicable.  Depending on the calling component, this could be a
    //                      +link{FormItem}, +link{DetailViewerField}, etc
    // @param [component] (DataBoundComponent) component calling this formatter, if applicable
    // @param [record] (Object) Full record, if applicable
    //
    // @visibility external
    //<

    // get a type definition
    getType : function (typeName, ds) {
        // respect local types (dataSource.getType() calls us back, but without passing itself)
        if (ds) return ds.getType(typeName); 

        var type = isc.builtinTypes[typeName];
        return type;
    },

    
    
    // get the type this typeName or type definition inherits from
    getBaseType : function (type, ds) {
        if (isc.isA.String(type)) type = this.getType(type, ds);
        if (type == null) return null; // return null for being passed null and for
                                       // non-existant types
        while (type.inheritsFrom) {
            var parentType = this.getType(type.inheritsFrom, ds);
            if (parentType == null) return null; // no such parentType
            type = parentType;
        }
        return type.name;
    },

    // determine whether one type inherits from another
    inheritsFrom : function (type, otherType, ds) {
        if (isc.isA.String(type)) type = this.getType(type, ds);
        if (type == null) return false; // return false for non-existant types

        if (type.name == otherType) return true;
        while (type.inheritsFrom) {
            var parentType = this.getType(type.inheritsFrom, ds);
            if (parentType == null) return null; // no such parentType
            if (parentType.name == otherType) return true;
            type = parentType;
        }
        return false;
    },

    // validate a value of simple type
    validateValue : function (type, value, ds) {
        
        var field = { name:"_temp", type:type };
        isc.SimpleType.addTypeDefaults(field);
        var ds = ds || isc.DS.get("Object");
        return ds.validateFieldValue(field, value);
    },

    // add the type defaults to a field, once ever per field.
    // Happens to DataSources fields when fields are first accessed for the DataSource.
    // Happens to component.fields *which don't have a DataSource field* during DataSource
    // binding.  Otherwise, copied from DataSource fields like other properties.
    addTypeDefaults : function (field, ds) {
 
        if (field == null || field._typeDefaultsAdded) return;
        field._typeDefaultsAdded = true; // should only ever happen once per field

        // get the type definition, looking for locally defined type if a DataSource is passed
        // in
        var type = this.getType(field.type, ds);
        if (type == null) return;

        // hang the type definition itself on the field, since when formatters are called, they
        // need to be invoked on the type
        field._simpleType = type;

        // add the valueMap to the field
        if (field.valueMap == null) {
            var valueMap = this.getInheritedProperty(type, "valueMap", ds);
            if (valueMap != null) type.valueMap = field.valueMap = valueMap;
        }
        
        if (field.editorType == null) {
            var editorType = this.getInheritedProperty(type, "editorType", ds);
            if (editorType != null) type.editorType = field.editorType = editorType;
        }

        // add formatters / parsers
        
        var formatter = this.getInheritedProperty(type, "shortDisplayFormatter", ds)
        if (formatter != null) type.shortDisplayFormatter = field._shortDisplayFormatter = formatter;
        var formatter = this.getInheritedProperty(type, "normalDisplayFormatter", ds)
        if (formatter != null) type.normalDisplayFormatter = field._normalDisplayFormatter = formatter;
        // these aren't documented yet because they only get called by inline editing, not
        // normal forms
        var formatter = this.getInheritedProperty(type, "editFormatter", ds)
        if (formatter != null) type.editFormatter = field._editFormatter = formatter;
        var parser = this.getInheritedProperty(type, "parseInput", ds)
        if (parser != null) type.parseInput = field._parseInput = parser;

        // add validators
        var typeValidators = this.getValidators(type, ds);
        if (typeValidators == null) return;
    
        if (!field.validators) {
            
            field.validators = typeValidators;
        } else {
            // there are both field validators and type validators
            if (!isc.isAn.Array(field.validators)) field.validators = [field.validators];
            field.validators.addAsList(typeValidators);
            this._reorderTypeValidator(field.validators);
        }
    },

    // get a property that can be defined in this type, or any type this type inherits from
    getInheritedProperty : function (type, propertyName, ds) {
        while (type != null) {
            if (type[propertyName] != null) return type[propertyName]
            type = this.getType(type.inheritsFrom, ds);
        }
    },

    // return all validators for the given type (can be the name or the type definition), taking
    // inheritance into account
    
    getValidators : function (type, ds) {
        if (isc.isA.String(type)) type = this.getType(type, ds);

        // _normalized flag indicates we've already made sure the "validators" Array is in the
        // canconical Array of Objects format
        if (type._normalized) return type.validators;

        var validators = type.validators;

        if (validators != null) { 
            // handle validators expressed as a single string or object
            if (!isc.isAn.Array(validators)) validators = [validators];

            var normalizedValidators = [];
            // if any of the validators are strings, replace them with validator objects,
            // setting the type to the string
            for (var i = 0; i < validators.length; i++) {
                var validator = validators[i];
                if (isc.isA.String(validator)) {
                    validator = {"type":validator};
                
                } else if (validator.type == null && isc.isAn.emptyObject(validator)) {
                    continue;
                }
                validator._generated = true;
                normalizedValidators.add(validator);
            }
            validators = normalizedValidators;
        }

        // lookup the parent type's validators and combine
        var parentTypeID = type.inheritsFrom;
        if (parentTypeID != null) {
            var parentType = this.getType(parentTypeID, ds);
            if (parentType != null) {
                var parentValidators = this.getValidators(parentType, ds);
                if (parentValidators != null) {
                    validators = validators || [];
                    // NOTE: this intentionally places the subType's validators first, to allow
                    // error message overrides
                    validators.addAsList(parentValidators);
                    this._reorderTypeValidator(validators);
                }
            }
        }

        // flag this Array of validators as the default for the type
        if (validators) validators._typeValidators = true;

        // store the normalized and combined validators
        type.validators = validators;
        type._normalized = true;
        return validators;
    },
    _$typeCastValidator:"typeCastValidator",
    _reorderTypeValidator : function (validators) {
        

        //this.logWarn("validators are: " + this.echoAll(validators));

        // find the typeCast validator to determine the basic type this field inherits from
        // (equivalent to looking up the base type given the field type)
        var castValidator = validators.find(this._$typeCastValidator, true);
        if (castValidator) {
            // look for the most recent declaration of the basic type validator, in order to 
            // support redeclaration of the type validator with a custom error message, eg
            // { type:"isDate", errorMessage:"customMessage" }
            var castType = castValidator.type;
            //this.logWarn("cast validator is type: " + castType);
            for (var i = 0; i < validators.length; i++) {
                if (validators[i].type == castType) break;
            }
    
            // promote the most recent declaration of the basic type validator so that it will
            // run first, so subsequent validators don't have to check type
            
            //this.logWarn("moving validator to front: " + this.echo(validators[i]));
            if (i != 0) validators.unshift(validators[i]);
            validators[0].stopIfFalse = true;
        }
    }
 

});
isc.SimpleType.addMethods({
    init : function () {
        isc.builtinTypes[this.name] = this;
        
        // If validOperators is set, register it with isc.DataSource
        if (this.validOperators != null) {
            isc.DataSource.setTypeOperators(this.name, this.validOperators);
        }
    }
});
