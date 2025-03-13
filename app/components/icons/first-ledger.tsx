const FirstLedger = () => {
  return (
    <svg
      width="34"
      height="34"
      viewBox="0 0 34 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <rect width="34" height="34" rx="6" fill="url(#pattern0_440_2284)" />
      <defs>
        <pattern
          id="pattern0_440_2284"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use xlinkHref="#image0_440_2284" transform="scale(0.0104167)" />
        </pattern>
        <image
          id="image0_440_2284"
          width="96"
          height="96"
          preserveAspectRatio="none"
          xlinkHref="data:image/png;base64,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"
        />
      </defs>
    </svg>
  );
};

export default FirstLedger;
