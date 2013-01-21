/**
 * Module containing all the functionalities that are need to show the news and interact with 
 * the buttons
 * @return {Object}
 */
var NYTNamespace = ( function( _oIterator, _DOMInteraction, doc ) {
	"use strict"
	/**
	 * Private variables that will be needed in the module
	 */
	var _oNextButton = null,
		_oPreviousButton = null,
		_oCacheArticles = null;
	/**
	 * Initializes all the private variables
	 * @return {None}
	 */
	var _fInitializeVariables = function() {
		_oNextButton = doc.getElementById("down-button");
		_oPreviousButton = doc.getElementById("up-button");
		_oCacheArticles = {};
	};
	/**
	 * Initializes the module. It calls the initialization of the variables and the content
	 * @return {None}
	 */
	var _fInitModule = function() {
		_fInitializeVariables();
		_fGetInitialNews();

		_DOMInteraction.attachEvent( _oNextButton, 'click', function() { 
			return  _fNextPreviousButton( true ); 
		}, false );
		_DOMInteraction.attachEvent( _oPreviousButton, 'click', function() { 
			return  _fNextPreviousButton( false ); 
		}, false );
	};

	var _fInsertAfter = function( newElement, targetElement ) {
		var oParent = targetElement.parentNode;

		if(oParent.lastchild == targetElement) {
			oParent.appendChild(newElement);
		} else {
			oParent.insertBefore(newElement, targetElement.nextSibling);
		}
	};
	/**
	 * Creates a DOM Element and returns it
	 * @param  {Number} nIdArticle number that will be the id of the element
	 * @param  {Object} oObject    JSON Object that has the information for the DOM element
	 * @return {DOM Element}
	 */
	var _fCreateNewsArticle = function( nIdArticle, oObject ) {
		var oArticle = doc.createElement("article"),
			oHeader = doc.createElement("header"),
			oH1 = doc.createElement("h1"),
			oFooter = doc.createElement("footer"),
			oDate = doc.createElement("p"),
			oUrl = doc.createElement("p"),
			oBy = doc.createElement("p"),
			oBody = doc.createElement("p");

		oH1.innerHTML = oObject.title;
		oHeader.appendChild( oH1 );
		oBody.innerHTML = oObject.body;
		oUrl.innerHTML = oObject.url;
		oBy.innerHTML = oObject.byline;
		oDate.innerHTML = oObject.date;
		oFooter.appendChild(oBy);
		oFooter.appendChild(oDate);
		oFooter.appendChild(oUrl);

		oArticle.appendChild( oHeader );
		oArticle.appendChild( oBody );
		oArticle.appendChild( oFooter );
		oArticle.id = "newsId" + nIdArticle;
		_DOMInteraction.addClass( oArticle, "news-article");
		_DOMInteraction.addClass( oArticle, "visible");

		return oArticle;
	};
	/**
	 * Creates the first 3 elements that will be showed in the browser.
	 * @return {None}
	 */
	var _fGetInitialNews = function() {
		var oDocumentFragment = doc.createDocumentFragment(),
			oNewsContainer = doc.getElementById("upwardsButton_section"),
			nCurrentIndex,
			oCurrentElement,
			oArticle,
			i = 0;
			
			for( ; i < 3; i++ ){
				nCurrentIndex = _oIterator.currentIndex();
				oCurrentElement = _oIterator.next();
				oArticle = _fCreateNewsArticle( nCurrentIndex, oCurrentElement );
				_oCacheArticles[ i ] = oArticle;
				oDocumentFragment.appendChild( oArticle );
			}
		_fInsertAfter( oDocumentFragment ,oNewsContainer);
	};
	/**
	 * Hides or shows a DOM element
	 * @param  {Number} nIdArticle id of the cached articles to retrieved it
	 * @param  {Boolean} bToHide    To know if it is wanted to be hidden or shown the element
	 * @return {None}
	 */
	var _fHideShowArticle = function( nIdArticle, bToHide ){
		var oElementToChangeClass = _oCacheArticles[ nIdArticle ];

		bToHide === true ? _DOMInteraction.hide( oElementToChangeClass ) : 
						   _DOMInteraction.show( oElementToChangeClass );
	};
	/**
	 * Hides or shows the buttons depending if there is previous or post elements
	 * @param  {Number} nCurrentIndex Contains the current index of the iterator
	 * @param  {Number} nFirst3Index  Contains the index of the first element showed
	 * @return {None}               
	 */
	var _fHideShowButton = function( nCurrentIndex, nFirst3Index ) {
		var nMaxItems = _oIterator.iteratorLength - 1;

		nFirst3Index > 0 ? _DOMInteraction.show( _oPreviousButton ) :
						   _DOMInteraction.hide( _oPreviousButton );
		nCurrentIndex === nMaxItems ? _DOMInteraction.hide( _oNextButton ) :
									  _DOMInteraction.show( _oNextButton );
	}
	/**
	 * Loops for get the articles that it's wanted
	 * @param  {Boolean} bIsNextButton To know if it's wanted the previous or the post elements
	 * @return {None}
	 */
	var _fNextPreviousButton = function( bIsNextButton ){
		var i = 0,
			nNumberOfArticlesToShow = 3;

		for( ; i < nNumberOfArticlesToShow; i++ ){
			bIsNextButton === true ? _fGetNextArticle() : _fPreviousArticle();
		}
	};
	/**
	 * Gets the next news either caching or creating new elements
	 * @return {None}
	 */
	var _fGetNextArticle = function(){
		var oDocumentFragment,
			sLastArticleId,
			oLastAppendedElement,
			nCurrentIndex = _oIterator.currentIndex(),
			oCurrentIteratorElement,
			nFirst3Index,
			oArticle;

		if(nCurrentIndex > 2){
			nFirst3Index = nCurrentIndex -3;
		}

		if( nCurrentIndex in _oCacheArticles ){
			_fHideShowArticle( nFirst3Index, true );
			_fHideShowArticle( nCurrentIndex, false );
			_fHideShowButton( nCurrentIndex, nFirst3Index );
			_oIterator.next();
		} else {
			oDocumentFragment = doc.createDocumentFragment();
			sLastArticleId = "newsId"+ ( nCurrentIndex - 1 );
			oLastAppendedElement = doc.getElementById( sLastArticleId );
			oCurrentIteratorElement = _oIterator.next();

			if( oCurrentIteratorElement !== null ){
				oArticle = _fCreateNewsArticle( nCurrentIndex, oCurrentIteratorElement );
				_oCacheArticles[ nCurrentIndex ] = oArticle;
				_fHideShowButton( nCurrentIndex, nFirst3Index );
				oDocumentFragment.appendChild( oArticle );
				nCurrentIndex = _oIterator.currentIndex();

				_fInsertAfter( oDocumentFragment, oLastAppendedElement );
				_fHideShowArticle( nFirst3Index, true );		
			}
		}
	};
	/**
	 * Gets the previous elements using the cached elements
	 * @return {None}
	 */
	var _fPreviousArticle = function(){
		var nCurrentIndex = _oIterator.currentIndex(),
			nFirst3Index = nCurrentIndex - 4;

		if( nFirst3Index >= 0 ){
			_fHideShowArticle( nFirst3Index, false );
			_fHideShowArticle( nCurrentIndex - 1, true );
			_fHideShowButton( nCurrentIndex, nFirst3Index );
			_oIterator.previous();
		}
	};
	/**
	 * Privileged methods
	 */
	return{
		initModule : _fInitModule 
	}

} )( new oIteratorPattern( oNews.results ), Namespace.utilities.DOMInteraction, document );
