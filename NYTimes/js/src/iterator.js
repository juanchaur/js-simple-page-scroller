/**
 * @author Juan Pablo Chaur M.
 * Iterator object that receives the JSON Object 'oNews' and with that 
 * information is initialized
 * @return {[Object} 
 */
var oIteratorPattern = function( _oObjectToIterate ){
	"use strict"
	/**
	 * Private variables that controls the iterator pattern
	 */
	var _nIndex = null,
		_oData = null,
		_nLength = null;
	/**
	 * Initialize the private variables of the iterator
	 * @param  {None} 
	 * @return {None}
	 */
	var _fInitializeVariables = ( function() {
		_nIndex = 0;
		_oData = _oObjectToIterate;
		_nLength = _oData.length;
	} )();
	/**
	 * Returns if the index hasn't arrive to the end of the ArrayObject
	 * @return {Boolean}
	 */
	var _fHasNext = function() {
		return _nIndex < _nLength;	
	};
	/**
	 * Returns if the index hasn't arrive at the beginning of its values
	 * @return {Boolean}
	 */
	var _fHasPrevious = function() {
		return _nIndex > -1;	
	};
	/**
	 * Function that is used either to iterate forwards and backwards
	 * @param  {Boolean} bIsForward To know if it's going forwards or backwards
	 * @param  {Number} nIncrement the amount of increment at every iteration
	 * @return {Object} current Object before the index is updated
	 */
	var _fIterate = function( bIsForward, nIncrement ) {
		var oElement;

		if( bIsForward ){
			if( !_fHasNext() ){
				return null;
			}
			oElement = _oData[ _nIndex ];
			_nIndex += nIncrement;	
		}else {
			if( !_fHasPrevious() ){
				return null;
			}
			oElement = _oData[ _nIndex ];
			_nIndex -= nIncrement;	
		}
		return oElement;
	};
	/**
	 * Function to iterates forwards. It is a simple call to the previous function
	 * @return {Object} current Object before the index is updated
	 */
	var _fNext = function() {
		return _fIterate( true, 1 );
	}
	/**
	 * Function to iterates backwards. It is a simple call to the previous function
	 * @return {Object} current Object before the index is updated
	 */
	var _fPrevious = function() {
		return _fIterate( false, 1 );
	};
	/**
	 * Returns the current object in the iterator
	 * @return {Object}
	 */
	var _fCurrent = function() {
		return _oData[ _nIndex ];
	};
	var _fCurrentIndex = function() {
		return _nIndex;
	}; 
	/**
	 * Privileged methods
	 */
	return {
        hasNext:        _fHasNext,
        hasPrevious:    _fHasPrevious,
        next:           _fNext,
        previous:       _fPrevious,
        current:        _fCurrent,
        currentIndex:   _fCurrentIndex,
        iteratorLength: _nLength
	};
};