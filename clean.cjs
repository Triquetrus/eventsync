const fs = require('fs');
let code = fs.readFileSync('src/components/CaptionStudioTab.jsx', 'utf8');

// The block to replace
const blockToReplace = `    ue = [
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

  const handleMicClick = async () => {`;

code = code.replace(blockToReplace, `    handleMicClick = async () => {`);
fs.writeFileSync('src/components/CaptionStudioTab.jsx', code);
console.log("Cleaned up redundant declarations!");
