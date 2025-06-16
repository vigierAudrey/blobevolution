Objectif du projet:

BlobInfini vise à devenir la référence incontournable pour les passionnés de surf et de kitesurf, en facilitant la mise en relation entre particuliers et professionnels (riders, écoles, clubs, coachs). Grâce à une architecture micro‑services et à l’IA, l’application offrira :

Authentification & rôles : gestion des comptes particuliers, pros et admins

Matching & géolocalisation : OpenStreetMap pour que les pros et les particuliers visualisent les demandes en temps réel. 

Messagerie & notifications : échanges pro‑particuliers, alertes temps réel

Paiement & facturation : intégration Stripe + génération PDF/QR code + factures

Blobosphère : fil d’actualités, contenus informatifs, viralité sociale

Extensibilité IA : chatbot, recommandations, modération automatisée

Structure du dépôt:

/ (racine)
├─ .github/                   # workflows CI/CD (GitHub Actions)
│   └─ ci-cd.yaml
├─ apps/
│   ├─ frontend/              # front Next.js + TypeScript + Tailwind
│   │   ├─ Dockerfile
│   │   ├─ tsconfig.json
│   │   ├─ public/
│   │   └─ src/
│   ├─ gateway/               # API gateway (Træfik, routage)
│   └─ services/              # micro‑services backend
│       ├─ auth-service/      # Auth (Express, Prisma, JWT)
│       ├─ billing-service/   # Facturation, PDF & QR code
│       ├─ booking-service/   # Réservation de cours/spots
│       ├─ cms-service/       # Gestion de contenu & Blobosphère
│       ├─ location-service/  # Géolocalisation & OpenStreetMap
│       ├─ messaging-service/ # Chat & messagerie interne
│       ├─ notification-service/# Push & e‑mail notifications
│       ├─ payment-service/   # Stripe & gestion paiements
│       ├─ profile-service/   # Profils utilisateurs & pros
│       ├─ search-service/    # Moteur de recherche multicritères
│       └─ user-service/      # Gestion utilisateurs, rôles
├─ infrastructure/            # Traefik, volumes, réseaux, secrets
├─ docker-compose.yml         # orchestration locale (dev/prod)
└─ README.md                  # ce document


Technologies & librairies Open Source

Backend : Node.js 18 (LTS), Express, PostgreSQL, Prisma ORM

Frontend : Next.js 14+, React 19, TypeScript, Tailwind CSS, shadcn/ui

Micro‑services : architecture tierce, Docker multi‑stage, Docker Compose

CI/CD : GitHub Actions, Docker Build & Push, tests automatisés

Base de données : PostgreSQL 15, migrations Prisma

API externes : Stripe (paiement), OpenStreetMap (géoloc), n8n (automatisation optionnelle)

Enrichissements IA : intégration future d’OpenAI GPT pour chatbot et contenu

Démarrage local

Cloner le dépôt :

git clone git@github.com:ton-org/blobinfini.git
cd blobinfini

Copier et adapter les .env (racine + services) :

cp .env.example .env
for svc in apps/services/*; do cp "$svc/.env.example" "$svc/.env"; done

Lancer Docker Compose :

docker compose up --build -d

Tester les services :

Frontend : http://localhost:3000

Auth : http://localhost:4001/auth/ping

Gateway : http://localhost:80 (ou 8080)

⚙️ CI / CD

Triggers : push / pull_request sur la branche main

Jobs : build & test TS pour chaque service, build & push images Docker

Secrets & variables : définis dans Settings → Secrets & variables (Docker Hub creds, IMAGE_TAG, SERVICES...)

Contribuer

Fork 🚀  2. Branche dev 🔀  3. PR vers main  📝  4. Revue & merge 👍

Licence

MIT © 2025 BlobInfini

