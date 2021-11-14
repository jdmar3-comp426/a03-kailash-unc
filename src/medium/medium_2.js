import mpg_data from "./data/mpg_data.js";
import { getStatistics } from "./medium_1.js";

/*
This section can be done by using the array prototype functions.
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
see under the methods section
*/

/**
 * This object contains data that has to do with every car in the `mpg_data` object.
 *
 *
 * @param {allCarStats.avgMpg} Average miles per gallon on the highway and in the city. keys `city` and `highway`
 *
 * @param {allCarStats.allYearStats} The result of calling `getStatistics` from medium_1.js on
 * the years the cars were made.
 *
 * @param {allCarStats.ratioHybrids} ratio of cars that are hybrids
 */
export const allCarStats = {
  avgMpg: undefined,
  allYearStats: undefined,
  ratioHybrids: undefined,
};
let sum = 0;
let sum2 = 0;
let yeararr = [];
let tally = 0;
for (let i = 0; i < mpg_data.length; i++) {
  sum += mpg_data[i].highway_mpg;
  sum2 += mpg_data[i].city_mpg;
  yeararr.push(mpg_data[i].year);
  if (mpg_data[i].hybrid == true) {
    tally++;
  }
}

allCarStats.avgMpg = {
  city: sum2 / mpg_data.length,
  highway: sum / mpg_data.length,
};
allCarStats.allYearStats = getStatistics(yeararr);
allCarStats.ratioHybrids = tally/mpg_data.length;


/**
 * HINT: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
 *
 * @param {moreStats.makerHybrids} Array of objects where keys are the `make` of the car and
 * a list of `hybrids` available (their `id` string). Don't show car makes with 0 hybrids. Sort by the number of hybrids
 * in descending order.
 *
 *[{
 *     "make": "Buick",
 *     "hybrids": [
 *       "2012 Buick Lacrosse Convenience Group",
 *       "2012 Buick Lacrosse Leather Group",
 *       "2012 Buick Lacrosse Premium I Group",
 *       "2012 Buick Lacrosse"
 *     ]
 *   },
 *{
 *     "make": "BMW",
 *     "hybrids": [
 *       "2011 BMW ActiveHybrid 750i Sedan",
 *       "2011 BMW ActiveHybrid 750Li Sedan"
 *     ]
 *}]
 *
 *
 *
 *
 * @param {moreStats.avgMpgByYearAndHybrid} Object where keys are years and each year
 * an object with keys for `hybrid` and `notHybrid`. The hybrid and notHybrid
 * should be an object with keys for `highway` and `city` average mpg.
 *
 * Only years in the data should be keys.
 *
 * {
 *     2020: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *     2021: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *
 * }
 */
export const moreStats = {
  makerHybrids: undefined,
  avgMpgByYearAndHybrid: undefined,
};
const reducer = (previousValue, currentValue) => previousValue + currentValue;
let avgMpgByYearAndHybrid = {}
for(let i = 0; i < mpg_data.length; i++){
    if(!(mpg_data[i].year in avgMpgByYearAndHybrid)){
        avgMpgByYearAndHybrid[mpg_data[i].year] = {hybrid : {city:[], highway:[]}, notHybrid: {city:[], highway:[]}}
    }

    if(mpg_data[i].hybrid == true){
        avgMpgByYearAndHybrid[mpg_data[i].year].hybrid.city.push(mpg_data[i].city_mpg)
        avgMpgByYearAndHybrid[mpg_data[i].year].hybrid.highway.push(mpg_data[i].highway_mpg)
    }
    else{
        avgMpgByYearAndHybrid[mpg_data[i].year].notHybrid.city.push(mpg_data[i].city_mpg)
        avgMpgByYearAndHybrid[mpg_data[i].year].notHybrid.highway.push(mpg_data[i].highway_mpg)
    }
}

Object.keys(avgMpgByYearAndHybrid).forEach(key => {
    avgMpgByYearAndHybrid[key].hybrid.city = avgMpgByYearAndHybrid[key].hybrid.city.reduce(reducer, 0) / avgMpgByYearAndHybrid[key].hybrid.city.length;
    avgMpgByYearAndHybrid[key].hybrid.highway = avgMpgByYearAndHybrid[key].hybrid.highway.reduce(reducer, 0) / avgMpgByYearAndHybrid[key].hybrid.highway.length;
    avgMpgByYearAndHybrid[key].notHybrid.city = avgMpgByYearAndHybrid[key].notHybrid.city.reduce(reducer, 0) / avgMpgByYearAndHybrid[key].notHybrid.city.length;
    avgMpgByYearAndHybrid[key].notHybrid.highway = avgMpgByYearAndHybrid[key].notHybrid.highway.reduce(reducer, 0) / avgMpgByYearAndHybrid[key].notHybrid.highway.length;
  });


moreStats.avgMpgByYearAndHybrid = avgMpgByYearAndHybrid;



let temp = []
let tag = 0
for (let i = 0; i < mpg_data.length; i++) {
    if(mpg_data[i].hybrid == true){
        for (let i = 0; i < temp.length; i++) {
            if(temp[i]["make"] == mpg_data[i].make){
                temp[i]["hybrids"].push(mpg_data[i].id)
                tag = 1
                break
            }
            else{
                tag = 0
            }
        }
        if(tag == 0){
        temp.push({"make":mpg_data[i].make, "hybrids": [mpg_data[i].id]})
        }
    }
  }

  moreStats.makerHybrids = temp