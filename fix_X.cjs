const fs = require('fs');
let code = fs.readFileSync('src/components/CaptionStudioTab.jsx', 'utf8');

code = code.replace(/\[X, ce\] = React.useState\(\{/g, '[selectedAccountsState, ce] = React.useState({');
code = code.replace(/!!X\[He\]/g, '!!selectedAccountsState[He]');

fs.writeFileSync('src/components/CaptionStudioTab.jsx', code);
console.log("Fixed X state shadowing");
