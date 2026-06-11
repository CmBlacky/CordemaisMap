/**
 * Points du parcours — l'ordre du tableau définit la séquence.
 * Seul le premier est visible au départ ; à la fermeture de la pop-up
 * du dernier point révélé, le suivant et le fil rouge apparaissent.
 */
export const PINGS = [
  {
    id: 'p1',
    lat: 47.274833,
    lng: -1.875750,
    title: "Les Berges de la Loire (Au pied des cheminées)",
    category: 'Enquête',
    type: 'mixed',
    label: 'Berges',
    description: `
      <p>Vous commencez votre enquête au lever du soleil, sur les berges de la Loire, là où la lumière verte a été la plus intense la nuit dernière. L'eau est trouble. Sur la rive, vous découvrez une combinaison de protection thermique abandonnée, à moitié recouverte de vase. Dans l'une des poches, un badge d'accès appartenant au Dr. Elias Morel, avec des traces de pas précipitées remontant le talus en direction des grilles de la centrale.</p>
      <p>Objectif : Remonter la piste jusqu'à l'entrée du site sécurisé.</p>
    `,
    image: null,
    audio: {
      src: 'js/data/sons/1mix.mp3',
      title: 'Silence matinal sur la Loire et bruit de gouttes tombant sur la vase',
    },
  },
  {
    id: 'p2',
    lat: 47.279944,
    lng: -1.882694,
    title: "L'Entrée de la Centrale Thermique",
    category: 'Sécurité',
    type: 'mixed',
    label: 'Entrée',
    description: `
      <p>En arrivant aux grilles, la sécurité est sur les dents. En présentant le badge trouvé sur les berges, le chef de poste vous laisse visionner les caméras de la nuit. Vous voyez le Dr. Morel sortir en courant, paniqué, portant un petit cylindre métallique qui émet cette fameuse lueur verte. Sur la vidéo, il évite la route principale et s'enfuit en direction des bateaux amarrés pour semer d'éventuels poursuivants.</p>
      <p>Objectif : Fouiller la zone portuaire pour retrouver sa trace.</p>
    `,
    image: null,
    audio: {
      src: 'js/data/sons/2mix.mp3',
      title: 'Pas précipités sur le gravier et interphone de la centrale',
    },
  },
  {
    id: 'p3',
    lat: 47.285250,
    lng: -1.885250,
    title: 'Le Port de la Côte (Port de Cordemais)',
    category: 'Port',
    type: 'mixed',
    label: 'Port',
    description: `
      <p>Une petite annexe à moteur a été détachée mais son hélice s'est prise dans un filet. Morel a dû abandonner l'idée de fuir par l'eau. Dans la barque, vous trouvez un ticket de pari hippique froissé et maculé d'une substance verte fluorescente. Une note griffonnée au dos indique : "Plan B : les anciennes écuries, 6h00".</p>
      <p>Objectif : Vous rendre sur le champ de courses local.</p>
    `,
    image: null,
    audio: {
      src: 'js/data/sons/3mix.mp3',
      title: 'Écume lente du port et halètement étouffé sous la brume',
    },
  },
  {
    id: 'p4',
    lat: 47.283611,
    lng: -1.879722,
    title: "L'Hippodrome de la Loire",
    category: 'Terrain',
    type: 'mixed',
    label: 'Hippodrome',
    description: `
      <p>Sous les gradins déserts, vous découvrez des signes de lutte. Quelqu'un l'a rattrapé ici. Une fiole en verre brisée dégage une forte odeur de soufre. Sur un pilier, Morel a tracé à la hâte un symbole dans la boue : un roseau stylisé traversé par une flèche, pointant vers les vastes étendues humides qui bordent la commune.</p>
      <p>Objectif : Vous enfoncer dans les terres sauvages pour le retrouver.</p>
    `,
    image: null,
    audio: {
      src: 'js/data/sons/4mix.mp3',
      title: 'Craquement de gradins et vent froid sur l’hippodrome vide',
    },
  },
  {
    id: 'p5',
    lat: 47.291667,
    lng: -1.883417,
    title: "L'Étier de Cordemais (Les Marais)",
    category: 'Marais',
    type: 'mixed',
    label: 'Étang',
    description: `
      <p>En suivant les traces dans la végétation, vous tombez sur un campement de fortune caché sous les feuillages. Morel a tenté de refroidir le cylindre dans l'eau de l'étier. Un carnet de laboratoire est laissé ouvert sur une caisse : "La réaction est instable. Il me faut le neutralisant que je gardais dans mon coffre personnel pour stopper l'isotope".</p>
      <p>Objectif : Visiter le lieu de résidence du scientifique pour récupérer la solution.</p>
    `,
    image: null,
    audio: {
      src: 'js/data/sons/5mix.mp3',
      title: 'Bruits d’insectes et clapotis dans le marais sombre',
    },
  },
  {
    id: 'p6',
    lat: 47.288583,
    lng: -1.874778,
    title: 'Le Domicile du Dr. Morel',
    category: 'Résidence',
    type: 'mixed',
    label: 'Maison',
    description: `
      <p>En arrivant, vous constatez que la porte d'entrée est entrouverte. Des mercenaires industriels sont passés avant vous et ont saccagé la maison. Heureusement, le coffre dissimulé derrière un faux panneau électrique est intact. Vous y trouvez un tube contenant un liquide bleu (le neutralisant) et un post-it indiquant qu'en cas de danger absolu, il cacherait les preuves du sabotage sous le regard des saints.</p>
      <p>Objectif : Chercher l'édifice religieux de la ville.</p>
    `,
    image: null,
    audio: {
      src: 'js/data/sons/6mix.mp3',
      title: 'Porte qui grince et murmure de papiers froissés',
    },
  },
  {
    id: 'p7',
    lat: 47.290083,
    lng: -1.879028,
    title: "Le Parvis de l'Église Saint-Jean-Baptiste",
    category: 'Religieux',
    type: 'mixed',
    label: 'Parvis',
    description: `
      <p>En inspectant les statues et les recoins du parvis, vous trouvez un compartiment lâche derrière une pierre. À l'intérieur, une clé USB cryptée. Vous la branchez sur votre tablette d'enquêteur, mais les dossiers sont verrouillés par un mot de passe exigeant des connaissances très spécifiques sur l'histoire locale de Cordemais.</p>
      <p>Objectif : Trouver un lieu de culture pour faire des recherches documentaires.</p>
    `,
    image: null,
    audio: {
      src: 'js/data/sons/7mix.mp3',
      title: 'Cloche lointaine et pas feutrés sur le gravier du parvis',
    },
  },
  {
    id: 'p8',
    lat: 47.290750,
    lng: -1.877500,
    title: 'La Médiathèque Jacques Lambert',
    category: 'Culture',
    type: 'mixed',
    label: 'Médiathèque',
    description: `
      <p>Grâce aux archives municipales de la médiathèque, vous trouvez le mot de passe et déverrouillez la clé USB. Elle contient les preuves irréfutables qu'un groupe industriel concurrent a délibérément saboté la centrale. Dans un message vocal enregistré quelques heures plus tôt, Morel dit : "Si je ne survis pas, ces preuves doivent être remises aux autorités publiques. Je vais essayer de les glisser dans le courrier officiel ce matin".</p>
      <p>Objectif : Courir vers le bâtiment administratif principal.</p>
    `,
    image: null,
    audio: {
      src: 'js/data/sons/8mix.mp3',
      title: 'Murmures d’archives et cliquetis de touches de clavier',
    },
  },
  {
    id: 'p9',
    lat: 47.291278,
    lng: -1.876778,
    title: 'La Mairie de Cordemais',
    category: 'Administration',
    type: 'mixed',
    label: 'Mairie',
    description: `
      <p>Près de la boîte aux lettres sécurisée de la mairie, vous retrouvez des gouttes de sang et de liquide fluorescent. Morel a été interrompu avant de pouvoir déposer une copie physique du dossier. Un passant vous signale avoir vu un homme blessé et paniqué héler un taxi ou courir vers les transports en commun pour quitter la ville au plus vite.</p>
      <p>Objectif : Foncer vers le seul point de départ ferroviaire.</p>
    `,
    image: null,
    audio: {
      src: 'js/data/sons/9mix.mp3',
      title: 'Bruit distant de voitures et murmures près de la mairie',
    },
  },
  {
    id: 'p10',
    lat: 47.302306,
    lng: -1.846917,
    title: 'Le Parking de la Gare',
    category: 'Finale',
    type: 'mixed',
    label: 'Gare',
    description: `
      <p>Le grand final. Sur le quai désert, le Dr. Morel est acculé par deux hommes en costume sombre. En tant qu'enquêteur, vous intervenez juste à temps pour le protéger, brandissant les preuves que vous avez récoltées et le neutralisant. Les mercenaires fuient. Morel, épuisé, verse le liquide bleu dans le cylindre. La lueur verte s'éteint dans un sifflement de vapeur. La ville est sauvée.</p>
      <p>Objectif : Clore l'enquête et préserver les preuves du sabotage.</p>
    `,
    image: null,
    audio: {
      src: 'js/data/sons/10mix.mp3',
      title: 'Vagues de pas pressés et sifflement du cylindre neutralisé',
    },
  },
];
