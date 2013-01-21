( function( _oIterator ) {
	function commonSetUp(){
		var self = this;
		
		this.oArrayTest1 = null;
		this.oArrayTest2 = null;
		this.iterator1 = null;
		this.iterator2 = null;

		self.oArrayTest1 = [ 23, 245, 32, 34, 67, 234, 43];		
		self.oArrayTest2 = [ "travelling", "hobbit", "batman", "javascript", "youtube"];
		
		self.iterator1 = new _oIterator( self.oArrayTest1 );
		self.iterator2 = new _oIterator( self.oArrayTest2 );
	};
	function commonTearDown(){};
	
	TestCase ( "[ ITERATOR ] Object creation", {
		
		setUp : function () {
			commonSetUp.call( this );
		},
		"test if the iterator constructor returns a object" : function () {
			assertObject( this.iterator1 );
			assertObject( this.iterator2 );
		},
		"test if the iterators object has all the functionalities expected" : function () {
			assertFunction("contains hasNext method", this.iterator1.hasNext );
			assertFunction("contains hasPrevious method", this.iterator1.hasPrevious );
			assertFunction("contains next method", this.iterator1.next );
			assertFunction("contains previous method", this.iterator1.previous );
			assertFunction("contains current method", this.iterator1.current );
			assertFunction("contains currentIndex method", this.iterator1.currentIndex );
			assertNumber("contains itertatorLength method", this.iterator1.iteratorLength );
		}
	});
	TestCase ( "[ ITERATOR ] hasNext and hasPrevious method", {
		
		setUp : function () {
			commonSetUp.call( this );
		},
		"test if the hasNext method return a boolean" : function () {
			assertBoolean( this.iterator1.hasNext() );
		},
		"test if the hasPrevious method return a boolean" : function () {
			assertBoolean( this.iterator1.hasPrevious() );
		}
	});
	TestCase ( "[ ITERATOR ] next and previous method", {
		
		setUp : function () {
			commonSetUp.call( this );
		},
		"test if the method next and previous returns a proper value" : function () {
			var _nValueOfIterator1 = this.iterator1.next(),
				_nValueOfIterator2 = this.iterator2.next();

			assertEquals( 23, _nValueOfIterator1 );
			assertEquals( "travelling", _nValueOfIterator2 );

			_nValueOfIterator1 = this.iterator1.previous(),
			_nValueOfIterator2 = this.iterator2.previous();

			assertEquals( 245, _nValueOfIterator1 );
			assertEquals( "hobbit", _nValueOfIterator2 );

			_nValueOfIterator1 = this.iterator1.previous(),
			_nValueOfIterator1 = this.iterator1.previous(),
			_nValueOfIterator2 = this.iterator2.previous(),
			_nValueOfIterator2 = this.iterator2.previous();

			assertNull( _nValueOfIterator1 );
			assertNull( _nValueOfIterator2 );
		}
	});
	TestCase ( "[ ITERATOR ] current and currentIndex method", {
		
		setUp : function () {
			commonSetUp.call( this );
		},
		"test if the method current and currentIndex returns a proper value" : function () {
			var _nValueOfIterator1 = this.iterator1.current(),
				_nCurrentIndex = this.iterator2.currentIndex();

			assertEquals( 23, _nValueOfIterator1 );
			assertEquals( 0, _nCurrentIndex );
		},
		"test if iteratorLength returns the proper length of the array contained in it" : function () {
			var _nLengthIteratorData = this.iterator1.iteratorLength;
			assertEquals( 7, _nLengthIteratorData );
		}
	});

})( oIteratorPattern );