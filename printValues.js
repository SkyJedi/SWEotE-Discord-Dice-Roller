//exports.emoji
exports.text = function text(str, message) {
  var text = {
    suc:  "Success:",
    adv:  "Advantage:",
    tri:  "Triumph:",
    fail: "Failure:",
    thr:  "Threat:",
    des:  "Despair:",
    ls:   "Lightside:",
    ds:   "Darkside:",
    ba:   "Blue: Advantage ",
    baa:  "Blue: Advantage x2 ",
    bb:   "Blue: Blank ",
    blkb: "Black: Blank ",
    blkf: "BlackK Failure ",
    blkt: "Black: Threat ",
    bs:   "Blue: Success ",
    bsa:  "Blue: Success + Advantage ",
    ga:   "Green: Advantage ",
    gaa:  "Green: Advantage x2 ",
    gb:   "Green: Blank ",
    gs:   "Green: Success ",
    gsa:  "Green: Success + Advantage ",
    gss:  "Green: Success x2 ",
    pb:      	"Purple: Blank ",
    pf:      	"Purple: Failure ",
    pff:      	"Purple: Failure x2 ",
    pft:      	"Purple: Failure + Threat ",
    pt:      	"Purple: Threat ",
    ptt:      	"Purple: Threat x2 ",
    rb:      	"Red: Blank ",
    rd:      	"Red: Despair ",
    rf:      	"Red: Failure ",
    rff:      	"Red: Failure x2 ",
    rft:      	"Red: Failure + Threat ",
    rt:      	"Red: Threat ",
    rtt:      	"Red: Threat x2 ",
    wl:      	"White: Lightside ",
    wll:      	"White: Lightside x2 ",
    wd:      	"White: Darkside ",
    wdd:      	"White: Darkside x2 ",
    ya:      	"Yellow: Advantage ",
    yaa:      	"Yellow: Advantage x2 ",
    yb:      	"Yellow: Blank ",
    ys:      	"Yellow: Success ",
    ysa:      	"Yellow: Success + Advantage ",
    yss:      	"Yellow: Success x2 ",
    yt:      	"Yellow: Triumph "
  };
  var final = text[str];
  return final;
}

exports.emoji = function emoji(str, message) {
  var final = message.guild.emojis.find('name', str).toString();
  return final;
}
