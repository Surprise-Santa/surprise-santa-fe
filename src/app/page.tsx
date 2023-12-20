"use client";

import Faq from "@/components/ui/home-page-sections/faq";
import HowItWorks from "@/components/ui/home-page-sections/how-it-works";
import LandingPage from "@/components/ui/home-page-sections/landing-page";
import Footer from "@/components/ui/shared/footer";
import Navbar from "@/components/ui/shared/navbar";
import { useEffect, useState } from "react";
import WhatOthersThink from "../components/ui/home-page-sections/what-others-think";
import { useSearchParams } from "next/navigation";
import GroupInviteModal from "@/components/groups/group-invite-modal";

export default function Home() {
    const [displayModal, setDisplayModal] = useState(false);
    const groupParams = useSearchParams();
    const group = groupParams.get("group");

    useEffect(() => {
        const newPath = () => {
            if (group) {
                setDisplayModal(true);
            } else {
                setDisplayModal(false);
            }
        };

        newPath();
    }, [group]);

    return (
        <>
            {!displayModal ? (
                <>
                    <Navbar />
                    <LandingPage />
                    <HowItWorks />
                    <WhatOthersThink />
                    <Faq />
                    <Footer />
                </>
            ) : (
                <>
                    <LandingPage opac={20} />
                    <GroupInviteModal />
                </>
            )}
        </>
    );
}
