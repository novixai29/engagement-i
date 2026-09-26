/* ==========================================
   MINIMAL LUXURY
   رامي & لينا

   14 مايو 2027
   6:30 مساء
========================================== */


/* ==========================================
   EVENT
========================================== */

const EVENT = {

  start:
    "2027-05-14T18:30:00+03:00",

  end:
    "2027-05-14T21:30:00+03:00",

  titleAR:
    "حفل خطوبة رامي ولينا",

  titleEN:
    "Rami & Lina Engagement",

  venueAR:
    "قاعة إليت - الموصل - نينوى",

  venueEN:
    "Elite Hall - Mosul - Nineveh"

};


const engagementDate =
  new Date(
    EVENT.start
  ).getTime();



/* ==========================================
   ELEMENTS
========================================== */

const body =
  document.body;


const languageButton =
  document.getElementById(
    "languageButton"
  );


const languageButtonText =
  document.getElementById(
    "languageButtonText"
  );


const themeButton =
  document.getElementById(
    "themeButton"
  );


const themeIcon =
  document.getElementById(
    "themeIcon"
  );


const calendarButton =
  document.getElementById(
    "calendarButton"
  );


const shareButton =
  document.getElementById(
    "shareButton"
  );


const shareMessage =
  document.getElementById(
    "shareMessage"
  );


const cursorGlow =
  document.getElementById(
    "cursorGlow"
  );


const header =
  document.querySelector(
    ".top-header"
  );



/* ==========================================
   LANGUAGE
========================================== */

let currentLanguage =
  "ar";


let languageTimer =
  null;



function translatePage(
  language
) {

  currentLanguage =
    language;


  const elements =
    document.querySelectorAll(
      "[data-ar][data-en]"
    );


  elements.forEach(
    element => {

      const value =
        element.getAttribute(
          `data-${language}`
        );


      element.textContent =
        value;

    }
  );


  if (
    language === "ar"
  ) {

    document.documentElement.lang =
      "ar";


    document.documentElement.dir =
      "rtl";


    body.classList.remove(
      "en"
    );


    body.classList.add(
      "ar"
    );


    languageButtonText.textContent =
      "EN";

  } else {

    document.documentElement.lang =
      "en";


    document.documentElement.dir =
      "ltr";


    body.classList.remove(
      "ar"
    );


    body.classList.add(
      "en"
    );


    languageButtonText.textContent =
      "AR";

  }

}



function toggleLanguage() {

  const nextLanguage =
    currentLanguage === "ar"
      ? "en"
      : "ar";


  translatePage(
    nextLanguage
  );


  restartAutomaticLanguageSwitch();

}



languageButton.addEventListener(
  "click",
  toggleLanguage
);



/* ==========================================
   AUTO LANGUAGE SWITCH
========================================== */

function startAutomaticLanguageSwitch() {

  languageTimer =
    setInterval(
      () => {

        const nextLanguage =
          currentLanguage === "ar"
            ? "en"
            : "ar";


        translatePage(
          nextLanguage
        );

      },
      12000
    );

}



function restartAutomaticLanguageSwitch() {

  clearInterval(
    languageTimer
  );


  startAutomaticLanguageSwitch();

}



startAutomaticLanguageSwitch();



/* ==========================================
   THEME

   الوضع الداكن هو الافتراضي
========================================== */

function applyTheme(
  theme
) {

  if (
    theme === "light"
  ) {

    body.classList.remove(
      "dark-mode"
    );


    themeIcon.className =
      "fa-regular fa-moon";


    document
      .querySelector(
        'meta[name="theme-color"]'
      )
      .setAttribute(
        "content",
        "#f4f3ef"
      );

  } else {

    body.classList.add(
      "dark-mode"
    );


    themeIcon.className =
      "fa-regular fa-sun";


    document
      .querySelector(
        'meta[name="theme-color"]'
      )
      .setAttribute(
        "content",
        "#090909"
      );

  }

}



/*
   إذا المستخدم ما اختار سابقاً أي وضع،
   يبدأ الموقع Dark.
*/

const savedTheme =
  localStorage.getItem(
    "minimal-theme"
  );


if (
  savedTheme === "light"
) {

  applyTheme(
    "light"
  );

} else {

  applyTheme(
    "dark"
  );

}



themeButton.addEventListener(
  "click",
  () => {

    const currentlyDark =
      body.classList.contains(
        "dark-mode"
      );


    const nextTheme =
      currentlyDark
        ? "light"
        : "dark";


    applyTheme(
      nextTheme
    );


    localStorage.setItem(
      "minimal-theme",
      nextTheme
    );

  }
);



/* ==========================================
   CURSOR GLOW
========================================== */

window.addEventListener(
  "mousemove",
  event => {

    cursorGlow.style.left =
      `${event.clientX}px`;


    cursorGlow.style.top =
      `${event.clientY}px`;

  }
);



/* ==========================================
   HEADER SCROLL
========================================== */

function updateHeader() {

  if (
    window.scrollY >
    25
  ) {

    header.classList.add(
      "scrolled"
    );

  } else {

    header.classList.remove(
      "scrolled"
    );

  }

}



window.addEventListener(
  "scroll",
  updateHeader,
  {
    passive: true
  }
);


updateHeader();



/* ==========================================
   PARALLAX TYPOGRAPHY
========================================== */

const parallaxElements =
  document.querySelectorAll(
    ".parallax-text"
  );


let parallaxTicking =
  false;



function updateParallax() {

  parallaxElements.forEach(
    element => {

      const parent =
        element.parentElement;


      const rect =
        parent.getBoundingClientRect();


      const speed =
        Number(
          element.dataset.speed
        ) || 0.05;


      const center =
        rect.top +
        rect.height / 2;


      const viewportCenter =
        window.innerHeight / 2;


      const distance =
        center -
        viewportCenter;


      const offset =
        distance *
        speed;


      element.style.marginTop =
        `${offset}px`;

    }
  );


  parallaxTicking =
    false;

}



window.addEventListener(
  "scroll",
  () => {

    if (
      parallaxTicking
    ) {

      return;

    }


    parallaxTicking =
      true;


    requestAnimationFrame(
      updateParallax
    );

  },
  {
    passive: true
  }
);


updateParallax();



/* ==========================================
   PHOTO PARALLAX
========================================== */

const heroImage =
  document.querySelector(
    ".hero-background-image"
  );


const storyImage =
  document.querySelector(
    ".story-background-image"
  );



function updatePhotoParallax() {

  /*
     الصورة الأولى
  */

  const heroSection =
    document.querySelector(
      ".hero-section"
    );


  const heroRect =
    heroSection
      .getBoundingClientRect();


  if (
    heroRect.bottom > 0 &&
    heroRect.top <
    window.innerHeight
  ) {

    const offset =
      heroRect.top *
      -0.06;


    heroImage.style.transform =
      `scale(1.05) translateY(${offset}px)`;

  }


  /*
     الصورة الثانية
  */

  const storySection =
    document.querySelector(
      ".cinematic-story-section"
    );


  const storyRect =
    storySection
      .getBoundingClientRect();


  if (
    storyRect.bottom > 0 &&
    storyRect.top <
    window.innerHeight
  ) {

    const offset =
      storyRect.top *
      -0.045;


    storyImage.style.transform =
      `scale(1.07) translateY(${offset}px)`;

  }

}



window.addEventListener(
  "scroll",
  updatePhotoParallax,
  {
    passive: true
  }
);


updatePhotoParallax();



/* ==========================================
   REVEAL
========================================== */

const revealElements =
  document.querySelectorAll(
    ".reveal"
  );


const revealObserver =
  new IntersectionObserver(
    entries => {

      entries.forEach(
        entry => {

          if (
            entry.isIntersecting
          ) {

            entry.target
              .classList
              .add(
                "visible"
              );


            revealObserver
              .unobserve(
                entry.target
              );

          }

        }
      );

    },
    {

      threshold:
        0.13,

      rootMargin:
        "0px 0px -35px 0px"

    }
  );


revealElements.forEach(
  element => {

    revealObserver.observe(
      element
    );

  }
);



/* ==========================================
   COUNTDOWN
========================================== */

function updateCountdown() {

  const now =
    Date.now();


  const distance =
    engagementDate -
    now;



  if (
    distance <= 0
  ) {

    document.getElementById(
      "days"
    ).textContent =
      "000";


    document.getElementById(
      "hours"
    ).textContent =
      "00";


    document.getElementById(
      "minutes"
    ).textContent =
      "00";


    document.getElementById(
      "seconds"
    ).textContent =
      "00";


    const message =
      document.getElementById(
        "countdownMessage"
      );


    message.textContent =
      currentLanguage === "ar"
        ? "حان موعدنا"
        : "THE DAY IS HERE";


    return;

  }



  const days =
    Math.floor(
      distance /
      (
        1000 *
        60 *
        60 *
        24
      )
    );


  const hours =
    Math.floor(
      (
        distance %
        (
          1000 *
          60 *
          60 *
          24
        )
      )
      /
      (
        1000 *
        60 *
        60
      )
    );


  const minutes =
    Math.floor(
      (
        distance %
        (
          1000 *
          60 *
          60
        )
      )
      /
      (
        1000 *
        60
      )
    );


  const seconds =
    Math.floor(
      (
        distance %
        (
          1000 *
          60
        )
      )
      /
      1000
    );


  document.getElementById(
    "days"
  ).textContent =
    String(
      days
    ).padStart(
      3,
      "0"
    );


  document.getElementById(
    "hours"
  ).textContent =
    String(
      hours
    ).padStart(
      2,
      "0"
    );


  document.getElementById(
    "minutes"
  ).textContent =
    String(
      minutes
    ).padStart(
      2,
      "0"
    );


  document.getElementById(
    "seconds"
  ).textContent =
    String(
      seconds
    ).padStart(
      2,
      "0"
    );

}



updateCountdown();


setInterval(
  updateCountdown,
  1000
);



/* ==========================================
   ICS DATE FORMAT
========================================== */

function formatICSDate(
  date
) {

  return date
    .toISOString()
    .replace(
      /[-:]/g,
      ""
    )
    .replace(
      /\.\d{3}/,
      ""
    );

}



/* ==========================================
   ADD TO CALENDAR
========================================== */

function addToCalendar() {

  const start =
    new Date(
      EVENT.start
    );


  const end =
    new Date(
      EVENT.end
    );


  const content =
`BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Minimal Luxury Engagement//AR
BEGIN:VEVENT
UID:${Date.now()}@minimalengagement
DTSTAMP:${formatICSDate(new Date())}
DTSTART:${formatICSDate(start)}
DTEND:${formatICSDate(end)}
SUMMARY:${EVENT.titleAR}
LOCATION:${EVENT.venueAR}
DESCRIPTION:ندعوكم لمشاركتنا بداية فصل جديد من حياتنا.
END:VEVENT
END:VCALENDAR`;


  const blob =
    new Blob(
      [content],
      {
        type:
          "text/calendar;charset=utf-8"
      }
    );


  const url =
    URL.createObjectURL(
      blob
    );


  const link =
    document.createElement(
      "a"
    );


  link.href =
    url;


  link.download =
    "rami-lina-engagement.ics";


  document.body.appendChild(
    link
  );


  link.click();


  document.body.removeChild(
    link
  );


  URL.revokeObjectURL(
    url
  );

}



calendarButton.addEventListener(
  "click",
  addToCalendar
);



/* ==========================================
   SHARE
========================================== */

async function shareInvitation() {

  const shareData = {

    title:
      currentLanguage === "ar"
        ? EVENT.titleAR
        : EVENT.titleEN,

    text:
      currentLanguage === "ar"

        ? "ندعوكم لمشاركتنا بداية فصل جديد من حياتنا."

        : "We invite you to share the beginning of our new chapter.",

    url:
      window.location.href

  };


  if (
    navigator.share
  ) {

    try {

      await navigator.share(
        shareData
      );

    } catch (error) {

      console.log(
        "Share cancelled"
      );

    }


    return;

  }


  try {

    await navigator
      .clipboard
      .writeText(
        window.location.href
      );


    shareMessage.textContent =
      currentLanguage === "ar"

        ? "تم نسخ رابط الدعوة"

        : "Invitation link copied";


    setTimeout(
      () => {

        shareMessage.textContent =
          "";

      },
      2500
    );

  } catch (error) {

    shareMessage.textContent =
      currentLanguage === "ar"

        ? "تعذر نسخ الرابط"

        : "Unable to copy link";

  }

}



shareButton.addEventListener(
  "click",
  shareInvitation
);
