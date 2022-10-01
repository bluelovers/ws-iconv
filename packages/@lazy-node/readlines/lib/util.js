"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleOptionNewLineCharacter = void 0;
function handleOptionNewLineCharacter(newLineCharacter) {
    if (!newLineCharacter) {
        return [10 /* EnumNewLineCharacter.LF */];
    }
    else if (typeof newLineCharacter !== 'number') {
        let ls = [];
        for (let i = 0; i < newLineCharacter.length; i++) {
            let c = newLineCharacter[i];
            if (typeof c !== 'number') {
                ls.push(c.charCodeAt(0));
            }
            else {
                ls.push(c);
            }
        }
        return ls;
    }
    return [newLineCharacter];
}
exports.handleOptionNewLineCharacter = handleOptionNewLineCharacter;
//# sourceMappingURL=util.js.map