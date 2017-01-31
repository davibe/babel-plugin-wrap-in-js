var template = require('babel-template');
var build = template(';(function () {\nBODY;\n})();')

module.exports = function (babel) {
	var t = babel.types;
	return {
		inherits: require("babel-plugin-transform-strict-mode"),
		visitor: {
			Program: {
				enter: function (path, state) {
					const extensions = state && state.opts && state.opts.extensions
					const reference = state && state.file && state.file.opts.filename
					const filepath = reference.split('?')[0]
					// console.log('filepath', filepath)

					let run = false
					for (ext of extensions) {
						run = run || filepath.match(ext)
					}
					// console.log('run', run, extensions)

					if (!run) { return }
					// console.log('already parsed', this._cssInJsAlreadyRan)

					if (!this._cssInJsAlreadyRan) {
						this._cssInJsAlreadyRan = true;
						var asd = build({
							BODY: path.node.body
						});
						asd[1].expression.callee.body.directives = path.node.directives;

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
