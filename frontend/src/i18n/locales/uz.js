export default {
  app: {
    title: 'Imulatsiya — Kiosk'
  },
  common: {
    loading: 'Yuklanmoqda...',
    active: 'Faol',
    order: 'Tartib',
    delete: "O'chirish",
    uploadProgress: 'Yuklash {percent}%',
    seconds: 'Soniya',
    bgColor: 'Fon rangi',
    preview: 'Ko‘rib chiqish',
    language: 'Til'
  },
  lang: {
    uz: "O'zbek",
    ru: 'Русский',
    en: 'English'
  },
  home: {
    subtitle: "To'xtash joyi ekranlarini boshqarish tizimi",
    adminTitle: 'Admin panel',
    adminDesc: "Ilovalar va reklamani boshqarish",
    appsTitle: 'Katta ekran',
    appsDesc: "Kiosk ilovalari ro'yxati",
    infoTitle: '32" ekran',
    infoDesc: "Avtobus jadvali + reklama"
  },
  admin: {
    title: 'Admin panel',
    backHome: '← Bosh sahifa',
    publishing: 'Nashr qilinmoqda...',
    publish: "🚀 Ekranlarga nashr qilish",
    appsSection: 'Kiosk ilovalari',
    adsSection: 'Reklama bannerlari',
    add: "Qo'shish",
    noApps: "Ilovalar yo'q. Kamida bittasini qo'shing.",
    noAds: "Reklama yo'q. Rotatsiya uchun bannerlar qo'shing.",
    newApp: 'Yangi ilova',
    newAd: 'Yangi reklama',
    adMissingMedia: '«{title}» bannerida fayl yoki havola yo‘q. Avval media yuklang.',
    publishSuccess: 'Konfiguratsiya nashr qilindi! Ekranlar avtomatik yangilanadi.',
    appNamePlaceholder: 'Ilova nomi',
    linkOpenUrl: 'Havolani ochish',
    linkTriggerGet: 'GET-so‘rov (qurilma)',
    uploadIcon: 'Ikonka yuklash',
    iconPath: 'Ikonka: {path}',
    adTitlePlaceholder: 'Reklama matni',
    mediaPhoto: 'Foto',
    mediaVideo: 'Video',
    selectFile: 'Fayl tanlash',
    mediaUrlPlaceholder: 'Havola (YouTube) yoki yuklashdan keyin yo‘l paydo bo‘ladi',
    fileUploaded: 'Fayl yuklandi: {name}',
    uploadFileFailed: 'Faylni yuklab bo‘lmadi',
    iconUploaded: 'Ikonka yuklandi',
    iconUploadFailed: 'Ikonkani yuklab bo‘lmadi'
  },
  display: {
    kioskTitle: "Ma'lumot kioski",
    screenLarge: 'Ekran: Katta kiosk',
    screenInfo: 'Ekran: 32" — Avtobuslar + Reklama',
    noApps: "Ilovalar yo'q. Admin panelda sozlang.",
    sosAria: 'SOS — favqulodda chaqiruv',
    busSchedule: 'Avtobus jadvali',
    busSubtitle: "Ma'lumotlar real vaqtda yangilanadi (simulyatsiya)"
  },
  bus: {
    now: 'Hozir',
    next: 'Keyingi',
    minutes: 'daq',
    statusAtStop: "Bekatda",
    statusApproaching: 'Yaqinlashmoqda'
  },
  ad: {
    noActive: 'Faol reklama yo‘q',
    noVideo: 'Video qo‘shilmagan. Admin panelda fayl yuklang yoki havola kiriting.',
    playbackError: 'Video brauzerda ijro etilmaydi. mp4/webm yoki boshqa havolani sinab ko‘ring.',
    videoTitle: 'Reklama videosi'
  },
  errors: {
    network: 'Tarmoq xatosi',
    upload: 'Fayl yuklash xatosi',
    execution: 'Bajarish xatosi',
    sosFailed: 'SOS yuborib bo‘lmadi',
    linkNotSet: 'Havola belgilanmagan',
    serverError: 'Server xatosi: {status}'
  },
  api: {
    commandSent: 'Buyruq yuborildi',
    waterCoolerSent: 'Kuler buyrug‘i yuborildi',
    sosSent: 'SOS signal yuborildi'
  }
}
