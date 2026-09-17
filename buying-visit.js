/* Visit navigation only. Access, stock and payment remain enforced by the server. */
(function (root) {
  'use strict';
  const TOKEN = 'kapparosBuyingPreviewV1', HANDOFF = 'kapparosBuyingHandoffV1', ACTIVE = 'kapparosBuyingVisitV1';
  const CHECKOUT = ['kapparosCompletedTicketV1', 'kapparosCheckoutSessionV1'];
  const read = key => { try { return sessionStorage.getItem(key); } catch (_) { return null; } };
  const write = (key, value) => { try { sessionStorage.setItem(key, value); } catch (_) {} };
  const remove = key => { try { sessionStorage.removeItem(key); } catch (_) {} };
  const clearCheckout = () => CHECKOUT.forEach(remove);
  const onOrderPage = /^\/order\/?(?:index\.html)?$/.test(location.pathname);
  const path = onOrderPage ? '/order/' : '/';
  const navigationType = root.performance?.getEntriesByType?.('navigation')?.[0]?.type || 'navigate';
  let handoff = null, latest = null, verifiedAt = 0, leavingInternally = false;
  try { handoff = JSON.parse(read(HANDOFF)); } catch (_) {}
  remove(HANDOFF);
  const internal = handoff?.path === path && handoff.token === read(TOKEN)
    && Date.now() - handoff.at >= 0 && Date.now() - handoff.at < 15000;
  const activeReload = navigationType === 'reload' && read(ACTIVE) === '1';
  const resumeTicket = onOrderPage && activeReload;
  const newVisit = !internal && !activeReload;
  if (newVisit) { clearCheckout(); remove(ACTIVE); }
  const redirecting = onOrderPage && newVisit;
  if (redirecting) root.location.replace('/');
  function verified(settings, checkedAt = Date.now()) { latest = settings; verifiedAt = checkedAt; write(ACTIVE, '1'); }
  function go(destination) {
    if (!['/', '/order/'].includes(destination)) return;
    if (destination === '/') clearCheckout();
    // A one-use handoff avoids repeating the access/config read on the next
    // internal page. Old handoffs never restore a visit or an old payment.
    const settings = latest && Date.now() - verifiedAt < 15000 ? latest : null;
    write(HANDOFF, JSON.stringify({path:destination, at:Date.now(), token:read(TOKEN), settings, verifiedAt}));
    leavingInternally = true;
    root.location.assign(destination === '/order/' ? destination + '?v=20260917-1' : destination);
  }
  function forget() {
    clearCheckout(); remove(HANDOFF); remove(ACTIVE); latest = null; verifiedAt = 0;
  }
  root.addEventListener('pagehide', () => {
    if (!leavingInternally) remove(HANDOFF);
    // Browser history must not retain entered card information or an open terminal.
    document.getElementById('demoPaymentForm')?.reset();
    const modal = document.getElementById('demoCheckoutModal');
    modal?.classList.remove('open'); modal?.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('demo-checkout-open');
  });
  root.addEventListener('pageshow', event => {
    if (!event.persisted) return;
    forget();
    document.body.classList.add('preview-locked', 'preview-loading');
    root.location.replace('/');
  });
  root.BuyingVisit = {go, verified, forget, clearCheckout, resumeTicket, redirecting,
    initialSettings:internal && handoff.settings && (!onOrderPage || handoff.settings.homepageOnly !== true) && Number.isFinite(handoff.verifiedAt) && Date.now() - handoff.verifiedAt >= 0 && Date.now() - handoff.verifiedAt < 15000 ? handoff.settings : null, initialVerifiedAt:handoff?.verifiedAt};
})(globalThis);
