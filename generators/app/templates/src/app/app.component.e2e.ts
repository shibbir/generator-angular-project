describe('App', function() {
    beforeEach(() => browser.get('/'));

    it('should have a title', function() {
        let subject = browser.getTitle();
        let result = 'Angular Project';
        expect(subject).toEqual(result);
    });

    it('should have header', function() {
        let subject = element(by.tagName('h1')).isPresent();
        expect(subject).toEqual(true);
    });

    it('should have correct header text', function() {
        let subject = element(by.tagName('h1'));
        expect(subject.getText()).toBe('My Angular + TypeScript App');
    });

    it('should have footer', function() {
        let subject = element(by.tagName('footer')).isPresent();
        expect(subject).toEqual(true);
    });
});
