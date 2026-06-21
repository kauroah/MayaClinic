import type { ClinicInfo, NavItem } from "@/lib/types"

export const clinicInfo: ClinicInfo = {
  name: "Майя Клиник",
  tagline: "Ваше здоровье — наш приоритет",
  address: "Астрономическая ул., 8/21",
  city: "Казань, Россия",
  phone: "+7 (843) 558-60-52",
  email: "mayamed@bk.ru",
  hours: {
    weekdays: "8:00 - 20:00",
    sunday: "Дежурный день",
  },
  socialLinks: {
    vk: "https://vk.ru/maya_clinic",
    telegram: "https://t.me/maya_clinic_kazan",
    instagram: "https://instagram.com/maya_clinic_kazan", // Note: I corrected the URL from your data
    prodoctorov: "https://prodoctorov.ru/kazan/lpu/33284-mayya-medikal/",
    napopravku: "https://napopravku.ru/kazan/clinics/maya-clinic-mayya-klinik-set-medicinskih-centrov/"
  },
  mapEmbedUrl:
  "https://yandex.ru/map-widget/v1/?ll=49.115703%2C55.788697&z=17&pt=49.115703,55.788697,pm2rdm",
  
  coordinates: {
    lat: 55.788697,
    lng: 49.115703,
  },
}

export const mainNavItems: NavItem[] = [
  { label: "Главная", href: "/" },
  {
    label: "Услуги",
    href: "/services",
    children: [
      { label: "Все услуги", href: "/services" },
      { label: "Пластическая хирургия", href: "/services/plastic-surgery" },
      { label: "Косметология", href: "/services/cosmetology" },
      { label: "Ортопедия и травматология", href: "/services/orthopedics" },
      { label: "Отоларингология", href: "/services/ent" },
      { label: "Гинекология", href: "/services/gynecology" },
      { label: "Стоматология", href: "/services/dental-care" },
      { label: "УЗИ", href: "/services/ultrasound" },
      { label: "Кистевая хирургия", href: "/services/hand-surgery" },
      // { label: "Офтальмология", href: "/services/ophthalmology" },
    ],
  },
  {
    label: "Врачи",
    href: "/doctors",
    children: [
      { label: "Все врачи", href: "/doctors" },
      { label: "Др. Алексей Петров", href: "/doctors/dr-alexey-petrov" },
      { label: "Др. Елена Смирнова", href: "/doctors/dr-elena-smirnova" },
      { label: "Др. Михаил Козлов", href: "/doctors/dr-mikhail-kozlov" },
    ],
  },
  // { label: "Блог", href: "/blog" },
  { label: "Акции", href: "/promotions" },
  { label: "О клинике", href: "/about" },
  { label: "Контакты", href: "/contact" },
  { label: "Цены", href: "/prices" },
]

export const footerNavItems = {
  services: [
    { label: "Пластическая хирургия", href: "/services/plastic-surgery" },
    { label: "Косметология", href: "/services/cosmetology" },
    { label: "Ортопедия и травматология", href: "/services/orthopedics" },
    { label: "Отоларингология", href: "/services/ent" },
    { label: "Гинекология", href: "/services/gynecology" },
    { label: "Стоматология", href: "/services/dental-care" },
    { label: "УЗИ", href: "/services/ultrasound" },
    { label: "Все услуги", href: "/services" },
  ],
  company: [
    { label: "О нас", href: "/about" },
    { label: "Наши врачи", href: "/doctors" },
    { label: "Отзывы", href: "/reviews" },
    // { label: "Блог", href: "/blog" },
    { label: "Акции", href: "/promotions" },
    { label: "Контакты", href: "/contact" },
  ],
  support: [
    { label: "Записаться на приём", href: "/appointments" },
    { label: "Уголок потребителя", href: "/consumer-corner" },
    { label: "Документы", href: "/documents" },
    { label: "Лицензии", href: "/licenses" },
    { label: "Политика конфиденциальности", href: "/privacy-policy" },
  ],
}
