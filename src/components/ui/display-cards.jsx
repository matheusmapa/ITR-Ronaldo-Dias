"use client";

import React from "react";
import { cn } from "../../lib/utils";
import { Sparkles } from "lucide-react";

export function DisplayCard({
    className,
    icon = <Sparkles className="size-4 text-blue-300" />,
    title = "Featured",
    description = "Discover amazing content",
    date = "Just now",
    iconClassName = "text-blue-500",
    titleClassName = "text-blue-500",
}) {
    return (
        <div
            className={cn(
                "relative flex h-auto min-h-[7rem] w-[22rem] sm:w-[26rem] select-none flex-col justify-start rounded-2xl border border-emerald-900/50 bg-[#0b141a]/90 shadow-2xl backdrop-blur-md px-5 py-4 transition-all duration-700 hover:border-emerald-500/30 hover:bg-[#111b21]/95",
                className
            )}
        >
            <div className="flex items-center gap-3 mb-2">
                <span className={cn("relative flex items-center justify-center shrink-0 w-10 h-10 rounded-full bg-emerald-900/40 border border-emerald-800", iconClassName)}>
                    {icon}
                </span>
                <div className="flex flex-col">
                    <p className={cn("text-[15px] font-semibold tracking-tight", titleClassName)}>{title}</p>
                    <p className="text-slate-400 text-[11px] leading-none uppercase tracking-wider font-medium">{date}</p>
                </div>
            </div>
            <p className="whitespace-normal text-[15px] leading-relaxed mt-1 text-slate-200 break-words pl-[52px]">
                {description}
            </p>
        </div>
    );
}

export default function DisplayCards({ cards }) {
    const defaultCards = [
        {
            className: "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration:700 hover:grayscale-0 before:left-0 before:top-0",
        },
        {
            className: "[grid-area:stack] translate-x-16 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration:700 hover:grayscale-0 before:left-0 before:top-0",
        },
        {
            className: "[grid-area:stack] translate-x-32 translate-y-20 hover:translate-y-10",
        },
    ];

    const displayCards = cards || defaultCards;

    return (
        <div className="grid [grid-template-areas:'stack'] place-items-center opacity-100 animate-in fade-in-0 duration-700">
            {displayCards.map((cardProps, index) => (
                <DisplayCard key={index} {...cardProps} />
            ))}
        </div>
    );
}
