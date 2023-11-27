import Faq from "@/components/ui/home-page-sections/faq";
import SectionThree from "../components/ui/home-page-sections/section-3";
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
            <SectionThree />
            <Faq />
            <Footer />
        </>
    );
}
