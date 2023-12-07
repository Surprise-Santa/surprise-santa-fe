{/* <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
    <g clip-path="url(#clip0_589_68)">
        <path
            d="M9.18969 20.2501H5C4.80109 20.2501 4.61032 20.1711 4.46967 20.0305C4.32902 19.8898 4.25 19.699 4.25 19.5001V15.3104C4.25009 15.1118 4.32899 14.9213 4.46938 14.7807L16.0306 3.2195C16.1713 3.07895 16.362 3 16.5608 3C16.7596 3 16.9503 3.07895 17.0909 3.2195L21.2806 7.40637C21.4212 7.54701 21.5001 7.7377 21.5001 7.93653C21.5001 8.13535 21.4212 8.32605 21.2806 8.46668L9.71937 20.0307C9.57883 20.1711 9.38834 20.25 9.18969 20.2501Z"
            stroke="black"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
        <path
            d="M13.25 6L18.5 11.25"
            stroke="black"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
        <path
            d="M15.875 8.625L6.875 17.625"
            stroke="black"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
        <path
            d="M9.45223 20.2022L4.29785 15.0479"
            stroke="black"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
    </g>
    <defs>
        <clipPath id="clip0_589_68">
            <rect width="24" height="24" fill="white" transform="translate(0.5)" />
        </clipPath>
    </defs>
</svg>; */}

import { SVGProps, forwardRef } from "react";

// eslint-disable-next-line react/display-name
const SVGComponent = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>((props, ref) => (
    <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        width="25"
        height="24"
        viewBox="0 0 25 24"
        fill="none"
        {...props}
    >
        <g clip-path="url(#clip0_589_68)">
            <path
                d="M9.18969 20.2501H5C4.80109 20.2501 4.61032 20.1711 4.46967 20.0305C4.32902 19.8898 4.25 19.699 4.25 19.5001V15.3104C4.25009 15.1118 4.32899 14.9213 4.46938 14.7807L16.0306 3.2195C16.1713 3.07895 16.362 3 16.5608 3C16.7596 3 16.9503 3.07895 17.0909 3.2195L21.2806 7.40637C21.4212 7.54701 21.5001 7.7377 21.5001 7.93653C21.5001 8.13535 21.4212 8.32605 21.2806 8.46668L9.71937 20.0307C9.57883 20.1711 9.38834 20.25 9.18969 20.2501Z"
                stroke="black"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path
                d="M13.25 6L18.5 11.25"
                stroke="black"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path
                d="M15.875 8.625L6.875 17.625"
                stroke="black"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path
                d="M9.45223 20.2022L4.29785 15.0479"
                stroke="black"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </g>
        <defs>
            <clipPath id="clip0_589_68">
                <rect width="24" height="24" fill="white" transform="translate(0.5)" />
            </clipPath>
        </defs>
    </svg>
));

export default SVGComponent;
