/* Buyer terms and phone presentation. Never submits an order or sends a message. */
(function (root) {
  'use strict';
  const copy = root.KapparosBuyingContent;
  const box = document.getElementById('buyerTerms');
  const error = document.getElementById('buyerTermsError');
  let config = {};
  function current() { return copy.terms(config, root.BuyingLanguages.language); }
  function render() {
    const terms = current();
    box.hidden = !terms.required;
    error.textContent = terms.required && (!terms.available || !config.termsRevision)
      ? root.BuyingLanguages.ui('Ordering is unavailable while the terms are being updated.') : '';
  }
  function validate() {
    const terms = current(); if (!terms.required) return true;
    if (!terms.available || !config.termsRevision) { error.textContent = root.BuyingLanguages.ui('Ordering is unavailable while the terms are being updated.'); box.scrollIntoView?.({block:'center'}); return false; }
    return true;
  }
  function apply(next) { config = next || {}; render(); }
  function acceptancePayload() {
    return current().required ? {termsAcceptance: {accepted: true, revision: config.termsRevision || '', language: root.BuyingLanguages.language}} : {};
  }
  function validateCustomerDetails() {
    const form = document.getElementById('sampleOrderForm');
    const fields = ['customerName', 'customerPhone', 'customerEmail'].map(id => document.getElementById(id));
    form.classList.add('validation-attempted');
    const firstInvalid = fields.find(field => !field.checkValidity());
    fields.forEach(field => {
      const invalid = !field.checkValidity();
      field.setAttribute('aria-invalid', String(invalid));
      field.closest('.field')?.classList.toggle('has-error', invalid);
    });
    if (!firstInvalid) return true;
    firstInvalid.reportValidity();
    return false;
  }
  function phoneDigits(value) { const digits = String(value || '').replace(/\D/g, ''); return digits.length === 11 && digits.startsWith('1') ? digits.slice(1) : digits; }
  const phone = document.getElementById('customerPhone');
  phone.addEventListener('input', () => { phone.setCustomValidity(''); });
  phone.addEventListener('blur', () => { const digits = phoneDigits(phone.value); if (digits.length === 10) phone.value = copy.phone(digits).label; });
  ['customerName', 'customerPhone', 'customerEmail'].forEach(id => {
    const field = document.getElementById(id);
    field.addEventListener('input', () => {
      const invalid = !field.checkValidity();
      field.setAttribute('aria-invalid', String(invalid));
      field.closest('.field')?.classList.toggle('has-error', invalid);
    });
  });
  document.addEventListener('buying-language-change', render);
  root.BuyingCheckout = {apply, render, validate, validateCustomerDetails, acceptancePayload, phoneDigits};
})(globalThis);
