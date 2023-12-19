"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Band from "public/images/band.png";
import Basket from "public/images/basket.png";
import Gift from "public/images/gift.png";
import Santa from "public/images/santa.png";
import Tree from "public/images/tree.png";

const NotFound = () => {
    const router = useRouter();

    return (
        <section className="h-[100vh] bg-stars relative to-red-50">
            <div className="absolute top-20 sm:top-20 left-0 lg:left-40 xl:left-52 w-[120px]  sm:w-[180px] xl:w-[250px]">
                {" "}
                <Image src={Band} alt="icons" />
            </div>
            <div className="absolute top-20  right-0 lg:right-40 w-[120px] sm:w-[180px] xl:w-[250px]">
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

            <div className="flex flex-col justify-center items-center h-full">
                <div className=" text-center bg-gradient-to-r from-green-600 to-red-500 text-transparent bg-clip-text text-[40px] md:text-[60px] font-extrabold">
                    WHOOPS PAGE NOT FOUND!!!
                </div>
                <div
                    className="mt-8 md:mt-6 flex justify-center ml-0 sm:ml-20 w-[180px] sm:w-[300px] cursor-pointer"
                    onClick={() => router.back()}
                >
                    <div className="bg-primary-green font-bold text-white px-6 sm:px-10 py-[12px] rounded-3xl flex items-center">
                        Go Back
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NotFound;
