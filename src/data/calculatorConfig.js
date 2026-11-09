export const calculatorConfigs = {
    'full-home': {
        id: 'full-home',
        basePrice: 300000,
        intro: {
            title: 'What is the Full Home Price Calculator?',
            subtitle: 'Plan your dream home interiors with an approximate cost estimate tailored to your space and design preferences.',
            heroImage: '/calculator/full_home_hero.png',
            shortIntro: 'Get a rough estimate for your full home interiors in a few simple steps. Our calculator helps you understand the approximate cost based on your home type, design scope, and finish preferences.',
            steps: [
                { title: 'Choose your home type', desc: 'Select the type of home you want to design, such as 1 BHK, 2 BHK, 3 BHK, or villa.', icon: '🏠' },
                { title: 'Select rooms to design', desc: 'Tell us which spaces you want interiors for — bedrooms, kitchen, living room, and more.', icon: '🛋️' },
                { title: 'Choose finish level', desc: 'Select a style and finish preference that matches your budget and taste.', icon: '✨' },
                { title: 'Get estimated cost', desc: 'View an approximate interior estimate for your selected requirements.', icon: '📄' }
            ],
            howItWorks: [
                { title: 'Home Type', desc: 'Helps us understand the baseline size and layout of your home.' },
                { title: 'Rooms to Design', desc: 'Helps us strictly estimate the scope of your custom joinery project.' },
                { title: 'Finish Level', desc: 'Allows us to suggest a precise budget range based on your preferred material quality in aluminium.' },
                { title: 'Estimated Quote', desc: 'Gives you a rough cost before you even book a detailed personal consultation.' }
            ]
        },
        form: {
            title: 'Full Home Form',
            sections: [
                {
                    id: 'homeType',
                    title: 'Select your home type',
                    isMultiple: false,
                    options: [
                        { label: '1 BHK', multiplier: 0.7 },
                        { label: '2 BHK', multiplier: 1.0 },
                        { label: '3 BHK', multiplier: 1.4 },
                        { label: '4 BHK', multiplier: 1.8 },
                        { label: 'Villa / Duplex', multiplier: 2.5 }
                    ]
                },
                {
                    id: 'rooms',
                    title: 'Select rooms to design',
                    isMultiple: true, // Lead to additive pricing
                    options: [
                        { label: 'Kitchen', price: 95000 },
                        { label: 'Living Room', price: 65000 },
                        { label: 'Bedroom 1', price: 75000 },
                        { label: 'Bedroom 2', price: 70000 },
                        { label: 'Bedroom 3', price: 70000 },
                        { label: 'TV Unit', price: 25000 },
                        { label: 'Storage / Wardrobe', price: 45000 },
                        { label: 'Full Home', price: 250000 } // Standalone catch-all
                    ]
                },
                {
                    id: 'finish',
                    title: 'Choose your finish level',
                    isMultiple: false,
                    options: [
                        { label: 'Basic', multiplier: 1.0 },
                        { label: 'Premium', multiplier: 1.35 },
                        { label: 'Luxury', multiplier: 1.8 }
                    ]
                }
            ]
        },
        result: {
            title: 'Your Estimated Interior Cost',
            subtitle: 'Based on your selections, here’s an approximate budget range for your home interiors using Laya Space Design’s premium aluminium technology.',
            disclaimer: '*This estimate is approximate and may vary based on final measurements, customisations, and material preferences.'
        }
    },
    wardrobe: {
        id: 'wardrobe',
        basePrice: 45000,
        intro: {
            title: 'What is the Wardrobe Price Calculator?',
            subtitle: 'Get an approximate estimate for your custom wardrobe design based on size and style preferences.',
            heroImage: '/calculator/wardrobe_hero.jpg',
            shortIntro: 'At Laya Space Design, our Wardrobe Price Calculator is designed to give you a quick and convenient estimate based on your storage and design requirements. It takes into account important factors like wardrobe dimensions, style, material selection, finish quality, and accessories to provide an approximate cost in just a few steps.',
            steps: [
                { title: 'Choose wardrobe style', desc: 'Select between sliding, hinged, or custom walk-in setups.', icon: '🚪' },
                { title: 'Select room size', desc: 'Tell us the relative size of your intended wardrobe space.', icon: '📏' },
                { title: 'Choose finish level', desc: 'Select a premium style and finish preference matching your vision.', icon: '✨' },
                { title: 'Get estimated cost', desc: 'Receive your instant approximate quote for planning.', icon: '📄' }
            ],
            howItWorks: [
                { title: 'Wardrobe Dimensions', desc: 'The overall size of your wardrobe has a major impact on pricing. Larger wardrobes generally require more materials and internal storage components, which influences the estimated cost.' },
                { title: 'Wardrobe Style', desc: 'The type of wardrobe you choose also plays a key role in the estimate. Whether you prefer a sliding wardrobe, hinged wardrobe, or a more customised storage solution, the calculator adjusts the cost based on the design type you select.' },
                { title: 'Material & Finish Selection', desc: 'The choice of material and finish affects both the look and performance of your wardrobe. From practical and minimal finishes to premium design options, the calculator reflects how your preferences influence the price.' },
                { title: 'Accessories & Storage Features', desc: 'Additional storage elements and accessories can further customise your wardrobe. Options like drawers, mirrors, internal organisers, loft units, and utility add-ons are considered while calculating the estimated cost.' }
            ]
        },
        form: {
            title: 'Wardrobe Form',
            sections: [
                {
                    id: 'type',
                    title: 'Wardrobe Type',
                    isMultiple: false,
                    options: [
                        { label: 'Sliding', multiplier: 1.2 },
                        { label: 'Hinged', multiplier: 1.0 },
                        { label: 'Walk-in', multiplier: 1.8 },
                        { label: 'Mirror', multiplier: 1.3 },
                        { label: 'Floor-to-Ceiling', multiplier: 1.5 }
                    ]
                },
                {
                    id: 'size',
                    title: 'Wardrobe Size',
                    isMultiple: false,
                    options: [
                        { label: 'Small', multiplier: 0.8 },
                        { label: 'Medium', multiplier: 1.0 },
                        { label: 'Large', multiplier: 1.5 }
                    ]
                },
                {
                    id: 'finish',
                    title: 'Finish Level',
                    isMultiple: false,
                    options: [
                        { label: 'Basic', multiplier: 1.0 },
                        { label: 'Premium', multiplier: 1.25 },
                        { label: 'Luxury', multiplier: 1.5 }
                    ]
                }
            ]
        },
        result: {
            title: 'Your Estimated Wardrobe Cost',
            subtitle: 'Based on your selections, here’s an approximate budget range for your precision-engineered aluminium wardrobe.',
            disclaimer: '*This estimate is approximate. Exact price will depend on interior partition layouts, drawer counts, and hardware choices.'
        }
    },
    kitchen: {
        id: 'kitchen',
        basePrice: 95000,
        intro: {
            title: 'What is the Kitchen Price Calculator?',
            subtitle: 'Estimate the approximate cost of your modular kitchen based on layout, size, and material preferences.',
            heroImage: '/calculator/kitchen.jpg',
            shortIntro: 'The kitchen price calculator lets you skip the hassle of guesswork and get an accurate price estimate for your modular kitchen. Answer a few simple questions, and let us do the math for you!',
            steps: [
                { title: 'Choose layout', desc: 'Select the architectural layout that fits your space (L-shaped, U-shaped, Island).', icon: '📐' },
                { title: 'Select kitchen size', desc: 'Estimate the rough footprint of your cooking area.', icon: '📏' },
                { title: 'Choose finish', desc: 'Select between our foundational basics, best-selling premium, or high-end luxury finishes.', icon: '✨' },
                { title: 'Get estimate', desc: 'Instantly view a projected cost range for your ultimate kitchen.', icon: '🍳' }
            ],
            howItWorks: [
                { title: 'Kitchen Type', desc: 'Helps us calculate corner mechanisms and overall joinery complexity.' },
                { title: 'Kitchen Size', desc: 'Defines the raw material volume block needed.' },
                { title: 'Finish Level', desc: 'Incorporates premium pricing for ultra-matte, high-gloss, or fluted aluminium profiles.' },
                { title: 'Estimated Quote', desc: 'Provides you an instant approximation of investment.' }
            ]
        },
        form: {
            title: 'Kitchen Form',
            sections: [
                {
                    id: 'type',
                    title: 'Kitchen Type',
                    isMultiple: false,
                    options: [
                        { label: 'Straight', multiplier: 0.9 },
                        { label: 'L-Shaped', multiplier: 1.0 },
                        { label: 'U-Shaped', multiplier: 1.3 },
                        { label: 'Parallel', multiplier: 1.1 },
                        { label: 'Island', multiplier: 1.5 }
                    ]
                },
                {
                    id: 'size',
                    title: 'Kitchen Size',
                    isMultiple: false,
                    options: [
                        { label: 'Small', multiplier: 0.8 },
                        { label: 'Medium', multiplier: 1.0 },
                        { label: 'Large', multiplier: 1.4 }
                    ]
                },
                {
                    id: 'finish',
                    title: 'Finish Level',
                    isMultiple: false,
                    options: [
                        { label: 'Basic', multiplier: 1.0 },
                        { label: 'Premium', multiplier: 1.3 },
                        { label: 'Luxury', multiplier: 1.6 }
                    ]
                }
            ]
        },
        result: {
            title: 'Your Estimated Kitchen Cost',
            subtitle: 'Based on your selections, here’s an approximate budget range for your state-of-the-art modular kitchen.',
            disclaimer: '*This estimate is approximate and may vary based on exact square footage, accessory hardware (like tandem boxes), and appliance integration needs.'
        }
    },
    'living-room': {
        id: 'living-room',
        basePrice: 65000,
        intro: {
            title: 'What is the Living Room Cost Calculator?',
            subtitle: 'Get an approximate estimate for your living room interiors based on space and design preferences.',
            heroImage: '/calculator/living_room.jpg',
            shortIntro: 'The living room is the heart of your home. Use our calculator to understand the approximate cost of creating a premium, modern living space using Laya Space Design’s precision aluminium technology.',
            steps: [
                { title: 'Choose living room size', desc: 'Tell us the approximate floor area of your living room.', icon: '📏' },
                { title: 'Select key elements', desc: 'Choose if you want a TV unit, storage cabinets, or full-wall panelling.', icon: '🛋️' },
                { title: 'Choose finish level', desc: 'Select between our basic, premium, or ultra-luxury aluminium finishes.', icon: '✨' },
                { title: 'Get estimated cost', desc: 'View an instant approximate quote for your living room interiors.', icon: '📄' }
            ],
            howItWorks: [
                { title: 'Space Dimensions', desc: 'The overall size of your living room guides the material volume and structural complexity.' },
                { title: 'Design Elements', desc: 'The specific joinery items you choose — like TV units or partitions — directly impact the pricing.' },
                { title: 'Finish & Material', desc: 'Whether you prefer minimalist matte or ultra-luxe profiles, the choice of finish defines the final budget.' },
                { title: 'Estimated Quote', desc: 'Gives you a clear baseline for your project before you book a personal consultation.' }
            ]
        },
        form: {
            title: 'Living Room Form',
            sections: [
                {
                    id: 'size',
                    title: 'Living Room Size',
                    isMultiple: false,
                    options: [
                        { label: 'Compact', multiplier: 0.8 },
                        { label: 'Standard', multiplier: 1.0 },
                        { label: 'Large', multiplier: 1.5 },
                        { label: 'Extra Large', multiplier: 2.0 }
                    ]
                },
                {
                    id: 'elements',
                    title: 'Key Elements to Include',
                    isMultiple: true,
                    options: [
                        { label: 'TV Unit', price: 25000 },
                        { label: 'Display Cabinets', price: 15000 },
                        { label: 'Sideboard / Console', price: 12000 },
                        { label: 'Full Wall Panelling', price: 35000 },
                        { label: 'Bar Unit', price: 20000 }
                    ]
                },
                {
                    id: 'finish',
                    title: 'Choose Finish Level',
                    isMultiple: false,
                    options: [
                        { label: 'Basic', multiplier: 1.0 },
                        { label: 'Premium', multiplier: 1.3 },
                        { label: 'Luxury', multiplier: 1.7 }
                    ]
                }
            ]
        },
        result: {
            title: 'Your Estimated Living Room Cost',
            subtitle: 'Based on your selections, here’s an approximate budget range for your premium aluminium living room interiors.',
            disclaimer: '*This estimate is approximate and may vary based on exact measurements and hardware customisations.'
        }
    }
};
