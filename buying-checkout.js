/* Buyer terms and phone presentation. Never submits an order or sends a message. */
(function (root) {
  'use strict';
  const copy = root.KapparosBuyingContent;
  const box = document.getElementById('buyerTerms');
  const checkbox = document.getElementById('acceptBuyerTerms');
  const error = document.getElementById('buyerTermsError');
  let config = {}, acceptedRevision = '', acceptedLanguage = '';
  function current() { return copy.terms(config, root.BuyingLanguages.language); }
  function render() {
    const terms = current();
    box.hidden = !terms.required;
    checkbox.required = terms.required;
    checkbox.disabled = terms.required && (!terms.available || !config.termsRevision);
    if (acceptedRevision !== config.termsRevision || acceptedLanguage !== root.BuyingLanguages.language || !terms.required) {
      checkbox.checked = false; acceptedRevision = ''; acceptedLanguage = ''; error.textContent = '';
    }
    if (terms.required && (!terms.available || !config.termsRevision)) error.textContent = root.BuyingLanguages.ui('Ordering is unavailable while the terms are being updated.');
  }
  checkbox.addEventListener('change', () => {
    acceptedRevision = checkbox.checked ? config.termsRevision || '' : '';
    acceptedLanguage = checkbox.checked ? root.BuyingLanguages.language : '';
    error.textContent = '';
  });
  function validate() {
    const terms = current(); if (!terms.required) return true;
    if (!terms.available || !config.termsRevision) { error.textContent = root.BuyingLanguages.ui('Ordering is unavailable while the terms are being updated.'); box.scrollIntoView?.({block:'center'}); return false; }
    if (!checkbox.checked || acceptedRevision !== config.termsRevision || acceptedLanguage !== root.BuyingLanguages.language) {
      checkbox.checked = false; error.textContent = root.BuyingLanguages.ui('Please read and accept the terms before continuing.'); checkbox.focus(); return false;
    }
    return true;
  }
  function apply(next) { config = next || {}; render(); }
  function acceptancePayload() {
    return current().required ? {termsAcceptance: {accepted: checkbox.checked, revision: acceptedRevision, language: acceptedLanguage}} : {};
  }
  function phoneDigits(value) { const digits = String(value || '').replace(/\D/g, ''); return digits.length === 11 && digits.startsWith('1') ? digits.slice(1) : digits; }
  const phone = document.getElementById('customerPhone');
  phone.addEventListener('input', () => { phone.setCustomValidity(''); });
  phone.addEventListener('blur', () => { const digits = phoneDigits(phone.value); if (digits.length === 10) phone.value = copy.phone(digits).label; });
  document.addEventListener('buying-language-change', render);
  root.BuyingCheckout = {apply, render, validate, acceptancePayload, phoneDigits};
})(globalThis);
