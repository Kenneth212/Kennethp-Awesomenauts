game.resources = [

	/* Graphics. 
	 * @example
	 * {name: "example", type:"image", src: "data/img/example.png"},
	 */
	 {name: "background-tiles", type:"image", src: "data/img/background-tiles.png"},
	 //The background tiles for the game will create tiles on tiled.
	 {name: "meta-tiles", type:"image", src: "data/img/meta-tiles.png"},
	 //The meta tiles work as solid tiles to make specific parts of the game solid.
	 {name: "player", type:"image", src: "data/img/orcSpear.png"},
	 //The player will show because of this code.
	/* Atlases 
	 * @example
	 * {name: "example_tps", type: "tps", src: "data/img/example_tps.json"},
	 */
	
	/* Maps. 
	 * @example
	 * {name: "example01", type: "tmx", src: "data/map/example01.tmx"},
	 * {name: "example01", type: "tmx", src: "data/map/example01.json"},
 	 */
 	 {name: "level01", type: "tmx", src: "data/map/level01.tmx"},
 	 //This part for level01 will run the game on the webpage.

	/* Background music. 
	 * @example
	 * {name: "example_bgm", type: "audio", src: "data/bgm/"},
	 */	

	/* Sound effects. 
	 * @example
	 * {name: "example_sfx", type: "audio", src: "data/sfx/"}
	 */
];
