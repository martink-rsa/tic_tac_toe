/* eslint-disable */
const testScript = require('../assets/js/script.js');

describe('Pomodoro Test', function() {


  describe('testScript', function() {
    it('returns the input', function() {
      expect(testScript.testOutput('Test output')).toEqual('Test output');
    });
  });

});