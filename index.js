var template = require('babel-template');
var build = template('module.exports = "BODY"')

module.exports = function (babel) {
	var t = babel.types;
	return {
		inherits: require("babel-plugin-transform-strict-mode"),
		visitor: {
			Program: {
				enter: function (path, state) {
					const extensions = state && state.opts && state.opts.extensions
					const reference = state && state.file && state.file.opts.filename
					console.log('reference', reference)

					const run = reference.indexOf('.css') !== -1
					console.log('run', run)

					if (!run) { return console.log('skipping', reference) }
					console.log('already parsed', this._cssInJsAlreadyRan)

					if (!this._cssInJsAlreadyRan) {
						this._cssInJsAlreadyRan = true;
						var asd = build({
							BODY: path.node.body
						});
						// asd[1].expression.callee.body.directives = path.node.directives;

						path.replaceWith(
							t.program(asd)
						);
					}
					path.node.directives = [];
				}
			}
		}
	};
};
