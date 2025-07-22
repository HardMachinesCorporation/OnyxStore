<template>
  <div>
    <AppHeader />

    <main>
      <slot />
    </main>

    <!-- Global Loading Overlay -->
    <div>
      <div>
        <p>Loading in progress...</p>
      </div>
    </div>

    <!-- Toast Notifications -->
  </div>
</template>
