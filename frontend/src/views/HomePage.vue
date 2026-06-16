<template>
  <div class="home-page">
    <h1 class="home-page__title">Имулатсия — Киоск</h1>
    <p class="home-page__subtitle">Система управления экранами остановки</p>

    <div class="home-page__grid">
      <router-link to="/admin" class="home-page__card">
        <div class="home-page__card-icon">⚙️</div>
        <div class="home-page__card-title">Админка</div>
        <div class="home-page__card-desc">Управление приложениями и рекламой</div>
      </router-link>

      <router-link to="/display/apps" class="home-page__card" target="_blank">
        <div class="home-page__card-icon">🖥️</div>
        <div class="home-page__card-title">Большой экран</div>
        <div class="home-page__card-desc">Список приложений киоска</div>
      </router-link>

      <router-link to="/display/info" class="home-page__card" target="_blank">
        <div class="home-page__card-icon">📺</div>
        <div class="home-page__card-title">Экран 32"</div>
        <div class="home-page__card-desc">График автобусов + реклама</div>
      </router-link>
    </div>
  </div>
</template>

<style src="../styles/home-page.css"></style>
