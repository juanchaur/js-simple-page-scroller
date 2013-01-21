/**
 * Toolkit of functionalities: it is a object that contains different modules as a properties 
 * @type {Object}
 */
var Namespace = Namespace || {};
Namespace.utilities = {};

/**
 * Module of math operations: the extensible-module design pattern is applied
 * It has different functionalities as:
 * 	- add2Val
 * 	- multiple2Val
 * 	- divide2Val
 * 	- substract2Val
 * 	- addCreator
 * 	- multiplyCreator
 * 	- divideCreator
 * 	- substractCreator
 * @return {Object} a object with all those public functionalities
 */
Namespace.utilities.math =  (function () {
	/**
	 * Private variables of the module to make more generic the mathematical operations
	 * @type {String}
	 */
	var _OP_ADD = "+",
		_OP_MUL = "*",
		_OP_DIV = "/",
		_OP_SUB = "-";
	/**
	 * Private variable which contains all the operators of any calculation 
	 * possible with this toolkit
	 * @type {Array}
	 */
	var _oOperands = [ _OP_ADD, _OP_MUL, _OP_DIV, _OP_SUB ];
	/**
	 * Function that makes either divisions, subtracts, multiplications and sum.
	 * @param  {Strin} sOperator Which operation it's going to be doing
	 * @param  {Number} nOperand1 first operand 
	 * @param  {Number} nOperand2 second operand
	 * @return {Number} The result of the operations
	 */
	function _fCalculateOperations ( sOperator, nOperand1, nOperand2 ) {
		var nResult = 0;
		if( isNaN( nOperand1 ) || isNaN( nOperand2 ) ){
			return NaN;
		}
		// Checks if any arguments is a string
		nOperand1 = parseInt(nOperand1, 10);
		nOperand2 = parseInt(nOperand2, 10);

		switch( sOperator ){
			case _OP_ADD:
				nResult = nOperand1 + nOperand2;
				break;
			case _OP_MUL:
				nResult = nOperand1 * nOperand2;
				break;
			case _OP_DIV:
				nResult = nOperand2 / nOperand1;
				break;
			case _OP_SUB:
				nResult = nOperand2 - nOperand1;
				break;
		}
		return nResult;
	};
	/**
	 * The following 4 functions is the adapter between the operation needed and the creator of the
	 * operation
	 * @param  {Number} nOperand1 First operator
	 * @param  {Number} nOperand2 Second operator
	 * @return {Number}           containing all the grades.
	 */
	function _fAdd2Values( nOperand1, nOperand2 ) {
		return _fCalculateOperations( _OP_ADD, nOperand1, nOperand2 );
	};
	function _fMultiply2Values( nOperand1, nOperand2 ) {
		return _fCalculateOperations( _OP_MUL, nOperand1, nOperand2 );
	};
	function _fDivide2Values( nOperand1, nOperand2 ) {
		return _fCalculateOperations( _OP_DIV, nOperand1, nOperand2 );
	};
	function _fSubstract2Values( nOperand1, nOperand2 ) {
		return _fCalculateOperations( _OP_SUB, nOperand1, nOperand2 );
	};
	/**
	 * Function creates a currying of a operation. It extends the module with new operations when
	 * they are made
	 * @param  {String} sOperator which operation it is goind to be
	 * @param  {Number} nValue    Operand of the currying
	 * @return {None}           
	 */
	function _fCreateFunctionOperator( sOperator, nValue ) {
		var sNameOfFunction = '';

		switch( sOperator ){
			case _OP_ADD:
				sNameOfFunction = 'addBy' + nValue;
				//debugger;
				Namespace.utilities.math[ sNameOfFunction ] = bind( _fAdd2Values, nValue);
				break;
			case _OP_MUL:
				sNameOfFunction = 'multiplyBy' + nValue;
				Namespace.utilities.math[ sNameOfFunction ] = bind( _fMultiply2Values, nValue);
				break;
			case _OP_DIV:
				sNameOfFunction = 'divideBy' + nValue;
				Namespace.utilities.math[ sNameOfFunction ] = bind( _fDivide2Values, nValue);
				break;
			case _OP_SUB:
				sNameOfFunction = 'substractBy' + nValue;
				Namespace.utilities.math[ sNameOfFunction ] = bind( _fSubstract2Values, nValue);
				break;
		}
	};
	/**
	 * The following 4 functions is the adapter between the operation needed and the creator of the
	 * operation
	 */
	function _fMultiplyCreator () {
		var nValue = arguments[ 0 ],
			nIndex = arguments[ 1 ],
			aArray = arguments[ 2 ];
		_fCreateFunctionOperator( _OP_MUL, nValue );
	};

	function _fAddCreator () {
		var nValue = arguments[ 0 ];
		_fCreateFunctionOperator( _OP_ADD, nValue );
	};

	function _fDivideCreator () {
		var nValue = arguments[ 0 ];
		_fCreateFunctionOperator( _OP_DIV, nValue );
	};
	function _fSubstractCreator () {
		var nValue = arguments[ 0 ];
		_fCreateFunctionOperator( _OP_SUB, nValue );
	};
	/**
	 * The privileged functions that are going to be shown by the module
	 */
	return {
        add2Val			: _fAdd2Values,
        multiple2Val	: _fMultiply2Values,
        divide2Val		: _fDivide2Values,
        substract2Val	: _fSubstract2Values,
        
        addCreator 		: _fAddCreator,
        multiplyCreator	: _fMultiplyCreator,
        divideCreator 	: _fDivideCreator,
        substractCreator: _fSubstractCreator
	};
	
} )();

/**
 * Module containing a different functionalities in a general use
 * Functionalities:
 * - isString 
* - isNumber 
* - isBoolean 
* - isUndefined 
* - isNull 
* - isObject 
* - isArray 
* - isFunction 
* - isDOMObject 
* - isHTMLCollection 
* - isLiteralObject 
* - ltrim 
* - rtrim 
* - trim 
 * 
 * @return {Object}   [description]
 */
Namespace.utilities.general = ( function () {
	var _isString = function ( oElement ) {
		return typeof oElement === "string"
	};
	var _isNumber = function ( oElement ) {
		return typeof oElement === "number" && isFinite( oElement ); 
	};
	var _isBoolean = function ( oElement ) {
		return typeof oElement === "boolean";
	};
	var _isUndefined = function ( oElement ) {
		return typeof oElement === "undefined";
	};
	var _isNull = function ( oElement ) {
		return typeof oElement === null;
	};
	var _isObject = function ( oElement ) {
		return typeof oElement === 'object';
	};
	var _isArray = function ( oElement ) {
		return Object.prototype.toString.call( oElement ) === '[object Array]';

	};
	var _isFunction = function ( oElement ) {
		return typeof oElement === "function";
	};
	var _isDOM_Node = function ( oElement ) {
		return typeof Node === "object" ? oElement instanceof Node :
										oElement && typeof oElement === "object" && 
										typeof oElement.nodeType === "number" && 
										typeof oElement.nodeName==="string";
	};
	var  _isHTMLCollection = function ( oElement ) {
		return Object.prototype.toString.call( oElement ) === '[object HTMLCollection]';
	};
	
	var _isLiteralObject = function ( oElement ) {
		return Object.prototype.toString.call( oElement ) === '[object Object]';
	};
	function _ltrim ( sText ) {
		return sText.toString().replace( /^\s+/g, "" ); 
	};
	function _rtrim ( sText ) {
		return sText.toString().replace( /\s*$/g, "" );
	};
	function _trim ( sText ) {
		return _ltrim( _rtrim( sText ) ); 
	};

	return {
		isString : _isString,
		isNumber : _isNumber,
		isBoolean : _isBoolean,
		isUndefined : _isUndefined,
		isNull : _isNull,
		isObject : _isObject,
		isArray : _isArray,
		isFunction : _isFunction,
		isDOMObject : _isDOM_Node,
		isHTMLCollection : _isHTMLCollection,
		isLiteralObject : _isLiteralObject,
		ltrim : _ltrim,
		rtrim : _rtrim,
		trim : _trim
		
	};

} )();

/**
 * Module containing al the functionalities related to the DOM elements. 
 * This methos checks whether or not is be able the native method of the function. If not,
 * another implementatio is made.
 * @return {Object}
 */
Namespace.utilities.DOMInteraction = ( function () {
	
	var _fHasClass = (function(){
		var cache = {},
			_oNSGeneral = Namespace.utilities.general;
			
		if( ( "classList" in document.createElement( "a" ) ) ){
			return function( oElement, sClass ){
				if( ! _oNSGeneral.isDOMObject( oElement ) || sClass === "" ) {
					return false;
				}
				if( _oNSGeneral.isString( sClass ) ){
					return oElement && oElement.classList.contains( sClass );
				}
			}
		} else {
			return function (oElement, sClass) {
				var re;
				if( ! _oNSGeneral.isDOMObject( oElement ) ) {
					return false;
				}
				if( _oNSGeneral.isString( sClass ) ){
					re = (cache[sClass] || 
						 (cache[sClass] = new RegExp('(?:^|\\s)' + sClass + '(?:\\s|$)' )));
					return oElement && re.test(oElement.className)		
				}
			}
		}
	})();
	
	var _fAddClass = function ( oElement, sClass ){
		var _oNSGeneral = Namespace.utilities.general;
		
		if( ! _oNSGeneral.isDOMObject( oElement ) || sClass === "" ) {
			return false;
		}
		if( _oNSGeneral.isString( sClass ) ){
			if( ! _fHasClass( oElement, sClass ) ) {
				// check for native classList method: to speed-up the adding
				if( ( "classList" in document.createElement( "a" ) ) ){
					oElement.classList.add( sClass );
				} else {
					oElement.className += " " + sClass;
					oElement.className = _oNSGeneral.trim( oElement.className );
				}
			}
		}
		//return this; //if we want chaining
	};
	
	var _fRemoveClass = function ( oElement, sClass ) {
		var _oNSGeneral = Namespace.utilities.general,
			rRegExOfToRemoveClass;
			
		if( ! _oNSGeneral.isDOMObject( oElement ) || sClass === "" ) {
			return false;
		}
		if( _oNSGeneral.isString( sClass ) ){
			// check for native classList method: to speed-up the removing
			if( ( "classList" in document.createElement( "a" ) ) ){
				oElement.classList.remove( sClass );
			} else {
				rRegExOfToRemoveClass = new RegExp('(?:^|\\s)' + sClass + '(?:\\s|$)', 'g');
				oElement.className = oElement.className.replace(rRegExOfToRemoveClass, '');
				oElement.className = _oNSGeneral.trim( oElement.className );
			}
		}		
		//return this; //if we want chaining
	};

	var _fGetByClass = function ( sClass, sType, oContainer ) {
		var _oNSGeneral = Namespace.utilities.general,
			oSelfContainer = oContainer || document,
			sTagType = sType || '*',
			oNodeListOfContainer,
			oNodeListLength,
			aResultArray = [],
			i = 0;
			
		if( ! _oNSGeneral.isDOMObject( oSelfContainer ) ){
			return false;
		}

		oNodeListOfContainer = oSelfContainer.getElementsByTagName( sTagType );
		oNodeListLength = oNodeListOfContainer.length;
		
		if( oSelfContainer.getElementsByClassName ){
			return oSelfContainer.getElementsByClassName( sClass );
		}
		else{
			for( ; i < oNodeListLength; i++ ){
				if( _fHasClass( oNodeListOfContainer[ i ], sClass ) ){
					aResultArray.push( oNodeListOfContainer[ i ] )
				}
			}
		}
		return aResultArray;
	};
	
	var _fAttachEvent = function ( oContainer, evType, fn, useCapture) {
		if (oContainer.addEventListener) { 
			oContainer.addEventListener(evType, fn, useCapture); 
			return true; 
		}
		else if (oContainer.attachEvent) { 
			var r = oContainer.attachEvent('on' + evType, fn); 
			return r; 
		}
		else {
			oContainer['on' + evType] = fn;
		}
	};
	// callback function para aplicar a los contenedores listener.
	var _fCallbackDelegateBuilder = function( fpCallbackFunction, sType ){
        return function( oEvent ){
            if( oEvent.target.tagName === sType.toUpperCase() ){
                fpCallbackFunction( oEvent );
            }
        };
    }
    // agrega un event listener y aplica bubbling al contenedor
	var _fDelegate =  function ( oContainer, fpCallback, sType, sEventType ){
        var fpCallbackDelegate = _fCallbackDelegateBuilder( fpCallback, sType );
        _fAttachEvent( oContainer, sEventType, fpCallbackDelegate, false );
    }
    
    var _fShowHidden = function ( bShow, oElement, bSmooth ) {
    	var _oState = { visible : "visible", hidden : "hidden",	fade : "fadding" },
    		bHasHiddenClassAlready = _fHasClass( oElement, _oState.hidden ),
    		bHasVisibleClassAlready = _fHasClass( oElement, _oState.visible );
       	
       	if( bShow ){
       		if( ! bHasVisibleClassAlready ){
       			_fRemoveClass( oElement, _oState.hidden );
       			_fAddClass( oElement, _oState.visible );
       		}
       	} else {
       		if( ! bHasHiddenClassAlready ){
       			_fRemoveClass( oElement, _oState.visible );
    			_fAddClass( oElement, _oState.hidden );
       		}
       	}
    	( bSmooth )? _fAddClass( oElement, _oState.fade ) : _fRemoveClass( oElement, _oState.fade ); 
    };
    
    var _fShow = function ( oElement, bSmooth ) {
    	bSmooth = bSmooth || false;
    	_fShowHidden( true, oElement, bSmooth);
    };
    var _fHidden = function ( oElement, bSmooth ) {
    	_fShowHidden( false, oElement, bSmooth);
    }
	    
    return {
    	hasClass : _fHasClass,
    	addClass : _fAddClass,
    	removeClass : _fRemoveClass,
    	getByClass: _fGetByClass,
    	attachEvent : _fAttachEvent,
    	delegate : _fDelegate,
    	show : _fShow,
    	hide : _fHidden
    };
    
})();


/**
 * Module that contains all the general functionalities related to a object
 * Functionalities:
 * 	1- getUniqueIde
 * 	2- extendObject
 * 	3- cloneObject
 * @return {Object}
 */
Namespace.utilities.objectInteraction = ( function () {
	
	var _getIdString = ( function () {
		var id = 0;
		return function( oElement ) {
			if( !oElement.id ){
				oElement.id = 'generated-uid' + id++;
			}
			return oElement.id;
		};	
	})();
	
	var _getIdNumber = ( function () {
        var id = 0;
        return function() {
            return id++;
        };
    })();
    
    var _extendObjectVersion1 = function( oParent, oChild ) {
    	var _fFHelper = function(){};
    	_fFHelper.prototype = oParent;
    	oChild.prototype = new _fFHelper();
    	oChild.prototype.constructor = oChild;
    };
    
    var _extendObjectVersion2 = function ( oParent, oChild ) {
    	var oParentProperty;
    	for( oParentProperty in oParent ){
    		if( oParent.hasOwnProperty( oParentProperty ) && ! oChild.hasOwnProperty( oParentProperty ) ){
    			oChild[ oParentProperty ] = oParent[ oParentProperty ];
    		}
    	}
    };
    
    var _cloneObject = function ( oObjectFrom ){
    	var oReturnedObject = {},
    		property;
    	for( property in oObjectFrom ){
    		if( oObjectFrom.hasOwnProperty( property ) ){
    			oReturnedObject[ property ] = oObjectFrom[ property ];
    		}
    	}
    	return oReturnedObject;
    };
    
	return {
		getUniqueStringId : _getIdString,
		getUniqueId : _getIdNumber,
		extendObject : _extendObjectVersion1,
		extendObject_v2 : _extendObjectVersion2,
		cloneObject : _cloneObject
		
	};
})();


/**
 * Function that iterates throw a array and applicates  a function
 * @param  {Array} aArray     
 * @param  {Function} fpCallBack Function that is going to be applied in each element of the arr
 * @param  {[type]} thisArgs   [description]
 * @return {Array} of changes
 */
Namespace.utilities.each = function ( aArray, fpCallBack, thisArgs){
	var nArrayLength = aArray.length,
		aNewArray = [], 
		mappedValue, 
		oElement,
		i = 0,
		self = thisArgs || this;
		
	for(; i < nArrayLength; i++){
		oElement = aArray[ i ];
		mappedValue = fpCallBack.call( self, oElement, i, aArray );
		aNewArray[ i ] = mappedValue;
	}
	return aNewArray;
}
