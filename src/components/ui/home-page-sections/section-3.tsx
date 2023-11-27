import { Avatar, AvatarFallback, AvatarImage } from "../avatar";

export default function Index() {
    return (
        <section className="min-h-screen bg-secondary-green py-10 md:py-20 px-5 xl:px-[136px]">
            <h2 className="text-center font-bold text-[31px] mb-16">What Others Think</h2>

            <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12">
                <div>
                    <div className="bg-primary-green text-background mx-auto w-[300px] sm:w-[350px] lg:w-[400px] xl:w-[537px]  py-8 px-4 rounded-lg relative cursor-pointer hover:scale-105 transition-transform duration-300 active:scale-100">
                        <div className="flex justify-center absolute left-0 right-0 top-[-40px]">
                            <Avatar>
                                <AvatarImage src="./images/tunji.jpg" />
                                <AvatarFallback>AI</AvatarFallback>
                            </Avatar>
                        </div>
                        <h3 className="text-xl text-center mb-2 mt-5">Adetunji Igbatayo</h3>
                        <p className="text-center mb-4">Getbit Inc</p>

                        <p className="text-center mt-4">
                            “Lorem ipsum dolor sit amet consectetur. Sed dolor magna placerat
                            facilisis leo magna luctus augue ullamcorper.”{" "}
                        </p>
                    </div>

                    <div className="bg-primary-orange text-background w-[300px] sm:w-[350px] lg:w-[400px] xl:w-[537px] mt-16 py-8 px-4 rounded-lg relative cursor-pointer hover:scale-105 transition-transform duration-300 active:scale-100">
                        <div className="flex justify-center absolute left-0 right-0 top-[-40px]">
                            <Avatar>
                                <AvatarImage src="./images/talade.jpg" />
                                <AvatarFallback>TA</AvatarFallback>
                            </Avatar>
                        </div>
                        <h3 className="text-xl text-center mb-2 mt-5">Taladeogo Abraham</h3>
                        <p className="text-center mb-4">Getbit Inc</p>

                        <p className="text-center mt-4">
                            “Lorem ipsum dolor sit amet consectetur. Sed dolor magna placerat
                            facilisis leo magna luctus augue ullamcorper.”{" "}
                        </p>
                    </div>
                </div>

                <div className="mt-0 md: mt-16">
                    <div className="bg-primary-red text-background w-[300px] sm:w-[350px] lg:w-[400px] xl:w-[537px] my-16 py-8 px-4 rounded-lg relative cursor-pointer hover:scale-105 transition-transform duration-300 active:scale-100">
                        <div className="flex justify-center absolute left-0 right-0 top-[-40px]">
                            <Avatar>
                                <AvatarImage src="./images/emelder.jpg" />
                                <AvatarFallback>EO</AvatarFallback>
                            </Avatar>
                        </div>
                        <h3 className="text-xl text-center mb-2 mt-5">Emelder Okafor</h3>
                        <p className="text-center mb-4">Getbit Inc</p>

                        <p className="text-center mt-4">
                            “Lorem ipsum dolor sit amet consectetur. Sed dolor magna placerat
                            facilisis leo magna luctus augue ullamcorper.”{" "}
                        </p>
                    </div>

                    <div className="bg-primary-purple text-background w-[300px] sm:w-[350px] lg:w-[400px] xl:w-[537px] mt-16 py-8 px-4 rounded-lg relative cursor-pointer hover:scale-105 transition-transform duration-300 active:scale-100">
                        <div className="flex justify-center absolute left-0 right-0 top-[-40px]">
                            <Avatar>
                                <AvatarImage src="./images/christian.jpg" />
                                <AvatarFallback>AI</AvatarFallback>
                            </Avatar>
                        </div>
                        <h3 className="text-xl text-center mb-2 mt-5">Christian Enyia</h3>
                        <p className="text-center mb-4">Getbit Inc</p>

                        <p className="text-center mt-4">
                            “Lorem ipsum dolor sit amet consectetur. Sed dolor magna placerat
                            facilisis leo magna luctus augue ullamcorper.”{" "}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
