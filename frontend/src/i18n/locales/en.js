export default {
  app: {
    title: 'Imulatsiya — Kiosk'
  },
  common: {
    loading: 'Loading...',
    active: 'Active',
    order: 'Order',
    delete: 'Delete',
    uploadProgress: 'Uploading {percent}%',
    seconds: 'Seconds',
    bgColor: 'Background color',
    preview: 'Preview',
    language: 'Language'
  },
  lang: {
    uz: "O'zbek",
    ru: 'Русский',
    en: 'English'
  },
  home: {
    subtitle: 'Bus stop screen management system',
    adminTitle: 'Admin',
    adminDesc: 'Manage apps and advertising',
    appsTitle: 'Large screen',
    appsDesc: 'Kiosk app list',
    infoTitle: '32" screen',
    infoDesc: 'Bus schedule + ads'
  },
  admin: {
    title: 'Admin panel',
    backHome: '← Home',
    publishing: 'Publishing...',
    publish: '🚀 Publish to screens',
    appsSection: 'Kiosk apps',
    adsSection: 'Ad banners',
    add: 'Add',
    noApps: 'No apps. Add at least one.',
    noAds: 'No ads. Add banners for rotation.',
    newApp: 'New app',
    newAd: 'New ad',
    adMissingMedia: 'Banner «{title}» has no file or link. Upload media first.',
    publishSuccess: 'Configuration published! Screens will update automatically.',
    appNamePlaceholder: 'App name',
    linkOpenUrl: 'Open link',
    linkTriggerGet: 'GET request (device)',
    uploadIcon: 'Upload icon',
    iconPath: 'Icon: {path}',
    adTitlePlaceholder: 'Ad text',
    mediaPhoto: 'Photo',
    mediaVideo: 'Video',
    selectFile: 'Select file',
    mediaUrlPlaceholder: 'Link (YouTube) or path after upload',
    fileUploaded: 'File uploaded: {name}',
    uploadFileFailed: 'Failed to upload file',
    iconUploaded: 'Icon uploaded',
    iconUploadFailed: 'Failed to upload icon'
  },
  display: {
    kioskTitle: 'Information kiosk',
    screenLarge: 'Screen: Large kiosk',
    screenInfo: 'Screen: 32" — Buses + Ads',
    noApps: 'No apps. Configure in admin panel.',
    sosAria: 'SOS — emergency call',
    busSchedule: 'Bus schedule',
    busSubtitle: 'Data updates in real time (simulation)'
  },
  bus: {
    now: 'Now',
    next: 'Next',
    minutes: 'min',
    statusAtStop: 'At stop',
    statusApproaching: 'Approaching'
  },
  ad: {
    noActive: 'No active ads',
    noVideo: 'No video added. Upload a file or add a link in admin.',
    playbackError: 'Video cannot play in browser. Try mp4/webm or another link.',
    videoTitle: 'Ad video'
  },
  errors: {
    network: 'Network error',
    upload: 'File upload error',
    execution: 'Execution error',
    sosFailed: 'Failed to send SOS',
    linkNotSet: 'Link not set',
    serverError: 'Server error: {status}'
  },
  api: {
    commandSent: 'Command sent',
    waterCoolerSent: 'Water cooler command sent',
    sosSent: 'SOS signal sent'
  }
}
