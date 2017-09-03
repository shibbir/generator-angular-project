describe('About Page', function() {
    beforeEach(() => {
        browser.get('/about');
    });

    it('should have h3 header', function() {
        let subject = element(by.tagName('h3')).isPresent();
        expect(subject).toEqual(true);
    });

    it('should have h3 header with "About Component" text', function() {
        let subject = element(by.tagName('h3'));
        expect(subject.getText()).toBe('About Component');
    });
});
