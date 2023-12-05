import { SVGProps, forwardRef } from 'react';

// eslint-disable-next-line react/display-name
const SVGComponent = forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>(
  (props, ref) => (
    <svg
      ref={ref}
      width={18}
      height={19}
      viewBox="0 0 18 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g
        clipPath="url(#a)"
        stroke="#414141"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M.75 9.5s3-6 8.25-6 8.25 6 8.25 6-3 6-8.25 6-8.25-6-8.25-6Z" />
        <path d="M9 11.75a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z" />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M0 .5h18v18H0z" />
        </clipPath>
      </defs>
    </svg>
  )
);

export default SVGComponent;
