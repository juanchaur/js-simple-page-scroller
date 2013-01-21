( function( doc, NYT, NS ) {
	TestCase ( "[ NYTimes News ] Initialization of the module", {
		
		setUp : function () {
			this.buttonNext = null;
			this.buttonPrevious = null;
			this.mainContainer = null;
			/*:DOC +=
			<section id="pagewrapper">
				<header class="main-header">
					<h1>
						NYTimes slides
					</h1>
				</header>
				<article id="news_container" class="news-main">
					<section id="upwardsButton_section" class="button-interaction">
						<button id="down-button" class="visible" type="button" name="downwards" value="">
							Next
						</button>
					</section>


					<section id="upwardsButton_section" class="button-interaction">
						<button id="up-button" class="hidden" type="button" name="upwards" value="">
							Previous
						</button>
					</section>

				</article>
			</section>
			 */
			this.buttonNext = doc.getElementById("down-button");
			this.buttonPrevious = doc.getElementById("up-button");
			this.mainContainer = doc.getElementById("news_container")
		},
		tearDown : function () {
			this.buttonNext = null;
			this.buttonPrevious = null;
			this.mainContainer = null;
		},
		"test if the module create the first 3 elements in its initialization" : function () {
			var _oNews1, _sTitle1,
				_oNews2, _sTitle2,
				_oNews3, _sTitle3,
				_aNews;

			assertEquals( 2, this.mainContainer.children.length );
			NYT.initModule();
			assertEquals( 5, this.mainContainer.children.length );
			
			_oNews1 =  this.mainContainer.children[1];
			_oNews2 =  this.mainContainer.children[2];
			_oNews3 =  this.mainContainer.children[3];
			_sTitle1 = _oNews1.children[0].children[0].innerHTML;
			_sTitle2 = _oNews2.children[0].children[0].innerHTML;
			_sTitle3 = _oNews3.children[0].children[0].innerHTML;
			

			assertEquals("Deal on Aid to Greece Is Within Reach, Germans Say", _sTitle1);
			assertEquals("SPECIAL REPORT: NET WORTH; Managing the Emotional Turbulence of Investing", _sTitle2);
			assertEquals("LETTER FROM INDIA; The Grouse in the Heart of Mumbai", _sTitle3);

		},
		"test that the next button is visible " : function() {
			assertTrue( NS.hasClass( this.buttonNext, "visible" ) );
			assertFalse( NS.hasClass( this.buttonNext, "hidden" ) );
		},
		"test that the previous button is hidden as there aren't previous news" : function() {
			assertTrue( NS.hasClass( this.buttonPrevious, "hidden" ) );
			assertFalse( NS.hasClass( this.buttonPrevious, "visible" ) );
		},
		"test that when clicking the next button the previous button appears and the news are updated" : function(){
			var _oNews1, _sTitle1,
				_oNews2, _sTitle2,
				_oNews3, _sTitle3,
				_aNews;

			NYT.initModule();
			this.buttonNext.click();
			assertTrue( NS.hasClass( this.buttonPrevious, "visible" ) );
			assertFalse( NS.hasClass( this.buttonPrevious, "hidden" ) );

			_oNews1 =  this.mainContainer.children[1];
			_oNews2 =  this.mainContainer.children[2];
			_oNews3 =  this.mainContainer.children[3];
			_sTitle1 = _oNews1.children[0].children[0].innerHTML;
			_sTitle2 = _oNews2.children[0].children[0].innerHTML;
			_sTitle3 = _oNews3.children[0].children[0].innerHTML;

			assertEquals("India Hangs the Only Surviving Mumbai Attacker", _sTitle1);
			assertEquals("Rights Groups in Russia Reject Foreign Agent Label", _sTitle2);
			assertEquals("Jordan Protesters Dream of Shift to Prince Hamzah", _sTitle3);
		}	
	});
	
})( document, NYTNamespace, Namespace.utilities.DOMInteraction );