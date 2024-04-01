import React, { useState } from 'react';
interface AccordionProps {
    title: string;
    children: React.ReactNode;
}

function Accordion({ title, children }: AccordionProps) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="accordion">
            <div className="accordion-header" onClick={toggleAccordion}>
                <div className="accordion-title">{title}</div>
                <div className={`accordion-icon ${isOpen ? 'open' : ''}`}>&#9660;</div>
            </div>
            {isOpen && <div className="accordion-content">{children}</div>}
        </div>
    );
}

export default Accordion;
