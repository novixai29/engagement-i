/* ==========================================
   MINIMAL LUXURY

   رامي & لينا

   14 مايو 2027
   الساعة 6:30 مساء
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


const animatedNames =
  document.getElementById(
    "animatedNames"
  );


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

      const newText =
        element.getAttribute(
          `data-${language}`
        );


      /*
        أسماء العروسين نتعامل وياها
        بوظيفة الأنيميشن بشكل منفصل.
      */

      if (
        element.id ===
        "animatedNames"
      ) {

        return;

      }


      element.textContent =
        newText;

    }
  );


  if (
    language ===
    "ar"
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


  animateNames();

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
   AUTOMATIC AR / EN
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
   LETTER BY LETTER NAMES
========================================== */

function animateNames() {

  const text =
    animatedNames.getAttribute(
      `data-${currentLanguage}`
    );


  animatedNames.innerHTML =
    "";


  const characters =
    Array.from(
      text
    );


  characters.forEach(
    (character, index) => {

      const span =
        document.createElement(
          "span"
        );


      span.className =
        "name-letter";


      if (
        character === " "
      ) {

        span.innerHTML =
          "&nbsp;";

      } else {

        span.textContent =
          character;

      }


      animatedNames.appendChild(
        span
      );


      setTimeout(
        () => {

          span.classList.add(
            "visible"
          );

        },
        90 * index
      );

    }
  );

}



animateNames();



/* ==========================================
   DARK MODE
========================================== */

function updateThemeIcon() {

  const dark =
    body.classList.contains(
      "dark-mode"
    );


  if (
    dark
  ) {

    themeIcon.className =
      "fa-regular fa-sun";

  } else {

    themeIcon.className =
      "fa-regular fa-moon";

  }

}



themeButton.addEventListener(
  "click",
  () => {

    body.classList.toggle(
      "dark-mode"
    );


    const dark =
      body.classList.contains(
        "dark-mode"
      );


    localStorage.setItem(
      "minimal-theme",
      dark
        ? "dark"
        : "light"
    );


    updateThemeIcon();

  }
);



const savedTheme =
  localStorage.getItem(
    "minimal-theme"
  );


if (
  savedTheme ===
  "dark"
) {

  body.classList.add(
    "dark-mode"
  );

}


updateThemeIcon();



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
   HEADER
========================================== */

window.addEventListener(
  "scroll",
  () => {

    if (
      window.scrollY > 25
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
);



/* ==========================================
   PARALLAX TYPOGRAPHY
========================================== */

const parallaxElements =
  document.querySelectorAll(
    ".parallax-text"
  );


function updateParallax() {

  const scrollY =
    window.scrollY;


  parallaxElements.forEach(
    element => {

      const speed =
        Number(
          element.dataset.speed
        ) || 0.05;


      const rect =
        element.parentElement
          .getBoundingClientRect();


      const center =
        rect.top +
        rect.height / 2;


      const viewportCenter =
        window.innerHeight / 2;


      const distance =
        center -
        viewportCenter;


      /*
        نستخدم CSS variable حتى ما نخرب
        transform الأصلي للعنصر.
      */

      const offset =
        distance * speed;


      element.style.marginTop =
        `${offset}px`;

    }
  );

}



window.addEventListener(
  "scroll",
  updateParallax,
  {
    passive: true
  }
);


updateParallax();



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

            entry.target.classList.add(
              "visible"
            );


            revealObserver.unobserve(
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
      ) /
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
      ) /
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
      ) /
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
