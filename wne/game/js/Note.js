var Note = {
    notes: null,
    resourceList: null,
    baseRange: 5,
    channel: 5,
    notePath: "game/res/piano",
    noteType: "mp3",
    init: function(noteList) {

        var notes = [];
        var resourceList = [];

        noteList.forEach(function(n, idx) {
            var info = n.split(".");
            var fullname = info[0];

            var b = fullname[1] === "b";
            var name = b ? fullname[0] + fullname[1] : fullname[0];

            var range = b ? fullname[2] : fullname[1];
            var code = fullname.charCodeAt(0);

            range = Number(range);
            var rangeNote = notes[range] = notes[range] || {};
            rangeNote[name] = fullname;


            var note = {
                id: fullname,
                src: Note.notePath + "/" + n + "." + Note.noteType,
                type: "audio",
                size: Note.channel,
            };
            resourceList.push(note);

        });

        var rangeCount = notes.length;
        notes.forEach(function(rangeNote, range) {
            for (var name in rangeNote) {
                var letter = name[0];
                var b = name[1] == "b";
                if (b) {
                    if (letter == "C") {
                        if (range > 0) {
                            notes[range - 1]["B#"] = rangeNote[name];
                        }
                        continue;
                    }
                    if (letter == "A") {
                        rangeNote["G#"] = rangeNote[name];
                        continue;
                    }
                    var code = name.charCodeAt(0);
                    var letter = String.fromCharCode(code - 1) + "#"
                    rangeNote[letter] = rangeNote[name];
                    // console.log(rangeNote)
                }
            }
        });

        Note.notes = notes;
        Note.resourceList = resourceList;
    },
    initNumber: function() {
        Note.notes.forEach(function(rangeNote, range) {
            for (var name in rangeNote) {
                var no;
                switch (name[0]) {
                    case "C":
                        no = 1;
                        break;
                    case "D":
                        no = 2;
                        break;
                    case "E":
                        no = 3;
                        break;
                    case "F":
                        no = 4;
                        break;
                    case "G":
                        no = 5;
                        break;
                    case "A":
                        no = 6;
                        break;
                    case "B":
                        no = 7;
                        break;
                }
                var noName = no + "" + (name[1] ? name[1] : "");
                rangeNote[noName] = rangeNote[name];
            }
        });

    },

    play: function(n, r) {
        n=String(n);
        var b=n[1]=="b";
        var t;
        if (b){
            t=n[2];
        }else{
            t=n[1];
        }
        var last=n.length-1-(b?1:0);

        if (t=="-"){
            r=-last
        }else if (t=="+"){
            r=last
        }else{
            r = r || 0;
        }
        r = Note.baseRange + r;
        n=n[0]+(b?"b":"");

        Sound.smartPlay(Note.notes[r][n])
    }
};

(function() {


    var noteList = [
        "A0",
        "A1",
        "A2",
        "A3",
        "A4",
        "A5",
        "A6",
        "A7",
        "Ab1",
        "Ab2",
        "Ab3",
        "Ab4",
        "Ab5",
        "Ab6",
        "Ab7",
        "B0",
        "B1",
        "B2",
        "B3",
        "B4",
        "B5",
        "B6",
        "B7",
        "Bb0",
        "Bb1",
        "Bb2",
        "Bb3",
        "Bb4",
        "Bb5",
        "Bb6",
        "Bb7",
        "C1",
        "C2",
        "C3",
        "C4",
        "C5",
        "C6",
        "C7",
        "C8",
        "D1",
        "D2",
        "D3",
        "D4",
        "D5",
        "D6",
        "D7",
        "Db1",
        "Db2",
        "Db3",
        "Db4",
        "Db5",
        "Db6",
        "Db7",
        "Db8",
        "E1",
        "E2",
        "E3",
        "E4",
        "E5",
        "E6",
        "E7",
        "Eb1",
        "Eb2",
        "Eb3",
        "Eb4",
        "Eb5",
        "Eb6",
        "Eb7",
        "F1",
        "F2",
        "F3",
        "F4",
        "F5",
        "F6",
        "F7",
        "G1",
        "G2",
        "G3",
        "G4",
        "G5",
        "G6",
        "G7",
        "Gb1",
        "Gb2",
        "Gb3",
        "Gb4",
        "Gb5",
        "Gb6",
        "Gb7",
    ];

    Note.init(noteList);
    Note.initNumber();


    // console.log(Note.notes)
    // console.log(Note.resourceList)
}())
