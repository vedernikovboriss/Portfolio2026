import React from "react";
import Image from "next/image";

const heroImgBase =
  "h-[min(38vh,260px)] w-auto filter sm:h-[min(46vh,340px)] md:h-[min(52vh,480px)] lg:h-[700px]";
const heroImgOpacity = "opacity-35 sm:opacity-40 md:opacity-50";

const HeroSection = () => {
  return (
    <section className="relative isolate flex min-h-dvh flex-col justify-between gap-6 px-[2vw] pb-8 pt-24 sm:gap-8 sm:pb-[2vw] sm:pt-28 md:pt-32 lg:pt-36">
      <div className="relative z-10 flex max-w-full flex-col gap-3 sm:gap-4 lg:max-w-3xl">
        <span className="subtitle-small">Web Designer & Developer</span>
        <h1 className="text-balance text-3xl font-medium leading-[1.12] tracking-wide sm:text-4xl sm:leading-[1.14] md:text-5xl md:leading-[1.15]">
          I partner up with different brands and studios creating an immersive
          experience that drive results and closely align with the business’
          identity
        </h1>
      </div>

      <div className="relative z-10 flex items-center gap-4">
        <span className="subtitle-small">(Scroll Down)</span>
      </div>
      <div className="pointer-events-none absolute bottom-0 right-0 z-0 max-w-[92vw] sm:max-w-none">
        <Image
          src="/heroImgBW.png"
          alt="Boris Vedernikov"
          className={`${heroImgBase} ${heroImgOpacity} grayscale`}
          width={1000}
          height={1000}
          sizes="(max-width: 768px) 85vw, (max-width: 1024px) 45vw, 40vw"
          priority
        />
      </div>
      <div className="pointer-events-none absolute bottom-1 right-3 z-2 max-w-[92vw] sm:bottom-2 sm:right-4 sm:max-w-none">
        <Image
          src="/heroImgBW.png"
          alt=""
          aria-hidden
          className={`${heroImgBase} ${heroImgOpacity}`}
          width={1000}
          height={1000}
          sizes="(max-width: 768px) 85vw, (max-width: 1024px) 45vw, 40vw"
          priority
        />
      </div>
    </section>
  );
};

export default HeroSection;

export function HeroSVG() {
  return (
    <svg
      width="100"
      height="100"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M54.8528 10.1123C54.8528 9.56003 54.4051 9.11232 53.8528 9.11232L44.8528 9.11232C44.3005 9.11232 43.8528 9.56003 43.8528 10.1123C43.8528 10.6646 44.3005 11.1123 44.8528 11.1123L52.8528 11.1123L52.8528 19.1123C52.8528 19.6646 53.3005 20.1123 53.8528 20.1123C54.4051 20.1123 54.8528 19.6646 54.8528 19.1123L54.8528 10.1123ZM31.9827 31.9824L32.6898 32.6895L54.5599 10.8194L53.8528 10.1123L53.1457 9.40521L31.2756 31.2753L31.9827 31.9824Z"
        fill="var(--accent)"
      />
      <path
        d="M63.7071 32.7071C64.0976 32.3166 64.0976 31.6834 63.7071 31.2929L57.3431 24.9289C56.9526 24.5384 56.3195 24.5384 55.9289 24.9289C55.5384 25.3195 55.5384 25.9526 55.9289 26.3431L61.5858 32L55.9289 37.6569C55.5384 38.0474 55.5384 38.6805 55.9289 39.0711C56.3195 39.4616 56.9526 39.4616 57.3431 39.0711L63.7071 32.7071ZM32 32V33H63V32V31H32V32Z"
        fill="var(--accent)"
      />
      <path
        d="M53.8528 54.853C54.4051 54.853 54.8528 54.4053 54.8528 53.853L54.8528 44.853C54.8528 44.3007 54.4051 43.853 53.8528 43.853C53.3005 43.853 52.8528 44.3007 52.8528 44.853L52.8528 52.853L44.8528 52.853C44.3005 52.853 43.8528 53.3007 43.8528 53.853C43.8528 54.4053 44.3005 54.853 44.8528 54.853L53.8528 54.853ZM31.9827 31.9829L31.2756 32.69L53.1457 54.5601L53.8528 53.853L54.5599 53.1459L32.6898 31.2758L31.9827 31.9829Z"
        fill="var(--accent)"
      />
      <path
        d="M31.2929 63.7071C31.6834 64.0976 32.3166 64.0976 32.7071 63.7071L39.0711 57.3431C39.4616 56.9526 39.4616 56.3195 39.0711 55.9289C38.6805 55.5384 38.0474 55.5384 37.6569 55.9289L32 61.5858L26.3431 55.9289C25.9526 55.5384 25.3195 55.5384 24.9289 55.9289C24.5384 56.3195 24.5384 56.9526 24.9289 57.3431L31.2929 63.7071ZM32 32H31V63H32H33V32H32Z"
        fill="var(--accent)"
      />
      <path
        d="M9.11256 53.8525C9.11256 54.4048 9.56028 54.8525 10.1126 54.8525L19.1126 54.8525C19.6648 54.8525 20.1126 54.4048 20.1126 53.8525C20.1126 53.3002 19.6648 52.8525 19.1126 52.8525L11.1126 52.8525L11.1126 44.8525C11.1126 44.3002 10.6648 43.8525 10.1126 43.8525C9.56028 43.8525 9.11256 44.3002 9.11256 44.8525L9.11256 53.8525ZM31.9827 31.9824L31.2756 31.2753L9.40545 53.1454L10.1126 53.8525L10.8197 54.5596L32.6898 32.6895L31.9827 31.9824Z"
        fill="var(--accent)"
      />
      <path
        d="M0.292892 31.2929C-0.0976295 31.6834 -0.0976295 32.3166 0.292892 32.7071L6.65685 39.0711C7.04738 39.4616 7.68054 39.4616 8.07107 39.0711C8.46159 38.6805 8.46159 38.0474 8.07107 37.6569L2.41421 32L8.07107 26.3431C8.46159 25.9526 8.46159 25.3195 8.07107 24.9289C7.68054 24.5384 7.04738 24.5384 6.65685 24.9289L0.292892 31.2929ZM32 32V31H1V32V33H32V32Z"
        fill="var(--accent)"
      />
      <path
        d="M10.1126 9.11232C9.56028 9.11232 9.11256 9.56003 9.11256 10.1123L9.11256 19.1123C9.11256 19.6646 9.56028 20.1123 10.1126 20.1123C10.6648 20.1123 11.1126 19.6646 11.1126 19.1123L11.1126 11.1123L19.1126 11.1123C19.6648 11.1123 20.1126 10.6646 20.1126 10.1123C20.1126 9.56003 19.6648 9.11232 19.1126 9.11232L10.1126 9.11232ZM31.9827 31.9824L32.6898 31.2753L10.8197 9.40521L10.1126 10.1123L9.40545 10.8194L31.2756 32.6895L31.9827 31.9824Z"
        fill="var(--accent)"
      />
      <path
        d="M32.7071 0.292892C32.3166 -0.0976295 31.6834 -0.0976295 31.2929 0.292892L24.9289 6.65685C24.5384 7.04738 24.5384 7.68054 24.9289 8.07107C25.3195 8.46159 25.9526 8.46159 26.3431 8.07107L32 2.41421L37.6569 8.07107C38.0474 8.46159 38.6805 8.46159 39.0711 8.07107C39.4616 7.68054 39.4616 7.04738 39.0711 6.65685L32.7071 0.292892ZM32 32H33V1H32H31V32H32Z"
        fill="var(--accent)"
      />
    </svg>
  );
}
