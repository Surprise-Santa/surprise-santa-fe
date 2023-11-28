import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const Header = () => {
    return (
        <header className="flex justify-end items-center gap-4 font-bold mb-8">
            <p>
                Hello,
                <span className="text-xl ml-2">Ayotunde</span>
            </p>

            <Avatar className="h-12 w-12">
                <AvatarImage src="./images/tunji.jpg" />
                <AvatarFallback>AI</AvatarFallback>
            </Avatar>
        </header>
    );
};

export default Header;
