import { useEffect, useRef } from "react";

export default function InfiniteBanner() {
    const marqueeRef = useRef(null);

    useEffect(() => {
        const marquee = marqueeRef.current;
        let speed = 80; // Adjust speed (lower = faster)
        let step = 1.8;

        function scrollMarquee() {
            if (marquee) {
                marquee.scrollLeft += step;
                if (marquee.scrollLeft >= marquee.scrollWidth / 2) {
                    marquee.scrollLeft = 0;
                }
            }
            requestAnimationFrame(scrollMarquee);
        }

        scrollMarquee();
    }, []);

    return (
        <div className="w-full overflow-hidden py-2 select-none">
            <div
                ref={marqueeRef}
                className="flex whitespace-nowrap overflow-hidden pointer-events-none overscroll-none"
            >
                <div className="flex space-x-8 min-w-max animate-marquee">
                    {Array(10)
                        .fill(["Save Money", "Invest Smart", "Track Expenses", "Financial Freedom"])
                        .flat()
                        .map((text, index) => (
                            <span key={index} className="text-xl font-semibold text-gray-800 flex items-center">
                                {text} <span className="mx-4 text-3xl">•</span>
                            </span>
                        ))}
                </div>
            </div>
        </div>
    );
}
