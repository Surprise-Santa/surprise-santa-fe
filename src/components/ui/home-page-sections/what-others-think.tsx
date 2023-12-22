import { Avatar, AvatarFallback, AvatarImage } from "../avatar";

export default function Index() {
    return (
        <section className="min-h-screen bg-secondary-green py-10 md:py-20 px-5 xl:px-[136px]">
            <h2 className="text-center font-bold text-[24px] sm:text-[31px] mb-16">
                What Others Think
            </h2>

            <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12">
                <div>
                    <div className="bg-primary-green text-background mx-auto w-[300px] sm:w-[350px] lg:w-[400px] xl:w-[537px]  py-8 px-4 rounded-lg relative cursor-pointer hover:scale-105 transition-transform duration-300 active:scale-100">
                        <div className="flex justify-center absolute left-0 right-0 top-[-40px]">
                            <Avatar>
                                <AvatarImage src="./images/Tunji.jpg" />
                                <AvatarFallback>AI</AvatarFallback>
                            </Avatar>
                        </div>
                        <h3 className="text-xl text-center mb-2 mt-5">Adetunji Igbatayo</h3>
                        <p className="text-center mb-4">Octosoft</p>

                        <p className="text-center mt-4 text-[14px] sm:text-[16px]">
                            “Surprise Santa made our Christmas so much fun! The anticipation of
                            finding the perfect gift for someone, not knowing who&apos;s getting it,
                            adds an extra layer of joy to the season.”{" "}
                        </p>
                    </div>

                    <div className="bg-primary-orange text-background w-[300px] sm:w-[350px] lg:w-[400px] xl:w-[537px] mt-16 py-8 px-4 rounded-lg relative cursor-pointer hover:scale-105 transition-transform duration-300 active:scale-100">
                        <div className="flex justify-center absolute left-0 right-0 top-[-40px]">
                            <Avatar>
                                <AvatarImage src="./images/Talade.jpg" />
                                <AvatarFallback>TA</AvatarFallback>
                            </Avatar>
                        </div>
                        <h3 className="text-xl text-center mb-2 mt-5">Taladeogo Abraham</h3>
                        <p className="text-center mb-4">Octosoft</p>

                        <p className="text-center mt-4 text-[14px] sm:text-[16px]">
                            “I love the mystery behind Surprise Santa. It brings out the holiday
                            spirit in the most delightful way. It&apos;s not just about the gifts;
                            it&apos;s the excitement of spreading joy without expecting anything in
                            return.”{" "}
                        </p>
                    </div>
                </div>

                <div className="mt-0 md:mt-16">
                    <div className="bg-primary-red text-background w-[300px] sm:w-[350px] lg:w-[400px] xl:w-[537px] my-16 py-8 px-4 rounded-lg relative cursor-pointer hover:scale-105 transition-transform duration-300 active:scale-100">
                        <div className="flex justify-center absolute left-0 right-0 top-[-40px]">
                            <Avatar>
                                <AvatarImage src="./images/Emelder.jpg" />
                                <AvatarFallback>EO</AvatarFallback>
                            </Avatar>
                        </div>
                        <h3 className="text-xl text-center mb-2 mt-5">Emelder Okafor</h3>
                        <p className="text-center mb-4">Octosoft</p>

                        <p className="text-center mt-4 text-[14px] sm:text-[16px]">
                            “Surprise Santa is the highlight of my holiday season. The element of
                            surprise and the thoughtfulness behind the gifts create unforgettable
                            memories. It&apos;s a wonderful way to celebrate Christmas with friends
                            and colleagues.”{" "}
                        </p>
                    </div>

                    <div className="bg-primary-purple text-background w-[300px] sm:w-[350px] lg:w-[400px] xl:w-[537px] mt-16 py-8 px-4 rounded-lg relative cursor-pointer hover:scale-105 transition-transform duration-300 active:scale-100">
                        <div className="flex justify-center absolute left-0 right-0 top-[-40px]">
                            <Avatar>
                                <AvatarImage src="./images/Christian.jpg" />
                                <AvatarFallback>AI</AvatarFallback>
                            </Avatar>
                        </div>
                        <h3 className="text-xl text-center mb-2 mt-5">Christian Enyia</h3>
                        <p className="text-center mb-4">Octosoft</p>

                        <p className="text-center mt-4 text-[14px] sm:text-[16px]">
                            “Participating in Surprise Santa is like being a part of a magical
                            holiday adventure. The secrecy adds an element of surprise and makes the
                            gift exchange so much more exciting. It&apos;s a brilliant idea!”{" "}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
