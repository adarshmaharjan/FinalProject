const assert = require('chai').assert;
const app = require('../server');

describe('App', function(){
    it('app should return hello', function(){
        assert.equal(app());
    })
})

