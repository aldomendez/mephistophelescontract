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

describe('Global properties', function(){
	it('HR should exists and return a function', function(){
		time = new Date(1437428950496)
		expect(typeof hr).toBe('function');
	});
	it('should return a string when called', function(){
		expect(hr()).toBe('1650')
	})
});