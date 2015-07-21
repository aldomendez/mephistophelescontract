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

describe('dateDiffinHours', function(){
	it('should be a function', function(){
		expect(typeof dateDiffinHours).toBe('function')
	})
	it('generates a number', function(){
		var start = new Date(2015,7,20,15,0,0);
		var end = new Date(2015,7,20,18,8,25);
		expect( typeof dateDiffinHours(start, end) ).toBe('number')
	})
	it('should calculate correctly the hours between 2 dates', function(){
		var start = new Date(2015,7,20,15,0,0);
		var end = new Date(2015,7,20,18,0,0);
		expect( dateDiffinHours(start, end, 44) ).toBe(3)
	})
});

describe('createSOD', function(){
	it('should return a date object', function(){
		expect(typeof createSOD(new Date(), 0, 6,30)).toBe('object')
	})
	it('should calculate dates correctly', function(){
		date = createSOD(new Date(), 0, 6,30)
		expect( date.getHours() ).toEqual(6)
		expect( date.getMinutes() ).toEqual(30)
		
		date = createSOD(new Date(2015,4,7), 0, 6,30)
		expect( date.getFullYear() ).toEqual(2015)
		expect( date.getMonth() ).toEqual(4)
		expect( date.getDate() ).toEqual(7)
		expect( date.getHours() ).toEqual(6)
		expect( date.getMinutes() ).toEqual(30)
	})
	it('calculates dates correctly with the offset to less 5 day', function(){
		date = createSOD(new Date(2015,7,20), -5, 15,0)
		expect( date.getDate() ).toEqual(15)
	})
	it('calculates dates correctly with the offset to plus 5 day', function(){
		date = createSOD(new Date(2015,7,20), 5, 15,0)
		expect( date.getDate() ).toEqual(25)
	})
})

describe('target', function(){
	it('should be a function', function(){
		expect( typeof target).toBe('function')
	})
	xit('should take the number of machines in consideration to calculate a target', function(){
		var date = new Date(2015,7,20,6,45)
		expect(typeof target(4,date)).toBe('number')
		expect(target(4, new Date(2015,7,20,6,45))).toBe('number')
	})
	xit('should recognize the shift to calculate the target', function(){
		expect(target(4, new Date(2015,7,20,6,45))).toBe('number')
	})
})

describe('getShift', function(){
	it('should be a function', function(){
		expect( typeof getShift).toBe('function')
	})
	it('should return 1 if the date object between 6:30 and 15:00', function(){
		expect(getShift(new Date(2015,7,20,6,25))).not.toBe(1)
		expect(getShift(new Date(2015,7,20,6,30))).toBe(1)
		expect(getShift(new Date(2015,7,20,11,45))).toBe(1)
		expect(getShift(new Date(2015,7,20,15,1))).not.toBe(1)
	})
	it('should return 2 if the date object between 15:00 and 23:00', function(){
		expect(getShift(new Date(2015,7,20,12,0))).not.toBe(2)
		expect(getShift(new Date(2015,7,20,15,0))).toBe(2)
		expect(getShift(new Date(2015,7,20,21,45))).toBe(2)
		expect(getShift(new Date(2015,7,20,23,1))).not.toBe(2)
	})
	it('should return 3 if the date object between 23:00 and 6:30', function(){
		expect(getShift(new Date(2015,7,20,22,45))).not.toBe(3)
		expect(getShift(new Date(2015,7,20,23,0))).toBe(3)
		expect(getShift(new Date(2015,7,20,3,25))).toBe(3)
		expect(getShift(new Date(2015,7,20,6,30))).not.toBe(3)
	})
})