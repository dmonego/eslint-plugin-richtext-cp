var {rules} = require("eslint-plugin-richtext-cp");
var {RuleTester} = require("eslint");

RuleTester.setDefaultConfig({
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module"
  }
});

var ruleTester = new RuleTester();
ruleTester.run("no nbsp rule", rules["non-breaking space"], {
    valid: [
        "var mytext = 'some   text'"
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
