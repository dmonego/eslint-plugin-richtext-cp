var {rules} = require("eslint-plugin-richtext-cp");
var {RuleTester} = require("eslint");

RuleTester.setDefaultConfig({
    parser: "babel-eslint",
    parserOptions: {
      sourceType: "module",
      allowImportExportEverywhere: false,
      codeFrame: false
    }
});

var ruleTester = new RuleTester();
ruleTester.run("no nbsp rule", rules["non-breaking space"], {
    valid: [
        "var mytext = 'some   text'",
        "var mytext = 'some &nbsp; text'",
        'var jsxNode =  (<div>non&nbsp; breaking space</div>);'
    ],
    invalid: [{
            code: "var myBadText = 'more    text'",
            errors: [{
                message: "Found non-breaking space in string.",
                type: "Literal"
            },
            {
                message: "Found non-breaking space in string.",
                type: "Literal"
            }]
        }
    ]
});

ruleTester.run("no right double quote", rules["right double quote"], {
    valid: [
        "var mytext = '\"some text\"'"
    ],
    invalid: [{
            code: "var myBadText = '“more text”'",
            errors: [{
                message: "Found right double quote in string.",
                type: "Literal"
            }],
            output:"var myBadText = '“more text\"'"
        }
    ]
});

ruleTester.run("no left double quote", rules["left double quote"], { 
    valid: [
        'var jsxNode =  (<div>"double quotes"</div>);',
        'var jsxNode =  (<div>&ldquo;double quotes&rdquo;</div>);'
    ],
    invalid: [{
        code: "var jsxNode =  (<div>“double quotes”</div>);",
        errors: [{
            message: "Found left double quote in string.",
            type: "Literal"
        }],
        output: 'var jsxNode =  (<div>"double quotes”</div>);'
    }]
});


