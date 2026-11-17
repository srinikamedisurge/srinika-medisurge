/**
 * Srinika Medisurge - conversion tracking (GA4 + optional Meta Pixel).
 * Safe to load without IDs: every call is a no-op unless gtag / fbq exist.
 *
 * Events sent to GA4 (mark generate_lead, purchase and click_call / click_whatsapp as Key events):
 *   click_call        tap on any tel: link
 *   click_whatsapp    tap on any wa.me link
 *   click_book        tap on a link to /book/
 *   generate_lead     booking form or contact form submitted
 *   begin_checkout    Razorpay window opened
 *   purchase          Razorpay payment verified
 * Every event also carries: page_type, page_slug, link_location, and the visitor's first-touch
 * source (utm_source, utm_medium, utm_campaign, gclid flag, referrer host).
 */
(function () {
  "use strict";

  var STORE_KEY = "srinika_src";

  function pageInfo() {
    var parts = location.pathname.split("/").filter(Boolean);
    var section = parts[0] || "home";
    var map = {
      home: "home", services: "service", conditions: "condition", areas: "area", blog: "blog",
      book: "book", contact: "contact", pricing: "pricing", doctors: "doctors", equipment: "equipment",
      reviews: "reviews", careers: "careers", about: "about"
    };
    var type = map[section] || "other";
    var slug = parts[1] || "";
    if (parts.length === 1 && type !== "home") slug = "index";
    return { type: type, slug: slug };
  }

  // First-touch source, kept for the browser session so a booking can be tied to the campaign.
  function captureSource() {
    try {
      if (sessionStorage.getItem(STORE_KEY)) return;
      var q = new URLSearchParams(location.search);
      var ref = "";
      try { ref = document.referrer ? new URL(document.referrer).hostname : ""; } catch (e) { ref = ""; }
      if (ref === location.hostname) ref = "";
      sessionStorage.setItem(STORE_KEY, JSON.stringify({
        utm_source: q.get("utm_source") || "",
        utm_medium: q.get("utm_medium") || "",
        utm_campaign: q.get("utm_campaign") || "",
        gclid: q.get("gclid") ? "yes" : "",
        referrer: ref,
        landing: location.pathname
      }));
    } catch (e) { /* storage blocked: tracking continues without source */ }
  }

  function source() {
    try { return JSON.parse(sessionStorage.getItem(STORE_KEY) || "{}"); } catch (e) { return {}; }
  }

  function locationOf(el) {
    if (!el || !el.closest) return "body";
    if (el.closest("header")) return "header";
    if (el.closest("footer")) return "footer";
    if (el.closest(".fixed")) return "floating";
    return "body";
  }

  var META_MAP = {
    click_call: "Contact",
    click_whatsapp: "Contact",
    generate_lead: "Lead",
    begin_checkout: "InitiateCheckout",
    purchase: "Purchase"
  };

  function track(name, params) {
    var p = pageInfo();
    var data = Object.assign({
      page_type: p.type,
      page_slug: p.slug,
      page_path: location.pathname
    }, source(), params || {});
    // Drop empty values so GA4 reports stay clean
    Object.keys(data).forEach(function (k) { if (data[k] === "" || data[k] == null) delete data[k]; });

    if (typeof window.gtag === "function") window.gtag("event", name, data);
    if (typeof window.fbq === "function" && META_MAP[name]) {
      var fb = {};
      if (data.value) { fb.value = data.value; fb.currency = data.currency || "INR"; }
      window.fbq("track", META_MAP[name], fb);
    }
  }

  window.srinikaTrack = track;

  function onClick(e) {
    var a = e.target.closest ? e.target.closest("a[href]") : null;
    if (!a) return;
    var href = a.getAttribute("href") || "";
    var where = locationOf(a);

    if (href.indexOf("tel:") === 0) {
      track("click_call", { link_location: where, phone: href.replace("tel:", "") });
    } else if (href.indexOf("wa.me") !== -1) {
      track("click_whatsapp", { link_location: where });
    } else if (href.indexOf("/book/") === 0) {
      var svc = "";
      try { svc = new URL(href, location.origin).searchParams.get("service") || ""; } catch (err) { svc = ""; }
      track("click_book", { link_location: where, service: svc });
    }
  }

  captureSource();
  document.addEventListener("click", onClick, true);
})();
