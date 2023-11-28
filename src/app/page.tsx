import Faq from "@/components/ui/home-page-sections/faq";
import WhatOthersThink from "../components/ui/home-page-sections/what-others-think";
import Footer from "@/components/ui/shared/footer";
import LandingPage from "@/components/ui/home-page-sections/landing-page";
import Navbar from "@/components/ui/shared/navbar";
import HowItWorks from "@/components/ui/home-page-sections/how-it-works";

export default function Home() {
    return (
        <>
            <Navbar />
            <LandingPage />
            <HowItWorks />
            <WhatOthersThink />
            <Faq />
            <Footer />
        </>
    );
}
