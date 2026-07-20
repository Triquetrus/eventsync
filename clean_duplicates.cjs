const fs = require('fs');
let code = fs.readFileSync('src/components/CaptionStudioTab.jsx', 'utf8');

// I will remove the first definition of J, ue, useEffect, he, handleMicClick from my missingBlock,
// OR remove the ones at the bottom.
// Since it's easier to remove my missingBlock's extra things, let's look at `export default function CaptionStudioTab` and replace up to `handleMicClick = async () => {`
const regex = /export default function CaptionStudioTab.*?const handleMicClick = async \(\) => \{/s;

const replacement = `export default function CaptionStudioTab({
  events: r,
  media: e,
  onSaveCaption: t,
  preselectedMedia: s = [],
  preselectedEventId: a = "",
  onNavigateToTab: u,
}) {
  var Ai, Si;
  const [c, p] = React.useState(
      a || ((Ai = r[0]) == null ? void 0 : Ai.id) || "",
    ),
    [g, y] = React.useState("fun"),
    [E, w] = React.useState("instagram"),
    [I, V] = React.useState(""),
    [z, te] = React.useState(0),
    [oe, pe] = React.useState(s),
    [Te, Ee] = React.useState(!1),
    [me, Re] = React.useState(""),
    [be, k] = React.useState([]),
    [C, O] = React.useState(null),
    [L, M] = React.useState(null),
    [P, R] = React.useState([]),
    [rt, pt] = React.useState("idle"),
    [selectedAccountsState, ce] = React.useState({}),
    [ne, De] = React.useState(null),
    [Xe, N] = React.useState({}),
    [G, le] = React.useState({}),
    [isRecording, setIsRecording] = React.useState(!1),
    [mediaRecorder, setMediaRecorder] = React.useState(null),
    handleMicClick = async () => {`;

code = code.replace(regex, replacement);

// And we also had "Multiple exports with the same name default"
code = code.replace(/export default CaptionStudioTab;\n/s, '');

fs.writeFileSync('src/components/CaptionStudioTab.jsx', code);
console.log("Cleaned duplicates!");
