import React from "react";
import Button from "./Button";

type MenuItemProps = {
    name: string;
    description: string;
    onOrder: () => void;
};

export default function MenuItem({ name, description, onOrder }: MenuItemProps) {


    return (
        <div className="border border-solid border-black/[.08] dark:border-white/[.145] rounded-lg p-4 w-full max-w-md">
            <h3 className="font-semibold text-lg mb-2">{name}</h3>
            <p className="text-sm mb-4 text-gray-600 dark:text-gray-400">{description}</p>
            <Button label="Order" onClick={onOrder} />
        </div>
    );
}