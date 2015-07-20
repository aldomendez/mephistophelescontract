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
		var hr = generateTimeinHHMI()
		expect(typeof hr).toBe('function')
	});
	it('closure should return a string when called', function(){
		hr = generateTimeinHHMI(new Date(1437428950496))
		expect(hr()).toBe('1649')
		expect(hr()).toMatch(/\d{3,4}/)
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
	it('should')
});