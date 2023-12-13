import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const Header = () => {
    return (
        <header className="flex justify-end items-center gap-4 font-bold mb-8 border-b-2 border-primary-gray pl-2 pr-6 lg:pr-8 py-2">
            <p>
                Hello,
                <span className="text-xl ml-2">Ayotunde</span>
            </p>

            <Avatar className="h-12 w-12">
                <AvatarImage src="./images/Tunji.jpg" />
                <AvatarFallback>AI</AvatarFallback>
            </Avatar>
        </header>
    );
};

export default Header;
