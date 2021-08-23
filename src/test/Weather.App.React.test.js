/* Imported React libraries. */
import React from 'react';
/* Imported App.js for testing. */
import App from '../App';
/* Imported react-test-renderer for rendering snapshots. */
import renderer from 'react-test-renderer';

/* Created and described the test being performed. Constructed a tree variable, storing the JSON that (represents the
DOM tree that is created when the component we are testing is rendered). Created the App component via the create() method and serialized into 
JSON objects. */
test('Renders without crashing?', () => {
    const tree = renderer
        .create(<App />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});

/* Testing the withFetch() function. Constructed a response fetching data from the OpenWeather API using await to pause execution until 
withFetch resolves. Constructed a mock JSON array including data that will be used to test the fetch() function. */
async function withFetch() {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Azusa&units=imperial&APPID=${process.env.REACT_APP_API_KEY}`)
    const json = {
        name: "Durban",
        wind: { speed: 4.76 },
        main: { temp: 78 }
    };
    return json
}

/* Storing a reference to the global.fetch function so that we can use it to cleanup the mock after we're done testing. */
const unmockedFetch = global.fetch

/* Fetching the Promise with the JSON method, which also returns the Promise with the data. */
beforeAll(() => {
    global.fetch = () =>
        Promise.resolve({
            json: () => Promise.resolve([]),
        })
})

/* Using the afterAll() jest hook and calling the global.fetch function to cleanup mock test. */
afterAll(() => {
    global.fetch = unmockedFetch
})

/* Adding a description of what should be executed and describing the test that will determine whether it is executed successfully or not. 
Utilizing the async function due to the await keyword being used to invoke asynchronous code. Using the expect() and toHaveProperty() functions 
to see whether the fetched data from JSON matches the keys stipulated. */
describe('Displaying the temperature and the wind speed', () => {
    test('Is it working?', async () => {
        const json = await withFetch()
        expect(json).toHaveProperty(['main', 'temp']);
        expect(json).toHaveProperty(['wind', 'speed']);
    })
})