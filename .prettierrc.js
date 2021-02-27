module.exports = {
	// avoid function parenthesis when possible
	// e.g x => x instead of (x) => x
  arrowParens: "avoid",
	// space in objects
	// e.g { name: 'ben' }
  bracketSpacing: true,
	/**
	 * open tag (>) does on separate line
	 *
	 * e.g <button
 	 *      id="close-button"
	 *      className="btn btn--sm"
	 *     >
	 *		 </button>
	 */
	jsxBracketSameLine: false,
	// use double quotes in jsx
	// e.g <span className="span">span</span>
	jsxSingleQuote: false,
	// max number of characters per line
  printWidth: 80, 
	// use semicolon
  semi: true,
	// use single quotes
  singleQuote: true,
	// at the end of arrays, objects but not functions parameter list
  trailingComma: "es5",
	// tab is set to 2 spaces 
  tabWidth: 2,
	// use spaces
	useTabs: false
}
