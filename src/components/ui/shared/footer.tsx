import Link from "next/link";
import { FacebookIcon, TwitterIcon, LinkedinIcon } from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-primary-green ">
            <div className="max-w-[1280px] mx-auto py-8 flex flex-col sm:flex-row gap-8 sm:gap-12 items-center justify-between">
                <p className="text-white font-semiBold text-2xl">Stay in touch with us</p>
                <div className="flex items-center gap-6">
                    <Link
                        href="#"
                        target="_blank"
                        rel="noreferrer noopener"
                        className="w-10 h-10 rounded-full bg-white grid place-items-center hover:scale-105 hover:text-primary-green"
                    >
                        <FacebookIcon size={16} fill="black" color="black" />
                    </Link>
                    <Link
                        href="#"
                        target="_blank"
                        rel="noreferrer noopener"
                        className="w-10 h-10 rounded-full bg-white grid place-items-center hover:scale-105 hover:text-primary-green"
                    >
                        <TwitterIcon size={16} fill="black" color="black" />
                    </Link>
                    <Link
                        href="#"
                        target="_blank"
                        rel="noreferrer noopener"
                        className="w-10 h-10 rounded-full bg-white grid place-items-center hover:scale-105 hover:text-primary-green"
                    >
                        <LinkedinIcon size={16} fill="black" color="black" />
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;