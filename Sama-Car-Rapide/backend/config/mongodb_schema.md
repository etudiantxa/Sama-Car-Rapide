# Sama Car Rapide - MongoDB Schema and Indexes

This document outlines the collections, document structures, and recommended indexes for the MongoDB database based on the provided entity analysis.

**Database Name:** `samacarrapide`

## Collections and Document Structures

### 1. `utilisateurs` (Corresponds to Entité Utilisateur)
```json
{
  "_id": "ObjectId",
  "telephone": "String (UNIQUE, Indexed)", // Primary identifier
  "nom": "String",
  "email": "String (UNIQUE, Optional)",
  "photo_profil": "String (URL)",
  "date_naissance": "Date",
  "sexe": "String ('M', 'F')", // Enum
  "adresse": "String",
  "ville_residence": "String",
  "langue_preferee": "String ('fr', 'wo', 'en', DEFAULT 'fr')", // Enum
  "statut_verification": "String ('non_verifie', 'en_cours', 'verifie', DEFAULT 'non_verifie')", // Enum
  "type_compte": "String ('passager', 'chauffeur', 'proprietaire', 'admin')", // Enum
  "solde_portefeuille": "Decimal (DEFAULT 0.00)",
  "actif": "Boolean (DEFAULT true)",
  "hashed_password": "String", // For storing bcrypt hashed password
  "createdAt": "Timestamp",
  "updatedAt": "Timestamp"
}
```
**Indexes:**
*   `{ telephone: 1 }, { unique: true }`
*   `{ email: 1 }, { unique: true, sparse: true }` (sparse for optional unique)

### 2. `contacts_urgence` (Corresponds to Entité ContactUrgence)
```json
{
  "_id": "ObjectId",
  "utilisateur_id": "ObjectId (ref: utilisateurs)", // FK
  "nom": "String",
  "telephone": "String",
  "relation": "String",
  "principal": "Boolean (DEFAULT false)",
  "actif": "Boolean (DEFAULT true)",
  "createdAt": "Timestamp"
  // No updatedAt in original spec
}
```
**Indexes:**
*   `{ utilisateur_id: 1 }`

### 3. `vehicules` (Corresponds to Entité Vehicule)
```json
{
  "_id": "ObjectId",
  "numero_immatriculation": "String (UNIQUE, Indexed)",
  "proprietaire_id": "ObjectId (ref: utilisateurs)", // FK
  "chauffeur_principal_id": "ObjectId (ref: utilisateurs, Optional)", // FK
  "marque": "String",
  "modele": "String",
  "couleur": "String",
  "nombre_places": "Integer",
  "numero_carte_grise": "String (UNIQUE)",
  "numero_assurance": "String",
  "date_expiration_assurance": "Date",
  "numero_visite_technique": "String (Optional)",
  "date_visite_technique": "Date (Optional)",
  "statut": "String ('actif', 'maintenance', 'suspendu', 'retire', DEFAULT 'actif')", // Enum
  "tarif_base": "Decimal",
  "photo_vehicule": "String (URL)",
  "equipements": "Object", // JSON in SQL, Object in MongoDB e.g. { climatisation: true, wifi: false }
  "createdAt": "Timestamp",
  "updatedAt": "Timestamp"
}
```
**Indexes:**
*   `{ numero_immatriculation: 1 }, { unique: true }`
*   `{ numero_carte_grise: 1 }, { unique: true, sparse: true }`
*   `{ proprietaire_id: 1 }`
*   `{ chauffeur_principal_id: 1 }`

### 4. `lignes` (Corresponds to Entité Ligne)
```json
{
  "_id": "ObjectId",
  "code_ligne": "String (UNIQUE)",
  "ville_depart": "String",
  "ville_arrivee": "String",
  "gare_depart_id": "ObjectId (ref: gares_routiere, Optional)", // FK
  "gare_arrivee_id": "ObjectId (ref: gares_routiere, Optional)", // FK
  "distance_km": "Decimal",
  "duree_estimee_min": "Integer", // Renamed from duree_estimee for clarity
  "tarif_reference": "Decimal",
  "actif": "Boolean (DEFAULT true)",
  "createdAt": "Timestamp"
  // No updatedAt in original spec
}
```
**Indexes:**
*   `{ code_ligne: 1 }, { unique: true }`
*   `{ ville_depart: 1, ville_arrivee: 1 }`

### 5. `gares_routiere` (Corresponds to Entité GareRoutiere)
```json
{
  "_id": "ObjectId",
  "nom": "String",
  "code_gare": "String (UNIQUE)",
  "ville": "String",
  "adresse": "String",
  "localisation": { // GeoJSON for geospatial queries
    "type": "Point",
    "coordinates": ["Decimal (longitude)", "Decimal (latitude)"]
  },
  "gestionnaire_id": "ObjectId (ref: utilisateurs, Optional)", // FK to an admin/manager user type
  "telephone": "String (Optional)",
  "horaires_ouverture": "Object", // e.g. { "lundi": "08:00-18:00", ... }
  "services": "Array<String>", // e.g. ["toilette", "boutique"]
  "actif": "Boolean (DEFAULT true)",
  "createdAt": "Timestamp"
  // No updatedAt in original spec
}
```
**Indexes:**
*   `{ code_gare: 1 }, { unique: true }`
*   `{ ville: 1 }`
*   `{ "localisation": "2dsphere" }` (for geospatial queries)

### 6. `voyages` (Corresponds to Entité Voyage)
```json
{
  "_id": "ObjectId",
  "code_voyage": "String (UNIQUE)",
  "vehicule_id": "ObjectId (ref: vehicules)", // FK
  "chauffeur_id": "ObjectId (ref: utilisateurs)", // FK
  "ligne_id": "ObjectId (ref: lignes)", // FK
  "date_voyage": "Date",
  "heure_depart_prevue": "String", // Store as HH:MM string or combine with date_voyage into a full ISODate
  "heure_arrivee_prevue": "String", // Store as HH:MM string or combine with date_voyage into a full ISODate
  "heure_depart_reelle": "Timestamp (Optional)",
  "heure_arrivee_reelle": "Timestamp (Optional)",
  "tarif_voyage": "Decimal",
  "places_disponibles_initial": "Integer", // Original number of places for this trip
  "places_reservees": "Integer (DEFAULT 0)", // Counter for reserved places
  "statut": "String ('programme', 'en_cours', 'termine', 'annule', DEFAULT 'programme')", // Enum
  "qr_code_voyage": "String (URL or data for QR, UNIQUE)",
  "motif_annulation": "String (Optional)",
  "createdAt": "Timestamp",
  "updatedAt": "Timestamp"
}
```
**Indexes:**
*   `{ code_voyage: 1 }, { unique: true }`
*   `{ date_voyage: 1, statut: 1 }` (Recommended)
*   `{ vehicule_id: 1, date_voyage: 1 }`
*   `{ chauffeur_id: 1, date_voyage: 1 }`
*   `{ ligne_id: 1, date_voyage: 1 }`

### 7. `reservations` (Corresponds to Entité Reservation)
```json
{
  "_id": "ObjectId",
  "code_reservation": "String (UNIQUE)",
  "utilisateur_id": "ObjectId (ref: utilisateurs)", // Passager
  "voyage_id": "ObjectId (ref: voyages)",
  "nombre_places": "Integer",
  "tarif_total": "Decimal",
  "qr_code_reservation": "String (URL or data for QR, UNIQUE)",
  "statut_paiement": "String ('en_attente', 'paye', 'rembourse', DEFAULT 'en_attente')", // Enum
  "statut_reservation": "String ('confirmee', 'embarquee', 'annulee', DEFAULT 'confirmee')", // Enum
  "date_reservation": "Timestamp",
  "date_embarquement": "Timestamp (Optional)",
  "place_assignee": "String (Optional)",
  "commentaires": "String (Optional)",
  "createdAt": "Timestamp",
  "updatedAt": "Timestamp"
}
```
**Indexes:**
*   `{ code_reservation: 1 }, { unique: true }`
*   `{ qr_code_reservation: 1 }, { unique: true }`
*   `{ utilisateur_id: 1, statut_reservation: 1 }` (Recommended)
*   `{ voyage_id: 1 }`

### 8. `paiements` (Corresponds to Entité Paiement)
```json
{
  "_id": "ObjectId",
  "code_transaction": "String (UNIQUE)",
  "reservation_id": "ObjectId (ref: reservations)",
  "utilisateur_id": "ObjectId (ref: utilisateurs)",
  "montant": "Decimal",
  "methode_paiement": "String ('wave', 'orange_money', 'visa', 'mastercard', 'especes')", // Enum
  "reference_externe": "String (Optional)",
  "statut": "String ('en_cours', 'reussi', 'echec', 'rembourse', DEFAULT 'en_cours')", // Enum
  "date_paiement": "Timestamp",
  "date_confirmation": "Timestamp (Optional)",
  "frais_transaction": "Decimal (DEFAULT 0.00)",
  "details_erreur": "String (Optional)",
  "createdAt": "Timestamp"
  // No updatedAt in original spec
}
```
**Indexes:**
*   `{ code_transaction: 1 }, { unique: true }`
*   `{ reservation_id: 1, statut: 1 }` (Recommended)
*   `{ utilisateur_id: 1 }`

### 9. `notifications` (Corresponds to Entité Notification)
```json
{
  "_id": "ObjectId",
  "destinataire_id": "ObjectId (ref: utilisateurs)",
  "reservation_id": "ObjectId (ref: reservations, Optional)",
  "voyage_id": "ObjectId (ref: voyages, Optional)",
  "type": "String ('reservation', 'paiement', 'depart', 'arrivee', 'urgence')", // Enum
  "titre": "String",
  "message": "String",
  "canal": "String ('app', 'sms', 'email', 'push', DEFAULT 'app')", // Enum
  "lu": "Boolean (DEFAULT false)",
  "envoye": "Boolean (DEFAULT false)",
  "date_programmee": "Timestamp (Optional)",
  "date_envoi": "Timestamp (Optional)",
  "date_lecture": "Timestamp (Optional)",
  "createdAt": "Timestamp"
  // No updatedAt in original spec
}
```
**Indexes:**
*   `{ destinataire_id: 1, lu: 1, date_envoi: -1 }` (Recommended, date_envoi might be better as createdAt or date_programmee depending on query patterns)
*   `{ type: 1, envoye: 1, date_programmee: 1 }` (For sending pending notifications)

### 10. `suivi_localisations` (Corresponds to Entité SuiviLocalisation)
```json
{
  "_id": "ObjectId",
  "voyage_id": "ObjectId (ref: voyages)",
  "localisation": { // GeoJSON
    "type": "Point",
    "coordinates": ["Decimal (longitude)", "Decimal (latitude)"]
  },
  "vitesse_kmh": "Decimal (Optional)", // Renamed
  "direction_deg": "Decimal (Optional)", // Renamed
  "precision_m": "Decimal (Optional)", // Renamed
  "timestamp_position": "Timestamp", // Renamed from 'timestamp' to avoid confusion
  "createdAt": "Timestamp" // Record creation time, separate from position time
}
```
**Indexes:**
*   `{ voyage_id: 1, timestamp_position: -1 }` (Recommended for fetching latest positions for a voyage)
*   `{ voyage_id: 1, "localisation": "2dsphere" }` (If querying locations within a voyage spatially)

### 11. `avis` (Corresponds to Entité Avis)
```json
{
  "_id": "ObjectId",
  "utilisateur_id": "ObjectId (ref: utilisateurs)",
  "voyage_id": "ObjectId (ref: voyages)",
  "chauffeur_id": "ObjectId (ref: utilisateurs, Optional)", // Could be derived from voyage
  "vehicule_id": "ObjectId (ref: vehicules, Optional)", // Could be derived from voyage
  "note_globale": "Integer (1-5)",
  "note_ponctualite": "Integer (1-5, Optional)",
  "note_confort": "Integer (1-5, Optional)",
  "note_securite": "Integer (1-5, Optional)",
  "commentaire": "String (Optional)",
  "recommande": "Boolean (Optional)",
  "date_avis": "Timestamp",
  "createdAt": "Timestamp"
  // No updatedAt in original spec
}
```
**Indexes:**
*   `{ voyage_id: 1, utilisateur_id: 1 }, { unique: true }` (Assuming one review per user per voyage)
*   `{ chauffeur_id: 1 }`
*   `{ vehicule_id: 1 }`

## General Notes on Indexes for MongoDB
*   Indexes improve query performance but have a write overhead.
*   The `_id` field is automatically indexed.
*   Compound indexes should be created based on common query patterns. Order of fields in compound indexes matters.
*   Unique indexes enforce data integrity. `sparse: true` can be used for optional fields that must be unique when present.
*   TTL (Time-To-Live) indexes can be considered for data that expires (e.g., old location pings if not needed long-term, though not explicitly requested here).
*   Geospatial indexes (`2dsphere`) are needed for location-based queries.

This schema documentation will guide the backend model implementation (even without an ORM like Mongoose for now) and data validation logic. The actual creation of these indexes would typically happen via the MongoDB driver when the application starts, or by running scripts directly against the database.
```
