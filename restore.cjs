const fs = require('fs');
let code = fs.readFileSync('src/components/CaptionStudioTab.jsx', 'utf8');

const missingCode = `
function CaptionStudioTab({
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
    ue = [
      {
        value: "instagram",
        label: "Instagram",
        icon: Instagram,
      },
      {
        value: "linkedin",
        label: "LinkedIn",
        icon: Linkedin,
      },
      {
        value: "facebook",
        label: "Facebook",
        icon: Facebook,
      },
      {
        value: "all",
        label: "All Platforms (Optimized)",
        icon: Globe,
      },
    ];

  React.useEffect(() => {
    a && p(a);
  }, [a]);

  React.useEffect(() => {
    if (s && s.length > 0) pe(s);
    else {
      const Ie = e.filter((_t) => _t.eventId === c && _t.isHighlighted),
        He = e.filter((_t) => _t.eventId === c && !_t.isHighlighted);
      pe([...Ie, ...He]);
    }
  }, [c, e, s]);

  const he = r.find((Ie) => Ie.id === c);
  console.log("wv rendered. oe is:", oe, "Array?", Array.isArray(oe));

  const handleMicClick = async () => {
    if (isRecording) {
      if (mediaRecorder) {
        mediaRecorder.stop();
      }
      setIsRecording(!1);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
`;

code = code.replace(/};\s*const recorder = new MediaRecorder\(stream\);/, '};\n' + missingCode + '        const recorder = new MediaRecorder(stream);');

fs.writeFileSync('src/components/CaptionStudioTab.jsx', code);
console.log("Restored missing code!");
