import type { Language } from './index';

export type ServicePageSlug =
  | 'about'
  | 'contact'
  | 'shipping-payment'
  | 'how-to-order'
  | 'editorial-policy'
  | 'corrections-policy';

interface ServiceSection {
  id: string;
  title: string;
  paragraphs: string[];
  items?: string[];
}

export interface ServicePageContent {
  title: string;
  description: string;
  home: string;
  onThisPage: string;
  orderCta: string;
  sections: ServiceSection[];
}

const pages: Record<Language, Record<ServicePageSlug, ServicePageContent>> = {
  en: {
    about: {
      title: 'About Pauch', description: 'How the Pauch catalog and Telegram ordering service work in Moldova.', home: 'Home', onThisPage: 'On this page', orderCta: 'Order via Telegram',
      sections: [
        { id: 'what-we-do', title: 'What we do', paragraphs: ['Pauch is an online catalog of nicotine pouches for adults in Moldova. Customers browse the catalog on this site and send order requests through Telegram.'] },
        { id: 'ordering', title: 'Ordering', paragraphs: ['Product availability, payment, and delivery details are confirmed in Telegram before an order proceeds.'] },
        { id: 'delivery', title: 'Delivery and payment', paragraphs: ['Delivery in Chișinău is usually 1-2 hours after confirmation. Delivery across Moldova is also available. Payment may be made by cash on delivery or bank transfer, subject to confirmation.'] },
      ],
    },
    contact: {
      title: 'Contact', description: 'Contact Pauch through Telegram about an order, delivery, or site information.', home: 'Home', onThisPage: 'On this page', orderCta: 'Open Telegram',
      sections: [
        { id: 'telegram', title: 'Telegram', paragraphs: ['Use the Telegram button on this page for order requests and questions about an existing order.'] },
        { id: 'order-details', title: 'What to include', paragraphs: ['To help confirm an order, include the product, quantity, and delivery area in your message.'] },
        { id: 'confirmation', title: 'Confirmation', paragraphs: ['Availability, payment method, and delivery details are confirmed in Telegram.'] },
      ],
    },
    'shipping-payment': {
      title: 'Shipping & Payment', description: 'Delivery areas, expected Chișinău delivery time, and payment methods for Pauch orders.', home: 'Home', onThisPage: 'On this page', orderCta: 'Order via Telegram',
      sections: [
        { id: 'chisinau', title: 'Chișinău delivery', paragraphs: ['Delivery in Chișinău is usually 1-2 hours after the order is confirmed in Telegram.'] },
        { id: 'moldova', title: 'Delivery across Moldova', paragraphs: ['Nationwide delivery is available. The delivery details are provided when the order is confirmed.'] },
        { id: 'payment', title: 'Payment', paragraphs: ['Payment is available by cash on delivery or bank transfer. The applicable method and payment details are confirmed with the order.'] },
      ],
    },
    'how-to-order': {
      title: 'How to Order', description: 'Steps for placing a Pauch order through Telegram.', home: 'Home', onThisPage: 'On this page', orderCta: 'Start an order in Telegram',
      sections: [
        { id: 'choose', title: '1. Choose a product', paragraphs: ['Browse the catalog and note the product and strength you want.'] },
        { id: 'message', title: '2. Send a Telegram message', paragraphs: ['Open Telegram from an order button and include the product, quantity, and delivery area.'] },
        { id: 'confirm', title: '3. Confirm the order', paragraphs: ['Availability, payment method, and delivery details are confirmed in Telegram before delivery.'] },
        { id: 'delivery', title: '4. Delivery', paragraphs: ['Chișinău delivery is usually 1-2 hours after confirmation. Nationwide delivery is also available.'] },
      ],
    },
    'editorial-policy': {
      title: 'Editorial Policy', description: 'How Pauch prepares and maintains informational website content.', home: 'Home', onThisPage: 'On this page', orderCta: 'Contact via Telegram',
      sections: [
        { id: 'scope', title: 'Scope', paragraphs: ['This policy applies to informational pages and articles published on the Pauch website. Product availability and order details are confirmed separately in Telegram.'] },
        { id: 'standards', title: 'Content standards', paragraphs: ['We aim for clear, useful content for adults and distinguish general information from order-specific details. Nicotine information is not medical advice.'] },
        { id: 'updates', title: 'Updates', paragraphs: ['Content may be reviewed when product information, service details, or applicable requirements change.'] },
      ],
    },
    'corrections-policy': {
      title: 'Corrections Policy', description: 'How to report and how Pauch handles errors in website content.', home: 'Home', onThisPage: 'On this page', orderCta: 'Report an issue via Telegram',
      sections: [
        { id: 'report', title: 'Report an issue', paragraphs: ['If you notice an error, contact us through Telegram and identify the page and the information in question.'] },
        { id: 'review', title: 'Review', paragraphs: ['We review reported issues against the available information and update the page when a correction is warranted.'] },
        { id: 'clarity', title: 'Clarifications', paragraphs: ['Minor wording and formatting changes may be made without a separate notice. Material factual corrections may be noted on the affected page.'] },
      ],
    },
  },
  ro: {
    about: {
      title: 'Despre Pauch', description: 'Cum funcționează catalogul Pauch și comenzile prin Telegram în Moldova.', home: 'Acasă', onThisPage: 'Pe această pagină', orderCta: 'Comandă prin Telegram',
      sections: [
        { id: 'what-we-do', title: 'Ce facem', paragraphs: ['Pauch este un catalog online de pliculețe cu nicotină pentru adulți din Moldova. Clienții consultă catalogul pe site și trimit solicitările de comandă prin Telegram.'] },
        { id: 'ordering', title: 'Comenzi', paragraphs: ['Disponibilitatea produselor, plata și detaliile livrării sunt confirmate în Telegram înainte de procesarea comenzii.'] },
        { id: 'delivery', title: 'Livrare și plată', paragraphs: ['Livrarea în Chișinău durează de obicei 1-2 ore după confirmare. Este disponibilă și livrarea în toată Moldova. Plata se poate face în numerar la livrare sau prin transfer bancar, sub rezerva confirmării.'] },
      ],
    },
    contact: {
      title: 'Contact', description: 'Contactează Pauch prin Telegram despre o comandă, livrare sau informațiile de pe site.', home: 'Acasă', onThisPage: 'Pe această pagină', orderCta: 'Deschide Telegram',
      sections: [
        { id: 'telegram', title: 'Telegram', paragraphs: ['Folosește butonul Telegram de pe această pagină pentru solicitări de comandă și întrebări despre o comandă existentă.'] },
        { id: 'order-details', title: 'Ce să incluzi', paragraphs: ['Pentru confirmarea comenzii, include produsul, cantitatea și zona de livrare în mesaj.'] },
        { id: 'confirmation', title: 'Confirmare', paragraphs: ['Disponibilitatea, metoda de plată și detaliile livrării sunt confirmate în Telegram.'] },
      ],
    },
    'shipping-payment': {
      title: 'Livrare și plată', description: 'Zonele de livrare, timpul estimat în Chișinău și metodele de plată pentru comenzile Pauch.', home: 'Acasă', onThisPage: 'Pe această pagină', orderCta: 'Comandă prin Telegram',
      sections: [
        { id: 'chisinau', title: 'Livrare în Chișinău', paragraphs: ['Livrarea în Chișinău durează de obicei 1-2 ore după confirmarea comenzii în Telegram.'] },
        { id: 'moldova', title: 'Livrare în toată Moldova', paragraphs: ['Este disponibilă livrarea la nivel național. Detaliile livrării sunt comunicate la confirmarea comenzii.'] },
        { id: 'payment', title: 'Plată', paragraphs: ['Plata se poate face în numerar la livrare sau prin transfer bancar. Metoda aplicabilă și detaliile de plată sunt confirmate odată cu comanda.'] },
      ],
    },
    'how-to-order': {
      title: 'Cum comanzi', description: 'Pașii pentru plasarea unei comenzi Pauch prin Telegram.', home: 'Acasă', onThisPage: 'Pe această pagină', orderCta: 'Începe comanda în Telegram',
      sections: [
        { id: 'choose', title: '1. Alege un produs', paragraphs: ['Consultă catalogul și notează produsul și tăria dorite.'] },
        { id: 'message', title: '2. Trimite un mesaj în Telegram', paragraphs: ['Deschide Telegram dintr-un buton de comandă și include produsul, cantitatea și zona de livrare.'] },
        { id: 'confirm', title: '3. Confirmă comanda', paragraphs: ['Disponibilitatea, metoda de plată și detaliile livrării sunt confirmate în Telegram înainte de livrare.'] },
        { id: 'delivery', title: '4. Livrare', paragraphs: ['Livrarea în Chișinău durează de obicei 1-2 ore după confirmare. Este disponibilă și livrarea în toată țara.'] },
      ],
    },
    'editorial-policy': {
      title: 'Politica editorială', description: 'Cum pregătește și menține Pauch conținutul informativ al site-ului.', home: 'Acasă', onThisPage: 'Pe această pagină', orderCta: 'Contactează-ne prin Telegram',
      sections: [
        { id: 'scope', title: 'Domeniu', paragraphs: ['Politica se aplică paginilor informative și articolelor publicate pe site-ul Pauch. Disponibilitatea produselor și detaliile comenzilor sunt confirmate separat în Telegram.'] },
        { id: 'standards', title: 'Standarde de conținut', paragraphs: ['Urmărim să oferim adulților conținut clar și util și să separăm informațiile generale de detaliile unei comenzi. Informațiile despre nicotină nu reprezintă sfaturi medicale.'] },
        { id: 'updates', title: 'Actualizări', paragraphs: ['Conținutul poate fi revizuit când se schimbă informațiile despre produse, serviciile sau cerințele aplicabile.'] },
      ],
    },
    'corrections-policy': {
      title: 'Politica de corectare', description: 'Cum pot fi raportate și cum gestionează Pauch erorile din conținutul site-ului.', home: 'Acasă', onThisPage: 'Pe această pagină', orderCta: 'Raportează prin Telegram',
      sections: [
        { id: 'report', title: 'Raportează o problemă', paragraphs: ['Dacă observi o eroare, contactează-ne prin Telegram și indică pagina și informația în cauză.'] },
        { id: 'review', title: 'Verificare', paragraphs: ['Verificăm problemele raportate pe baza informațiilor disponibile și actualizăm pagina atunci când este necesară o corectare.'] },
        { id: 'clarity', title: 'Clarificări', paragraphs: ['Modificările minore de formulare și formatare pot fi făcute fără o notificare separată. Corectările factuale importante pot fi notate pe pagina afectată.'] },
      ],
    },
  },
  ru: {
    about: {
      title: 'О Pauch', description: 'Как работают каталог Pauch и заказы через Telegram в Молдове.', home: 'Главная', onThisPage: 'На этой странице', orderCta: 'Заказать через Telegram',
      sections: [
        { id: 'what-we-do', title: 'Что мы делаем', paragraphs: ['Pauch — онлайн-каталог никотиновых паучей для совершеннолетних покупателей в Молдове. Покупатели выбирают товар на сайте и отправляют запрос на заказ через Telegram.'] },
        { id: 'ordering', title: 'Заказы', paragraphs: ['Наличие товара, оплата и детали доставки подтверждаются в Telegram до выполнения заказа.'] },
        { id: 'delivery', title: 'Доставка и оплата', paragraphs: ['Доставка по Кишинёву обычно занимает 1-2 часа после подтверждения. Также доступна доставка по всей Молдове. Оплата возможна наличными при получении или банковским переводом после подтверждения.'] },
      ],
    },
    contact: {
      title: 'Контакты', description: 'Связь с Pauch через Telegram по вопросам заказа, доставки или информации на сайте.', home: 'Главная', onThisPage: 'На этой странице', orderCta: 'Открыть Telegram',
      sections: [
        { id: 'telegram', title: 'Telegram', paragraphs: ['Используйте кнопку Telegram на этой странице для заказа и вопросов по существующему заказу.'] },
        { id: 'order-details', title: 'Что указать', paragraphs: ['Для подтверждения заказа укажите в сообщении товар, количество и район доставки.'] },
        { id: 'confirmation', title: 'Подтверждение', paragraphs: ['Наличие, способ оплаты и детали доставки подтверждаются в Telegram.'] },
      ],
    },
    'shipping-payment': {
      title: 'Доставка и оплата', description: 'Зоны доставки, срок доставки по Кишинёву и способы оплаты заказов Pauch.', home: 'Главная', onThisPage: 'На этой странице', orderCta: 'Заказать через Telegram',
      sections: [
        { id: 'chisinau', title: 'Доставка по Кишинёву', paragraphs: ['Доставка по Кишинёву обычно занимает 1-2 часа после подтверждения заказа в Telegram.'] },
        { id: 'moldova', title: 'Доставка по Молдове', paragraphs: ['Доступна доставка по всей стране. Детали доставки сообщаются при подтверждении заказа.'] },
        { id: 'payment', title: 'Оплата', paragraphs: ['Доступна оплата наличными при получении или банковским переводом. Способ и реквизиты подтверждаются вместе с заказом.'] },
      ],
    },
    'how-to-order': {
      title: 'Как заказать', description: 'Шаги для оформления заказа Pauch через Telegram.', home: 'Главная', onThisPage: 'На этой странице', orderCta: 'Начать заказ в Telegram',
      sections: [
        { id: 'choose', title: '1. Выберите товар', paragraphs: ['Просмотрите каталог и запомните нужный товар и крепость.'] },
        { id: 'message', title: '2. Напишите в Telegram', paragraphs: ['Откройте Telegram с помощью кнопки заказа и укажите товар, количество и район доставки.'] },
        { id: 'confirm', title: '3. Подтвердите заказ', paragraphs: ['Наличие, способ оплаты и детали доставки подтверждаются в Telegram до доставки.'] },
        { id: 'delivery', title: '4. Доставка', paragraphs: ['Доставка по Кишинёву обычно занимает 1-2 часа после подтверждения. Также доступна доставка по всей стране.'] },
      ],
    },
    'editorial-policy': {
      title: 'Редакционная политика', description: 'Как Pauch готовит и обновляет информационные материалы сайта.', home: 'Главная', onThisPage: 'На этой странице', orderCta: 'Связаться через Telegram',
      sections: [
        { id: 'scope', title: 'Область действия', paragraphs: ['Политика относится к информационным страницам и статьям на сайте Pauch. Наличие товаров и детали заказа отдельно подтверждаются в Telegram.'] },
        { id: 'standards', title: 'Стандарты материалов', paragraphs: ['Мы стремимся давать совершеннолетним читателям понятную и полезную информацию и отделять общие сведения от деталей заказа. Информация о никотине не является медицинской консультацией.'] },
        { id: 'updates', title: 'Обновления', paragraphs: ['Материалы могут пересматриваться при изменении информации о товарах, услугах или применимых требованиях.'] },
      ],
    },
    'corrections-policy': {
      title: 'Политика исправлений', description: 'Как сообщить об ошибке и как Pauch исправляет материалы сайта.', home: 'Главная', onThisPage: 'На этой странице', orderCta: 'Сообщить через Telegram',
      sections: [
        { id: 'report', title: 'Сообщить об ошибке', paragraphs: ['Если вы заметили ошибку, свяжитесь с нами через Telegram и укажите страницу и спорную информацию.'] },
        { id: 'review', title: 'Проверка', paragraphs: ['Мы проверяем сообщения по доступной информации и обновляем страницу, когда исправление обосновано.'] },
        { id: 'clarity', title: 'Уточнения', paragraphs: ['Небольшие изменения формулировок и оформления могут вноситься без отдельного уведомления. Существенные фактические исправления могут быть отмечены на соответствующей странице.'] },
      ],
    },
  },
};

export const servicePageSlugs: ServicePageSlug[] = [
  'about', 'contact', 'shipping-payment', 'how-to-order', 'editorial-policy', 'corrections-policy',
];

export function getServicePage(lang: Language, slug: ServicePageSlug): ServicePageContent {
  return pages[lang][slug];
}
