/* global app*/

'use strict';

(function(app) {

	app.factory('CrewSrv', ['$q', 'httpRequestsSrv',
		function($q,httpRequestsSrv) {

			var race = ['Human', 'Betazoid','Vulcan'];
			var area = ['Y','R','B'];
			var multiplier = [1,2,3];
			var names = {};

			/**
			 *  Human --> x3 Y, x2 R, x1 B
			 *	Vulcan --> x3 B, x2 Y, x1 R
			 *	Betazoid -->x3 R, x2 B, x1 Y
			 */
			
			var generateNames = function() {
				var configuration = {
					url: 'static/StarTrekNames.json'
				};

				return httpRequestsSrv.get(configuration);
			};

			var obtainNames = function(){
				generateNames().then(function(data){
					names = data.data;
				});
			};

			var obtainMultiplier = function(race,area){
				if((race === 'Human' && area === 'Y') ||(race === 'Vulcan' && area === 'B') || (race === 'Betazoid' && area === 'R')){
					return multiplier[2];
				}
				else if((race === 'Human' && area === 'R') ||(race === 'Vulcan' && area === 'Y') || (race === 'Betazoid' && area === 'B')){
					return multiplier[1];
				}
				else{
					return multiplier[0];
				}
			};

			var generateCrew = function(){
				var randomRace = race[Math.round(Math.random()*2)];
				var randomName = names[randomRace][Math.round(Math.random()*11)];
				var randomArea = area[Math.round(Math.random()*2)];
				var randomMultiplier = obtainMultiplier(randomRace,randomArea);
				
				return {
					'name': randomName,
					'race': randomRace,
					'area': randomArea,
					'multiplier' : randomMultiplier
				}
			};

			var sortMultiplier = function(crew){
				crew.sort(function(a,b){
					if (a.multiplier < b.multiplier) {
					    return 1;
					}
					if (a.multiplier > b.multiplier) {
					    return -1;
					}
					if (a.name > b.name) {
					    return 1;
					}
					if (a.name < b.name) {
					    return -1;
					}
					return 0;
				});
			};

			var sortName = function(crew){
				crew.sort(function(a,b){
					if (a.name > b.name) {
					    return 1;
					}
					if (a.name < b.name) {
					    return -1;
					}
					return 0;
				});
			};

			var sortArea = function(crew){
				crew.sort(function(a,b){
					if (a.area === 'Y' && b.area !== 'Y') {
					    return -1;
					}
					if (a.area !== 'Y' && b.area === 'Y') {
					    return 1;
					}
					if(a.area === 'B' && b.area !== 'B'){
						return -1;
					}
					if(a.area !== 'B' && b.area === 'B'){
						return 1;
					}
					return 0;
				});
			};

			return {
				obtainNames: obtainNames,
				generateCrew: generateCrew,
				sortMultiplier:sortMultiplier,
				sortName: sortName,
				sortArea: sortArea
			};
		}
	]);

}(app));
