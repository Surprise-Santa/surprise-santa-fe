"use client";

import { useState } from "react";
import { faqData } from "@/lib/dummy-data";

const FaqAccordion = () => {
    const [active, setActive] = useState<number | null>(0);

    return (
        <section className="flex flex-col gap-4 max-w-[44rem] w-full">
            {faqData.map((item, index) => (
                <div
                    key={index}
                    className={`rounded-lg bg-primary-green py-10 px-6 w-full ${
                        active === index ? "bg-secondary-green" : "bg-white"
                    }`}
                >
                    <button
                        className={`flex items-center gap-4 w-full border-none outline-none ${
                            active === index
                                ? "text-xl sm:text-2xl font-bold"
                                : "text-lg sm:text-xl font-semibold"
                        }`}
                        onClick={() => {
                            index === active ? setActive(null) : setActive(index);
                        }}
                    >
                        <span>{index + 1}.</span>
                        <span className="text-left">{item.question}</span>
                        <span className="ml-auto">{active === index ? "-" : "+"}</span>
                    </button>
                    <div className={`mt-2 ${active === index ? "block" : "hidden"}`}>
                        {item.answer}
                    </div>
                </div>
            ))}
        </section>
    );
};

export default FaqAccordion;
