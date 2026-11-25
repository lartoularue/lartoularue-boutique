# L’ART OU LA RUE — boutique officielle

Site statique en HTML, CSS et JavaScript pur pour les précommandes du merch du court-métrage d’animation **L’ART OU LA RUE**. Il ne dépend d’aucun framework et peut être publié directement sur GitHub Pages.

## Lancer en local

```bash
python3 -m http.server 3000
```

Puis ouvrir `http://localhost:3000`.

## Avant la mise en ligne

Modifier uniquement `data/products.js` pour :

- remplacer `VIDEO_ID_A_REMPLACER` dans `index.html` par l’identifiant YouTube officiel ;
- renseigner `googleAppsScriptUrl` avec l’URL de déploiement du Google Apps Script ;
- renseigner `fedapayUrl` et/ou les templates `mtnUssdTemplate` / `moovUssdTemplate` ;
- renseigner le vrai `whatsappNumber` au format international, sans `+` ni espaces ;
- adapter les noms des cinq comédien·nes voix off encore génériques si l’équipe souhaite les afficher.

Le suivi Google Sheets est envoyé en JSON avec `type: "preorder"` ou `type: "support"`. Le navigateur utilise `no-cors` pour permettre à un endpoint Apps Script public de recevoir la requête sans bloquer l’expérience.

## Structure

- `index.html` : structure des sections, modale produit et panier.
- `styles.css` : direction artistique, motifs produit générés en CSS et responsive.
- `app.js` : filtres, quantités, panier local, paiement, WhatsApp et suivi.
- `data/products.js` : catalogue, équipe, voix off et paramètres à personnaliser.
- `public/manus-routes.json` : route statique déclarée pour l’environnement Manus.
