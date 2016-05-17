describe("A spec using done.fail", function() {
	var foo = function(x, callBack1, callBack2) {
		if (x) {
			setTimeout(callBack1, 0);
			} else {
			setTimeout(callBack2, 0);
		}
	};
	
	it("should not call the second callBack", function(done) {
		foo(true,
		done,
		function() {
			done.fail("Second callback has been called");
		}
		);
	});
});  
function delay(ms) {
	return new Promise(function(resolve, reject) {
		setTimeout(resolve, ms)
	})
}

describe("clock pollution", function() {
	var value;
	it("async with clock", function(done) {
		jasmine.clock().install()
		delay(2000)
		.then(function() {
			value = 1;
			expect(value).toBeGreaterThan(0);
			jasmine.clock().uninstall()
			done()
		})
		jasmine.clock().tick(2001)
	})
})



describe("clock pollution", function() {
	var value;
	beforeEach(function() {
		jasmine.clock().install();
	});
	it("async with clock", function(done) {
		//jasmine.clock().install()
		setTimeout(function() {
			value = 1;
			expect(value).toBeGreaterThan(0);
			jasmine.clock().uninstall()
			done()
		}, 20000)
		jasmine.clock().tick(20001)
	})
})





describe("Asynchronous specs", function() {
	var value;
	
	beforeEach(function(done) {
		done();
	}, 1000);
	
	it("should support async execution of test preparation and expectations", function() {
		value = 0;
		value++;
		expect(value).toBeGreaterThan(0);
		
	});
});

describe("Manually ticking the Jasmine Clock", function() {
	var timerCallback;
	
	
	
	beforeEach(function() {
		timerCallback = jasmine.createSpy("timerCallback");
		jasmine.clock().install();
	});
	
	
	
	afterEach(function() {
		jasmine.clock().uninstall();
	});
	
	it("causes a timeout to be called synchronously", function() {
		setTimeout(function() {
			timerCallback();
		}, 10000);
		
		expect(timerCallback).not.toHaveBeenCalled();
		
		jasmine.clock().tick(10001);
		
		expect(timerCallback).toHaveBeenCalled();
	});
	
	
	it("causes an interval to be called synchronously", function() {
		setInterval(function() {
			timerCallback();
		}, 100);
		
		expect(timerCallback).not.toHaveBeenCalled();
		
		//jasmine.clock().tick(101);
		expect(timerCallback.calls.count()).toEqual(0);
		
		jasmine.clock().tick(50);
		expect(timerCallback.calls.count()).toEqual(0);
		
		jasmine.clock().tick(51);
		expect(timerCallback.calls.count()).toEqual(1);
	});
	
});

describe("A spy, when configured to throw an error", function() {
	var foo, bar;
	
	beforeEach(function() {
		foo = {
			setBar: function(value) {
				bar = value;
			}
		};
		
		spyOn(foo, "setBar").and.throwError("quux");
	});
	
	it("throws the value", function() {
		expect(function() {
			foo.setBar(123)
		}).toThrowError("quux");
	});
});



describe("A spy", function() {
	var foo, bar = null;
	var bar2;
	
	beforeEach(function() {
		foo = {
			setBar: function(value) {
				bar = value;
			}
		};
		
		spyOn(foo, 'setBar').and.callThrough();
		
		foo.setBar(123);
		//foo.setBar(456, 'another param');
	});
	
	
	
	xit("tracks that the spy was called", function() {
		expect(foo.setBar).toHaveBeenCalled();
	});
	
	xit("tracks that the spy was called x times", function() {
		expect(foo.setBar).toHaveBeenCalledTimes(2);
	});
	
	xit("tracks all the arguments of its calls", function() {
		expect(foo.setBar).toHaveBeenCalledWith(123);
		expect(foo.setBar).toHaveBeenCalledWith(456, 'another param');
	});
	
	it("stops all execution on a function", function() {
		expect(bar).not.toBeNull();
	});
});

describe("Player", function() {
	var player;
	var song;
	
	beforeEach(function() {
		player = new Player();
		song = new Song();
	});
	
	it("it's jQuery test", function(){
		expect($("div").eq(0).attr("myattr", "new value")).toHaveAttr("myattr", "new value");  
	});
	it("should be able to play a Song", function() {
		player.play(song);
		expect(player.currentlyPlayingSong).toEqual(song);
		
		//demonstrates use of custom matcher
		expect(player).toBePlaying(song);
	});
	
	describe("when song has been paused", function() {
		beforeEach(function() {
			player.play(song);
			player.pause();
		});
		
		it("should indicate that the song is currently paused", function() {
			expect(player.isPlaying).toBeFalsy();
			
			// demonstrates use of 'not' with a custom matcher
			expect(player).not.toBePlaying(song);
		});
		
		it("should be possible to resume", function() {
			player.resume();
			expect(player.isPlaying).toBeTruthy();
			expect(player.currentlyPlayingSong).toEqual(song);
		});
	});
	
	// demonstrates use of spies to intercept and test method calls
	it("tells the current song if the user has made it a favorite", function() {
		spyOn(song, 'persistFavoriteStatus');
		
		player.play(song);
		player.makeFavorite();
		
		expect(song.persistFavoriteStatus).toHaveBeenCalledWith(true);
	});
	
	//demonstrates use of expected exceptions
	describe("#resume", function() {
		it("should throw an exception if song is already playing", function() {
			player.play(song);
			
			expect(function() {
				player.resume();
			}).toThrowError("song is already playing");
		});
	});
});
