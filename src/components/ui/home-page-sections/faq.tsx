import Image from "next/image";
import FaqImage from "public/images/faq.png";
import ClientWrapper from "./../../wrapper/client";
import FaqAccordion from "@/components/accordion/faq-accordion";

const Faq = () => {
    return (
        <article className="w-[100%] bg-[#f8fafc]">
            <div className="max-w-[1280px] mx-auto py-20 md:py-20 ">
                <h2 className="text-center font-bold text-[31px] mb-16">
                    Frequently Asked Questions
                </h2>

                <div className="flex flex-col lg:flex-row justify-center items-center gap-6 md:gap-12">
                    <Image src={FaqImage} alt="Frequently Asked Questions" />

                    <ClientWrapper>
                        <FaqAccordion />
                    </ClientWrapper>
                </div>
            </div>
        </article>
    );
};

export default Faq;
