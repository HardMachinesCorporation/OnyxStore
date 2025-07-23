# ✨ OnyxStore - Notification System

## 🔔 Global Notification System

A reusable, type-safe notification mechanism using Vue’s **provide/inject** pattern. It allows any component in your Nuxt 3 app to trigger transient notifications (toasts) with ease.

---

### 🎯 Features

- Supports `success`, `error`, and `warning` notifications
- Auto-dismiss after 5 seconds
- Fully typed with TypeScript
- Global availability via inject in any component
- Clean, composable logic using Vue Composition API

---

### ⚙️ Setup Overview

#### 1. **Type Definitions** (`types/notification.ts`)

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

#### 2. **Provider Setup** (`layouts/default.vue` or similar)

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
  <!-- Notification container (example) -->
  <div class="notification-container">
    <Notification v-for="n in notifications" :key="n.id" :data="n" />
  </div>
  <NuxtLayout />
</template>
```

---

#### 3. **Inject & Use** (`pages/login.vue`, etc.)

```vue
<script setup lang="ts">
import { inject } from 'vue'

import type { AddNotificationFn } from '~/types/notification'

const addNotification = inject<AddNotificationFn>('addNotification')
if (!addNotification)
  throw new Error('addNotification is not provided!')

function onLoginSuccess() {
  addNotification('Logged in successfully!', 'success')
}

function onLoginError() {
  addNotification('Login failed. Check credentials and try again.', 'error')
}
</script>
```

---

### 🛠️ Why This Approach

| Benefit               | Description                                                                                                      |
| --------------------- | ---------------------------------------------------------------------------------------------------------------- |
| **Decoupled**         | No prop drilling or event buses                                                                                  |
| **Reusable**          | Works across any layout or page via inject                                                                       |
| **Type-Safe**         | Strong typing ensures correct usage                                                                              |
| **Global Control**    | Centralized notification list and timeout logic                                                                  |
| **Scalable**          | Easy to extend (e.g., configurable timeout)                                                                      |
| **Vue Best Practice** | Follows official `provide/inject` guidance ([github.com][1], [vuejs.org][2], [scribbr.com][3], [codemag.com][4]) |

---

### ✅ Guaranteed Availability: inject + runtime check

```ts
<script setup lang="ts">
import type { AddNotificationFn } from '~/types/notification'
import { inject } from 'vue'

// 🔍 Attempt to inject
const addNotification = inject<AddNotificationFn>('addNotification')

// ⚠️ If missing, crash early with clear error
if (!addNotification) {
  throw new Error(
    '⚠ addNotification provider is missing: ensure <Layout> uses provide("addNotification", ...)'
  )
}

// ✅ Use it safely
addNotification('Welcome back!', 'success')
</script>
```

---

### 🧩 Why this pattern is professional

| Benefit              | Description                                                               |
| -------------------- | ------------------------------------------------------------------------- |
| **Type-safe**        | `inject<AddNotificationFn>` tells TypeScript exactly what to expect       |
| **Fail-fast**        | Throws an error early if `provide` is missing, avoiding silent bugs       |
| **Clear message**    | The error explains exactly what’s wrong and how to fix it                 |
| **Self-documenting** | Anyone reading the code knows `addNotification` must be provided upstream |

---

### 🧠 Best Practices

- Use this guard in every component that relies on injections for **resilience**.
- The error clearly identifies the missing provider and suggests fixing it by wrapping with the correct **Layout**.
- For production environments, you might log a warning instead of throwing, depending on UX needs.

---

### 📌 Example in context (login.vue)

```ts
const addNotification = inject<AddNotificationFn>('addNotification')
if (!addNotification) {
  throw new Error('something went wrong, Notifications are not available')
}

// Use it like so:
async function handleSubmit() {
  try {
    // ...login logic
    addNotification('Successfully logged in!', 'success')
  }
  catch (e) {
    addNotification('Login failed. Please try again.', 'error')
  }
}
```

---

### 🤓 Tips for Maintainers

- **Clear typing**: `AddNotificationFn` guarantees consistent API usage
- **Safe-injection**: explicit error thrown if provider is missing
- **Composable pattern**: encapsulated in layout, easily shared
- **Clean code**: no boilerplate in every component—just call `addNotification(...)`

---

### 🚀 Next Steps (Optional)

1. **Expose notifications**: Create a `<Notifications />` component to render the list
2. **Enhance UX**: Add animations, icons, or manual dismissal buttons
3. **Extend API**: Add options like `duration`, `title`, or action callbacks

---

**Summary:**
A lean, robust, and professional notification system using Vue’s modern tooling. Ideal for polished, reusable UX and clear developer experience.

📘 Feel free to copy this to your GitBook under **“🔔 Notification System”** for perfect documentation.

[1]: https://github.com/vue-styleguidist/vue-styleguidist/issues/1164?utm_source=chatgpt.com 'Add documentation support for component provide/inject · Issue #1164'
[2]: https://vuejs.org/guide/components/provide-inject?utm_source=chatgpt.com 'Provide / Inject | Vue.js'
[3]: https://www.scribbr.com/citing-sources/citation-styles/?utm_source=chatgpt.com 'Citation Styles Guide | Examples for All Major Styles - Scribbr'
[4]: https://www.codemag.com/Article/2101091/The-Complete-Guide-to-Provide-Inject-API-in-Vue-3-Part-1?utm_source=chatgpt.com 'The Complete Guide to Provide/Inject API in Vue 3: Part 1'
