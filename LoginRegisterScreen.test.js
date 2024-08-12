/**
 * @jest-environment jsdom
 */
const elementMock = {addEventListener: jest.fn()}
const warn = jest.spyOn(document, "getElementById").mockImplementation(() => elementMock);

import {createPlayer} from  '../LoginRegisterScreen/index.js'

global.fetch = jest.fn(() =>
    Promise.resolve({
        status: 200
    })
);

describe('Login/Register Tests', () => {
    test('Register', () => {
        createPlayer(9, 'UserA')
    });
});