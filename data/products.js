/* Catalogue modifiable : tarifs en FCFA et variantes de chaque produit. */
window.PRODUCTS = [
  {
    id: 'tee-kodjo', type: 'tshirt', category: 'T-shirt officiel', name: 'Kodjo — Ligne de fuite', price: 12000,
    badge: 'Pièce signature', art: 'art-kodjo', image: 'assets/tshirt-design-01.jpg', description: 'Le portrait-masque du film imprimé sur un t-shirt noir épais et doux, avec la signature L’ART OU LA RUE.',
    models: ['Portrait-masque', 'Version orange'], colors: ['Noir'], sizes: ['S', 'M', 'L', 'XL', 'XXL']
  },
  {
    id: 'tee-background', type: 'tshirt', category: 'T-shirt officiel', name: 'Décor — Mur vivant', price: 12000,
    badge: 'Nouveau', art: 'art-wall', image: 'assets/tshirt-design-02.jpg', description: 'Une collection de masques graphiques issus de l’univers du film, imprimés sur coton noir unisexe.',
    models: ['Masque rouge', 'Masque orange'], colors: ['Noir'], sizes: ['S', 'M', 'L', 'XL', 'XXL']
  },
  {
    id: 'tee-exclusive', type: 'tshirt', category: 'T-shirt officiel', name: 'Exclusif — La rue répond', price: 12000,
    badge: 'Édition limitée', art: 'art-exclusive', image: 'assets/tshirt-design-03.jpg', description: 'Les personnages du film prennent place sur un t-shirt noir en édition limitée, pensé pour porter l’histoire dans la rue.',
    models: ['Personnage orange', 'Personnage au chapeau'], colors: ['Noir'], sizes: ['S', 'M', 'L', 'XL', 'XXL']
  },
  {
    id: 'tote-kodjo', type: 'tote', category: 'Tote bag collector', name: 'Tote — Logo officiel', price: 5500,
    badge: 'Collector', art: 'art-tote', image: 'assets/tote-logo.jpg', description: 'Un tote bag écru collector avec le logo officiel L’ART OU LA RUE, photographié dans son univers de rue.',
    models: ['Logo officiel'], colors: ['Écru'], sizes: []
  },
  {
    id: 'tote-masque', type: 'tote', category: 'Tote bag collector', name: 'Tote — Masque', price: 5500,
    badge: 'Collector', art: 'art-tote', image: 'assets/tote-masque.jpg', description: 'Un tote bag écru collector orné d’un masque graphique issu de l’univers du film.',
    models: ['Masque'], colors: ['Écru'], sizes: []
  },
  {
    id: 'tote-rouge', type: 'tote', category: 'Tote bag collector', name: 'Tote — Personnage rouge', price: 5500,
    badge: 'Collector', art: 'art-tote', image: 'assets/tote-rouge.jpg', description: 'Un tote bag écru collector avec le personnage rouge du film.',
    models: ['Personnage rouge'], colors: ['Écru'], sizes: []
  },
  {
    id: 'tote-kodjo-portrait', type: 'tote', category: 'Tote bag collector', name: 'Tote — Kodjo', price: 5500,
    badge: 'Collector', art: 'art-tote', image: 'assets/tote-kodjo.jpg', description: 'Un tote bag écru collector avec le portrait de Kodjo.',
    models: ['Kodjo'], colors: ['Écru'], sizes: []
  },
  {
    id: 'sticker-characters', type: 'sticker', category: 'Planche A5', name: 'Stickers — Personnages', price: 1500,
    badge: 'A5 · prédécoupés', art: 'art-stickers', image: 'assets/stickers-masques.jpg', description: 'Une planche A5 de masques et de personnages du film, prédécoupée et prête à coller.',
    models: ['Masques'], colors: [], sizes: []
  },
  {
    id: 'sticker-street', type: 'sticker', category: 'Planche A5', name: 'Stickers — Signes de rue', price: 1500,
    badge: 'A5 · prédécoupés', art: 'art-street-stickers', image: 'assets/stickers-orange.jpg', description: 'Une planche A5 aux couleurs orange et rouge, dédiée aux silhouettes fortes de l’univers L’ART OU LA RUE.',
    models: ['Orange et rouge'], colors: [], sizes: []
  },
  {
    id: 'sticker-casting', type: 'sticker', category: 'Planche A5', name: 'Stickers — Le casting', price: 1500,
    badge: 'A5 · prédécoupés', art: 'art-stickers', image: 'assets/stickers-casting.jpg', description: 'Une planche A5 consacrée aux personnages et aux figures du film, à emporter partout.',
    models: ['Le casting'], colors: [], sizes: []
  },
  {
    id: 'poster-officiel', type: 'poster', category: 'Poster officiel', name: 'Poster — Cover du film', price: 3000,
    badge: 'Cover officielle', art: 'art-poster', image: 'assets/cover-film.jpg', description: 'La cover officielle du court-métrage d’animation, imprimée comme poster pour prolonger le film sur vos murs.',
    models: ['Poster officiel'], colors: [], sizes: []
  },
  {
    id: 'tableau-encadre', type: 'tableau', category: 'Tableau encadré', name: 'Tableau — Cover du film', price: 25000,
    badge: 'Mockup encadré', art: 'art-tableau', image: 'assets/tableau-cover-mockup.jpg', description: 'La cover officielle du film présentée en mockup de tableau encadré, comme une pièce collector à exposer.',
    models: ['Cover encadrée'], colors: [], sizes: []
  }
];

window.TEAM = [
  ['Roddy AGBO', 'Production · animation · clean · compositing · montage', 'male'], ['Bassam BACHABI', 'Base 3D · animation · compositing', 'male'], ['Raphael CAKPO HESSOU', 'Direction artistique · chara-design · animation', 'male'], ['Pamela CHABLIS', 'Background artist', 'female'], ['Nawal MAKOU', 'Background artist · clean', 'female'], ['Bodéric MIGAN', 'Animation · clean', 'male']
];

window.VOICES = [
  ['Roddy AGBO', 'Kodjo', 'male', 'assets/voice-roddy.jpg'], ['Bel-Amour WEWE', 'Kora', 'male', 'assets/voice-bel-amour.jpg'], ['Ifè ALLASSADE', 'Kamal', 'female', 'assets/voice-ife.jpg'], ['Solenne GBEDO', 'Akila', 'female', 'assets/voice-solenne.jpg'], ['Laurence ASSION', 'Tanyi', 'female', 'assets/voice-laurence.jpg'], ['Djamille MAMA GAO', 'Virgile', 'male', 'assets/voice-djamille.jpg']
];

/* Remplacer ces valeurs avant la mise en production. Les champs vides activent un mode démo explicite. */
window.STORE_CONFIG = {
  googleAppsScriptUrl: '',
  fedapayUrl: '',
  mobileMoney: {
    mtnUssdTemplate: '', // Exemple de forme : *880*1*NUMERO*{amount}# selon votre opérateur.
    moovUssdTemplate: ''
  },
  whatsappNumber: '33759472122',
  currency: 'FCFA'
};
