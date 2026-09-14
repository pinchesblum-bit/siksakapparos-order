/* Visitor language and editable copy. Never reads customer inputs or ticket templates. */
(function (root) {
  'use strict';
  const copy = root.KapparosBuyingContent;
  const presentation = root.KapparosBuyingPresentation;
  const uiWords = {
    "Checking availability…": "מען קוקט איבער וויפיל כפרות עס זענען נאך דא…",
    "Availability could not be checked. Please try again.": "מען האט נישט געקענט איבערקוקן וויפיל כפרות עס זענען נאך דא. פרובירט נאכאמאל.",
    "There are not enough chickens for this order. Please review the updated quantity before continuing.": "עס זענען נישט דא גענוג כפרות פאר אייער באשטעלונג. ביטע קוקט איבער די צאל כפרות פאר איר גייט ווייטער.",
    "The price changed. Please review the updated total before continuing.": "דער פרייז איז געטוישט געווארן. ביטע קוקט איבער דעם נייעם סך הכל פאר איר גייט ווייטער.",
    "Please read and accept the terms before continuing.": "ביטע לייענט און באשטעטיגט די תנאים פאר איר גייט ווייטער.",
    "Ordering is unavailable while the terms are being updated.": "מען קען צייטווייליג נישט באשטעלן בשעת די תנאים ווערן דערהיינטיגט.",
    "The terms changed. Please review and accept them again.": "די תנאים זענען געטוישט געווארן. ביטע לייענט און באשטעטיגט זיי נאכאמאל.",
  "Pay": "באצאלט",
  "— Demo": "— דעמא",
  "Your information": "אייערע פרטים",
  "Full name": "פולער נאמען",
  "Phone number": "טעלעפאן נומער",
  "Email": "אימעיל",
  "Your order": "אייער באשטעלונג",
  "Number of kaparos": "וויפיל כפרות",
  "Payment": "באצאלונג",
  "Credit card": "קרעדיט קארד",
  "Order summary": "איבערבליק פון דער באשטעלונג",
  "Kaparos": "כפרות",
  "Total": "סך הכל",
  "Continue to payment": "ווייטער צום באצאלן",
  "🔒 Secure checkout": "🔒 זיכערע באצאלונג",
  "← Back to home": "צוריק צום הויפט־בלאט →",
  "Username": "באניצער־נאמען",
  "Password": "פאסווארט",
  "Show": "ווייז",
  "Hide": "באהאלט",
  "Open website": "עפן דעם וועבזייטל",
  "Exit preview": "פארלאז די פריוויו",
  "Online ordering is currently closed.": "די באשטעלונגען אויפן וועבזייטל זענען יעצט פארמאכט.",
  "Online orders are currently sold out.": "אלע כפרות פאר באשטעלונגען אויפן וועבזייטל זענען שוין פארקויפט.",
  "Enter a 10-digit phone number.": "שרייבט אריין א טעלעפאן נומער מיט 10 ציפערן.",
  "The website is temporarily unavailable. Please try again.": "דער וועבזייטל איז צייטווייליג נישט צוטריטלעך. פרובירט נאכאמאל.",
  "Please log in again to continue.": "ביטע שרייבט זיך נאכאמאל איין כדי ווייטער צו גיין.",
  "Please try again.": "פרובירט נאכאמאל.",
  "The website could not be opened.": "מען האט נישט געקענט עפענען דעם וועבזייטל.",
  "Incorrect username or password.": "דער באניצער־נאמען אדער פאסווארט איז נישט ריכטיג.",
  "DEMO CHECKOUT": "דעמא־באצאלונג",
  "Complete your payment": "פארענדיקט אייער באצאלונג",
  "Name on card": "נאמען אויפן קארד",
  "Card number": "קארד נומער",
  "Expiration": "גילטיג ביז",
  "Expiry": "גילטיג ביז",
  "CVV": "CVV",
  "Payment approved": "באצאלונג באשטעטיגט",
  "Print Ticket": "דרוקט דעם טיקעט",
  "Email Ticket": "שיקט דעם טיקעט דורך אימעיל",
  "Text Ticket": "שיקט דעם טיקעט דורך טעקסט",
  "Done": "פארטיג",
  "Your ticket": "אייער טיקעט",
  "Name": "נאמען",
  "Quantity": "וויפיל כפרות",
  "Phone": "טעלעפאן",
  "Ticket delivery is currently unavailable.": "מען קען יעצט נישט שיקן טיקעטס.",
  "Preparing and emailing your ticket…": "מען גרייט צו און שיקט אייער טיקעט דורך אימעיל…",
  "Sending your ticket by text…": "מען שיקט אייער טיקעט דורך טעקסט…",
  "Processing demo payment…": "מען באהאנדלט די דעמא־באצאלונג…",
  "Log in to preview the website.": "שרייבט זיך איין צו זען דעם וועבזייטל.",
  "Use the demo card number 4111 1111 1111 1111.": "נוצט דעם דעמא־קארד נומער 4111 1111 1111 1111.",
  "This demo accepts only the test card shown above.": "די דעמא נעמט אן נאר דעם טעסט־קארד וואס שטייט אויבן.",
  "The order could not be completed.": "מען האט נישט געקענט פארענדיקן די באשטעלונג.",
  "Pop-up blocked. Allow pop-ups and try Print Ticket again.": "דער פענסטער איז בלאקירט. ערלויבט פענסטער און פרובירט נאכאמאל צו דרוקן דעם טיקעט.",
  "Secure card payment": "זיכערע באצאלונג מיט א קארד",
  "This is a test payment. No card will be charged.": "דאס איז א טעסט־באצאלונג. קיין קארד וועט נישט ווערן אפגערעכנט.",
  "Order total": "סך הכל פון דער באשטעלונג",
  "Billing ZIP code": "בילינג זיפ קאוד",
  "🔒 Test mode · No real transaction": "🔒 טעסט־מאדע · קיין עכטע באצאלונג",
  "DEMO APPROVED": "דעמא באשטעטיגט",
  "Online demo ticket": "אנליין דעמא־טיקעט",
  "Your demo order is complete.": "אייער דעמא־באשטעלונג איז פארטיג.",
  "No card was charged. This test order is recorded as a paid online sale in the admin website and reports.": "קיין קארד איז נישט אפגערעכנט געווארן. די טעסט־באשטעלונג ווערט פארשריבן אלס א באצאלטע אנליין־פארקויפונג אינעם אדמין־וועבזייטל און אין די באריכטן.",
  "Choose how you would like to receive your ticket.": "קלייבט אויס וויאזוי איר ווילט באקומען אייער טיקעט.",
  "Allow pop-ups, then press Print Ticket again.": "ערלויבט פענסטער, און דרוקט נאכאמאל אויף דרוקן דעם טיקעט.",
  "Show password": "ווייז דעם פאסווארט",
  "Hide password": "באהאלט דעם פאסווארט",
  "Remove one kaparos": "נעמט אראפ איין כפרה",
  "Add one kaparos": "לייגט צו איין כפרה",
  "Payment method": "באצאלונגס־אופן",
  "Close checkout": "פארמאכט די באצאלונג"
};
  const reverseWords = Object.fromEntries(Object.entries(uiWords).map(([en, yi]) => [yi, en]));
  let language = 'yi', settings = {}, locked = true;
  try { language = localStorage.getItem('kapparosBuyingLanguageV1') === 'en' ? 'en' : 'yi'; } catch (_) {}
  function ui(text) {
    const original = reverseWords[text] || text;
    if (locked) return original;
    const field = copy.fields.find(field => field.ui === original);
    if (field) {
      const current = presentation.source(settings), translated = presentation.english(settings);
      return document.documentElement.lang === 'yi' ? current[field.key] : translated.values[field.key] ?? current[field.key];
    }
    return document.documentElement.lang === 'yi' ? uiWords[original] || original : original;
  }
  function put(element, value) {
    if (!element) return;
    element.textContent = value;
    element.hidden = !value;
    element.dir = /[\u0590-\u05ff]/.test(value) ? 'rtl' : 'ltr';
    element.lang = /[\u0590-\u05ff]/.test(value) ? 'yi' : 'en';
  }
  function render() {
    const toolbar = document.querySelector('.language-switcher');
    if (toolbar) toolbar.hidden = locked;
    if (locked) {
      document.documentElement.lang = 'en'; document.documentElement.dir = 'ltr';
      document.title = 'Siksakapparos | Punim Meiros Siksa';
      return;
    }
    const current = presentation.source(settings), translated = presentation.english(settings);
    // A pending field must not remove the entire English option. Never show an
    // old translation: only that field falls back to its current Yiddish source.
    const selected = language;
    document.documentElement.lang = selected;
    document.documentElement.dir = selected === 'yi' ? 'rtl' : 'ltr';
    document.querySelectorAll('[data-language]').forEach(button => {
      button.hidden = false;
      button.setAttribute('aria-pressed', String(button.dataset.language === selected));
    });
    for (const element of document.querySelectorAll('[data-copy]')) {
      const key = element.dataset.copy;
      if (!Object.hasOwn(current, key)) continue;
      const value = selected === 'en' ? translated.values[key] ?? current[key] : current[key];
      put(element, value);
      if (key === 'venue') {
        const lines = presentation.venueLines(value);
        element.dir = document.documentElement.dir;
        element.classList.toggle('has-two-lines', lines.every(line => line.trim()));
        element.replaceChildren(...lines.map(line => {
          const paragraph = document.createElement('p'); paragraph.className = 'event-venue'; put(paragraph, line); return paragraph;
        }));
      }
      const icon = key.endsWith('Icon') ? presentation.icon(value) : null;
      if (icon) {
        const picture = document.createElement('img');
        picture.src = '/' + icon.path; picture.alt = ''; picture.width = 32; picture.height = 32;
        picture.className = 'buying-symbol'; picture.setAttribute('aria-hidden', 'true');
        element.replaceChildren(picture);
      }
    }
    document.querySelectorAll('[data-ui]').forEach(element => { element.textContent = ui(element.dataset.ui); });
    document.querySelectorAll('[data-ui-aria]').forEach(element => element.setAttribute('aria-label', ui(element.dataset.uiAria)));
    // These nodes contain app-generated messages, never customer-entered text.
    for (const id of ['availabilityMessage', 'checkoutAvailabilityError', 'ticketActionStatus', 'demoPaymentError']) {
      const element = document.getElementById(id);
      if (element) element.textContent = ui(element.textContent);
    }
    document.querySelectorAll('.payment-option').forEach(element => { element.textContent = ui('Credit card'); });
    for (const [selector, key] of [['.event-contact a', 'phoneNumber'], ['.support-phone', 'supportPhone']]) {
      const link = document.querySelector(selector); if (!link) continue;
      const value = copy.phone(current[key]);
      put(link, value.label); link.dir = 'ltr';
      if (value.href) link.setAttribute('href', value.href); else link.removeAttribute('href');
    }
    const contact = document.querySelector('.event-contact'); if (contact) contact.hidden = !current.phoneNumber;
    const email = document.querySelector('.support-email');
    if (email) {
      put(email, current.supportEmail); email.dir = 'ltr';
      if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(current.supportEmail)) email.setAttribute('href', 'mailto:' + current.supportEmail);
      else email.removeAttribute('href');
    }
    const footer = document.getElementById('buyingSupportFooter');
    if (footer) footer.hidden = !current.supportPhone && !current.supportEmail;
    document.querySelectorAll('.trust-item').forEach(item => {
      const label = item.querySelector('[data-copy]:not(.trust-icon)');
      item.hidden = !label || label.hidden;
    });
    for (const selector of ['.event-detail', '.event-details-grid', '.event-details', '.event-booking', '.trust-line']) {
      document.querySelectorAll(selector).forEach(element => {
        element.hidden = !Array.from(element.querySelectorAll('[data-copy]')).some(child => !child.hidden && child.textContent);
      });
    }
    document.querySelectorAll('.trust-line').forEach(line => { line.hidden = !Array.from(line.querySelectorAll('.trust-item')).some(item => !item.hidden); });
    const title = selected === 'en' ? translated.values.title ?? current.title : current.title;
    document.title = 'Siksakapparos | ' + title;
    document.dispatchEvent(new Event('buying-language-change'));
  }
  function apply(next, isLocked = false) { settings = next || {}; locked = isLocked; render(); }
  function choose(next) {
    language = next === 'en' ? 'en' : 'yi';
    try { localStorage.setItem('kapparosBuyingLanguageV1', language); } catch (_) {}
    render();
  }
  document.querySelectorAll('[data-language]').forEach(button => button.addEventListener('click', () => choose(button.dataset.language)));
  root.BuyingLanguages = {apply, render, ui, lock() { locked = true; render(); }, get language() { return document.documentElement.lang; }};
  render();
})(globalThis);
