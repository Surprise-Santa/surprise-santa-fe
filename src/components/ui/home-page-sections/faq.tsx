import Image from "next/image";
import FaqImage from "public/images/faq.png";
import ClientWrapper from "./../../wrapper/client";
import FaqAccordion from "@/components/ui/accordion/faq-accordion";

const Faq = () => {
    return (
        <article className="w-[100%] bg-[#f8fafc] px-4">
            <h2 className="text-center font-bold text-[31px] mb-16">Frequently Asked Questions</h2>

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
