import Image from "next/image";
import FaqImage from "public/faq.png";
import ClientWrapper from "./../../wrapper/client";
import FaqAccordion from "@/components/accordion/faq-accordion";

const Faq = () => {
    return (
        <article className="py-12 px-6 bg-[#f8fafc]">
            <h2 className="text-center font-bold text-[31px] mb-8">Frequently Asked Questions</h2>

            <div className="flex flex-col lg:flex-row justify-center items-center gap-6 md:gap-12">
                <Image src={FaqImage} alt="Frequently Asked Questions" />

                <ClientWrapper>
                    <FaqAccordion />
                </ClientWrapper>
            </div>
        </article>
    );
};

export default Faq;
