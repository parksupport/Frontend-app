import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IconProps {
  icon: any;
  url: string;
  className?: string;
}

export function FontIcon({ icon, url, className }: IconProps) {
  return (
    <div>
      <a href={url} className={className}>
        <FontAwesomeIcon icon={icon} />
      </a>
    </div>
  );
}

export function CalenderIcon() {
  return (
    <svg
      width="56"
      height="56"
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.6667 9.33325C9.08927 9.33325 7 11.4333 7 13.9999V46.6666C7 49.2332 9.08927 51.3333 11.6667 51.3333H25.6667H30.3333H44.3333C46.9117 51.3333 49 49.2332 49 46.6666V13.9999C49 11.4333 46.9117 9.33325 44.3333 9.33325H30.3333H25.6667H11.6667Z"
        fill="#BDC3C7"
      />
      <path
        d="M11.6667 7C9.08927 7 7 9.08927 7 11.6667V44.3333C7 46.9117 9.08927 49 11.6667 49H25.6667H30.3333H44.3333C46.9117 49 49 46.9117 49 44.3333V11.6667C49 9.08927 46.9117 7 44.3333 7H30.3333H25.6667H11.6667Z"
        fill="#ECF0F1"
      />
      <path
        d="M11.6667 7C9.08927 7 7 9.1 7 11.6667V18.6667H49V11.6667C49 9.1 46.9117 7 44.3333 7H30.3333H25.6667H11.6667Z"
        fill="#E74C3C"
      />
      <path
        d="M17.5 12.8333C17.5 13.2929 17.4095 13.748 17.2336 14.1726C17.0577 14.5973 16.7999 14.9831 16.4749 15.3081C16.1499 15.6331 15.764 15.8909 15.3394 16.0668C14.9148 16.2427 14.4596 16.3333 14 16.3333C13.5404 16.3333 13.0852 16.2427 12.6606 16.0668C12.236 15.8909 11.8501 15.6331 11.5251 15.3081C11.2001 14.9831 10.9423 14.5973 10.7664 14.1726C10.5905 13.748 10.5 13.2929 10.5 12.8333C10.5 12.3736 10.5905 11.9185 10.7664 11.4939C10.9423 11.0692 11.2001 10.6834 11.5251 10.3584C11.8501 10.0334 12.236 9.77556 12.6606 9.59967C13.0852 9.42378 13.5404 9.33325 14 9.33325C14.4596 9.33325 14.9148 9.42378 15.3394 9.59967C15.764 9.77556 16.1499 10.0334 16.4749 10.3584C16.7999 10.6834 17.0577 11.0692 17.2336 11.4939C17.4095 11.9185 17.5 12.3736 17.5 12.8333Z"
        fill="#C0392B"
      />
      <path
        d="M14.0001 2.33325C12.7114 2.33325 11.6667 3.37789 11.6667 4.66659V11.6666C11.6667 12.9553 12.7114 13.9999 14.0001 13.9999C15.2888 13.9999 16.3334 12.9553 16.3334 11.6666V4.66659C16.3334 3.37789 15.2888 2.33325 14.0001 2.33325Z"
        fill="#BDC3C7"
      />
      <path
        d="M45.5 12.8333C45.5 13.2929 45.4095 13.748 45.2336 14.1726C45.0577 14.5973 44.7999 14.9831 44.4749 15.3081C44.1499 15.6331 43.764 15.8909 43.3394 16.0668C42.9148 16.2427 42.4596 16.3333 42 16.3333C41.5404 16.3333 41.0852 16.2427 40.6606 16.0668C40.236 15.8909 39.8501 15.6331 39.5251 15.3081C39.2001 14.9831 38.9423 14.5973 38.7664 14.1726C38.5905 13.748 38.5 13.2929 38.5 12.8333C38.5 12.3736 38.5905 11.9185 38.7664 11.4939C38.9423 11.0692 39.2001 10.6834 39.5251 10.3584C39.8501 10.0334 40.236 9.77556 40.6606 9.59967C41.0852 9.42378 41.5404 9.33325 42 9.33325C42.4596 9.33325 42.9148 9.42378 43.3394 9.59967C43.764 9.77556 44.1499 10.0334 44.4749 10.3584C44.7999 10.6834 45.0577 11.0692 45.2336 11.4939C45.4095 11.9185 45.5 12.3736 45.5 12.8333Z"
        fill="#C0392B"
      />
      <path
        d="M42.0001 2.33325C40.7121 2.33325 39.6667 3.26659 39.6667 4.66659V11.6666C39.6667 12.8333 40.7121 13.9999 42.0001 13.9999C43.2881 13.9999 44.3334 12.8333 44.3334 11.6666V4.66659C44.3334 3.26659 43.2881 2.33325 42.0001 2.33325Z"
        fill="#BDC3C7"
      />
      <path
        d="M11.6667 25.6665V30.3332H16.3334V25.6665H11.6667ZM18.6667 25.6665V30.3332H23.3334V25.6665H18.6667ZM25.6667 25.6665V30.3332H30.3334V25.6665H25.6667ZM32.6667 25.6665V30.3332H37.3334V25.6665H32.6667ZM39.6667 25.6665V30.3332H44.3334V25.6665H39.6667Z"
        fill="#BDC3C7"
      />
      <path
        d="M11.6667 32.6665V37.3332H16.3334V32.6665H11.6667ZM18.6667 32.6665V37.3332H23.3334V32.6665H18.6667ZM25.6667 32.6665V37.3332H30.3334V32.6665H25.6667ZM32.6667 32.6665V37.3332H37.3334V32.6665H32.6667ZM39.6667 32.6665V37.3332H44.3334V32.6665H39.6667Z"
        fill="#BDC3C7"
      />
      <path
        d="M11.6667 39.6665V44.3332H16.3334V39.6665H11.6667ZM18.6667 39.6665V44.3332H23.3334V39.6665H18.6667ZM25.6667 39.6665V44.3332H30.3334V39.6665H25.6667ZM32.6667 39.6665V44.3332H37.3334V39.6665H32.6667ZM39.6667 39.6665V44.3332H44.3334V39.6665H39.6667Z"
        fill="#BDC3C7"
      />
      <path d="M49 18.6665H7V20.9998H49V18.6665Z" fill="#C0392B" />
    </svg>
  );
}

export function InstantNoficationIcon() {
  return (
    <svg
      width="56"
      height="56"
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M28 14C26.9617 14 25.9466 13.6921 25.0833 13.1152C24.2199 12.5383 23.547 11.7184 23.1496 10.7591C22.7523 9.79978 22.6483 8.74418 22.8509 7.72578C23.0535 6.70738 23.5535 5.77192 24.2877 5.03769C25.0219 4.30347 25.9574 3.80345 26.9758 3.60088C27.9942 3.39831 29.0498 3.50227 30.0091 3.89963C30.9684 4.29699 31.7883 4.9699 32.3652 5.83326C32.9421 6.69662 33.25 7.71165 33.25 8.75C33.25 10.1424 32.6969 11.4777 31.7123 12.4623C30.7277 13.4469 29.3924 14 28 14ZM28 7C27.6539 7 27.3155 7.10264 27.0278 7.29493C26.74 7.48722 26.5157 7.76054 26.3832 8.08031C26.2508 8.40008 26.2161 8.75194 26.2836 9.09141C26.3512 9.43088 26.5178 9.7427 26.7626 9.98744C27.0073 10.2322 27.3191 10.3989 27.6586 10.4664C27.9981 10.5339 28.3499 10.4992 28.6697 10.3668C28.9895 10.2343 29.2628 10.01 29.4551 9.72225C29.6474 9.43446 29.75 9.09612 29.75 8.75C29.75 8.28587 29.5656 7.84075 29.2374 7.51257C28.9093 7.18438 28.4641 7 28 7Z"
        fill="#0E6AE0"
      />
      <path
        d="M33.25 42H22.75C22.2859 42 21.8408 42.1844 21.5126 42.5126C21.1844 42.8408 21 43.2859 21 43.75V45.5C21 47.3565 21.7375 49.137 23.0503 50.4497C24.363 51.7625 26.1435 52.5 28 52.5C29.8565 52.5 31.637 51.7625 32.9497 50.4497C34.2625 49.137 35 47.3565 35 45.5V43.75C35 43.2859 34.8156 42.8408 34.4874 42.5126C34.1592 42.1844 33.7141 42 33.25 42Z"
        fill="#0EE0BA"
      />
      <path
        d="M49.7874 42.1925C47.9698 41.2907 46.4409 39.8981 45.3739 38.1723C44.3069 36.4465 43.7443 34.4565 43.7499 32.4275V26.25C43.7499 22.0728 42.0905 18.0668 39.1368 15.1131C36.1831 12.1594 32.177 10.5 27.9999 10.5C23.8227 10.5 19.8167 12.1594 16.863 15.1131C13.9093 18.0668 12.2499 22.0728 12.2499 26.25V32.4275C12.2554 34.4565 11.6929 36.4465 10.6259 38.1723C9.55884 39.8981 8.02999 41.2907 6.21238 42.1925C5.86361 42.3712 5.5849 42.6617 5.4209 43.0176C5.25689 43.3735 5.21708 43.7742 5.30784 44.1554C5.39861 44.5366 5.6147 44.8763 5.92149 45.1201C6.22828 45.3639 6.60802 45.4977 6.99988 45.5H48.9999C49.3917 45.4977 49.7715 45.3639 50.0783 45.1201C50.3851 44.8763 50.6012 44.5366 50.6919 44.1554C50.7827 43.7742 50.7429 43.3735 50.5789 43.0176C50.4149 42.6617 50.1362 42.3712 49.7874 42.1925Z"
        fill="#0593FF"
      />
    </svg>
  );
}
export function DashboardIcon() {
  return (
    <svg
      width="56"
      height="56"
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M23.3333 30.3333H9.33333C8.71449 30.3333 8.121 30.5792 7.68342 31.0168C7.24583 31.4543 7 32.0478 7 32.6667V46.6667C7 47.2855 7.24583 47.879 7.68342 48.3166C8.121 48.7542 8.71449 49 9.33333 49H23.3333C23.9522 49 24.5457 48.7542 24.9832 48.3166C25.4208 47.879 25.6667 47.2855 25.6667 46.6667V32.6667C25.6667 32.0478 25.4208 31.4543 24.9832 31.0168C24.5457 30.5792 23.9522 30.3333 23.3333 30.3333ZM21 44.3333H11.6667V35H21V44.3333ZM46.6667 7H32.6667C32.0478 7 31.4543 7.24583 31.0168 7.68342C30.5792 8.121 30.3333 8.71449 30.3333 9.33333V23.3333C30.3333 23.9522 30.5792 24.5457 31.0168 24.9832C31.4543 25.4208 32.0478 25.6667 32.6667 25.6667H46.6667C47.2855 25.6667 47.879 25.4208 48.3166 24.9832C48.7542 24.5457 49 23.9522 49 23.3333V9.33333C49 8.71449 48.7542 8.121 48.3166 7.68342C47.879 7.24583 47.2855 7 46.6667 7ZM44.3333 21H35V11.6667H44.3333V21ZM46.6667 37.3333H42V32.6667C42 32.0478 41.7542 31.4543 41.3166 31.0168C40.879 30.5792 40.2855 30.3333 39.6667 30.3333C39.0478 30.3333 38.4543 30.5792 38.0167 31.0168C37.5792 31.4543 37.3333 32.0478 37.3333 32.6667V37.3333H32.6667C32.0478 37.3333 31.4543 37.5792 31.0168 38.0167C30.5792 38.4543 30.3333 39.0478 30.3333 39.6667C30.3333 40.2855 30.5792 40.879 31.0168 41.3166C31.4543 41.7542 32.0478 42 32.6667 42H37.3333V46.6667C37.3333 47.2855 37.5792 47.879 38.0167 48.3166C38.4543 48.7542 39.0478 49 39.6667 49C40.2855 49 40.879 48.7542 41.3166 48.3166C41.7542 47.879 42 47.2855 42 46.6667V42H46.6667C47.2855 42 47.879 41.7542 48.3166 41.3166C48.7542 40.879 49 40.2855 49 39.6667C49 39.0478 48.7542 38.4543 48.3166 38.0167C47.879 37.5792 47.2855 37.3333 46.6667 37.3333ZM23.3333 7H9.33333C8.71449 7 8.121 7.24583 7.68342 7.68342C7.24583 8.121 7 8.71449 7 9.33333V23.3333C7 23.9522 7.24583 24.5457 7.68342 24.9832C8.121 25.4208 8.71449 25.6667 9.33333 25.6667H23.3333C23.9522 25.6667 24.5457 25.4208 24.9832 24.9832C25.4208 24.5457 25.6667 23.9522 25.6667 23.3333V9.33333C25.6667 8.71449 25.4208 8.121 24.9832 7.68342C24.5457 7.24583 23.9522 7 23.3333 7ZM21 21H11.6667V11.6667H21V21Z"
        fill="#6563FF"
      />
    </svg>
  );
}

export function EmailIcon() {
  return (
    <svg
      width="20"
      height="16"
      viewBox="0 0 20 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M15.8342 15.5C17.6752 15.5 19.1675 14.0076 19.1675 12.1667V4.68557C19.1678 4.67283 19.1678 4.66005 19.1675 4.64725V3.83333C19.1675 1.99238 17.6752 0.5 15.8342 0.5H4.16754C2.32659 0.5 0.834206 1.99238 0.834206 3.83333V4.64726C0.83391 4.66005 0.833911 4.67282 0.834206 4.68556V12.1667C0.834206 14.0076 2.32659 15.5 4.16754 15.5H15.8342ZM2.50087 12.1667C2.50087 13.0871 3.24706 13.8333 4.16754 13.8333H15.8342C16.7547 13.8333 17.5009 13.0871 17.5009 12.1667V5.89753L11.2388 8.40234C10.4441 8.72022 9.55761 8.72022 8.7629 8.40234L2.50087 5.89753V12.1667ZM10.6199 6.85488L17.5009 4.10247V3.83333C17.5009 2.91286 16.7547 2.16667 15.8342 2.16667H4.16754C3.24706 2.16667 2.50087 2.91286 2.50087 3.83333V4.10247L9.38189 6.85488C9.77924 7.01382 10.2225 7.01382 10.6199 6.85488Z"
        fill="#667185"
      />
    </svg>
  );
}
