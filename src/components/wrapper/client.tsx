import React from "react";

type WrapperPropType = {
    children: React.ReactNode;
};

const ClientWrapper = ({ children }: WrapperPropType) => {
    return <>{children}</>;
};

export default ClientWrapper;
