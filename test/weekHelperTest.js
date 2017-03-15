const weekHelper = require('../src/js/weekHelper.js');
const assert = require('assert');

const fullWeek = [
    { date: '2017-03-13', displayNumber: 13 },
    { date: '2017-03-14', displayNumber: 14 },
    { date: '2017-03-15', displayNumber: 15 },
    { date: '2017-03-16', displayNumber: 16 },
    { date: '2017-03-17', displayNumber: 17 },
    { date: '2017-03-18', displayNumber: 18 },
    { date: '2017-03-19', displayNumber: 19 }
];

const firstWeek = [
    { date: null },
    { date: null },
    { date: null },
    { date: '2017-03-01', displayNumber: 1 },
    { date: '2017-03-02', displayNumber: 2 },
    { date: '2017-03-03', displayNumber: 3 },
    { date: '2017-03-04', displayNumber: 4 },
];

const lastWeek = [
    { date: '2017-03-27', displayNumber: 27 },
    { date: '2017-03-28', displayNumber: 28 },
    { date: '2017-03-29', displayNumber: 29 },
    { date: '2017-03-30', displayNumber: 30 },
    { date: '2017-03-31', displayNumber: 31 },
    { date: null },
    { date: null }
];

const fullWeekStart = { date: '2017-03-13', displayNumber: 13 };
const fullWeekEnd = { date: '2017-03-19', displayNumber: 19 };

const firstWeekStart = { date: '2017-03-01', displayNumber: 1 };
const firstWeekEnd = { date: '2017-03-04', displayNumber: 4 };

const lastWeekStart = { date: '2017-03-27', displayNumber: 27 };
const lastWeekEnd = { date: '2017-03-31', displayNumber: 31 };

describe('WeekHelper', () => {
    describe('WeekBounds', () => {
        it('should find week bounds for full week', () => {
            const { weekStart, weekEnd } = weekHelper.getWeekBounds(fullWeek);
            assert.equal(weekStart.displayNumber, 13);
            assert.equal(weekEnd.displayNumber, 19);
        });
        it('should find week bounds for first week', () => {
            const { weekStart, weekEnd } = weekHelper.getWeekBounds(firstWeek);
            assert.equal(weekStart.displayNumber, 1);
            assert.equal(weekEnd.displayNumber, 4);
        });
        it('should find week bounds for last week', () => {
            const { weekStart, weekEnd } = weekHelper.getWeekBounds(lastWeek);
            assert.equal(weekStart.displayNumber, 27);
            assert.equal(weekEnd.displayNumber, 31);
        });
    });
    describe('DummyEvent', () => {
        it('should return empty object for full week', () => {
            const dummyEvent = weekHelper.getDummyEvent(fullWeekStart, fullWeekEnd);
            assert.deepEqual(dummyEvent, {});
        });
        it('should return dummy event for first week', () => {
            const dummyEvent = weekHelper.getDummyEvent(firstWeekStart, firstWeekEnd);
            assert.deepEqual(dummyEvent, { isEvent: false, size: 3, start: true });
        });
        it('should return dummy event for last week', () => {
            const dummyEvent = weekHelper.getDummyEvent(lastWeekStart, lastWeekEnd);
            assert.deepEqual(dummyEvent, { isEvent: false, size: 2, start: false });
        })
    });
});
