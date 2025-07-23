Voici la version **en français**, professionnelle et prête à être intégrée dans GitBook :

---

# ✨ OnyxStore - Système de Notifications

## 🔔 Système de notifications global

Mécanisme de notifications **transitoires** (toast) typé et réutilisable, basé sur le système `provide/inject` de Vue. Il permet à n’importe quel composant de ton application Nuxt 3 de déclencher des notifications facilement.

---

### 🎯 Fonctionnalités

- Notifications de type `success`, `error` et `warning`
- Disparition automatique après 5 secondes
- 100 % typées avec TypeScript
- Disponibles globalement via `inject` dans n’importe quel composant
- Logique propre et modulaire, basée sur l’API Composition de Vue

---

### ⚙️ Aperçu de l’installation

#### 1. **Définition des types** (`types/notification.ts`)

```ts
export type NotificationType = 'success' | 'error' | 'warning'

export type INotification = {
  id: number
  message: string
  type: NotificationType
}

export type AddNotificationFn = (message: string, type?: NotificationType) => void
```

---

#### 2. **Fournisseur (Provider)** (`layouts/default.vue` ou équivalent)

```vue
<script setup lang="ts">
import { provide, ref } from 'vue'

import type { AddNotificationFn, INotification } from '~/types/notification'

const notifications = ref<INotification[]>([])

const addNotification: AddNotificationFn = (message, type = 'success') => {
  const id = Date.now()
  notifications.value.push({ id, message, type })
  setTimeout(() => {
    notifications.value = notifications.value.filter(n => n.id !== id)
  }, 5000)
}

provide<AddNotificationFn>('addNotification', addNotification)
</script>

<template>
  <!-- Exemple de container de notifications -->
  <div class="notification-container">
    <Notification v-for="n in notifications" :key="n.id" :data="n" />
  </div>
  <NuxtLayout />
</template>
```

---

#### 3. **Injection et utilisation** (`pages/login.vue`, etc.)

```vue
<script setup lang="ts">
import { inject } from 'vue'

import type { AddNotificationFn } from '~/types/notification'

const addNotification = inject<AddNotificationFn>('addNotification')
if (!addNotification)
  throw new Error('addNotification non fourni !')

function onLoginSuccess() {
  addNotification('Connexion réussie !', 'success')
}

function onLoginError() {
  addNotification('Impossible de se connecter. Vérifiez vos identifiants et réessayez.', 'error')
}
</script>
```

---

### 🛠️ Pourquoi ce pattern est professionnel

| Avantage               | Description                                                |
| ---------------------- | ---------------------------------------------------------- |
| **Découplé**           | Pas de props ou event bus à gérer                          |
| **Réutilisable**       | Fonctionne indépendamment dans tous les composants         |
| **Typé**               | TypeScript garantit une API cohérente                      |
| **Centralisé**         | Logique des notifications maintenue en un seul endroit     |
| **Extensible**         | Facile d’ajouter options (durée, boutons, etc.)            |
| **Bonne pratique Vue** | Utilise officiellement `provide/inject` pour la modularité |

---

### ✅ Vérification d’injection + Fail‑fast

```ts
const addNotification = inject<AddNotificationFn>('addNotification')
if (!addNotification) {
  throw new Error(
    '⚠ Pas de provider addNotification : assure-toi que le layout utilise provide("addNotification", …)'
  )
}

addNotification('Bienvenue !', 'success')
```

---

### 🧠 Pourquoi ce pattern est pro

- **Typé** : TypeScript sait exactement ce qu’il doit attendre
- **Fail‑fast** : échoue immédiatement si le provider est absent
- **Message clair** : indique comment corriger l’erreur
- **Self-documenting** : lecture immédiate pour tout développeur

---

### 📌 Exemple en contexte (`login.vue`)

```ts
const addNotification = inject<AddNotificationFn>('addNotification')
if (!addNotification) {
  throw new Error('Erreur : notifications non disponibles')
}

async function handleSubmit() {
  try {
    // logique de connexion...
    addNotification('Connecté avec succès !', 'success')
  }
  catch {
    addNotification('La connexion a échoué. Réessayez.', 'error')
  }
}
```

---

### 🤓 Bonnes pratiques

- Utilise ce pattern dans **tous les composants** qui dépendent de notifications
- Le message d’erreur aide à identifier le problème et la solution
- En production, tu peux remplacer le throw par un warning `console.warn()` si tu préfères

---

### 🚀 Étapes suivantes (optionnelles)

1. **Créer un composant `<Notifications />`** pour gérer l’affichage graphique
2. **Améliorer l’expérience** avec animations, icônes, possibilité de fermeture manuelle
3. **Étendre l’API** : ajouter paramètre `duration`, `title`, ou bouton d’action

---

**Résumé final :**
Système léger, robuste et professionnel de notifications pour Vue & Nuxt 3, parfait pour une expérience développeur fluide et un code maintenable.

✅ Tu peux maintenant copier/coller ce contenu dans ton GitBook pour documenter ton système de notifications de manière élégante.
