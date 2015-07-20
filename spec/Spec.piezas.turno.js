describe('Data object to wotk with', function(){
	it('should have data', function(){
		expect(typeof window.data).toBe('object');
		expect(data.length).toBe(2)
	});
});

describe('helper methods', function(){
	it('the PAD method should put a leading zero to any number less than 10', function(){
		expect(typeof pad).toBe('function');
		expect(pad(1)).toBe('01')		
	});
});

describe('generateTimeinHHMI ', function(){
	it('is s closure', function(){
		expect(typeof generateTimeinHHMI).toBe('function');
		var hr = generateTimeinHHMI(new Date())
		expect(typeof hr).toBe('function')
		expect(hr()).toMatch(/\d{3,4}/)
	});
	it('should throw if called with out arguments', function(){
		expect(generateTimeinHHMI).toThrow()
	})
	it('closure should return a string when called', function(){
		hr = generateTimeinHHMI(new Date(1437428950496))
		expect(hr()).toBe('1649')
		expect(typeof hr()).toBe('string')
		
	})
	it('should accept a UNIX timestamp as a first parameter', function(){
		var time = new Date(1437428950496)
		hr = generateTimeinHHMI(time)
		expect(hr()).toBe('1649')
		expect(typeof hr()).toBe('string')
	})
});

describe('normalizedTarget', function(){
	it('should be a function', function(){
		expect(typeof normalizedTarget).toBe('function')
	})
	it('should take two dates and an increment and return a number', function(){
		var start = new Date(2015,7,20,15,0,0);
		var end = new Date(2015,7,20,18,8,25);
		expect( typeof normalizedTarget(start, end, 11) ).toBe('number')
	})
	it('should correctly calculates target of devices')
});

describe('createSOD', function(){
	it('should return a date object', function(){
		expect(typeof createSOD(new Date(), 0, 6,30)).toBe('object')
	})
	it('should calculate dates correctly', function(){
		date = createSOD(new Date(), 0, 6,30)
		expect( date.getHours() ).toBe(6)
		expect( date.getMinutes() ).toBe(30)
		
		date = createSOD(new Date(2015,7,20), -1, 6,30)
		expect( date.getDate() ).toBe(19)
		expect( date.getHours() ).toBe(6)
		expect( date.getMinutes() ).toBe(30)
		
		date = createSOD(new Date(2015,4,7), 0, 6,30)
		expect( date.getFullYear() ).toBe(2015)
		expect( date.getMonth() ).toBe(4)
		expect( date.getDate() ).toBe(7)
		expect( date.getHours() ).toBe(6)
		expect( date.getMinutes() ).toBe(30)
	})
})