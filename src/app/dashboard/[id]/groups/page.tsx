"use client";

import Image from "next/image";
import NoDataImage from "public/images/no-data-icon.png";
import ProtectedPage from "@/services/guard/ProtectedPage";

const Groups = () => {
    const data = [
        {
            id: "1",
            title: "My Groups",
        },
        {
            id: "2",
            title: "Other Groups",
        },
    ];

    return (
        <div>
            <div className="flex flex-col sm:flex-row gap-2 justify-between">
                {data.map((item) => {
                    return (
                        <div
                            key={item.id}
                            className=" w-[100%] sm:w-[47%] border-2 border-primary-gray mt-4 p-6 rounded-xl "
                        >
                            <h2 className=" font-bold text-[1.4rem]">{item.title} </h2>
                            <div className="flex flex-col items-center justify-center mt-10 sm:mt-16 mb-14 sm:mb-20">
                                <Image src={NoDataImage} alt="no data" />
                                <p className="opacity-50 text-[1rem] font-bold mt-2">
                                    No active group
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ProtectedPage(Groups);
