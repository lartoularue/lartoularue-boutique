/* Catalogue modifiable : tarifs en FCFA et variantes de chaque produit. */
window.PRODUCTS = [
  {
    id: 'tee-kodjo', type: 'tshirt', category: 'T-shirt officiel', name: 'Kodjo — Ligne de fuite', price: 8000,
    badge: 'Pièce signature', art: 'art-kodjo', image: 'assets/tshirt-mockup.png', description: 'Un dessin frontal inspiré de Kodjo, imprimé sur un t-shirt épais et doux. Le trait reste volontairement brut : comme une affiche arrachée au mur, puis gardée.',
    models: ['Kodjo — Ligne de fuite', 'Kodjo — Profil'], colors: ['Noir', 'Blanc'], sizes: ['S', 'M', 'L', 'XL', 'XXL']
  },
  {
    id: 'tee-background', type: 'tshirt', category: 'T-shirt officiel', name: 'Décor — Mur vivant', price: 8000,
    badge: 'Nouveau', art: 'art-wall', description: 'Un fragment de décor du film à porter comme une seconde peau. Imprimé poitrine et dos sur coton unisexe, en série limitée de précommande.',
    models: ['Décor — Mur vivant', 'Décor — Nuit orange'], colors: ['Noir', 'Blanc'], sizes: ['S', 'M', 'L', 'XL', 'XXL']
  },
  {
    id: 'tee-exclusive', type: 'tshirt', category: 'T-shirt officiel', name: 'Exclusif — La rue répond', price: 8000,
    badge: 'Édition limitée', art: 'art-exclusive', description: 'Le visuel réservé aux premières précommandes. Une composition graphique orange crépusculaire, pensée pour celles et ceux qui soutiennent le film dès le premier geste.',
    models: ['La rue répond'], colors: ['Noir', 'Blanc'], sizes: ['S', 'M', 'L', 'XL', 'XXL']
  },
  {
    id: 'tote-kodjo', type: 'tote', category: 'Tote bag collector', name: 'Tote — Les murs parlent', price: 4500,
    badge: 'Collector', art: 'art-tote', description: 'Un tote bag solide, illustré des signes et textures du film. Pour transporter des livres, des idées et tout ce qui mérite de circuler.',
    models: ['Les murs parlent', 'La ville en mouvement'], colors: ['Écru'], sizes: []
  },
  {
    id: 'sticker-characters', type: 'sticker', category: 'Planche A5', name: 'Stickers — Personnages', price: 1500,
    badge: 'A5 · prédécoupés', art: 'art-stickers', image: 'assets/stickers-personnages.png', description: 'Une planche A5 de stickers prédécoupés à décoller et coller : personnages, signes et petits fragments de l’univers L’ART OU LA RUE.',
    models: ['Personnages'], colors: [], sizes: []
  },
  {
    id: 'sticker-street', type: 'sticker', category: 'Planche A5', name: 'Stickers — Signes de rue', price: 1500,
    badge: 'A5 · prédécoupés', art: 'art-street-stickers', image: 'assets/stickers-maman.png', description: 'Une planche thématique dédiée aux textures urbaines du film. À poser sur un carnet, un casque, un mur ou là où l’œil a besoin d’un signe.',
    models: ['Signes de rue'], colors: [], sizes: []
  }
];

window.TEAM = [
  ['Roddy Agbo', 'Réalisation / scénario', 'male'], ['Bassam Bachabi', 'Direction artistique', 'male'], ['Raphael Cakpo-Hessou', 'Animation', 'male'], ['Pamela Chablis', 'Production', 'female'], ['Nawal Makou', 'Montage', 'male'], ['Bodéric Migan', 'Son / musique', 'male']
];

window.VOICES = [
  ['Roddy Agbo', 'Voix de Kodjo', 'male'], ['Voix off 02', 'Voix de l’affiche', 'male'], ['Voix off 03', 'Voix du passant', 'male'], ['Voix off 04', 'Voix de la ville', 'male'], ['Voix off 05', 'Voix de l’atelier', 'female'], ['Voix off 06', 'Voix du mur', 'male']
];

/* Remplacer ces valeurs avant la mise en production. Les champs vides activent un mode démo explicite. */
window.STORE_CONFIG = {
  googleAppsScriptUrl: '',
  fedapayUrl: '',
  mobileMoney: {
    mtnUssdTemplate: '', // Exemple de forme : *880*1*NUMERO*{amount}# selon votre opérateur.
    moovUssdTemplate: ''
  },
  whatsappNumber: '22900000000',
  currency: 'FCFA'
};
