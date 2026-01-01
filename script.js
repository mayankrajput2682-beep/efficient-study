const planner = document.getElementById("planner");

/* TARGETS */
const TARGETS = [
  "Lecture",
  "NCERT",
  "Revision",
  "Module",
  "DPP",
  "PYQs",
  "Mock Test"
];

/* SYLLABUS */
const syllabus = {
  Physics: [
    "Units & Measurements","Kinematics","Laws of Motion",
    "Work Energy Power","Centre of Mass & Rotation","Gravitation",
    "Thermodynamics","Oscillations & Waves","Electrostatics",
    "Current Electricity","Magnetic Effects","EM Induction",
    "Alternating Current","Ray Optics","Wave Optics",
    "Dual Nature","Atoms & Nuclei","Semiconductors"
  ],

  Chemistry: [
    "Basic Concepts","Structure of Atom","Periodic Table",
    "Chemical Bonding","Thermodynamics","Equilibrium",
    "Redox Reactions","Organic Basics","Hydrocarbons",
    "Solid State","Solutions","Electrochemistry",
    "Chemical Kinetics","Coordination Compounds",
    "Haloalkanes","Alcohols Phenols Ethers",
    "Aldehydes Ketones","Biomolecules"
  ],

  Botany: [
    "Living World","Biological Classification","Plant Kingdom",
    "Morphology","Anatomy","Photosynthesis",
    "Respiration","Plant Growth","Reproduction in Plants",
    "Ecosystem","Biodiversity"
  ],

  Zoology: [
    "Animal Kingdom","Structural Organisation",
    "Digestion","Breathing","Circulation",
    "Excretion","Neural Control","Endocrine System",
    "Human Reproduction","Genetics","Evolution",
    "Human Health & Disease"
  ]
};

/* LOAD PLANNER */
function loadPlanner(){
  planner.innerHTML = "";

  Object.keys(syllabus).forEach(subject=>{
    const block = document.createElement("div");
    block.className = "subject-block";

    block.innerHTML = `<div class="subject-title">${subject}</div>`;

    syllabus[subject].forEach(chapter=>{
      const row = document.createElement("div");
      row.className = "chapter-row";

      const name = document.createElement("div");
      name.className = "chapter-name";
      name.innerText = chapter;
      row.appendChild(name);

      TARGETS.forEach(target=>{
        const key = `${subject}_${chapter}_${target}`;
        const checked = localStorage.getItem(key)==="true";

        const cell = document.createElement("div");
        cell.className = "cell-target";
        cell.innerHTML = `<input type="checkbox" ${checked?"checked":""}>`;

        cell.querySelector("input").onchange = e=>{
          localStorage.setItem(key, e.target.checked);
        };

        row.appendChild(cell);
      });

      const cKey = `${subject}_${chapter}_COMPLETE`;
      const cChecked = localStorage.getItem(cKey)==="true";

      const complete = document.createElement("div");
      complete.className = "cell-complete";
      complete.innerHTML = `<input type="checkbox" ${cChecked?"checked":""}>`;

      complete.querySelector("input").onchange = e=>{
        localStorage.setItem(cKey, e.target.checked);
      };

      row.appendChild(complete);
      block.appendChild(row);
    });

    planner.appendChild(block);
  });
}

/* NEET COUNTDOWN */
const timerBox = document.getElementById("neetTimer");
function updateTimer(){
  const today = new Date();
  let neet = new Date(today.getFullYear(),4,3); // 3 May
  if(today > neet) neet.setFullYear(neet.getFullYear()+1);
  const days = Math.ceil((neet - today)/(1000*60*60*24));
  timerBox.innerText = `NEET EXAM IN : ${days} DAYS`;
}

updateTimer();
setInterval(updateTimer,60000);

loadPlanner();
