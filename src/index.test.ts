import fetch from 'isomorphic-fetch'
import assert from 'assert'

async function testGETVersion () {
  const res = await fetch(`http://localhost:4000/version`)
  assert(res, `response should not be null`);
  const version = await res.text()
  assert(version, `response text should not be null`);
  assert.equal(version, `0.0.0`, `verison should be 0.0.0`);
}

async function testGETData () {
  try {
    const res = await fetch(`http://localhost:4000/data`)
    assert(res, `response should not be null`);
    var data = await res.json()
    assert(data, `response text should not be null`);
    assert(data instanceof Array, `data should be an array`)
    assert.equal(typeof data[0], `object`, `data elements should be objects`)

    // change or remove this part after adding your own csv file
    const expected = {
      Bob: `Dune`,
      Joe: `Profile of Power`,
      Goerge: `Dune`,
      Shelly: `Profile of Power`,
      Tom: `Biocentrism`,
    }
    const actual = data[0]
    assert.deepStrictEqual(expected, actual, `first element should have correct data`)
  } catch (err) {
    console.log(data)
  }
}

testGETVersion()
testGETData()
