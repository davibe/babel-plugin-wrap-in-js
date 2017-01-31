wrap-in-js
----------

Babel plugin transforming any file to a module exporting the file content as string.

### Options

    {
      extensions: [ ".css$", ".txt$" ]
    }

### Example

A file named `style.css` and containing

    p { color: red; }

is transformed to

    module.exports = "p {\n  color: red;\n}\n";
