import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { designIdeas } from '../data/DesignIdeasData';
import { useModal } from '../context/ModalContext';
import './IdeaDetail.css';

const IdeaDetail = () => {
    const { category, id } = useParams();
    const { openModal } = useModal();
    const categoryIdeas = designIdeas[category] || [];
    const idea = categoryIdeas.find(item => item.id === id);

    if (!idea) {
        return <div className="container">Design not found</div>;
    }

    return (
        <div className="idea-detail-page">
            <section className="id-hero">
                <div className="container">
                    <nav className="breadcrumb">
                        <span>Design Ideas</span> /
                        <Link to={`/design-ideas/${category}`}> {category.replace('-', ' ').replace(/\b\w/g, (c) => c.toUpperCase())}</Link> /
                        <span> {idea.title}</span>
                    </nav>

                    <div className="id-layout">
                        <div className="id-main-visual">
                            <img src={idea.image} alt={idea.title} className="id-hero-img" />
                        </div>

                        <div className="id-sidebar">
                            <h1 className="id-title">{idea.title}</h1>
                            <p className="id-desc">{idea.desc}</p>

                            <div className="id-sections">
                                <div className="id-section">
                                    <h4 className="id-section-label">Features</h4>
                                    <ul className="id-list">
                                        {idea.features.map((f, i) => <li key={i}>{f}</li>)}
                                    </ul>
                                </div>

                                <div className="id-section">
                                    <h4 className="id-section-label">Ideal For</h4>
                                    <p className="id-text">
                                        {idea.idealFor.join(', ')}
                                    </p>
                                </div>
                            </div>

                            <div className="id-actions">
                                <button onClick={openModal} className="id-btn-primary">Get Similar Design</button>
                                <button onClick={openModal} className="id-btn-secondary">Book Consultation</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {idea.gallery.length > 0 && (
                <section className="id-gallery">
                    <div className="container">
                        <h2 className="id-gallery-title">Design Gallery</h2>
                        <div className="id-gallery-grid">
                            {idea.gallery.map((img, i) => (
                                <div key={i} className="id-gallery-item">
                                    <img src={img} alt={`${idea.title} gallery ${i}`} />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
};

export default IdeaDetail;
