import mpg_data from "./data/mpg_data.js";

/*
mpg_data is imported for you but that is for testing purposes only. All of the functions should use
a car_data param that is supplied as the first parameter.

As you write these functions notice how they could possibly be chained together to solve more complicated
queries.
 */

/**
 * @param {array} car_data - an instance of mpg_data that should be used for filtering.
 * @param minHorsepower {number}
 * @param minTorque {number}
 *
 * @return {array} An array of car objects with horsepower >= minHorsePower and torque >= minTorque
 * sorted by horsepower in descending order.
 *
 */
export function searchHighPower(car_data, minHorsepower, minTorque) {
    let result = []
    for(let i = 0; i < car_data.length; i++){
        if(car_data[i].horsepower >= minHorsepower && car_data[i].torque >= minTorque){
            result.push(car_data[i]);
        }
    }
    function compare(a, b) {
        if (a.horsepower < b.horsepower) return 1;
        if (b.horsepower < a.horsepower) return -1;
      
        return 0;
      }
      result.sort(compare);

      return result;
}


/**
 * @param {array} car_data
 * @param minCity
 * @param minHighway
 *
 *
 * @return {array} An array of car objects with highway_mpg >= minHighway and city_mpg >= minCity
 * sorted by highway_mpg in descending order
 *
 */
export function searchMpg(car_data, minCity, minHighway) {
    let result = []
    for(let i = 0; i < car_data.length; i++){
        if(car_data[i].city_mpg >= minCity && car_data[i].highway_mpg >= minHighway){
            result.push(car_data[i]);
        }
    }
    function compare(a, b) {
        if (a.highway_mpg < b.highway_mpg) return 1;
        if (b.highway_mpg < a.highway_mpg) return -1;
      
        return 0;
      }
      result.sort(compare);

      return result;
}


/**
 * Find all cars where 'id' contains the search term below.
 * Sort the results so that if the term appears earlier in the string
 * it will appear earlier in the list. Make sure searching and sorting ignores case.
 * @param car_data
 * @param searchTerm A string to that is used for searching
 * @returns {[]} array of cars
 */
export function searchName(car_data, searchTerm) {
    let result = [];
    for(let i = 0; i < car_data.length; i++){
        if(car_data[i].id.includes(searchTerm)){
            result.push(car_data[i]);
        }
    }
    result.sort(function(a, b){  
        return a.id.indexOf(searchTerm) - b.id.indexOf(searchTerm);
      });

      return result;

}


/**
 * Find all cars made in the years asked for.
 * Sort the results by year in descending order.
 *
 * @param car_data
 * @param {number[]} years - array of years to be included in the results e.g. [2010, 2012]
 * @returns {[]} an array of car objects
 */
export function searchByYear(car_data, years) {
    let result = [];
    year.sort(function(a, b){
        if (a < b) return 1;
        if (b < a) return -1;
        return 0;  
      });
    for(let i = 0; i < years.length; i++){
        for(let j = 0; j < car_data.length; j++){
            if(car_data[j].year == years[i]){
                result.push(car_data[j]);
            }
        }
    }
    return result;
}
