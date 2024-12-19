"use client"
import { useRouter } from "next/navigation";

import Header from "@/components/Header";
import { useRef, useState } from "react";
import Footer from "@/components/Footer";
import { groteskText, groteskTextMedium } from "../fonts";

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
    <div className="">
      <Header
        scrollToSection={scrollToSection}
        homeRef={home}
        searchRef={search}
        featuresRef={features}
        faqRef={faq}
        subPlanRef={subscriptionPlan}
        router={router}
      />
      <main className="flex justify-center mb-[109px]">
        <div className="max-w-[1224px] w-full flex flex-col justify-center mt-[4.5rem] gap-[24px] px-[30px]">


          <section >


            <h1 className={`text-[#000000] text-clamp-xl m-0 p-0 text-center leading-[84px] ${groteskTextMedium.className}`}>Terms and legal conditions</h1>
            <p className={`text-[#000000] text-clamp-md m-0 p-0  ${groteskText.className}`}>By accessing our website and/or using our services, you agree to be bound by the following terms and conditions.
              If you do not agree to be bound by these terms, you should leave the website immediately and refrain from using our services.
              Any changes to this policy will be posted on this page. By accessing our website after such changes are posted, you indicate your acceptance of the revised policy. You should check this page regularly to ensure you are always aware of our terms and conditions.
              Awwwards does not guarantee the accuracy, reliability or continuity of any of the information on this website. The content and services offered on this website are for general purposes only and are not intended to address your individual requirements.
              All material contained on this website is the property of Awwwards. All rights are reserved and any unauthorized use or reproduction is strictly prohibited. Our content may not be used for commercial purposes unless expressly authorized by Awwwards.
              Websites featured on our site remain the intellectual property of their creators. However, by submitting a site, you agree to its publication on our site and reproduction in other publications produced by Awwwards.
              Awwwards accepts no responsibility for the information and/ or content provided on any of our winners' websites.
              Awwwards accepts no responsibility for changes made to any winning site subsequent to its appearance on Awwwards. Altered designs and/ or content may be removed from our database with immediate effect if it is felt that the site in its current form does not meet our standards and criteria.</p>
          </section>


          <section >


            <h1 className={`text-[#000000] text-clamp-xl  m-0 p-0  text-center leading-[84px]  ${groteskTextMedium.className}`}>Submission Fees</h1>
            <p className={`text-[#000000] text-clamp-md  m-0 p-0   ${groteskText.className}`}>a. By subscribing to the Awwwards directory and using the other services offered by Awwwards, you agree to the current terms and conditions of the site.
              b. There are three directory plans available:
              Basic: No annual cost. Features include: adding your profile to one directory in one country.
              Professional: Annual cost of €150 ($165). Features include: adding your profile to 3 categories in one country.
              International: Annual cost of €1500 ($1750). Features include: adding your profile to 5 categories, worldwide.
              c. You can opt to upgrade or downgrade your service agreement to any other contract agreement that Awwwards is currently offering for sale at any time during your contract term. In the event of a contract downgrade, a discount credit will be issued to your Awwwards account for the difference in the cost of the two contracts over the remainder of your original contract term. This credit can be applied to future months of service with Awwwards, and is in no way transferable to a cash refund.
              d. At the end of the contract term, your contract will automatically renew for an additional contract term until explicitly cancelled by you. Cancellation must be issued via your user panel or via Awwwards customer support. Any cancellation issued via your user panel must be completed at least one (1) working day prior to the end of the contract term. Any cancellation carried out via Awwwards customer support must be carried out at least three (3) working days prior to the end of the contract term to allow for adequate processing time.
              e. Only Services and features clearly indicated as "free" are free or without charge. It is not the responsibility of Awwwards to provide free support to you in the use and operation of Awwwards.
              f. If you purchase any Services that we offer for a Fee, you agree to both Awwwards and our third party service providers to store your payment information. You give express permission for us to charge you for (i) a monthly Fee for any applicable Services, billed on a monthly basis, (ii) any other Fees for Services you may purchase, and (iii) any applicable taxes in connection with your use of the Services to the payment card you provide and to reimburse us for all collection costs and interest for any overdue amounts. If the card information you provide expires and you do not provide new card information, or cancel your bank account, you authorize us to continue billing you and you agree to remain responsible for any uncollected Fees.</p>
          </section>

          <section >


            <h1 className={`text-[#000000] text-clamp-xl m-0 p-0  text-center leading-[84px] ${groteskTextMedium.className}`}>Privacy policy</h1>
            <p className={`text-[#000000] text-clamp-md  m-0 p-0   ${groteskText.className}`}>We respect the privacy of everyone who visits our site. We do not collect personal information about our users without their knowledge and prior consent. No scripts or devices are used for this purpose. In order to use certain features of our website we may ask you to register by entering some personal information. This information is given voluntarily and will be used only as stated in the paragraphs below. This information will not be given, traded or sold to any third party without the user's knowledge and prior consent.
              The information provided upon registration, with the exception of your e-mail address, will be displayed on your user profile and we reserve the right to use it in other publications produced by Awwwards. By registering, you indicate your acceptance of these conditions. Further information may be provided at the user’s discretion but is not compulsory.
              When you submit a website for an Awwward, you will be asked to provide some information about the project. This information will be published on our site and we reserve the right to use it in other publications produced by Awwwards. By submitting your site, you indicate your acceptance of these conditions.
              We collect some information such as: 1) Pages visited, 2) Click stream data and 3) Other browsing information, for administrative purposes and to improve our website and services.
              Cookies: This website does not use cookies, but it does use third party technologies which use them to provide useful features and services. Cookies identify a user's computer, not the individual user. Most browsers are set to accept cookies by default. You can always set your browser to refuse cookies, but you may not be able to use all the features of our site.
              Children: Awwwards complies with the requirements of the Children's Online Privacy Protection Act. Awwwards will not knowingly accept submissions or correspondence from children under 13 years of age without written permission from their parents or legal guardians</p>
          </section>
        </div>
      </main>
      <footer>
        <Footer
          scrollToSection={scrollToSection}
          homeRef={home}
          searchRef={search}
          featuresRef={features}
          faqRef={faq}
          subPlanRef={subscriptionPlan}
          router={router}
        />
      </footer>
    </div>
  );
}
