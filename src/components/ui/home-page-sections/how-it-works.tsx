import Image from "next/image";
import HowItWorksCard from "@/components/how-it-works-text-card/how-it-works-card";
import { howItWorksData } from "@/lib/dummyData";

const HowItWorks = () => {
    return (
        <section className="w-full py-8 md:py-20 px-5 xl:px-[136px]">
            <h2 className="text-center font-bold text-[24px] sm:text-[31px] md:mb-10">
                How Does It Work?
            </h2>

            <div className="flex flex-col gap-6 md:gap-0 mt-16 sm:mt-28">
                {howItWorksData.map((card) => (
                    <div
                        key={card.index}
                        className="flex flex-col md:flex-row items-center w-full md:gap-24 gap-4 md:h-96 h-full"
                    >
                        {card.index % 2 === 0 ? (
                            <>
                                <HowItWorksCard
                                    title={card.title}
                                    description={card.description}
                                    backgroundImage={card.backgroundImage}
                                />
                                <div className="w-1/2">
                                    <Image
                                        src={card.image}
                                        alt={`Illustration for ${card.title}`}
                                        width={300}
                                        height={300}
                                        className="w-full h-full hidden md:block"
                                    />
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="w-1/2">
                                    <Image
                                        src={card.image}
                                        alt={`Illustration for ${card.title}`}
                                        width={300}
                                        height={300}
                                        className="w-full h-full hidden md:block"
                                    />
                                </div>
                                <HowItWorksCard
                                    title={card.title}
                                    description={card.description}
                                    backgroundImage={card.backgroundImage}
                                />
                            </>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default HowItWorks;
