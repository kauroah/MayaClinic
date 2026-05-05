import type { ClinicDocument } from "@/lib/types"

export const documents: ClinicDocument[] = [
  {
    id: "1",
    name: "Анкета нового пациента",
    description:
      "Заполните эту анкету перед первым визитом, чтобы мы могли понять вашу медицинскую историю и текущее состояние здоровья.",
    fileUrl: "/documents/new-patient-registration.pdf",
    category: "Бланки для пациентов",
    fileSize: "245 КБ",
    fileType: "PDF",
  },
  {
    id: "2",
    name: "Опросник медицинской истории",
    description:
      "Подробный опросник о ваших прошлых заболеваниях, операциях, лекарствах и семейной истории здоровья.",
    fileUrl: "/documents/medical-history.pdf",
    category: "Бланки для пациентов",
    fileSize: "180 КБ",
    fileType: "PDF",
  },
  {
    id: "3",
    name: "Согласие на лечение",
    description:
      "Стандартная форма согласия, необходимая для медицинских осмотров и процедур в нашей клинике.",
    fileUrl: "/documents/consent-treatment.pdf",
    category: "Бланки для пациентов",
    fileSize: "120 КБ",
    fileType: "PDF",
  },
  {
    id: "4",
    name: "Форма страхового случая",
    description:
      "Форма для подачи страховых случаев по ДМС. Заполните вашу часть и предоставьте в наш отдел расчётов.",
    fileUrl: "/documents/insurance-claim.pdf",
    category: "Страхование",
    fileSize: "156 КБ",
    fileType: "PDF",
  },
  {
    id: "5",
    name: "Руководство по подготовке к осмотру",
    description:
      "Инструкции по подготовке к комплексному осмотру, включая требования к голоданию и что ожидать.",
    fileUrl: "/documents/checkup-preparation.pdf",
    category: "Руководства для пациентов",
    fileSize: "310 КБ",
    fileType: "PDF",
  },
  {
    id: "6",
    name: "Инструкции перед операцией",
    description:
      "Важные рекомендации, которые следует соблюдать перед любой хирургической процедурой, включая диетические ограничения и корректировку лекарств.",
    fileUrl: "/documents/pre-surgery-instructions.pdf",
    category: "Руководства для пациентов",
    fileSize: "275 КБ",
    fileType: "PDF",
  },
  {
    id: "7",
    name: "Прививочная карта",
    description:
      "Печатная карта учёта прививок для отслеживания иммунизации для вас или вашего ребёнка.",
    fileUrl: "/documents/vaccination-record.pdf",
    category: "Документы",
    fileSize: "98 КБ",
    fileType: "PDF",
  },
  {
    id: "8",
    name: "Запрос на получение медицинских записей",
    description:
      "Используйте эту форму для запроса копий ваших медицинских записей из нашей клиники.",
    fileUrl: "/documents/records-request.pdf",
    category: "Документы",
    fileSize: "135 КБ",
    fileType: "PDF",
  },
  {
    id: "9",
    name: "Права и обязанности пациента",
    description:
      "Документ, описывающий ваши права как пациента и ваши обязанности при получении медицинской помощи в нашем учреждении.",
    fileUrl: "/documents/patient-rights.pdf",
    category: "Политики",
    fileSize: "165 КБ",
    fileType: "PDF",
  },
  {
    id: "10",
    name: "Политика конфиденциальности",
    description:
      "Полный документ политики конфиденциальности, подробно описывающий, как мы собираем, используем и защищаем вашу личную и медицинскую информацию.",
    fileUrl: "/documents/privacy-policy.pdf",
    category: "Политики",
    fileSize: "220 КБ",
    fileType: "PDF",
  },
  {
    id: "11",
    name: "Согласие на стоматологическое лечение",
    description:
      "Специальная форма согласия, необходимая для стоматологических процедур, включая удаление, импланты и ортодонтическое лечение.",
    fileUrl: "/documents/dental-consent.pdf",
    category: "Бланки для пациентов",
    fileSize: "145 КБ",
    fileType: "PDF",
  },
  {
    id: "12",
    name: "Опросник детского здоровья",
    description:
      "Опросник здоровья специально для педиатрических пациентов, заполняемый родителями или опекунами.",
    fileUrl: "/documents/pediatric-questionnaire.pdf",
    category: "Бланки для пациентов",
    fileSize: "198 КБ",
    fileType: "PDF",
  },
]

export function getDocumentsByCategory(category: string): ClinicDocument[] {
  return documents.filter(
    (doc) => doc.category.toLowerCase() === category.toLowerCase()
  )
}

export function getDocumentCategories(): string[] {
  const categories = new Set(documents.map((doc) => doc.category))
  return Array.from(categories)
}
