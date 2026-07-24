export interface WolofWord {
  french: string;
  wolof: string;
  phonetic: string;
  example?: string;
  exampleTranslation?: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  emoji: string;
  color: string;
  bgColor: string;
  words: WolofWord[];
}

export const lessons: Lesson[] = [
  {
    id: "salutations",
    title: "Salutations",
    description: "Les formules de politesse et de salutation",
    emoji: "👋",
    color: "#B8A3FF",
    bgColor: "#EDE9FF",
    words: [
      { french: "Bonjour / Bonne paix", wolof: "Salaam aleekum", phonetic: "sa-laam a-lée-koum", example: "Salaam aleekum !", exampleTranslation: "Bonjour !" },
      { french: "Réponse au bonjour", wolof: "Maalekum salaam", phonetic: "ma-lé-koum sa-laam", example: "Maalekum salaam !", exampleTranslation: "Réponse au bonjour !" },
      { french: "Comment vas-tu ?", wolof: "Ana wa kër gi ?", phonetic: "a-na wa kèr gi", example: "Ana wa kër gi ?", exampleTranslation: "Comment va la famille ?" },
      { french: "Je vais bien", wolof: "Maa ngi fi rekk", phonetic: "ma-ngui fi rèk", example: "Maa ngi fi rekk, jërejëf !", exampleTranslation: "Je vais bien, merci !" },
      { french: "Merci", wolof: "Jërejëf", phonetic: "djé-ré-djef", example: "Jërejëf waaye !", exampleTranslation: "Merci beaucoup !" },
      { french: "De rien / S'il vous plaît", wolof: "Amul solo", phonetic: "a-moul so-lo", example: "Amul solo !", exampleTranslation: "De rien !" },
      { french: "Au revoir", wolof: "Ba beneen yoon", phonetic: "ba bé-nène yonn", example: "Ba beneen yoon !", exampleTranslation: "À la prochaine fois !" },
      { french: "À bientôt", wolof: "Ba ci kanam", phonetic: "ba ci ka-nam", example: "Ba ci kanam !", exampleTranslation: "À bientôt !" },
      { french: "Oui", wolof: "Waaw", phonetic: "waou", example: "Waaw, maa ngi dem.", exampleTranslation: "Oui, j'y vais." },
      { french: "Non", wolof: "Déedéet", phonetic: "dé-dète", example: "Déedéet, du dem.", exampleTranslation: "Non, il ne va pas." },
      { french: "Pardon / Excusez-moi", wolof: "Baal ma", phonetic: "baal ma", example: "Baal ma, sóo mëna ?", exampleTranslation: "Excusez-moi, pouvez-vous ?" },
      { french: "Bienvenue", wolof: "Dalal ak jam", phonetic: "da-lal ak djam", example: "Dalal ak jam !", exampleTranslation: "Bienvenue !" },
    ],
  },
  {
    id: "chiffres",
    title: "Les Chiffres",
    description: "Apprends à compter de 1 à 20 en wolof",
    emoji: "🔢",
    color: "#FFC7A8",
    bgColor: "#FFF0E8",
    words: [
      { french: "Un", wolof: "Benn", phonetic: "bèn" },
      { french: "Deux", wolof: "Ñaar", phonetic: "nyar" },
      { french: "Trois", wolof: "Ñett", phonetic: "nyèt" },
      { french: "Quatre", wolof: "Ñeent", phonetic: "nyènt" },
      { french: "Cinq", wolof: "Juróom", phonetic: "djourom" },
      { french: "Six", wolof: "Juróom benn", phonetic: "djourom bèn" },
      { french: "Sept", wolof: "Juróom ñaar", phonetic: "djourom nyar" },
      { french: "Huit", wolof: "Juróom ñett", phonetic: "djourom nyèt" },
      { french: "Neuf", wolof: "Juróom ñeent", phonetic: "djourom nyènt" },
      { french: "Dix", wolof: "Fukk", phonetic: "fouk" },
      { french: "Onze", wolof: "Fukk ak benn", phonetic: "fouk ak bèn" },
      { french: "Douze", wolof: "Fukk ak ñaar", phonetic: "fouk ak nyar" },
      { french: "Quinze", wolof: "Fukk ak juróom", phonetic: "fouk ak djourom" },
      { french: "Vingt", wolof: "Ñaar fukk", phonetic: "nyar fouk" },
      { french: "Trente", wolof: "Fanweer", phonetic: "fan-wéér" },
      { french: "Cinquante", wolof: "Juróom fukk", phonetic: "djourom fouk" },
      { french: "Cent", wolof: "Téeméer", phonetic: "té-mèr" },
      { french: "Mille", wolof: "Junni", phonetic: "djou-ni" },
    ],
  },
  {
    id: "famille",
    title: "La Famille",
    description: "Les membres de la famille en wolof",
    emoji: "👨‍👩‍👧",
    color: "#BFE7D2",
    bgColor: "#E8F8F0",
    words: [
      { french: "Père", wolof: "Baay", phonetic: "bay", example: "Baay bi dafa baax.", exampleTranslation: "Le père est bon." },
      { french: "Mère", wolof: "Yaay", phonetic: "yay", example: "Yaay bi dafa bëgg ma.", exampleTranslation: "La mère m'aime." },
      { french: "Fils / Enfant (garçon)", wolof: "Doom bu góor", phonetic: "doom bou gor" },
      { french: "Fille / Enfant (fille)", wolof: "Doom bu jigéen", phonetic: "doom bou djiguène" },
      { french: "Frère", wolof: "Mag bu góor", phonetic: "mag bou gor" },
      { french: "Sœur", wolof: "Mag bu jigéen", phonetic: "mag bou djiguène" },
      { french: "Grand-père", wolof: "Mame bu góor", phonetic: "ma-mé bou gor" },
      { french: "Grand-mère", wolof: "Mame bu jigéen", phonetic: "ma-mé bou djiguène" },
      { french: "Oncle", wolof: "Tonton", phonetic: "tonton" },
      { french: "Tante", wolof: "Tantie", phonetic: "tantie" },
      { french: "Mari", wolof: "Jëkkër", phonetic: "djeu-keur" },
      { french: "Femme (épouse)", wolof: "Jabar", phonetic: "dja-bar" },
      { french: "Ami / Amie", wolof: "Xarit", phonetic: "kha-rit", example: "Xarit bi maa ngi dem.", exampleTranslation: "L'ami(e) s'en va." },
      { french: "Oncle maternel", wolof: "Nijaay", phonetic: "ni-djay" },
      { french: "Tante paternelle", wolof: "Bajan", phonetic: "ba-djan" },
      { french: "Parents (géniteurs)", wolof: "Waa jur", phonetic: "wa djour" },
      { french: "Petit frère / petite sœur (général)", wolof: "Rakk", phonetic: "rak" },
      { french: "Grand frère / grande sœur (général)", wolof: "Mag", phonetic: "mag" },
    ],
  },
  {
    id: "nourriture",
    title: "La Nourriture",
    description: "Les aliments et repas du quotidien",
    emoji: "🍚",
    color: "#FFE28A",
    bgColor: "#FFF9E0",
    words: [
      { french: "Riz (thiéboudienne)", wolof: "Ceebu jën", phonetic: "tchébou djène", example: "Ceebu jën bi dafa neex !", exampleTranslation: "Le thiéboudienne est délicieux !" },
      { french: "Eau", wolof: "Ndox", phonetic: "ndokh", example: "Jox ma ndox.", exampleTranslation: "Donne-moi de l'eau." },
      { french: "Pain", wolof: "Mburu", phonetic: "m-bou-rou" },
      { french: "Viande", wolof: "Yapp", phonetic: "yap" },
      { french: "Poisson", wolof: "Jën", phonetic: "djène" },
      { french: "Lait", wolof: "Meew", phonetic: "méou" },
      { french: "Sucre", wolof: "Sukër", phonetic: "sou-kèr" },
      { french: "Sel", wolof: "Cëpp", phonetic: "tchèp" },
      { french: "Légumes", wolof: "Palaar", phonetic: "pa-lar" },
      { french: "Fruit", wolof: "Biscuit bu suukër", phonetic: "biss-kuit bou sou-kèr" },
      { french: "Manger", wolof: "Lekk", phonetic: "lèk", example: "Nanu lekk !", exampleTranslation: "Mangeons !" },
      { french: "Boire", wolof: "Nan", phonetic: "nan", example: "Maa ngi nan café.", exampleTranslation: "Je bois du café." },
      { french: "Délicieux / Bon", wolof: "Neex na", phonetic: "nèkh na", example: "Neex na lool !", exampleTranslation: "C'est vraiment délicieux !" },
      { french: "J'ai faim", wolof: "Dama xiif", phonetic: "da-ma khif" },
      { french: "J'ai soif", wolof: "Dama mar", phonetic: "da-ma mar" },
    ],
  },
  {
    id: "couleurs",
    title: "Les Couleurs",
    description: "Toutes les couleurs en wolof",
    emoji: "🎨",
    color: "#FF9EBC",
    bgColor: "#FFE8F0",
    words: [
      { french: "Rouge", wolof: "Këndër", phonetic: "kèn-dèr" },
      { french: "Bleu", wolof: "Blö", phonetic: "bleu" },
      { french: "Vert", wolof: "Wert", phonetic: "wèrt" },
      { french: "Jaune", wolof: "Mën a xuus", phonetic: "mèn a khousse" },
      { french: "Blanc", wolof: "Xonq", phonetic: "khonk" },
      { french: "Noir", wolof: "Ñuul", phonetic: "nyoul" },
      { french: "Orange", wolof: "Oraas", phonetic: "o-rasse" },
      { french: "Violet", wolof: "Moove", phonetic: "mouvé" },
      { french: "Rose", wolof: "Roose", phonetic: "roz" },
      { french: "Gris", wolof: "Gris", phonetic: "gri" },
      { french: "Marron / Marron", wolof: "Maróon", phonetic: "ma-ron" },
    ],
  },
  {
    id: "corps",
    title: "Le Corps",
    description: "Les parties du corps humain",
    emoji: "🧍",
    color: "#A8D8FF",
    bgColor: "#E0F0FF",
    words: [
      { french: "Tête", wolof: "Bopp", phonetic: "bop" },
      { french: "Yeux", wolof: "Bët", phonetic: "bèt" },
      { french: "Nez", wolof: "Noppi", phonetic: "nopi" },
      { french: "Bouche", wolof: "Gémmiñ", phonetic: "guéminy" },
      { french: "Oreille", wolof: "Xël", phonetic: "khèl" },
      { french: "Main", wolof: "Loxo", phonetic: "lo-kho" },
      { french: "Pied", wolof: "Tànk", phonetic: "tank" },
      { french: "Ventre", wolof: "Biir", phonetic: "bir" },
      { french: "Dos", wolof: "Kanam", phonetic: "ka-nam" },
      { french: "Cœur", wolof: "Xol", phonetic: "khol" },
      { french: "Cheveux", wolof: "Thiokk", phonetic: "tchok" },
      { french: "Dent", wolof: "Bëñ", phonetic: "bény" },
    ],
  },
  {
    id: "verbes",
    title: "Verbes Courants",
    description: "Les verbes essentiels du quotidien",
    emoji: "⚡",
    color: "#C3F0A2",
    bgColor: "#EEFBE0",
    words: [
      { french: "Aller", wolof: "Dem", phonetic: "dèm", example: "Maa ngi dem.", exampleTranslation: "Je vais / Je m'en vais." },
      { french: "Venir", wolof: "Ñów", phonetic: "nyou", example: "Ñów fii !", exampleTranslation: "Viens ici !" },
      { french: "Voir", wolof: "Gis", phonetic: "guiss", example: "Gis naa la.", exampleTranslation: "Je t'ai vu(e)." },
      { french: "Entendre", wolof: "Dégg", phonetic: "dèg", example: "Dégg naa la.", exampleTranslation: "Je t'ai entendu(e)." },
      { french: "Parler", wolof: "Wax", phonetic: "wakh", example: "Wax ma.", exampleTranslation: "Parle-moi." },
      { french: "Comprendre", wolof: "Xam", phonetic: "kham", example: "Xam naa.", exampleTranslation: "Je comprends / Je sais." },
      { french: "Vouloir", wolof: "Bëgg", phonetic: "bèg", example: "Dama bëgg lekk.", exampleTranslation: "Je veux manger." },
      { french: "Aimer", wolof: "Bëgg", phonetic: "bèg", example: "Dama bëgg la.", exampleTranslation: "Je t'aime." },
      { french: "Travailler", wolof: "Liggéey", phonetic: "li-guéy", example: "Maa ngi liggéey.", exampleTranslation: "Je travaille." },
      { french: "Dormir", wolof: "Nekk", phonetic: "nèk", example: "Dafa nekk.", exampleTranslation: "Il/Elle dort." },
      { french: "Courir", wolof: "Kaay", phonetic: "kay" },
      { french: "Donner", wolof: "Jox", phonetic: "djokh", example: "Jox ma ndox.", exampleTranslation: "Donne-moi de l'eau." },
      { french: "Prendre", wolof: "Jël", phonetic: "djèl", example: "Jël bi !", exampleTranslation: "Prends-le !" },
    ],
  },
  {
    id: "questions",
    title: "Poser des Questions",
    description: "Les mots interrogatifs en wolof",
    emoji: "❓",
    color: "#FFD580",
    bgColor: "#FFF6D6",
    words: [
      { french: "Qui ?", wolof: "Kan ?", phonetic: "kan", example: "Kan la ?", exampleTranslation: "Qui est-ce ?" },
      { french: "Quoi / Que ?", wolof: "Loo bëgg ?", phonetic: "lo bèg", example: "Loo bëgg ?", exampleTranslation: "Que veux-tu ?" },
      { french: "Où ?", wolof: "Fan ?", phonetic: "fan", example: "Fan nga dem ?", exampleTranslation: "Où vas-tu ?" },
      { french: "Quand ?", wolof: "Kañ ?", phonetic: "kany", example: "Kañ nga ñów ?", exampleTranslation: "Quand viens-tu ?" },
      { french: "Pourquoi ?", wolof: "Lutax ?", phonetic: "lou-takh", example: "Lutax doo dem ?", exampleTranslation: "Pourquoi ne vas-tu pas ?" },
      { french: "Comment ?", wolof: "Naka ?", phonetic: "na-ka", example: "Naka nga def ?", exampleTranslation: "Comment vas-tu ? / Comment tu fais ?" },
      { french: "Combien ?", wolof: "Ñaata ?", phonetic: "nyata", example: "Ñaata ?", exampleTranslation: "Combien ?" },
      { french: "C'est quoi ça ?", wolof: "Lan la ?", phonetic: "lan la", example: "Lan la li ?", exampleTranslation: "C'est quoi ça ?" },
      { french: "Est-ce que tu parles wolof ?", wolof: "Dégg nga wolof ?", phonetic: "dèg nga wolof", example: "Dégg nga wolof ?", exampleTranslation: "Tu comprends/parles le wolof ?" },
    ],
  },
  {
    id: "pronoms",
    title: "Les Pronoms",
    description: "Pronoms sujets, objets et possessifs de base",
    emoji: "🗣️",
    color: "#D9B3FF",
    bgColor: "#F3E8FF",
    words: [
      { french: "Moi / Je", wolof: "Man", phonetic: "man" },
      { french: "Toi / Tu", wolof: "Yow", phonetic: "yow" },
      { french: "Lui / Elle", wolof: "Moom", phonetic: "moom" },
      { french: "Nous (sujet)", wolof: "Ñun", phonetic: "gnoune" },
      { french: "Vous (sujet)", wolof: "Yéén", phonetic: "yéne" },
      { french: "Ils / Elles (sujet)", wolof: "Ñoom", phonetic: "gnome" },
      { french: "Me / Moi (objet)", wolof: "Më", phonetic: "meu" },
      { french: "Te / Toi (objet)", wolof: "Lë", phonetic: "leu" },
      { french: "Le / La (objet)", wolof: "Ko", phonetic: "ko" },
      { french: "Nous (objet)", wolof: "Ñu", phonetic: "gnou" },
      { french: "Vous / Les (objet)", wolof: "Léén", phonetic: "léne" },
      { french: "Mon / Ma", wolof: "Sumë", phonetic: "soume", example: "Mangi jel sumë tééré.", exampleTranslation: "Je prends mon livre." },
      { french: "Ton / Ta", wolof: "Sa", phonetic: "sa" },
      { french: "Son / Sa (à lui, à elle)", wolof: "-am", phonetic: "am", example: "Baayam", exampleTranslation: "Son père" },
      { french: "Notre", wolof: "Suñu", phonetic: "sougnou" },
      { french: "Votre / Leur", wolof: "Séén", phonetic: "séne" },
    ],
  },
  {
    id: "maison-lecture",
    title: "Maison & Lecture",
    description: "Objets du quotidien, pièces de la maison, lire et écrire",
    emoji: "📖",
    color: "#8FD3D6",
    bgColor: "#E4F7F7",
    words: [
      { french: "Étudier / Lire", wolof: "Jang", phonetic: "djang" },
      { french: "Livre", wolof: "Tééré", phonetic: "téré" },
      { french: "Écrire", wolof: "Bind", phonetic: "bind" },
      { french: "Lettre", wolof: "Léetar", phonetic: "létar" },
      { french: "Regarder", wolof: "Xool", phonetic: "khol", example: "Xoolal!", exampleTranslation: "Regarde !" },
      { french: "Goûter", wolof: "Mos", phonetic: "moss" },
      { french: "Toucher", wolof: "Lal", phonetic: "lal" },
      { french: "Ouvrir", wolof: "Ubi", phonetic: "oubi" },
      { french: "Fermer", wolof: "Tej", phonetic: "tèdj" },
      { french: "Entrer (dans)", wolof: "Dug", phonetic: "doug" },
      { french: "Sortir (de)", wolof: "Génn", phonetic: "guènn" },
      { french: "Pièce / Chambre", wolof: "Néég", phonetic: "négue" },
      { french: "Jardin / Champ", wolof: "Tol", phonetic: "tol" },
      { french: "Chercher", wolof: "Séét / Wuut", phonetic: "séét" },
      { french: "Verre", wolof: "Kaas", phonetic: "kaas" },
      { french: "À l'intérieur (de)", wolof: "Ci biir", phonetic: "ci bir" },
      { french: "À l'extérieur (de)", wolof: "Ci biti", phonetic: "ci biti" },
    ],
  },
  {
    id: "marche",
    title: "Au Marché",
    description: "Acheter, vendre et marchander comme au marché sénégalais",
    emoji: "🛍️",
    color: "#FFB88C",
    bgColor: "#FFEFE3",
    words: [
      { french: "Joli / Jolie", wolof: "Rafet", phonetic: "rafèt" },
      { french: "Laid(e)", wolof: "Ñaaw", phonetic: "gnaw" },
      { french: "Cher", wolof: "Jafé", phonetic: "dja-fé" },
      { french: "Bon marché / Facile", wolof: "Yomb", phonetic: "yomb" },
      { french: "Acheter", wolof: "Jend", phonetic: "djènd" },
      { french: "Vendre", wolof: "Jaay", phonetic: "djaay" },
      { french: "Marchander", wolof: "Waxalé", phonetic: "wakhalé" },
      { french: "Offrir", wolof: "May", phonetic: "may" },
      { french: "Laisser", wolof: "Bayyi", phonetic: "bayi" },
      { french: "Emmener / Emporter", wolof: "Yoobu", phonetic: "youbou" },
      { french: "Apporter", wolof: "Indi", phonetic: "indi" },
      { french: "Marché", wolof: "Ja", phonetic: "dja" },
      { french: "Beaucoup", wolof: "Bari", phonetic: "bari" },
      { french: "Petit / Peu", wolof: "Tuuti", phonetic: "touti" },
      { french: "Grand / Énorme", wolof: "Rëy", phonetic: "reuye" },
      { french: "Feu", wolof: "Safara", phonetic: "safara" },
      { french: "Allumer", wolof: "Taal", phonetic: "taal" },
      { french: "Éteindre", wolof: "Fey", phonetic: "féy" },
    ],
  },
  {
    id: "temps",
    title: "Le Temps",
    description: "L'heure, les jours et les moments de la journée",
    emoji: "⏰",
    color: "#9EC6FF",
    bgColor: "#E8F1FF",
    words: [
      { french: "Heure", wolof: "Waxtu", phonetic: "wakhtou" },
      { french: "Jour", wolof: "Bés", phonetic: "béss" },
      { french: "Semaine", wolof: "Ayubés", phonetic: "ayoubéss" },
      { french: "Mois", wolof: "Wéér", phonetic: "wéér" },
      { french: "Année", wolof: "At", phonetic: "at" },
      { french: "Tôt", wolof: "Teel", phonetic: "téél" },
      { french: "Matin / Demain", wolof: "Subë", phonetic: "soubeu" },
      { french: "Après-midi", wolof: "Ngoon", phonetic: "ngon" },
      { french: "Nuit", wolof: "Guddi", phonetic: "goudi" },
      { french: "Pressé(e)", wolof: "Yakkamti", phonetic: "yakkamti" },
      { french: "Durer", wolof: "Yàgg", phonetic: "yag" },
      { french: "Combien ?", wolof: "Ñaata ?", phonetic: "gnata" },
    ],
  },
];

export type QuizQuestion = {
  id: number;
  lessonId: string;
  question: string;
  correct: string;
  choices: string[];
  direction: "fr-to-wo" | "wo-to-fr";
};

export function generateQuiz(lessonId: string, count = 10): QuizQuestion[] {
  const lesson = lessons.find((l) => l.id === lessonId);
  if (!lesson) return [];
  const words = [...lesson.words];
  const shuffled = words.sort(() => Math.random() - 0.5).slice(0, count);

  return shuffled.map((word, i) => {
    const direction: "fr-to-wo" | "wo-to-fr" = Math.random() > 0.5 ? "fr-to-wo" : "wo-to-fr";
    const correct = direction === "fr-to-wo" ? word.wolof : word.french;
    const question = direction === "fr-to-wo" ? word.french : word.wolof;

    const otherWords = words.filter((w) => w !== word);
    const wrongAnswers = otherWords
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map((w) => (direction === "fr-to-wo" ? w.wolof : w.french));

    const choices = [correct, ...wrongAnswers].sort(() => Math.random() - 0.5);

    return {
      id: i,
      lessonId,
      question,
      correct,
      choices,
      direction,
    };
  });
}
