import Image from "next/image";
import Link from "next/link";
import Band from "public/images/band.png";
import Basket from "public/images/basket.png";
import Gift from "public/images/gift.png";
import Text from "public/images/landing-text.png";
import Line from "public/images/line.png";
import Rocket from "public/images/rocket.png";
import Santa from "public/images/santa.png";
import Tree from "public/images/tree.png";

const LandingPage = () => {
    return (
        <section className="h-[100vh] bg-stars relative to-red-50">
            <div className="absolute top-20 sm:top-20 left-0 lg:left-40 xl:left-52 w-[120px]  sm:w-[180px] xl:w-[250px]">
                {" "}
                <Image src={Band} alt="icons" />
            </div>
            <div className="absolute top-32 right-0 lg:right-40 w-[120px] sm:w-[180px] xl:w-[250px]">
                {" "}
                <Image src={Santa} alt="icons" />
            </div>
            <div className="absolute bottom-20 left-0 lg:left-44 w-[120px] sm:w-[180px] xl:w-[250px]">
                {" "}
                <Image src={Basket} alt="icons" />
            </div>
            <div className="absolute bottom-32 right-0 lg:right-32 xl:right-52 w-[50px] sm:w-[130px] xl:w-[200px]">
                {" "}
                <Image src={Tree} alt="icons" />
            </div>
            <div className="flex items-center justify-center mx-auto absolute bottom-0 left-0 right-0 w-[100px] sm:w-[120px] xl:w-[150px]">
                {" "}
                <Image src={Gift} alt="icons" />
            </div>

            <div className="flex flex-col justify-center items-center mt-52 absolute left-0 right-0 top-[-210px] bottom-0">
                <div className="w-[290px] sm:w-[320px] md:w-[400px] lg:w-[420px] mb-8">
                    <Image src={Text} alt="icons" />
                </div>

                <p className="text-center px-4 ">Unwrapping Joy, One Surprise at a Time!</p>
                <div className="mt-8 md:mt-6 flex justify-center gap-2 ml-0 sm:ml-20 w-[180px] sm:w-[300px]">
                    <Link href="/auth/signin">
                        <div className="bg-primary-green font-bold text-white px-6 sm:px-10 py-[12px] rounded-3xl flex items-center gap-2">
                            Get Started
                            <Image src={Rocket} alt="icons" height={20} />
                        </div>
                    </Link>

                    <div className="mb-10 hidden sm:block">
                        <Image src={Line} alt="icons" height={40} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LandingPage;
