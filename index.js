function reportAllInstances(node, context, character, message, fix) {
    var sourceCode = context.getSourceCode();
    //Most strings have surrounding quotes, JSX elements don't
    var isQuotedLiteral = (node.end - node.start - node.value.length === 2);
    //Don't pick up escaped characters in JSX
    var hasEscapes = node.value.length < node.end - node.start - 2; 
    var searchArea = hasEscapes
        ? node.raw
        : node.value
    for( var i = 0; i < searchArea.length; i++ ) {
        if(searchArea[i] === character) {
            var startIndex = node.start + i;
            var endIndex = node.start + i + 1;
            if(isQuotedLiteral) {
                startIndex++;
                endIndex++;
            }
            var loc = {
                start: sourceCode.getLocFromIndex(startIndex),
                end: sourceCode.getLocFromIndex(endIndex)
            }
            context.report({ node, message, loc,
                fix: function(fixer) {
                    return fixer.replaceTextRange([startIndex, endIndex], fix);
                }
            });
        }
    }
}

function createRule(character, name, fix) {
    return {
        meta: {
            docs: {
               description: "Forbid " + name + " characters (" + character + ") within strings."
            },
            fixable: true
        },
        create: function (context) {
            return {
                "Literal": function (node) {
                    var value = node.value;
                    if(typeof(value) === 'string') {
                        var internalIndex = node.value.indexOf(character);
                        if(internalIndex !== -1) {
                            var message = "Found " + name + " in string.";
                            reportAllInstances(node, 
                                               context, 
                                               character, 
                                               message,
                                               fix);
                        }
                    }
                }
            }
        }
    };
}

module.exports = {
    rules: {
        "non-breaking space": createRule(" ", "non-breaking space", ' '),
        "em dash": createRule("—", "em dash", '-'),
        "en dash": createRule("–", "en dash", '-'),
        "right single quote": createRule("’", "right single quote", "'"),
        "left single quote": createRule("‘", "left single quote", "'"),
        "right double quote": createRule("”", "right double quote", '"'),
        "left double quote": createRule("“", "left double quote", '"')
    }
}
