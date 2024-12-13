"use client"
import { useRouter } from "next/navigation";

import Header from "@/components/Header";
import { useRef, useState } from "react";

export default function Privacy() {
    const router = useRouter()
  const [hasTicket, setHasTicket] = useState(null);
  const [searchResult, setSearchResult] = useState(false);


    const handleSearch = () => {
        const hasContraventions = true;
    
        if (hasContraventions) {
          setHasTicket(false);
        } else {
          setHasTicket(true);
        }
        setSearchResult(true);
      };
    
      const home = useRef(null);
      const search = useRef(null);
      const features = useRef(null);
      const faq = useRef(null);
      const subscriptionPlan = useRef(null);
    
      const scrollToSection = (elementRef) => {
        if (elementRef && elementRef.current) {
          window.scrollTo({
            top: elementRef.current.offsetTop,
            behavior: "smooth",
          });
        }
      };
    return (
      <div className="p-10">
  <Header
        scrollToSection={scrollToSection}
        homeRef={home}
        searchRef={search}
        featuresRef={features}
        faqRef={faq}
        subPlanRef={subscriptionPlan}
        router={router}
      />   
          <div className="flex flex-col justify-center items-center mt-[10rem]">
          <h1 className="text-2xl font-bold">Privacy Statement</h1>
          <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Introduction</h2>
        <p>
          At <strong>[Your Company Name]</strong>, we are committed to protecting your personal
          information and your right to privacy. This Privacy Statement explains how we
          collect, use, and safeguard your data when you interact with our website, services,
          and applications.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Information We Collect</h2>
        <ul className="list-disc ml-6">
          <li>
            <strong>Personal Information</strong>: Such as your name, email address, phone
            number, and payment details, provided when you create an account or make a
            purchase.
          </li>
          <li>
            <strong>Usage Data</strong>: Information about how you interact with our website,
            such as IP address, browser type, and pages visited.
          </li>
          <li>
            <strong>Cookies and Tracking</strong>: Data collected through cookies or similar
            technologies to enhance your browsing experience.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">How We Use Your Information</h2>
        <p>We use the information we collect for the following purposes:</p>
        <ul className="list-decimal ml-6">
          <li>
            <strong>Service Delivery</strong>: To provide and maintain our services, including
            processing transactions and customer support.
          </li>
          <li>
            <strong>Personalization</strong>: To tailor content, features, and recommendations
            based on your preferences.
          </li>
          <li>
            <strong>Security</strong>: To protect our platform and your information from
            unauthorized access, fraud, or abuse.
          </li>
          <li>
            <strong>Compliance</strong>: To fulfill our legal obligations and respond to
            lawful requests from authorities.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">How We Share Your Information</h2>
        <p>
          We do not sell or rent your personal information to third parties. However, we may
          share your data with:
        </p>
        <ul className="list-disc ml-6">
          <li>
            <strong>Service Providers</strong>: Trusted third parties who assist in delivering
            our services (e.g., payment processors, hosting providers).
          </li>
          <li>
            <strong>Legal Authorities</strong>: When required by law or to protect our legal
            rights.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Your Rights</h2>
        <p>You have the following rights regarding your personal information:</p>
        <ul className="list-disc ml-6">
          <li>
            <strong>Access and Correction</strong>: Request access to or corrections of your
            personal data.
          </li>
          <li>
            <strong>Data Portability</strong>: Receive your data in a structured, commonly used
            format.
          </li>
          <li>
            <strong>Erasure</strong>: Request deletion of your personal data, subject to
            certain conditions.
          </li>
          <li>
            <strong>Opt-Out</strong>: Decline marketing communications or data collection
            through cookies.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Security Measures</h2>
        <p>
          We implement robust security measures to safeguard your data, including encryption,
          secure servers, and access controls. However, no system is completely secure, and we
          encourage you to take precautions to protect your information.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Updates to This Policy</h2>
        <p>
          We may update this Privacy Statement periodically to reflect changes in our
          practices or legal requirements. We encourage you to review this page regularly for
          the latest updates.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Contact Us</h2>
        <p>
          If you have any questions or concerns about this Privacy Statement, please contact
          us at:
        </p>
        <ul className="list-disc ml-6">
          <li>
            <strong>Email</strong>: <a href="mailto:support@yourcompany.com">support@yourcompany.com</a>
          </li>
          <li>
            <strong>Phone</strong>: +1-800-123-4567
          </li>
        </ul>
      </section>
          </div>
      </div>
    );
  }
  