export default {
  app: {
    title: 'Имулатсия — Киоск'
  },
  common: {
    loading: 'Загрузка...',
    active: 'Активно',
    order: 'Порядок',
    delete: 'Удалить',
    uploadProgress: 'Загрузка {percent}%',
    seconds: 'Секунд',
    bgColor: 'Цвет фона',
    preview: 'Превью',
    language: 'Язык'
  },
  lang: {
    uz: "O'zbek",
    ru: 'Русский',
    en: 'English'
  },
  home: {
    subtitle: 'Система управления экранами остановки',
    adminTitle: 'Админка',
    adminDesc: 'Управление приложениями и рекламой',
    appsTitle: 'Большой экран',
    appsDesc: 'Список приложений киоска',
    infoTitle: 'Экран 32"',
    infoDesc: 'График автобусов + реклама'
  },
  admin: {
    title: 'Админ-панель',
    backHome: '← На главную',
    publishing: 'Публикация...',
    publish: '🚀 Опубликовать на экраны',
    appsSection: 'Приложения киоска',
    adsSection: 'Рекламные баннеры',
    add: 'Добавить',
    noApps: 'Нет приложений. Добавьте хотя бы одно.',
    noAds: 'Нет рекламы. Добавьте баннеры для ротации.',
    newApp: 'Новое приложение',
    newAd: 'Новая реклама',
    adMissingMedia: 'У баннера «{title}» нет файла или ссылки. Сначала загрузите медиа.',
    publishSuccess: 'Конфигурация опубликована! Экраны обновятся автоматически.',
    appNamePlaceholder: 'Название приложения',
    linkOpenUrl: 'Открыть ссылку',
    linkTriggerGet: 'GET-запрос (устройство)',
    uploadIcon: 'Загрузить иконку',
    iconPath: 'Иконка: {path}',
    adTitlePlaceholder: 'Текст рекламы',
    mediaPhoto: 'Фото',
    mediaVideo: 'Видео',
    selectFile: 'Выбрать файл',
    mediaUrlPlaceholder: 'Ссылка (YouTube) или путь появится после загрузки',
    fileUploaded: 'Файл загружен: {name}',
    uploadFileFailed: 'Не удалось загрузить файл',
    iconUploaded: 'Иконка загружена',
    iconUploadFailed: 'Не удалось загрузить иконку'
  },
  display: {
    kioskTitle: 'Информационный киоск',
    screenLarge: 'Экран: Большой киоск',
    screenInfo: 'Экран: 32" — Автобусы + Реклама',
    noApps: 'Нет приложений. Настройте в админке.',
    sosAria: 'SOS — экстренный вызов',
    busSchedule: 'Расписание автобусов',
    busSubtitle: 'Данные обновляются в реальном времени (симуляция)'
  },
  bus: {
    now: 'Сейчас',
    next: 'Следующая',
    minutes: 'мин',
    statusAtStop: 'На остановке',
    statusApproaching: 'Подъезжает'
  },
  ad: {
    noActive: 'Нет активной рекламы',
    noVideo: 'Видео не добавлено. Загрузите файл или укажите ссылку в админке.',
    playbackError: 'Видео не воспроизводится в браузере. Попробуйте mp4/webm или другую ссылку.',
    videoTitle: 'Рекламное видео'
  },
  errors: {
    network: 'Ошибка сети',
    upload: 'Ошибка загрузки файла',
    execution: 'Ошибка выполнения',
    sosFailed: 'Не удалось отправить SOS',
    linkNotSet: 'Ссылка не задана',
    serverError: 'Ошибка сервера: {status}'
  },
  api: {
    commandSent: 'Команда отправлена',
    waterCoolerSent: 'Команда отправлена на кулер',
    sosSent: 'SOS сигнал отправлен'
  }
}
