import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { designIdeas, categories } from '../data/DesignIdeasData';
import './CategoryGrid.css';

const CategoryGrid = () => {
    const { category } = useParams();
    const categoryData = categories.find(c => c.id === category);
    const ideas = designIdeas[category] || [];

    if (!categoryData) {
        return <div className="container">Category not found</div>;
    }

    return (
        <div className="category-grid-page">
            <section className="cg-hero">
                <div className="container">
                    <nav className="breadcrumb">
                        <span>Design Ideas</span> / <span>{categoryData.title}</span>
                    </nav>
                    <h1 className="cg-title">{categoryData.title}</h1>
                    <p className="cg-subtitle">{categoryData.desc}</p>
                </div>
            </section>

            <section className="cg-list">
                <div className="container">
                    <div className="cg-grid">
                        {ideas.map((item) => (
                            <Link key={item.id} to={`/design-ideas/${category}/${item.id}`} className="cg-card" data-cursor-text="VIEW DESIGN">
                                <div className="cg-card-image">
                                    <img src={item.image} alt={item.title} />
                                </div>
                                <div className="cg-card-info">
                                    <h3 className="cg-card-title">{item.title}</h3>
                                    <p className="cg-card-desc">{item.desc}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CategoryGrid;
